import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { Biome } from '../data/biomes';

// The unit world, rendered properly.
//
// Everything is generated at runtime — no model or texture downloads — but it
// is built the way a real scene is built: a gradient sky dome that also acts as
// the environment map (so metals and the water reflect the actual sky), a
// custom water shader with Gerstner-ish swell and a Fresnel rim, instanced
// grass and flowers that bend in the wind, soft shadows from a warm key light,
// drifting pollen, and camera orbit with proper inertia.
//
// Performance is watched: the renderer starts at the display's pixel ratio and
// steps itself down if the frame budget slips, so a laptop iGPU gets the same
// scene at a lower internal resolution rather than a slideshow.

export interface Island3DNode {
  index: number;
  label: string;
  status: 'completed' | 'unlocked' | 'locked';
  onSelect: () => void;
}

interface Island3DProps {
  nodes: Island3DNode[];
  /** Which world this unit is — colours, foliage, weather, sky. */
  biome: Biome;
  className?: string;
}

const NODE_XZ: [number, number][] = [
  [-3.4, 1.9],
  [-1.0, 0.6],
  [1.4, -0.5],
  [3.6, -1.7],
];
const STATUS_COLOR = { completed: 0x58cc02, unlocked: 0x1cb0f6, locked: 0x8a90a3 } as const;

