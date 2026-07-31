import * as THREE from 'three';
import { makeRng } from './noise';
import { barkMaps, SurfaceMaps } from './textures';
import type { Foliage } from '../../data/biomes';

// Plants built from lathed trunks and clustered canopies rather than cones on
// sticks. Leaves get a cheap wrap-lighting term so light appears to pass
// through them, which is most of what "foliage looks alive" actually is.

export interface FloraResult {
  group: THREE.Group;
  /** Where each tree's crown sits, so leaf cards can be instanced over them. */
  crowns: { x: number; y: number; z: number; radius: number }[];
  /** Called each frame with elapsed time so everything sways. */
  update: (t: number) => void;
  dispose: () => void;
}

/** A tapered trunk with a slight lean and a gentle bend, lathed from a profile. */
function trunkGeometry(height: number, baseRadius: number, rand: () => number): THREE.BufferGeometry {
  const points: THREE.Vector2[] = [];
  const steps = 7;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // flare at the roots, taper toward the crown
    const r = baseRadius * (0.35 + 0.9 * Math.pow(1 - t, 1.7) + (t < 0.12 ? 0.5 * (0.12 - t) * 6 : 0));
    points.push(new THREE.Vector2(Math.max(0.012, r), t * height));
  }
  const geo = new THREE.LatheGeometry(points, 9);
  // bend it: offset each ring a little more the higher it goes
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const bendX = (rand() - 0.5) * 0.22;
  const bendZ = (rand() - 0.5) * 0.22;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const k = Math.pow(y / height, 1.7);
    pos.setX(i, pos.getX(i) + bendX * k * height * 0.35);
    pos.setZ(i, pos.getZ(i) + bendZ * k * height * 0.35);
  }
  geo.computeVertexNormals();
  return geo;
}

/** Leaf material with wrap lighting, so canopies glow slightly from behind. */
function leafMaterial(color: number, translucency: number): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.85,
    metalness: 0,
    flatShading: false,
    envMapIntensity: 0.22,
  });
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uWrap = { value: translucency };
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uWrap;')
      .replace(
        '#include <lights_fragment_end>',
        `#include <lights_fragment_end>
         // a little light bleeding through the leaf from behind
         #if NUM_DIR_LIGHTS > 0
         {
           vec3 L = normalize(directionalLights[0].direction);
           float back = clamp(dot(normalize(-geometryNormal), L), 0.0, 1.0);
           reflectedLight.indirectDiffuse += diffuseColor.rgb * directionalLights[0].color * back * uWrap * 0.09;
         }
         #endif`,
      );
  };
  return mat;
}

