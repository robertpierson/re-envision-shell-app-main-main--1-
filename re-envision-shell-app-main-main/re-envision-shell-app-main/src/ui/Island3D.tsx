import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// The unit world in real 3D. Everything here is built from geometry at runtime —
// no model files to download — with a warm key light, soft shadows and a gentle
// orbit you can drag. Lazy-loaded, so the ~600 KB of three.js never touches the
// first paint of the app.

export interface Island3DNode {
  /** 0-3: the three lessons, then the castle. */
  index: number;
  label: string;
  status: 'completed' | 'unlocked' | 'locked';
  onSelect: () => void;
}

interface Island3DProps {
  nodes: Island3DNode[];
  /** Course palette, so each course's island reads differently. */
  palette: { grass: number; grassDark: number; soil: number; soilDark: number; water: number; accent: number };
  className?: string;
}

const NODE_XZ: [number, number][] = [
  [-3.4, 1.9],
  [-1.0, 0.6],
  [1.4, -0.5],
  [3.6, -1.7],
];

const STATUS_COLOR = { completed: 0x58cc02, unlocked: 0x1cb0f6, locked: 0x8a90a3 } as const;

const Island3D: React.FC<Island3DProps> = ({ nodes, palette, className }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  // keep the latest callbacks without rebuilding the scene
  const nodesRef = useRef(nodes);
  nodesRef.current = nodes;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.style.cursor = 'grab';

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xbfe6ff, 18, 40);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

    // ---- lighting: warm key with soft shadows, cool sky fill, subtle rim
    const sky = new THREE.HemisphereLight(0xdff1ff, 0x4a7a3a, 0.85);
    scene.add(sky);
    const sun = new THREE.DirectionalLight(0xfff2d0, 2.1);
    sun.position.set(7, 11, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 40;
    sun.shadow.camera.left = -12;
    sun.shadow.camera.right = 12;
    sun.shadow.camera.top = 12;
    sun.shadow.camera.bottom = -12;
    sun.shadow.bias = -0.0008;
    sun.shadow.radius = 3;
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x9fd8ff, 0.5);
    rim.position.set(-8, 4, -7);
    scene.add(rim);

    const world = new THREE.Group();
    scene.add(world);

    // ---- water: a big soft disc that ripples
    const waterGeo = new THREE.CircleGeometry(16, 96);
    const waterMat = new THREE.MeshStandardMaterial({
      color: palette.water,
      transparent: true,
      opacity: 0.55,
      roughness: 0.25,
      metalness: 0.1,
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = -1.15;
    water.receiveShadow = true;
    world.add(water);

    // ---- the island: a lathed blob so the underside tapers like a floating rock
    const profile: THREE.Vector2[] = [];
    for (let i = 0; i <= 14; i++) {
      const t = i / 14;
      // radius shrinks as we go down, with a lip at the grass line
      const y = 0.9 - t * 3.4;
      const r = t < 0.12 ? 5.6 : 5.6 * Math.pow(1 - (t - 0.12) / 0.95, 0.55);
      profile.push(new THREE.Vector2(Math.max(0.05, r), y));
    }
    const islandGeo = new THREE.LatheGeometry(profile, 72);
    const soilMat = new THREE.MeshStandardMaterial({ color: palette.soil, roughness: 0.95, flatShading: true });
    const island = new THREE.Mesh(islandGeo, soilMat);
    island.castShadow = true;
    island.receiveShadow = true;
    world.add(island);

    // grass cap sitting on top, very slightly larger so it reads as a rim
    const capGeo = new THREE.CylinderGeometry(5.62, 5.5, 0.55, 72);
    const grassMat = new THREE.MeshStandardMaterial({ color: palette.grass, roughness: 0.85 });
    const cap = new THREE.Mesh(capGeo, grassMat);
    cap.position.y = 0.85;
    cap.castShadow = true;
    cap.receiveShadow = true;
    world.add(cap);

    // ---- winding path: flat boxes stepped along a curve between the nodes
    const curve = new THREE.CatmullRomCurve3(
      NODE_XZ.map(([x, z]) => new THREE.Vector3(x, 1.14, z)),
      false,
      'catmullrom',
      0.4,
    );
    const pathMat = new THREE.MeshStandardMaterial({ color: 0xf3e2b8, roughness: 1 });
    const stoneGeo = new THREE.BoxGeometry(0.72, 0.09, 0.5);
    for (let i = 0; i <= 60; i++) {
      const p = curve.getPoint(i / 60);
      const tan = curve.getTangent(i / 60);
      const stone = new THREE.Mesh(stoneGeo, pathMat);
      stone.position.copy(p);
      stone.rotation.y = Math.atan2(tan.x, tan.z);
      stone.receiveShadow = true;
      world.add(stone);
    }

    // ---- trees
    const trunkMat = new THREE.MeshStandardMaterial({ color: palette.soilDark, roughness: 1 });
    const leafMat = new THREE.MeshStandardMaterial({ color: palette.grassDark, roughness: 0.9, flatShading: true });
    const trunkGeo = new THREE.CylinderGeometry(0.09, 0.13, 0.6, 6);
    const leafGeo = new THREE.ConeGeometry(0.62, 1.5, 7);
    const treeSpots: [number, number][] = [
      [-4.3, -1.1], [-2.6, 2.9], [-0.4, -2.4], [1.1, 2.6],
      [2.9, 1.4], [4.3, -0.2], [-3.9, 0.2], [0.6, 3.2], [-1.8, -1.4],
    ];
    treeSpots.forEach(([x, z], i) => {
      const g = new THREE.Group();
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 1.4;
      trunk.castShadow = true;
      const leaves = new THREE.Mesh(leafGeo, leafMat);
      leaves.position.y = 2.35;
      leaves.castShadow = true;
      const top = new THREE.Mesh(leafGeo, leafMat);
      top.scale.setScalar(0.7);
      top.position.y = 2.95;
      top.castShadow = true;
      g.add(trunk, leaves, top);
      g.position.set(x, 0, z);
      g.scale.setScalar(0.85 + ((i * 37) % 30) / 100);
      world.add(g);
    });

    // ---- castle at the last node
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xe9e3d6, roughness: 0.9 });
    const roofMat = new THREE.MeshStandardMaterial({ color: palette.accent, roughness: 0.7 });
    const castle = new THREE.Group();
    const keep = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.35, 1.5), stoneMat);
    keep.position.y = 1.8;
    keep.castShadow = true;
    castle.add(keep);
    [[-0.75, -0.75], [0.75, -0.75], [-0.75, 0.75], [0.75, 0.75]].forEach(([tx, tz]) => {
      const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 2.0, 12), stoneMat);
      tower.position.set(tx, 2.1, tz);
      tower.castShadow = true;
      const roof = new THREE.Mesh(new THREE.ConeGeometry(0.44, 0.6, 12), roofMat);
      roof.position.set(tx, 3.4, tz);
      roof.castShadow = true;
      castle.add(tower, roof);
    });
    castle.position.set(NODE_XZ[3][0], 0, NODE_XZ[3][1]);
    world.add(castle);

    // ---- floating rocks, for depth around the island
    const rockMat = new THREE.MeshStandardMaterial({ color: palette.soil, roughness: 1, flatShading: true });
    const rocks: THREE.Mesh[] = [];
    [[-7.2, -0.4, 2.4], [6.8, -1.2, -2.6], [-5.6, -2.1, -4.2]].forEach(([x, y, z], i) => {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.55 + i * 0.12, 0), rockMat);
      rock.position.set(x, y, z);
      rock.castShadow = true;
      rocks.push(rock);
      world.add(rock);
    });

    // ---- level markers: floating gems that spin, coloured by status
    const markers: { mesh: THREE.Mesh; ring: THREE.Mesh; index: number; base: number }[] = [];
    nodes.forEach((node, i) => {
      const [x, z] = NODE_XZ[i] ?? [0, 0];
      const color = STATUS_COLOR[node.status];
      const gem = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.46, 0),
        new THREE.MeshStandardMaterial({
          color,
          roughness: 0.25,
          metalness: 0.35,
          emissive: node.status === 'unlocked' ? color : 0x000000,
          emissiveIntensity: node.status === 'unlocked' ? 0.55 : 0,
        }),
      );
      const baseY = i === 3 ? 3.9 : 2.0;
      gem.position.set(x, baseY, z);
      gem.castShadow = true;
      gem.userData.index = i;
      world.add(gem);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.62, 0.05, 10, 40),
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.5, roughness: 0.4 }),
      );
      ring.position.set(x, baseY - 0.55, z);
      ring.rotation.x = -Math.PI / 2;
      world.add(ring);

      markers.push({ mesh: gem, ring, index: i, base: baseY });
    });

    // ---- camera orbit, dragged by pointer
    let yaw = -0.5;
    let pitch = 0.72;
    let dist = 15.5;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velocity = 0.0016; // gentle idle drift

    const placeCamera = () => {
      camera.position.set(
        Math.sin(yaw) * Math.cos(pitch) * dist,
        Math.sin(pitch) * dist,
        Math.cos(yaw) * Math.cos(pitch) * dist,
      );
      camera.lookAt(0, 0.6, 0);
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let downX = 0;
    let downY = 0;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      downX = lastX = e.clientX;
      downY = lastY = e.clientY;
      renderer.domElement.setPointerCapture(e.pointerId);
      renderer.domElement.style.cursor = 'grabbing';
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (dragging) {
        yaw -= (e.clientX - lastX) * 0.006;
        pitch = Math.min(1.25, Math.max(0.22, pitch + (e.clientY - lastY) * 0.004));
        lastX = e.clientX;
        lastY = e.clientY;
        velocity = 0;
        placeCamera();
        return;
      }
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(markers.map((m) => m.mesh))[0];
      const idx = hit ? (hit.object.userData.index as number) : null;
      setHovered(idx);
      renderer.domElement.style.cursor = idx === null ? 'grab' : 'pointer';
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      renderer.domElement.style.cursor = 'grab';
      // a click, not a drag: fire the marker under the cursor
      if (Math.hypot(e.clientX - downX, e.clientY - downY) < 5) {
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(markers.map((m) => m.mesh))[0];
        if (hit) {
          const i = hit.object.userData.index as number;
          nodesRef.current[i]?.onSelect();
        }
      }
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      dist = Math.min(22, Math.max(9, dist + Math.sign(e.deltaY) * 0.9));
      placeCamera();
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointerleave', () => setHovered(null));
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      placeCamera();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      const t = clock.getElapsedTime();
      if (!reduce) {
        if (!dragging && velocity) {
          yaw += velocity;
          placeCamera();
        }
        markers.forEach((m, i) => {
          m.mesh.rotation.y = t * 0.9 + i;
          m.mesh.position.y = m.base + Math.sin(t * 1.6 + i * 1.3) * 0.12;
          const isHover = hoveredRef.current === i;
          const scale = isHover ? 1.25 : 1;
          m.mesh.scale.setScalar(THREE.MathUtils.lerp(m.mesh.scale.x, scale, 0.15));
          m.ring.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.06);
        });
        rocks.forEach((r, i) => {
          r.position.y += Math.sin(t * 1.1 + i * 2) * 0.0016;
          r.rotation.y = t * 0.18 + i;
        });
        water.rotation.z = t * 0.03;
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('wheel', onWheel);
      renderer.dispose();
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
      mount.removeChild(renderer.domElement);
    };
    // The scene is rebuilt when the level states change, which is rare.
  }, [nodes, palette]);

  // hovered read inside the animation loop without re-running the effect
  const hoveredRef = useRef<number | null>(null);
  hoveredRef.current = hovered;

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
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-white/70">
        Drag to look around · scroll to zoom · click a gem to play
      </p>
    </div>
  );
};

export default Island3D;
