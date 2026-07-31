import * as THREE from 'three';
import { fbm, makeRng } from './noise';

// Procedural PBR maps, drawn into canvases at load. Nothing is downloaded, but
// surfaces still get the per-pixel colour, roughness and normal variation that
// stops a material from reading as flat plastic.

function canvas(size: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  return [c, c.getContext('2d')!];
}

function finish(c: HTMLCanvasElement, repeat: number, srgb: boolean): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  tex.anisotropy = 8;
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/** Height field -> tangent-space normal map, the honest way (Sobel). */
export function normalFromHeight(height: Float32Array, size: number, strength = 2.2, repeat = 1): THREE.CanvasTexture {
  const [c, ctx] = canvas(size);
  const img = ctx.createImageData(size, size);
  const at = (x: number, y: number) => height[((y + size) % size) * size + ((x + size) % size)];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx =
        at(x - 1, y - 1) + 2 * at(x - 1, y) + at(x - 1, y + 1) -
        (at(x + 1, y - 1) + 2 * at(x + 1, y) + at(x + 1, y + 1));
      const dy =
        at(x - 1, y - 1) + 2 * at(x, y - 1) + at(x + 1, y - 1) -
        (at(x - 1, y + 1) + 2 * at(x, y + 1) + at(x + 1, y + 1));
      const nx = dx * strength;
      const ny = dy * strength;
      const nz = 1;
      const len = Math.hypot(nx, ny, nz) || 1;
      const i = (y * size + x) * 4;
      img.data[i] = ((nx / len) * 0.5 + 0.5) * 255;
      img.data[i + 1] = ((ny / len) * 0.5 + 0.5) * 255;
      img.data[i + 2] = ((nz / len) * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return finish(c, repeat, false);
}

export interface SurfaceMaps {
  map: THREE.CanvasTexture;
  normalMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
}

/**
 * A rock/soil surface: mottled albedo, matching normal relief, and roughness
 * that dips where the stone is worn smooth.
 */
export function rockMaps(base: number, seed: number, size = 256, repeat = 4): SurfaceMaps {
  const [alb, actx] = canvas(size);
  const [rough, rctx] = canvas(size);
  const albImg = actx.createImageData(size, size);
  const roughImg = rctx.createImageData(size, size);
  const height = new Float32Array(size * size);
  const col = new THREE.Color(base);
  const rand = makeRng(seed);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = (x / size) * 6;
      const v = (y / size) * 6;
      const n = fbm(u, v, 5, seed) * 0.5 + 0.5;
      const grain = fbm(u * 9, v * 9, 3, seed + 7) * 0.5 + 0.5;
      const h = n * 0.8 + grain * 0.2;
      height[y * size + x] = h;

      const shade = 0.72 + h * 0.5 + (rand() - 0.5) * 0.05;
      const i = (y * size + x) * 4;
      albImg.data[i] = Math.min(255, col.r * 255 * shade);
      albImg.data[i + 1] = Math.min(255, col.g * 255 * shade);
      albImg.data[i + 2] = Math.min(255, col.b * 255 * shade);
      albImg.data[i + 3] = 255;

      // worn high points are smoother, crevices stay rough
      const r = Math.min(255, Math.max(0, (0.95 - h * 0.35) * 255));
      roughImg.data[i] = roughImg.data[i + 1] = roughImg.data[i + 2] = r;
      roughImg.data[i + 3] = 255;
    }
  }
  actx.putImageData(albImg, 0, 0);
  rctx.putImageData(roughImg, 0, 0);

  return {
    map: finish(alb, repeat, true),
    roughnessMap: finish(rough, repeat, false),
    normalMap: normalFromHeight(height, size, 2.4, repeat),
  };
}