export function buildFlora(params: {
  kind: Foliage;
  spots: { x: number; z: number; y: number; scale: number }[];
  leafColor: number;
  leafColorAlt: number;
  barkColor: number;
  accent: number;
}): FloraResult {
  const { kind, spots, leafColor, leafColorAlt, barkColor, accent } = params;
  const group = new THREE.Group();
  const rand = makeRng(2024);
  const bark: SurfaceMaps = barkMaps(barkColor, 4711);
  const barkMat = new THREE.MeshStandardMaterial({
    map: bark.map,
    normalMap: bark.normalMap,
    roughnessMap: bark.roughnessMap,
    roughness: 1,
    metalness: 0,
  });
  barkMat.normalScale.set(0.9, 0.9);

  const leafA = leafMaterial(leafColor, kind === 'crystal' ? 0.0 : 0.42);
  const leafB = leafMaterial(leafColorAlt, kind === 'crystal' ? 0.0 : 0.34);
  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: leafColor,
    roughness: 0.06,
    metalness: 0,
    transmission: 0.85,
    thickness: 1.4,
    ior: 1.7,
    clearcoat: 1,
    attenuationColor: new THREE.Color(leafColorAlt),
    attenuationDistance: 2.2,
  });
  const capMat = new THREE.MeshStandardMaterial({ color: accent, roughness: 0.55, metalness: 0.05 });

  const crowns: { x: number; y: number; z: number; radius: number }[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const swayers: { obj: THREE.Object3D; phase: number; amount: number }[] = [];

  spots.forEach(({ x, z, y, scale }) => {
    const g = new THREE.Group();

    if (kind === 'crystal') {
      const count = 3 + Math.floor(rand() * 3);
      for (let i = 0; i < count; i++) {
        const h = 0.9 + rand() * 1.9;
        const shard = new THREE.Mesh(new THREE.ConeGeometry(0.13 + rand() * 0.14, h, 5), crystalMat);
        geometries.push(shard.geometry);
        shard.position.set((rand() - 0.5) * 0.7, h / 2, (rand() - 0.5) * 0.7);
        shard.rotation.set((rand() - 0.5) * 0.3, rand() * Math.PI, (rand() - 0.5) * 0.3);
        shard.castShadow = true;
        shard.receiveShadow = true;
        g.add(shard);
      }
    } else if (kind === 'cactus') {
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 1.25, 6, 12), leafA);
      geometries.push(body.geometry);
      body.position.y = 0.95;
      body.castShadow = true;
      body.receiveShadow = true;
      g.add(body);
      for (let a = 0; a < 2; a++) {
        const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.45, 5, 10), leafA);
        geometries.push(arm.geometry);
        arm.position.set(a ? 0.28 : -0.28, 1.05 + rand() * 0.3, 0);
        arm.rotation.z = a ? -0.7 : 0.7;
        arm.castShadow = true;
        g.add(arm);
      }
    } else if (kind === 'mushroom') {
      const stalkGeo = trunkGeometry(1.0, 0.19, rand);
      geometries.push(stalkGeo);
      const stalk = new THREE.Mesh(stalkGeo, barkMat);
      stalk.castShadow = true;
      stalk.receiveShadow = true;
      const capGeo = new THREE.SphereGeometry(0.62, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2);
      geometries.push(capGeo);
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.y = 1.0;
      cap.scale.y = 0.72;
      cap.castShadow = true;
      g.add(stalk, cap);
      swayers.push({ obj: cap, phase: rand() * 6.28, amount: 0.03 });
    } else if (kind === 'dead') {
      const h = 2.0 + rand() * 0.8;
      const tGeo = trunkGeometry(h, 0.15, rand);
      geometries.push(tGeo);
      const trunk = new THREE.Mesh(tGeo, barkMat);
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      g.add(trunk);
      for (let b = 0; b < 4; b++) {
        const bGeo = trunkGeometry(0.7 + rand() * 0.5, 0.06, rand);
        geometries.push(bGeo);
        const branch = new THREE.Mesh(bGeo, barkMat);
        branch.position.set((rand() - 0.5) * 0.3, h * (0.5 + rand() * 0.45), (rand() - 0.5) * 0.3);
        branch.rotation.set((rand() - 0.5) * 1.6, rand() * 6.28, (rand() - 0.5) * 1.6);
        branch.castShadow = true;
        g.add(branch);
      }
    } else if (kind === 'palm') {
      const h = 2.4 + rand() * 0.9;
      const tGeo = trunkGeometry(h, 0.13, rand);
      geometries.push(tGeo);
      const trunk = new THREE.Mesh(tGeo, barkMat);
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      g.add(trunk);
      const crown = new THREE.Group();
      crown.position.y = h;
      const fronds = 7;
      for (let f = 0; f < fronds; f++) {
        // a frond is a long thin plane bent downward at the tip
        const fg = new THREE.PlaneGeometry(0.34, 1.7, 1, 6);
        const fpos = fg.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < fpos.count; i++) {
          const t = (fpos.getY(i) + 0.85) / 1.7;
          fpos.setZ(i, -Math.pow(t, 2.2) * 0.85);
          fpos.setX(i, fpos.getX(i) * (1 - t * 0.55));
        }
        fg.computeVertexNormals();
        geometries.push(fg);
        const frond = new THREE.Mesh(fg, f % 2 ? leafA : leafB);
        frond.material.side = THREE.DoubleSide;
        frond.rotation.set(-0.5 - rand() * 0.2, (f / fronds) * Math.PI * 2, 0);
        frond.position.y = 0.1;
        frond.castShadow = true;
        crown.add(frond);
      }
      g.add(crown);
      swayers.push({ obj: crown, phase: rand() * 6.28, amount: 0.07 });
    } else {
      // pine / broadleaf: a lathed trunk under three clustered canopy blobs
      const h = 1.5 + rand() * 0.7;
      const tGeo = trunkGeometry(h, 0.16, rand);
      geometries.push(tGeo);
      const trunk = new THREE.Mesh(tGeo, barkMat);
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      g.add(trunk);
      // the crown is drawn as instanced leaf cards, not solid geometry
      crowns.push({ x, y: y + (h + 0.75) * scale, z, radius: (0.95 + rand() * 0.35) * scale });
    }

    g.position.set(x, y, z);
    g.scale.setScalar(scale);
    g.rotation.y = rand() * Math.PI * 2;
    group.add(g);
  });

  return {
    group,
    crowns,
    update: (t: number) => {
      for (const s of swayers) {
        s.obj.rotation.z = Math.sin(t * 1.15 + s.phase) * s.amount;
        s.obj.rotation.x = Math.cos(t * 0.9 + s.phase) * s.amount * 0.6;
      }
    },
    dispose: () => {
      geometries.forEach((g) => g.dispose());
      [barkMat, leafA, leafB, crystalMat, capMat].forEach((m) => m.dispose());
      bark.map.dispose();
      bark.normalMap.dispose();
      bark.roughnessMap.dispose();
    },
  };
}
