import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import type { Biome } from '../data/biomes';
import { buildTerrain } from './world/terrain';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { sunDirection } from './world/sky';
import { buildFlora } from './world/flora';
import { groundMaps, rockMaps, waterNormals } from './world/textures';
import { fbm, makeRng } from './world/noise';

// The unit world.
//
// Nothing is downloaded: the terrain is a noise heightfield, the sky is
// atmospheric scattering evaluated in a shader and then captured as the
// environment map, every texture is drawn procedurally at load, and the plants
// are lathed and clustered geometry. On top of that sits a real post chain —
// bloom on the highlights, a depth-aware ambient-occlusion pass, SMAA, then
// tone mapping and grade.

export interface Island3DNode {
  index: number;
  label: string;
  status: 'completed' | 'unlocked' | 'locked';
  onSelect: () => void;
}

interface Island3DProps {
  nodes: Island3DNode[];
  biome: Biome;
  className?: string;
}

const NODE_XZ: [number, number][] = [
  [-8.2, 4.4],
  [-2.6, 1.6],
  [3.2, -1.2],
  [8.4, -4.2],
];
const STATUS_COLOR = { completed: 0x62e04a, unlocked: 0x3fc4ff, locked: 0x9aa2b1 } as const;
const RADIUS = 15;

/** Sun setup per biome — the single biggest lever on how a place feels. */
function sunFor(biome: Biome): { elevation: number; azimuth: number; turbidity: number; rayleigh: number } {
  switch (biome.name) {
    case 'Frostpeak':
      return { elevation: 0.28, azimuth: 2.2, turbidity: 3.2, rayleigh: 2.4 };
    case 'Dunes':
      return { elevation: 0.95, azimuth: 1.1, turbidity: 8.5, rayleigh: 1.1 };
    case 'Jungle':
      return { elevation: 0.7, azimuth: 2.9, turbidity: 6.5, rayleigh: 2.0 };
    case 'Emberfall':
      return { elevation: 0.12, azimuth: 4.1, turbidity: 12, rayleigh: 3.4 };
    case 'Crystal Hollow':
      return { elevation: 0.22, azimuth: 5.1, turbidity: 4.0, rayleigh: 3.0 };
    case 'Mushroom Vale':
      return { elevation: 0.42, azimuth: 3.4, turbidity: 5.0, rayleigh: 2.6 };
    case 'Skyreach':
      return { elevation: 0.62, azimuth: 0.6, turbidity: 2.2, rayleigh: 1.7 };
    default:
      return { elevation: 0.52, azimuth: 1.7, turbidity: 3.0, rayleigh: 1.9 };
  }
}