/** Deterministic pseudo-random, so the island looks identical every visit. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const Island3D: React.FC<Island3DProps> = ({ nodes, biome, className }) => {
  const palette = biome;
  const mountRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const hoveredRef = useRef<number | null>(null);
  hoveredRef.current = hovered;
  const nodesRef = useRef(nodes);
  nodesRef.current = nodes;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    } catch {
      return; // no WebGL — the CSS island stays on screen
    }
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    const canvas = renderer.domElement;
    canvas.style.cssText = 'width:100%;height:100%;display:block;touch-action:none;cursor:grab';
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);

    // ---------------------------------------------------------------- sky dome
    // Painted in a shader and reused as the environment map, so every PBR
    // surface below picks up the same light that is drawn behind it.
    const skyUniforms = {
      uTop: { value: new THREE.Color(biome.skyTop) },
      uMid: { value: new THREE.Color(biome.skyMid) },
      uBottom: { value: new THREE.Color(biome.skyBottom) },
      uSunDir: { value: new THREE.Vector3(0.5, 0.62, 0.42).normalize() },
    };
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(90, 48, 32),
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: skyUniforms,
        vertexShader: `
          varying vec3 vDir;
          void main() {
            vDir = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          uniform vec3 uTop, uMid, uBottom, uSunDir;
          varying vec3 vDir;
          void main() {
            float h = clamp(vDir.y * 0.5 + 0.5, 0.0, 1.0);
            vec3 col = mix(uBottom, uMid, smoothstep(0.28, 0.55, h));
            col = mix(col, uTop, smoothstep(0.55, 0.95, h));
            // sun bloom, cheap and stable
            float d = max(dot(normalize(vDir), normalize(uSunDir)), 0.0);
            col += vec3(1.0, 0.86, 0.62) * pow(d, 220.0) * 2.2;
            col += vec3(1.0, 0.82, 0.55) * pow(d, 12.0) * 0.16;
            gl_FragColor = vec4(col, 1.0);
          }`,
      }),
    );
    scene.add(sky);

    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envScene = new THREE.Scene();
    envScene.add(sky.clone());
    const envRT = pmrem.fromScene(envScene, 0.04);
    scene.environment = envRT.texture;
    scene.fog = new THREE.FogExp2(biome.fog, 0.012);

    // ---------------------------------------------------------------- lighting
    scene.add(new THREE.HemisphereLight(0xdff1ff, 0x3f6b34, 0.55));
    const sun = new THREE.DirectionalLight(biome.sunColor, biome.sunIntensity);
    sun.position.set(9, 13, 7);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 2;
    sun.shadow.camera.far = 48;
    sun.shadow.camera.left = -11;
    sun.shadow.camera.right = 11;
    sun.shadow.camera.top = 11;
    sun.shadow.camera.bottom = -11;
    sun.shadow.bias = -0.0006;
    sun.shadow.normalBias = 0.02;
    sun.shadow.radius = 2.5;
    scene.add(sun);
    const bounce = new THREE.DirectionalLight(0x86c6ff, 0.45);
    bounce.position.set(-8, 3, -8);
    scene.add(bounce);

    const world = new THREE.Group();
    scene.add(world);

    // ------------------------------------------------------------------ water
    const waterUniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(palette.water) },
      uDeep: { value: new THREE.Color(palette.water).multiplyScalar(0.35) },
      uEnv: { value: envRT.texture },
    };
    const water = new THREE.Mesh(
      new THREE.CircleGeometry(46, 160),
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: waterUniforms,
        vertexShader: `
          uniform float uTime;
          varying vec3 vWorld;
          varying vec3 vNormalW;
          // three overlapping swells so the surface never looks like one sine
          float wave(vec2 p, vec2 dir, float freq, float speed, float amp) {
            return sin(dot(p, dir) * freq + uTime * speed) * amp;
          }
          void main() {
            vec3 pos = position;
            vec2 p = pos.xy;
            float h = wave(p, normalize(vec2(1.0, 0.4)), 0.55, 1.1, 0.10)
                    + wave(p, normalize(vec2(-0.6, 1.0)), 0.9, 1.6, 0.05)
                    + wave(p, normalize(vec2(0.2, -1.0)), 1.7, 2.3, 0.02);
            pos.z += h;
            // finite-difference normal, cheaper than analytic here
            float e = 0.35;
            float hx = wave(p + vec2(e, 0.0), normalize(vec2(1.0, 0.4)), 0.55, 1.1, 0.10)
                     + wave(p + vec2(e, 0.0), normalize(vec2(-0.6, 1.0)), 0.9, 1.6, 0.05);
            float hy = wave(p + vec2(0.0, e), normalize(vec2(1.0, 0.4)), 0.55, 1.1, 0.10)
                     + wave(p + vec2(0.0, e), normalize(vec2(-0.6, 1.0)), 0.9, 1.6, 0.05);
            vec3 n = normalize(vec3(-(hx - h) / e, -(hy - h) / e, 1.0));
            vNormalW = normalize(mat3(modelMatrix) * n);
            vec4 wp = modelMatrix * vec4(pos, 1.0);
            vWorld = wp.xyz;
            gl_Position = projectionMatrix * viewMatrix * wp;
          }`,
        fragmentShader: `
          uniform vec3 uColor, uDeep;
          varying vec3 vWorld;
          varying vec3 vNormalW;
          void main() {
            vec3 viewDir = normalize(cameraPosition - vWorld);
            float fres = pow(1.0 - max(dot(viewDir, normalize(vNormalW)), 0.0), 3.0);
            // depth fade so the shore reads shallow and the horizon deep
            float dist = length(vWorld.xz);
            float shallow = smoothstep(4.0, 12.0, dist);
            vec3 col = mix(uColor, uDeep, shallow);
            col += vec3(0.75, 0.88, 1.0) * fres * 0.65;
            // specular glint off the key light
            vec3 h = normalize(viewDir + normalize(vec3(9.0, 13.0, 7.0)));
            col += vec3(1.0, 0.95, 0.85) * pow(max(dot(normalize(vNormalW), h), 0.0), 90.0) * 0.9;
            gl_FragColor = vec4(col, 0.82 + fres * 0.18);
          }`,
      }),
    );
    water.rotation.x = -Math.PI / 2;
    water.position.y = -1.25;
    world.add(water);

    // ----------------------------------------------------------------- island
    const profile: THREE.Vector2[] = [];
    for (let i = 0; i <= 22; i++) {
      const t = i / 22;
      const y = 0.92 - t * 4.2;
      // gentle bulge under the waterline, tapering to a point
      const r = t < 0.1 ? 5.6 : 5.6 * Math.pow(Math.max(0, 1 - (t - 0.1) / 0.94), 0.62);
      profile.push(new THREE.Vector2(Math.max(0.04, r), y));
    }
    const islandGeo = new THREE.LatheGeometry(profile, 96);
    // roughen the rock so it is not a perfect solid of revolution
    {
      const pos = islandGeo.attributes.position as THREE.BufferAttribute;
      const rand = rng(9137);
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        if (y > 0.6) continue;
        const n = (rand() - 0.5) * 0.28 * (1 - Math.abs(y) / 5);
        pos.setX(i, pos.getX(i) * (1 + n));
        pos.setZ(i, pos.getZ(i) * (1 + n));
      }
      islandGeo.computeVertexNormals();
    }
    const island = new THREE.Mesh(
      islandGeo,
      new THREE.MeshStandardMaterial({ color: palette.soil, roughness: 0.98, metalness: 0, flatShading: true }),
    );
    island.castShadow = true;
    island.receiveShadow = true;
    world.add(island);

    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(5.64, 5.52, 0.6, 96),
      new THREE.MeshStandardMaterial({ color: palette.grass, roughness: 0.92, metalness: 0 }),
    );
    cap.position.y = 0.86;
    cap.castShadow = true;
    cap.receiveShadow = true;
    world.add(cap);

    // ------------------------------------------------------------------- path
    const curve = new THREE.CatmullRomCurve3(
      NODE_XZ.map(([x, z]) => new THREE.Vector3(x, 1.17, z)),
      false,
      'catmullrom',
      0.35,
    );
    const stoneMat = new THREE.MeshStandardMaterial({ color: biome.path, roughness: 1 });
    const stoneGeo = new THREE.BoxGeometry(0.78, 0.1, 0.56);
    const stones = new THREE.InstancedMesh(stoneGeo, stoneMat, 74);
    stones.receiveShadow = true;
    stones.castShadow = true;
    {
      const m = new THREE.Matrix4();
      const q = new THREE.Quaternion();
      const rand = rng(4242);
      for (let i = 0; i < 74; i++) {
        const t = i / 73;
        const p = curve.getPoint(t);
        const tan = curve.getTangent(t);
        q.setFromEuler(new THREE.Euler(0, Math.atan2(tan.x, tan.z) + (rand() - 0.5) * 0.25, 0));
        m.compose(
          new THREE.Vector3(p.x + (rand() - 0.5) * 0.12, p.y, p.z + (rand() - 0.5) * 0.12),
          q,
          new THREE.Vector3(1, 1, 0.9 + rand() * 0.25),
        );
        stones.setMatrixAt(i, m);
      }
    }
    world.add(stones);

    // ------------------------------------------------------- grass and flowers
    // Instanced blades with a wind shader — thousands of them cost one draw call.
    const bladeGeo = new THREE.PlaneGeometry(0.11, 0.42, 1, 3);
    bladeGeo.translate(0, 0.21, 0);
    const GRASS = Math.round(2600 * biome.grassDensity);
    const grassMat = new THREE.MeshStandardMaterial({
      color: palette.grassDark,
      roughness: 1,
      side: THREE.DoubleSide,
      alphaTest: 0.2,
    });
    grassMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      (grassMat as unknown as { userData: { shader?: THREE.WebGLProgramParametersWithUniforms } }).userData.shader =
        shader;
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nuniform float uTime;')
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
           float sway = sin(uTime * 1.7 + instanceMatrix[3][0] * 0.7 + instanceMatrix[3][2] * 0.5);
           transformed.x += sway * position.y * 0.28;
           transformed.z += cos(uTime * 1.3 + instanceMatrix[3][0]) * position.y * 0.16;`,
        );
    };
    const grass = new THREE.InstancedMesh(bladeGeo, grassMat, GRASS);
    grass.castShadow = false;
    grass.receiveShadow = true;
    if (GRASS > 0) {
      const m = new THREE.Matrix4();
      const q = new THREE.Quaternion();
      const rand = rng(777);
      let placed = 0;
      while (placed < GRASS) {
        const a = rand() * Math.PI * 2;
        const r = Math.sqrt(rand()) * 5.35;
        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r;
        // keep the trail clear
        let onPath = false;
        for (let t = 0; t <= 1.001; t += 0.05) {
          const p = curve.getPoint(t);
          if ((p.x - x) ** 2 + (p.z - z) ** 2 < 0.42) {
            onPath = true;
            break;
          }
        }
        if (onPath) continue;
        q.setFromEuler(new THREE.Euler(0, rand() * Math.PI, (rand() - 0.5) * 0.25));
        m.compose(new THREE.Vector3(x, 1.14, z), q, new THREE.Vector3(1, 0.75 + rand() * 0.7, 1));
        grass.setMatrixAt(placed++, m);
      }
    }
    world.add(grass);

    // flowers: same trick, a few bright dots for life
    const flowerGeo = new THREE.CircleGeometry(0.07, 6);
    const flowers = new THREE.InstancedMesh(
      flowerGeo,
      new THREE.MeshStandardMaterial({ color: 0xfff0a8, roughness: 0.8, side: THREE.DoubleSide }),
      160,
    );
    {
      const m = new THREE.Matrix4();
      const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
      const rand = rng(3131);
      for (let i = 0; i < 160; i++) {
        const a = rand() * Math.PI * 2;
        const r = Math.sqrt(rand()) * 5.2;
        m.compose(new THREE.Vector3(Math.cos(a) * r, 1.18, Math.sin(a) * r), q, new THREE.Vector3(1, 1, 1));
        flowers.setMatrixAt(i, m);
      }
    }
    world.add(flowers);

    // --------------------------------------------------------------- foliage
    // Each biome grows something different: pines, palms, crystal shards,
    // burnt trunks, mushrooms or cacti. Same instancing cost either way.
    const trunkMat = new THREE.MeshStandardMaterial({ color: palette.soilDark, roughness: 1 });
    const leafMat = new THREE.MeshStandardMaterial({
      color: palette.grassDark,
      roughness: biome.foliage === 'crystal' ? 0.12 : 0.85,
      metalness: biome.foliage === 'crystal' ? 0.25 : 0,
      flatShading: true,
      transparent: biome.foliage === 'crystal',
      opacity: biome.foliage === 'crystal' ? 0.82 : 1,
    });
    const capMat = new THREE.MeshStandardMaterial({ color: palette.accent, roughness: 0.7 });
    const treeSpots: [number, number][] = [
      [-4.4, -1.2], [-2.7, 3.0], [-0.5, -2.6], [1.2, 2.8], [3.0, 1.5],
      [4.4, -0.3], [-4.0, 0.3], [0.7, 3.3], [-1.9, -1.5], [2.2, -2.6], [-3.2, -2.7],
    ];
    const trees: THREE.Group[] = [];
    const rand = rng(5150);

    const buildPlant = (): THREE.Group => {
      const g = new THREE.Group();
      switch (biome.foliage) {
        case 'palm': {
          const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.12, 1.9, 7), trunkMat);
          trunk.position.y = 2.05;
          trunk.rotation.z = (rand() - 0.5) * 0.22;
          trunk.castShadow = true;
          g.add(trunk);
          for (let f = 0; f < 6; f++) {
            const frond = new THREE.Mesh(new THREE.ConeGeometry(0.24, 1.5, 4), leafMat);
            frond.position.y = 3.0;
            frond.rotation.set(Math.PI / 2.6, (f / 6) * Math.PI * 2, 0);
            frond.castShadow = true;
            g.add(frond);
          }
          break;
        }
        case 'crystal': {
          for (let c = 0; c < 3; c++) {
            const shard = new THREE.Mesh(new THREE.ConeGeometry(0.2 + rand() * 0.14, 1.1 + rand() * 1.5, 5), leafMat);
            shard.position.set((rand() - 0.5) * 0.5, 1.7 + rand() * 0.5, (rand() - 0.5) * 0.5);
            shard.rotation.z = (rand() - 0.5) * 0.4;
            shard.castShadow = true;
            g.add(shard);
          }
          break;
        }
        case 'dead': {
          const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.16, 2.0, 6), trunkMat);
          trunk.position.y = 2.1;
          trunk.castShadow = true;
          g.add(trunk);
          for (let b = 0; b < 3; b++) {
            const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.06, 0.9, 5), trunkMat);
            branch.position.set((rand() - 0.5) * 0.5, 2.5 + b * 0.35, (rand() - 0.5) * 0.5);
            branch.rotation.set((rand() - 0.5) * 1.2, 0, (rand() - 0.5) * 1.2);
            branch.castShadow = true;
            g.add(branch);
          }
          break;
        }
        case 'mushroom': {
          const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 1.0, 8), trunkMat);
          stalk.position.y = 1.6;
          stalk.castShadow = true;
          const cap = new THREE.Mesh(new THREE.SphereGeometry(0.6, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), capMat);
          cap.position.y = 2.1;
          cap.castShadow = true;
          g.add(stalk, cap);
          break;
        }
        case 'cactus': {
          const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 1.2, 4, 10), leafMat);
          body.position.y = 1.95;
          body.castShadow = true;
          g.add(body);
          for (let a = 0; a < 2; a++) {
            const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.5, 4, 8), leafMat);
            arm.position.set(a === 0 ? -0.3 : 0.3, 2.1 + rand() * 0.3, 0);
            arm.rotation.z = a === 0 ? 0.6 : -0.6;
            arm.castShadow = true;
            g.add(arm);
          }
          break;
        }
        default: {
          const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 0.75, 7), trunkMat);
          trunk.position.y = 1.5;
          trunk.castShadow = true;
          g.add(trunk);
          for (let c = 0; c < 3; c++) {
            const leaf = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 0), leafMat);
            leaf.position.set((rand() - 0.5) * 0.5, 2.2 + c * 0.32 + rand() * 0.1, (rand() - 0.5) * 0.5);
            leaf.scale.setScalar(1 - c * 0.2 + rand() * 0.12);
            leaf.castShadow = true;
            g.add(leaf);
          }
        }
      }
      return g;
    };

    treeSpots.forEach(([x, z]) => {
      const g = buildPlant();
      g.position.set(x, 0, z);
      g.scale.setScalar(0.82 + rand() * 0.4);
      g.rotation.y = rand() * Math.PI;
      trees.push(g);
      world.add(g);
    });

    // ----------------------------------------------------------------- castle
    const castleStone = new THREE.MeshStandardMaterial({ color: 0xece6d9, roughness: 0.85, metalness: 0.05 });
    const roofMat = new THREE.MeshStandardMaterial({ color: palette.accent, roughness: 0.55, metalness: 0.2 });
    const castle = new THREE.Group();
    const keep = new THREE.Mesh(new THREE.BoxGeometry(1.55, 1.4, 1.55), castleStone);
    keep.position.y = 1.9;
    keep.castShadow = true;
    keep.receiveShadow = true;
    castle.add(keep);
    [[-0.78, -0.78], [0.78, -0.78], [-0.78, 0.78], [0.78, 0.78]].forEach(([tx, tz]) => {
      const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.38, 2.2, 14), castleStone);
      tower.position.set(tx, 2.2, tz);
      tower.castShadow = true;
      const roof = new THREE.Mesh(new THREE.ConeGeometry(0.46, 0.68, 14), roofMat);
      roof.position.set(tx, 3.6, tz);
      roof.castShadow = true;
      castle.add(tower, roof);
    });
    const flagPole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.1, 6), castleStone);
    flagPole.position.set(0, 3.2, 0);
    const flag = new THREE.Mesh(
      new THREE.PlaneGeometry(0.6, 0.36, 8, 1),
      new THREE.MeshStandardMaterial({ color: palette.accent, side: THREE.DoubleSide, roughness: 0.7 }),
    );
    flag.position.set(0.3, 3.55, 0);
    castle.add(flagPole, flag);
    castle.position.set(NODE_XZ[3][0], 0, NODE_XZ[3][1]);
    world.add(castle);

    // --------------------------------------------------------- floating rocks
    const rockMat = new THREE.MeshStandardMaterial({ color: palette.soil, roughness: 1, flatShading: true });
    const rocks: THREE.Mesh[] = [];
    ([[-7.6, -0.6, 2.6], [7.2, -1.4, -2.8], [-5.8, -2.4, -4.6], [6.2, 0.4, 3.6]] as [number, number, number][]).forEach(
      ([x, y, z], i) => {
        const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.5 + i * 0.14, 0), rockMat);
        rock.position.set(x, y, z);
        rock.castShadow = true;
        rocks.push(rock);
        world.add(rock);
      },
    );

    // ---------------------------------------------------------------- pollen
    const moteCount = 220;
    const motePos = new Float32Array(moteCount * 3);
    {
      const r2 = rng(8080);
      for (let i = 0; i < moteCount; i++) {
        const a = r2() * Math.PI * 2;
        const rr = Math.sqrt(r2()) * 6.5;
        motePos[i * 3] = Math.cos(a) * rr;
        motePos[i * 3 + 1] = 1.2 + r2() * 3.4;
        motePos[i * 3 + 2] = Math.sin(a) * rr;
      }
    }
    const moteGeo = new THREE.BufferGeometry();
    moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));
    const MOTE_LOOK: Record<string, { color: number; size: number; opacity: number; fall: number }> = {
      pollen: { color: 0xfff3c4, size: 0.075, opacity: 0.75, fall: 0.0016 },
      snow: { color: 0xffffff, size: 0.11, opacity: 0.9, fall: -0.006 },
      ember: { color: 0xff8a3c, size: 0.09, opacity: 0.95, fall: 0.006 },
      spark: { color: 0xd9c0ff, size: 0.085, opacity: 0.9, fall: 0.0022 },
      bubble: { color: 0xcdfff0, size: 0.1, opacity: 0.6, fall: 0.004 },
      none: { color: 0xffffff, size: 0.05, opacity: 0, fall: 0 },
    };
    const moteLook = MOTE_LOOK[biome.motes] ?? MOTE_LOOK.pollen;
    const motes = new THREE.Points(
      moteGeo,
      new THREE.PointsMaterial({
        color: moteLook.color,
        size: moteLook.size,
        transparent: true,
        opacity: moteLook.opacity,
        depthWrite: false,
      }),
    );
    motes.visible = biome.motes !== 'none';
    world.add(motes);

    // ------------------------------------------------------------ level gems
    const markers: { mesh: THREE.Mesh; halo: THREE.Mesh; base: number }[] = [];
    nodes.forEach((node, i) => {
      const [x, z] = NODE_XZ[i] ?? [0, 0];
      const color = STATUS_COLOR[node.status];
      const gem = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.5, 0),
        new THREE.MeshPhysicalMaterial({
          color,
          roughness: 0.08,
          metalness: 0.1,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
          transmission: node.status === 'locked' ? 0 : 0.35,
          thickness: 0.8,
          ior: 1.6,
          emissive: node.status === 'unlocked' ? color : 0x000000,
          emissiveIntensity: node.status === 'unlocked' ? 0.7 : 0,
        }),
      );
      const baseY = i === 3 ? 4.15 : 2.05;
      gem.position.set(x, baseY, z);
      gem.castShadow = true;
      gem.userData.index = i;
      world.add(gem);

      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.62, 0.78, 48),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: node.status === 'unlocked' ? 0.55 : 0.22, side: THREE.DoubleSide }),
      );
      halo.rotation.x = -Math.PI / 2;
      halo.position.set(x, 1.2, z);
      world.add(halo);

      markers.push({ mesh: gem, halo, base: baseY });
    });

    // ------------------------------------------------------------------ orbit
    let yaw = -0.5;
    let pitch = 0.66;
    let dist = 16;
    let targetYaw = yaw;
    let targetPitch = pitch;
    let targetDist = dist;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let downX = 0;
    let downY = 0;
    let idleDrift = 0.0012;

    const place = () => {
      camera.position.set(
        Math.sin(yaw) * Math.cos(pitch) * dist,
        Math.sin(pitch) * dist + 0.6,
        Math.cos(yaw) * Math.cos(pitch) * dist,
      );
      camera.lookAt(0, 0.9, 0);
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const onDown = (e: PointerEvent) => {
      dragging = true;
      downX = lastX = e.clientX;
      downY = lastY = e.clientY;
      idleDrift = 0;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (dragging) {
        targetYaw -= (e.clientX - lastX) * 0.0062;
        targetPitch = Math.min(1.2, Math.max(0.16, targetPitch + (e.clientY - lastY) * 0.004));
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
      targetDist = Math.min(24, Math.max(8.5, targetDist + Math.sign(e.deltaY) * 1.1));
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
    let slowFrames = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.01 });
    io.observe(mount);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.1);
      const t = clock.getElapsedTime();

      // budget guard: if frames are consistently long, drop internal resolution
      if (dt > 0.028) slowFrames++;
      else slowFrames = Math.max(0, slowFrames - 1);
      if (slowFrames > 45 && pixelRatio > 1) {
        pixelRatio = Math.max(1, pixelRatio - 0.5);
        renderer.setPixelRatio(pixelRatio);
        slowFrames = 0;
      }

      if (!reduce) {
        targetYaw += idleDrift;
        // inertia: ease toward the target instead of snapping
        yaw += (targetYaw - yaw) * Math.min(1, dt * 8);
        pitch += (targetPitch - pitch) * Math.min(1, dt * 8);
        dist += (targetDist - dist) * Math.min(1, dt * 6);
        place();

        waterUniforms.uTime.value = t;
        const gs = (grassMat as unknown as { userData: { shader?: THREE.WebGLProgramParametersWithUniforms } }).userData
          .shader;
        if (gs) gs.uniforms.uTime.value = t;

        markers.forEach((m, i) => {
          m.mesh.rotation.y = t * 0.85 + i;
          m.mesh.position.y = m.base + Math.sin(t * 1.5 + i * 1.3) * 0.13;
          const want = hoveredRef.current === i ? 1.28 : 1;
          m.mesh.scale.setScalar(THREE.MathUtils.lerp(m.mesh.scale.x, want, 0.16));
          m.halo.scale.setScalar(1 + Math.sin(t * 2.2 + i) * 0.07);
        });
        trees.forEach((tr, i) => {
          tr.rotation.z = Math.sin(t * 1.1 + i) * 0.022;
        });
        rocks.forEach((r, i) => {
          r.position.y += Math.sin(t * 1.1 + i * 2) * 0.0018;
          r.rotation.y = t * 0.16 + i;
        });
        flag.rotation.y = Math.sin(t * 2.2) * 0.3;
        if (motes.visible) {
          const mp = moteGeo.attributes.position as THREE.BufferAttribute;
          for (let i = 0; i < moteCount; i++) {
            // snow drifts down, embers and bubbles rise
            mp.setY(i, mp.getY(i) + Math.sin(t * 0.7 + i) * 0.0016 + moteLook.fall);
            if (mp.getY(i) > 5.2) mp.setY(i, 1.1);
            if (mp.getY(i) < 1.0) mp.setY(i, 5.1);
          }
          mp.needsUpdate = true;
        }
      }
      renderer.render(scene, camera);
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
      envRT.dispose();
      pmrem.dispose();
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        mesh.geometry?.dispose?.();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
      renderer.dispose();
      if (canvas.parentNode === mount) mount.removeChild(canvas);
    };
  }, [nodes, biome, palette]);

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
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-white/75 drop-shadow">
        Drag to look around · scroll to zoom · click a gem to play
      </p>
    </div>
  );
};

export default Island3D;