/** Grassy ground: colour break-up plus fine blade-scale normal detail. */
export function groundMaps(grass: number, dirt: number, seed: number, size = 256, repeat = 6): SurfaceMaps {
  const [alb, actx] = canvas(size);
  const [rough, rctx] = canvas(size);
  const albImg = actx.createImageData(size, size);
  const roughImg = rctx.createImageData(size, size);
  const height = new Float32Array(size * size);
  const g = new THREE.Color(grass);
  const d = new THREE.Color(dirt);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = (x / size) * 5;
      const v = (y / size) * 5;
      const patch = fbm(u, v, 4, seed) * 0.5 + 0.5;
      const blades = fbm(u * 22, v * 22, 2, seed + 31) * 0.5 + 0.5;
      height[y * size + x] = blades * 0.7 + patch * 0.3;

      // patches of bare dirt showing through the grass
      // bias hard toward grass: bare dirt is the exception, not the rule
      const t = Math.max(0, Math.min(1, (patch + 0.22) * 3.2));
      const shade = 0.92 + blades * 0.24;
      const i = (y * size + x) * 4;
      albImg.data[i] = THREE.MathUtils.lerp(d.r, g.r, t) * 255 * shade;
      albImg.data[i + 1] = THREE.MathUtils.lerp(d.g, g.g, t) * 255 * shade;
      albImg.data[i + 2] = THREE.MathUtils.lerp(d.b, g.b, t) * 255 * shade;
      albImg.data[i + 3] = 255;

      const r = (0.88 - blades * 0.18) * 255;
      roughImg.data[i] = roughImg.data[i + 1] = roughImg.data[i + 2] = r;
      roughImg.data[i + 3] = 255;
    }
  }
  actx.putImageData(albImg, 0, 0);
  rctx.putImageData(roughImg, 0, 0);

  return {
    map: finish(alb, repeat, true),
    roughnessMap: finish(rough, repeat, false),
    normalMap: normalFromHeight(height, size, 1.5, repeat),
  };
}

/** Ripple normals for the water surface, scrolled in two directions. */
export function waterNormals(seed: number, size = 256): THREE.CanvasTexture {
  const height = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = (x / size) * 8;
      const v = (y / size) * 8;
      height[y * size + x] = fbm(u, v, 4, seed) * 0.5 + 0.5;
    }
  }
  return normalFromHeight(height, size, 1.1, 3);
}

/** Bark: vertical striations, which is most of what sells a trunk. */
export function barkMaps(base: number, seed: number, size = 128): SurfaceMaps {
  const [alb, actx] = canvas(size);
  const [rough, rctx] = canvas(size);
  const albImg = actx.createImageData(size, size);
  const roughImg = rctx.createImageData(size, size);
  const height = new Float32Array(size * size);
  const col = new THREE.Color(base);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = (x / size) * 14;
      const v = (y / size) * 2.5;
      const strip = fbm(u, v, 3, seed) * 0.5 + 0.5;
      const knot = fbm(u * 3, v * 3, 2, seed + 11) * 0.5 + 0.5;
      const h = strip * 0.75 + knot * 0.25;
      height[y * size + x] = h;
      const shade = 0.7 + h * 0.55;
      const i = (y * size + x) * 4;
      albImg.data[i] = col.r * 255 * shade;
      albImg.data[i + 1] = col.g * 255 * shade;
      albImg.data[i + 2] = col.b * 255 * shade;
      albImg.data[i + 3] = 255;
      roughImg.data[i] = roughImg.data[i + 1] = roughImg.data[i + 2] = (0.98 - h * 0.15) * 255;
      roughImg.data[i + 3] = 255;
    }
  }
  actx.putImageData(albImg, 0, 0);
  rctx.putImageData(roughImg, 0, 0);
  return {
    map: finish(alb, 1, true),
    roughnessMap: finish(rough, 1, false),
    normalMap: normalFromHeight(height, size, 2.8, 1),
  };
}

export function disposeMaps(m: SurfaceMaps) {
  m.map.dispose();
  m.normalMap.dispose();
  m.roughnessMap.dispose();
}