const Island3D: React.FC<Island3DProps> = ({ nodes, biome, className }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const hoveredRef = useRef<number | null>(null);
  hoveredRef.current = hovered;
  const nodesRef = useRef(nodes);
  nodesRef.current = nodes;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'high-performance' });
    } catch {
      return; // no WebGL: the CSS island behind this stays visible
    }

    const disposables: { dispose: () => void }[] = [];
    let quality = window.devicePixelRatio > 1.5 ? 1 : 0.85;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2) * quality);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.55;
    const canvas = renderer.domElement;
    canvas.style.cssText = 'width:100%;height:100%;display:block;touch-action:none;cursor:grab';
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.5, 20000);

    // ------------------------------------------------------------------- sky
    const sunCfg = sunFor(biome);
    const sky = new Sky();
    sky.scale.setScalar(6000);
    const sunDirEarly = sunDirection(sunCfg.elevation, sunCfg.azimuth);
    {
      const u = sky.material.uniforms;
      u.turbidity.value = sunCfg.turbidity;
      u.rayleigh.value = sunCfg.rayleigh;
      u.mieCoefficient.value = 0.006;
      u.mieDirectionalG.value = 0.82;
      u.sunPosition.value.copy(sunDirEarly);
    }
    scene.add(sky);

    // Capture the sky as the environment map: every PBR surface below is then
    // lit and reflected by the actual sky rather than a guessed ambient colour.
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envScene = new THREE.Scene();
    const skyClone = new Sky();
    skyClone.scale.setScalar(6000);
    skyClone.material.uniforms.turbidity.value = sunCfg.turbidity;
    skyClone.material.uniforms.rayleigh.value = sunCfg.rayleigh;
    skyClone.material.uniforms.mieCoefficient.value = 0.006;
    skyClone.material.uniforms.mieDirectionalG.value = 0.82;
    skyClone.material.uniforms.sunPosition.value.copy(sunDirEarly);
    envScene.add(skyClone);
    const envRT = pmrem.fromScene(envScene, 0.03);
    const envMap = envRT.texture;
    scene.environment = envMap;
    scene.background = envMap; // the sky itself, not a flat clear colour
    pmrem.dispose();
    disposables.push(envRT);

    scene.fog = new THREE.FogExp2(biome.fog, 0.0022);

    // ---------------------------------------------------------------- lights
    const sunDir = sunDirection(sunCfg.elevation, sunCfg.azimuth);
    const sun = new THREE.DirectionalLight(biome.sunColor, biome.sunIntensity * 0.5);
    sun.position.copy(sunDir).multiplyScalar(60);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 20;
    sun.shadow.camera.far = 110;
    const S = 22;
    sun.shadow.camera.left = -S;
    sun.shadow.camera.right = S;
    sun.shadow.camera.top = S;
    sun.shadow.camera.bottom = -S;
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.035;
    scene.add(sun);
    scene.add(sun.target);
    // sky bounce, tinted by the biome so shadows aren't neutral grey
    scene.add(new THREE.HemisphereLight(biome.skyMid, biome.grassDark, 0.3));

    const world = new THREE.Group();
    scene.add(world);

    // --------------------------------------------------------------- terrain
    const seed = Math.abs(biome.grass ^ biome.soil ^ Math.round(biome.sunIntensity * 1000));
    const terrain = buildTerrain({
      radius: RADIUS,
      segments: 200,
      seed,
      relief: biome.name === 'Frostpeak' || biome.name === 'Emberfall' ? 4.6 : 2.9,
      ruggedness: biome.name === 'Frostpeak' ? 0.75 : biome.name === 'Dunes' ? 0.15 : 0.45,
      flattenAt: NODE_XZ,
    });
    const ground = groundMaps(biome.grass, biome.soil, seed, 512, 14);
    const groundMat = new THREE.MeshStandardMaterial({
      color: biome.grass,
      map: ground.map,
      normalMap: ground.normalMap,
      roughnessMap: ground.roughnessMap,
      roughness: 1,
      metalness: 0,
      vertexColors: true,
      envMapIntensity: 0.5,
    });
    groundMat.normalScale.set(0.8, 0.8);
    const terrainMesh = new THREE.Mesh(terrain.geometry, groundMat);
    terrainMesh.castShadow = true;
    terrainMesh.receiveShadow = true;
    world.add(terrainMesh);
    disposables.push(terrain.geometry, groundMat, ground.map, ground.normalMap, ground.roughnessMap);

    // ----------------------------------------------------------------- water
    const wNormals = waterNormals(seed + 3);
    const waterU = {
      uTime: { value: 0 },
      uShallow: { value: new THREE.Color(biome.water) },
      uDeep: { value: new THREE.Color(biome.water).multiplyScalar(0.22) },
      uSun: { value: sunDir },
      uSunColor: { value: new THREE.Color(biome.sunColor) },
      uNormals: { value: wNormals },
      uEnv: { value: envMap },
    };
    const waterGeo = new THREE.PlaneGeometry(RADIUS * 8, RADIUS * 8, 1, 1);
    waterGeo.rotateX(-Math.PI / 2);
    const water = new THREE.Mesh(
      waterGeo,
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: waterU,
        vertexShader: /* glsl */ `
          varying vec3 vWorld;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vWorld = wp.xyz;
            gl_Position = projectionMatrix * viewMatrix * wp;
          }`,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          uniform vec3 uShallow, uDeep, uSun, uSunColor;
          uniform sampler2D uNormals;
          uniform samplerCube uEnv;
          varying vec3 vWorld;
          varying vec2 vUv;

          void main() {
            // two normal layers scrolling against each other: cheap, convincing
            vec2 uv1 = vWorld.xz * 0.055 + vec2(uTime * 0.017, uTime * 0.011);
            vec2 uv2 = vWorld.xz * 0.031 - vec2(uTime * 0.013, uTime * 0.019);
            vec3 n1 = texture2D(uNormals, uv1).xyz * 2.0 - 1.0;
            vec3 n2 = texture2D(uNormals, uv2).xyz * 2.0 - 1.0;
            vec3 n = normalize(vec3(n1.x + n2.x, 3.4, n1.y + n2.y));

            vec3 V = normalize(cameraPosition - vWorld);
            float fres = pow(1.0 - clamp(dot(V, n), 0.0, 1.0), 4.0);
            fres = mix(0.02, 1.0, fres);

            // depth tint: distance from the island reads as deeper water
            float d = clamp((length(vWorld.xz) - 11.0) / 16.0, 0.0, 1.0);
            vec3 body = mix(uShallow, uDeep, d);

            vec3 R = reflect(-V, n);
            vec3 sky = textureCube(uEnv, R).rgb;

            vec3 H = normalize(V + uSun);
            float spec = pow(max(dot(n, H), 0.0), 260.0);

            vec3 col = mix(body, sky, fres * 0.92) + uSunColor * spec * 3.2;
            // foam where the water meets the shore
            float shore = 1.0 - smoothstep(10.4, 12.2, length(vWorld.xz));
            col = mix(col, vec3(1.0), shore * 0.28 * (0.6 + 0.4 * sin(uTime * 2.0 + length(vWorld.xz) * 3.0)));

            gl_FragColor = vec4(col, mix(0.86, 1.0, fres));
          }`,
      }),
    );
    water.position.y = -0.55;
    water.renderOrder = 1;
    world.add(water);
    disposables.push(waterGeo, water.material as THREE.Material, wNormals);

    // ----------------------------------------------------------------- rocks
    const rockTex = rockMaps(biome.soilDark, seed + 11, 256, 3);
    const rockMat = new THREE.MeshStandardMaterial({
      map: rockTex.map,
      normalMap: rockTex.normalMap,
      roughnessMap: rockTex.roughnessMap,
      roughness: 1,
      metalness: 0,
      envMapIntensity: 0.5,
    });
    const rand = makeRng(seed + 99);
    const rocksGeo: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 26; i++) {
      const a = rand() * Math.PI * 2;
      const r = 3 + rand() * (RADIUS - 5);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const y = terrain.heightAt(x, z);
      if (y < 0.25) continue;
      const g = new THREE.DodecahedronGeometry(0.25 + rand() * 0.65, 0);
      const p = g.attributes.position as THREE.BufferAttribute;
      for (let v = 0; v < p.count; v++) {
        const s = 1 + fbm(p.getX(v) * 3, p.getZ(v) * 3, 2, seed) * 0.45;
        p.setXYZ(v, p.getX(v) * s, p.getY(v) * s * 0.75, p.getZ(v) * s);
      }
      g.computeVertexNormals();
      rocksGeo.push(g);
      const rock = new THREE.Mesh(g, rockMat);
      rock.position.set(x, y - 0.08, z);
      rock.rotation.set(rand() * 3, rand() * 3, rand() * 3);
      rock.castShadow = true;
      rock.receiveShadow = true;
      world.add(rock);
    }
    disposables.push(rockMat, rockTex.map, rockTex.normalMap, rockTex.roughnessMap, ...rocksGeo);

    // ---------------------------------------------------------------- plants
    const spots: { x: number; z: number; y: number; scale: number }[] = [];
    const treeRand = makeRng(seed + 404);
    let attempts = 0;
    const wanted = Math.round(24 * Math.max(0.3, biome.grassDensity));
    while (spots.length < wanted && attempts++ < 900) {
      const a = treeRand() * Math.PI * 2;
      const r = 2 + Math.sqrt(treeRand()) * (RADIUS - 4.2);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const y = terrain.heightAt(x, z);
      // only where it would really grow: above the tideline, off the cliffs
      if (y < 0.5 || terrain.slopeAt(x, z) > 0.85) continue;
      if (NODE_XZ.some(([nx, nz]) => Math.hypot(x - nx, z - nz) < 2.6)) continue;
      if (spots.some((s) => Math.hypot(s.x - x, s.z - z) < 2.4)) continue;
      spots.push({ x, z, y: y - 0.05, scale: 0.75 + treeRand() * 0.7 });
    }
    const flora = buildFlora({
      kind: biome.foliage,
      spots,
      leafColor: biome.grassDark,
      leafColorAlt: biome.grass,
      barkColor: biome.soilDark,
      accent: biome.accent,
    });
    world.add(flora.group);
    disposables.push({ dispose: flora.dispose });

    // ------------------------------------------------------- grass instances
    const bladeGeo = new THREE.PlaneGeometry(0.11, 0.32, 1, 3);
    bladeGeo.translate(0, 0.16, 0);
    const GRASS = Math.round(6500 * biome.grassDensity);
    const grassMat = new THREE.MeshStandardMaterial({
      color: biome.grassDark,
      roughness: 0.95,
      side: THREE.DoubleSide,
      envMapIntensity: 0.18,
    });
    let grassShader: THREE.WebGLProgramParametersWithUniforms | null = null;
    grassMat.onBeforeCompile = (sh) => {
      sh.uniforms.uTime = { value: 0 };
      grassShader = sh;
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', '#include <common>\nuniform float uTime;\nvarying float vH;')
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
           vH = uv.y;
           float w = sin(uTime * 1.6 + instanceMatrix[3][0] * 0.6 + instanceMatrix[3][2] * 0.45);
           float g = sin(uTime * 0.55 + instanceMatrix[3][0] * 0.11) * 0.5 + 0.5; // gusts
           transformed.x += w * pow(uv.y, 1.6) * (0.22 + g * 0.3);
           transformed.z += cos(uTime * 1.25 + instanceMatrix[3][2] * 0.5) * pow(uv.y, 1.6) * 0.14;`,
        );
      sh.fragmentShader = sh.fragmentShader
        .replace('#include <common>', '#include <common>\nvarying float vH;')
        .replace(
          '#include <dithering_fragment>',
          `#include <dithering_fragment>
           // darker at the base, sun-bleached at the tip
           gl_FragColor.rgb *= mix(0.5, 0.95, vH);`,
        );
    };
    const grass = new THREE.InstancedMesh(bladeGeo, grassMat, Math.max(1, GRASS));
    grass.receiveShadow = true;
    grass.frustumCulled = false;
    if (GRASS > 0) {
      const m = new THREE.Matrix4();
      const q = new THREE.Quaternion();
      const gr = makeRng(seed + 7);
      let placed = 0;
      let tries = 0;
      while (placed < GRASS && tries++ < GRASS * 12) {
        const a = gr() * Math.PI * 2;
        const r = Math.sqrt(gr()) * (RADIUS - 3.4);
        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r;
        const y = terrain.heightAt(x, z);
        if (y < 0.42 || terrain.slopeAt(x, z) > 0.95) continue;
        q.setFromEuler(new THREE.Euler(0, gr() * Math.PI, (gr() - 0.5) * 0.3));
        m.compose(new THREE.Vector3(x, y - 0.02, z), q, new THREE.Vector3(1, 0.65 + gr() * 0.6, 1));
        grass.setMatrixAt(placed++, m);
      }
      grass.count = placed;
      world.add(grass);
    }
    disposables.push(bladeGeo, grassMat);

    // ------------------------------------------------------------------ path
    const stoneTex = rockMaps(biome.path, seed + 5, 128, 1);
    const stoneMat = new THREE.MeshStandardMaterial({
      map: stoneTex.map,
      normalMap: stoneTex.normalMap,
      roughnessMap: stoneTex.roughnessMap,
      roughness: 1,
      envMapIntensity: 0.4,
    });
    const curve = new THREE.CatmullRomCurve3(
      NODE_XZ.map(([x, z]) => new THREE.Vector3(x, 0, z)),
      false,
      'catmullrom',
      0.35,
    );
    const slabGeo = new THREE.CylinderGeometry(0.44, 0.46, 0.12, 7);
    const slabs = new THREE.InstancedMesh(slabGeo, stoneMat, 150);
    slabs.receiveShadow = true;
    slabs.castShadow = true;
    {
      const m = new THREE.Matrix4();
      const q = new THREE.Quaternion();
      const pr = makeRng(seed + 13);
      for (let i = 0; i < 150; i++) {
        const t = i / 149;
        const p = curve.getPoint(t);
        const tan = curve.getTangent(t);
        const side = (pr() - 0.5) * 0.5;
        const x = p.x + -tan.z * side;
        const z = p.z + tan.x * side;
        q.setFromEuler(new THREE.Euler((pr() - 0.5) * 0.08, pr() * Math.PI, (pr() - 0.5) * 0.08));
        m.compose(
          new THREE.Vector3(x, terrain.heightAt(x, z) + 0.03, z),
          q,
          new THREE.Vector3(0.8 + pr() * 0.5, 1, 0.8 + pr() * 0.5),
        );
        slabs.setMatrixAt(i, m);
      }
    }
    world.add(slabs);
    disposables.push(slabGeo, stoneMat, stoneTex.map, stoneTex.normalMap, stoneTex.roughnessMap);

    // ---------------------------------------------------------------- castle
    const castleTex = rockMaps(0xd8d2c4, seed + 21, 256, 2);
    const castleMat = new THREE.MeshStandardMaterial({
      map: castleTex.map,
      normalMap: castleTex.normalMap,
      roughnessMap: castleTex.roughnessMap,
      roughness: 0.95,
      envMapIntensity: 0.6,
    });
    const roofMat = new THREE.MeshStandardMaterial({ color: biome.accent, roughness: 0.45, metalness: 0.25 });
    const castle = new THREE.Group();
    const keepGeo = new THREE.CylinderGeometry(1.15, 1.35, 2.4, 10);
    const keep = new THREE.Mesh(keepGeo, castleMat);
    keep.position.y = 1.2;
    keep.castShadow = true;
    keep.receiveShadow = true;
    castle.add(keep);
    const battlementGeo = new THREE.BoxGeometry(0.28, 0.34, 0.28);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const b = new THREE.Mesh(battlementGeo, castleMat);
      b.position.set(Math.cos(a) * 1.12, 2.55, Math.sin(a) * 1.12);
      b.rotation.y = -a;
      b.castShadow = true;
      castle.add(b);
    }
    const towerGeo = new THREE.CylinderGeometry(0.42, 0.5, 3.4, 10);
    const roofGeo = new THREE.ConeGeometry(0.62, 1.0, 10);
    ([[-1.15, -1.15], [1.15, -1.15], [-1.15, 1.15], [1.15, 1.15]] as [number, number][]).forEach(([tx, tz]) => {
      const tower = new THREE.Mesh(towerGeo, castleMat);
      tower.position.set(tx, 1.7, tz);
      tower.castShadow = true;
      tower.receiveShadow = true;
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.set(tx, 3.9, tz);
      roof.castShadow = true;
      castle.add(tower, roof);
    });
    const flagGeo = new THREE.PlaneGeometry(0.8, 0.45, 10, 1);
    const flag = new THREE.Mesh(
      flagGeo,
      new THREE.MeshStandardMaterial({ color: biome.accent, side: THREE.DoubleSide, roughness: 0.65 }),
    );
    flag.position.set(0.42, 3.5, 0);
    castle.add(flag);
    const [cx, cz] = NODE_XZ[3];
    castle.position.set(cx, terrain.heightAt(cx, cz) - 0.1, cz);
    world.add(castle);
    disposables.push(
      keepGeo, battlementGeo, towerGeo, roofGeo, flagGeo, castleMat, roofMat,
      castleTex.map, castleTex.normalMap, castleTex.roughnessMap,
    );

    // ------------------------------------------------------------ level gems
    const markers: { mesh: THREE.Mesh; glow: THREE.PointLight | null; base: number }[] = [];
    const gemGeo = new THREE.OctahedronGeometry(0.62, 0);
    nodes.forEach((node, i) => {
      const [x, z] = NODE_XZ[i] ?? [0, 0];
      const color = STATUS_COLOR[node.status];
      const mat = new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.03,
        metalness: 0,
        transmission: node.status === 'locked' ? 0.15 : 0.9,
        thickness: 1.6,
        ior: 2.2,
        clearcoat: 1,
        clearcoatRoughness: 0,
        iridescence: node.status === 'locked' ? 0 : 0.7,
        iridescenceIOR: 1.6,
        emissive: new THREE.Color(color),
        emissiveIntensity: node.status === 'unlocked' ? 1.5 : node.status === 'completed' ? 0.6 : 0.05,
        envMapIntensity: 1.4,
      });
      const gem = new THREE.Mesh(gemGeo, mat);
      const groundY = terrain.heightAt(x, z);
      const base = groundY + (i === 3 ? 5.4 : 1.6);
      gem.position.set(x, base, z);
      gem.castShadow = true;
      gem.userData.index = i;
      world.add(gem);
      disposables.push(mat);

      let glow: THREE.PointLight | null = null;
      if (node.status !== 'locked') {
        glow = new THREE.PointLight(color, node.status === 'unlocked' ? 3.5 : 1.2, 4.5, 2);
        glow.position.set(x, base, z);
        world.add(glow);
      }
      markers.push({ mesh: gem, glow, base });
    });
    disposables.push(gemGeo);

    // --------------------------------------------------------------- weather
    const MOTE_LOOK: Record<string, { color: number; size: number; opacity: number; rise: number; count: number }> = {
      pollen: { color: 0xfff0b0, size: 0.09, opacity: 0.7, rise: 0.004, count: 420 },
      snow: { color: 0xffffff, size: 0.14, opacity: 0.95, rise: -0.05, count: 900 },
      ember: { color: 0xff7a2c, size: 0.11, opacity: 1, rise: 0.055, count: 520 },
      spark: { color: 0xd9b6ff, size: 0.1, opacity: 0.9, rise: 0.012, count: 460 },
      bubble: { color: 0xd6fff2, size: 0.12, opacity: 0.55, rise: 0.03, count: 380 },
      none: { color: 0xffffff, size: 0.05, opacity: 0, rise: 0, count: 1 },
    };
    const look = MOTE_LOOK[biome.motes] ?? MOTE_LOOK.pollen;
    const moteN = look.count;
    const mPos = new Float32Array(moteN * 3);
    const mSeed = makeRng(seed + 55);
    for (let i = 0; i < moteN; i++) {
      const a = mSeed() * Math.PI * 2;
      const r = Math.sqrt(mSeed()) * RADIUS;
      mPos[i * 3] = Math.cos(a) * r;
      mPos[i * 3 + 1] = 0.6 + mSeed() * 11;
      mPos[i * 3 + 2] = Math.sin(a) * r;
    }
    const moteGeo = new THREE.BufferGeometry();
    moteGeo.setAttribute('position', new THREE.BufferAttribute(mPos, 3));
    const moteMat = new THREE.PointsMaterial({
      color: look.color,
      size: look.size,
      transparent: true,
      opacity: look.opacity,
      depthWrite: false,
      blending: biome.motes === 'ember' || biome.motes === 'spark' ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const motes = new THREE.Points(moteGeo, moteMat);
    motes.visible = biome.motes !== 'none';
    motes.frustumCulled = false;
    world.add(motes);
    disposables.push(moteGeo, moteMat);

    // ------------------------------------------------------------ post chain
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.09, 0.3, 3.2);
    composer.addPass(bloom);

    // A small grade + vignette + subtle chromatic fringe. Cheap, and it is what
    // makes a render stop looking like a viewport and start looking shot.
    const gradePass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uVignette: { value: 0.85 },
        uSat: { value: 1.06 },
        uLift: { value: new THREE.Color(biome.skyBottom).multiplyScalar(0.02) },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D tDiffuse;
        uniform float uVignette, uSat;
        uniform vec3 uLift;
        varying vec2 vUv;
        void main() {
          vec2 d = vUv - 0.5;
          // chromatic aberration grows toward the corners, like a real lens
          float amt = dot(d, d) * 0.0016;
          vec3 col;
          col.r = texture2D(tDiffuse, vUv + d * amt).r;
          col.g = texture2D(tDiffuse, vUv).g;
          col.b = texture2D(tDiffuse, vUv - d * amt).b;

          float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
          col = mix(vec3(l), col, uSat);
          col += uLift;

          float v = smoothstep(0.92, 0.28, length(d) * 1.35);
          col *= mix(1.0, v, uVignette);
          gl_FragColor = vec4(col, 1.0);
        }`,
    });
    composer.addPass(gradePass);
    composer.addPass(new SMAAPass());
    composer.addPass(new OutputPass());

    // ------------------------------------------------------------------ orbit
    let yaw = -0.55;
    let pitch = 0.46;
    let dist = 30;
    let tYaw = yaw;
    let tPitch = pitch;
    let tDist = 30;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let downX = 0;
    let downY = 0;
    let drift = 0.0009;

    const place = () => {
      camera.position.set(
        Math.sin(yaw) * Math.cos(pitch) * dist,
        Math.sin(pitch) * dist + 2.5,
        Math.cos(yaw) * Math.cos(pitch) * dist,
      );
      camera.lookAt(0, 1.4, 0);
      sun.target.position.set(0, 0, 0);
      sun.target.updateMatrixWorld();
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onDown = (e: PointerEvent) => {
      dragging = true;
      downX = lastX = e.clientX;
      downY = lastY = e.clientY;
      drift = 0;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      if (dragging) {
        tYaw -= (e.clientX - lastX) * 0.0055;
        tPitch = Math.min(1.15, Math.max(0.1, tPitch + (e.clientY - lastY) * 0.0035));
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(markers.map((m) => m.mesh))[0];
      const idx = hit ? (hit.object.userData.index as number) : null;
      if (idx !== hoveredRef.current) setHovered(idx);
      canvas.style.cursor = idx === null ? 'grab' : 'pointer';
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      canvas.style.cursor = 'grab';
      if (Math.hypot(e.clientX - downX, e.clientY - downY) < 5) {
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(markers.map((m) => m.mesh))[0];
        if (hit) nodesRef.current[hit.object.userData.index as number]?.onSelect();
      }
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      tDist = Math.min(46, Math.max(13, tDist + Math.sign(e.deltaY) * 2.0));
    };
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointerleave', () => setHovered(null));
    canvas.addEventListener('wheel', onWheel, { passive: false });

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
      bloom.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      place();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clock = new THREE.Clock();
    let raf = 0;
    let slow = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.01 });
    io.observe(mount);
    setReady(true);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.08);
      const t = clock.getElapsedTime();

      // adaptive resolution: hold the frame budget rather than dropping frames
      if (dt > 0.03) slow++;
      else slow = Math.max(0, slow - 1);
      if (slow > 40 && quality > 0.6) {
        quality -= 0.2;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2) * quality);
        resize();
        slow = 0;
      }

      if (!reduce) {
        tYaw += drift;
        yaw += (tYaw - yaw) * Math.min(1, dt * 7);
        pitch += (tPitch - pitch) * Math.min(1, dt * 7);
        dist += (tDist - dist) * Math.min(1, dt * 5);
        place();

        waterU.uTime.value = t;
        if (grassShader) grassShader.uniforms.uTime.value = t;
        flora.update(t);
        flag.rotation.y = Math.sin(t * 2.4) * 0.35;

        markers.forEach((m, i) => {
          m.mesh.rotation.y = t * 0.7 + i;
          m.mesh.rotation.x = Math.sin(t * 0.5 + i) * 0.16;
          const bob = Math.sin(t * 1.35 + i * 1.2) * 0.16;
          m.mesh.position.y = m.base + bob;
          if (m.glow) m.glow.position.y = m.base + bob;
          const want = hoveredRef.current === i ? 1.3 : 1;
          m.mesh.scale.setScalar(THREE.MathUtils.lerp(m.mesh.scale.x, want, 0.15));
        });

        if (motes.visible) {
          const mp = moteGeo.attributes.position as THREE.BufferAttribute;
          for (let i = 0; i < moteN; i++) {
            const y = mp.getY(i) + look.rise * (0.6 + ((i * 37) % 10) / 14);
            mp.setX(i, mp.getX(i) + Math.sin(t * 0.5 + i) * 0.004);
            mp.setY(i, y > 12 ? 0.5 : y < 0.4 ? 11.8 : y);
          }
          mp.needsUpdate = true;
        }
      }
      composer.render();
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('wheel', onWheel);
      disposables.forEach((d) => d.dispose());
      composer.dispose();
      renderer.dispose();
      if (canvas.parentNode === mount) mount.removeChild(canvas);
    };
  }, [nodes, biome]);

  const hoveredNode = hovered === null ? null : nodes[hovered];

  return (
    <div className={`relative ${className ?? ''}`}>
      <div ref={mountRef} className="h-full w-full" />
      {hoveredNode && (
        <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-2xl bg-black/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
          {hoveredNode.label}
          {hoveredNode.status === 'locked' && ' · locked'}
        </div>
      )}
      {ready && (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-3 text-[11px] font-semibold text-white/80 drop-shadow">
          <span>{biome.name}</span>
          <span aria-hidden="true">·</span>
          <span>drag to look · scroll to zoom · click a gem</span>
        </div>
      )}
    </div>
  );
};

export default Island3D;
