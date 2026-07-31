import * as THREE from 'three';
import { makeRng } from './noise';

// Canopies made of alpha-cut leaf cards, not solid blobs.
//
// This is the single biggest step away from a "low-poly toy" look: real foliage
// reads as thousands of small overlapping shapes with light leaking between
// them, so silhouettes break up and the canopy gets depth. A blob of geometry
// never does that no matter how you shade it.

/** A cluster of leaves drawn into a canvas, used as colour + alpha. */
export function leafClusterTexture(base: number, seed: number, size = 256): { map: THREE.CanvasTexture; alpha: THREE.CanvasTexture } {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  const a = document.createElement('canvas');
  a.width = a.height = size;
  const actx = a.getContext('2d')!;
  actx.fillStyle = '#000';
  actx.fillRect(0, 0, size, size);

  const rand = makeRng(seed);
  const col = new THREE.Color(base);

  const leaf = (x: number, y: number, r: number, rot: number, shade: number) => {
    // a simple pointed-oval leaf, drawn twice: once in colour, once as alpha
    for (const [target, style] of [
      [ctx, `rgb(${Math.round(col.r * 255 * shade)},${Math.round(col.g * 255 * shade)},${Math.round(col.b * 255 * shade)})`],
      [actx, '#fff'],
    ] as [CanvasRenderingContext2D, string][]) {
      target.save();
      target.translate(x, y);
      target.rotate(rot);
      target.fillStyle = style;
      target.beginPath();
      target.moveTo(0, -r);
      target.quadraticCurveTo(r * 0.62, -r * 0.15, 0, r);
      target.quadraticCurveTo(-r * 0.62, -r * 0.15, 0, -r);
      target.fill();
      target.restore();
    }
  };

  // scatter leaves densely toward the middle, sparser at the edges so the card
  // fades out instead of ending on a hard rectangle
  for (let i = 0; i < 190; i++) {
    const ang = rand() * Math.PI * 2;
    const rad = Math.pow(rand(), 0.65) * size * 0.46;
    const x = size / 2 + Math.cos(ang) * rad;
    const y = size / 2 + Math.sin(ang) * rad;
    leaf(x, y, size * (0.05 + rand() * 0.05), rand() * Math.PI * 2, 0.62 + rand() * 0.55);
  }

  const map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  const alpha = new THREE.CanvasTexture(a);
  alpha.anisotropy = 8;
  return { map, alpha };
}

export interface CanopyResult {
  mesh: THREE.InstancedMesh;
  dispose: () => void;
}

/**
 * Build every tree's canopy as one instanced mesh of leaf cards. Cards are
 * scattered over each crown's volume and turned to random angles, which is what
 * produces a broken, natural silhouette.
 */
export function buildCanopies(
  crowns: { x: number; y: number; z: number; radius: number }[],
  color: number,
  seed: number,
  cardsPerCrown = 26,
): CanopyResult {
  const { map, alpha } = leafClusterTexture(color, seed);
  const geo = new THREE.PlaneGeometry(1, 1);
  const mat = new THREE.MeshStandardMaterial({
    map,
    alphaMap: alpha,
    transparent: false,
    alphaTest: 0.42, // cutout, so it still writes depth and casts real shadows
    side: THREE.DoubleSide,
    roughness: 0.9,
    metalness: 0,
    envMapIntensity: 0.25,
  });

  const total = crowns.length * cardsPerCrown;
  const mesh = new THREE.InstancedMesh(geo, mat, Math.max(1, total));
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.frustumCulled = false;

  const rand = makeRng(seed + 17);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const v = new THREE.Vector3();
  const s = new THREE.Vector3();
  let i = 0;
  for (const crown of crowns) {
    for (let k = 0; k < cardsPerCrown; k++) {
      // point in a squashed sphere: wider than tall, like a real crown
      const u = rand() * Math.PI * 2;
      const w = Math.acos(2 * rand() - 1);
      const rr = crown.radius * Math.pow(rand(), 0.42);
      v.set(
        crown.x + Math.sin(w) * Math.cos(u) * rr,
        crown.y + Math.cos(w) * rr * 0.72,
        crown.z + Math.sin(w) * Math.sin(u) * rr,
      );
      e.set(rand() * Math.PI, rand() * Math.PI * 2, rand() * Math.PI);
      q.setFromEuler(e);
      const size = crown.radius * (0.85 + rand() * 0.75);
      s.set(size, size, size);
      m.compose(v, q, s);
      mesh.setMatrixAt(i++, m);
    }
  }
  mesh.count = i;

  return {
    mesh,
    dispose: () => {
      geo.dispose();
      mat.dispose();
      map.dispose();
      alpha.dispose();
    },
  };
}
