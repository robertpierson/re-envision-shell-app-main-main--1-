import * as THREE from 'three';
import { fbm, ridged } from './noise';

// A real heightfield island rather than a solid of revolution: a radial falloff
// gives it a coastline, fbm gives rolling ground, ridged noise gives the inland
// relief, and the whole thing is flattened along the trail so the path never
// runs up a cliff. The same height function places every prop, so nothing
// floats or sinks.

export interface TerrainOptions {
  radius: number;
  /** Grid resolution — 192 is plenty at this camera distance. */
  segments: number;
  seed: number;
  /** Peak height of the inland relief. */
  relief: number;
  /** Points the path runs through, in world XZ. Ground is levelled near them. */
  flattenAt: [number, number][];
  /** How sharp the inland mountains are, 0-1. */
  ruggedness: number;
}

export interface Terrain {
  geometry: THREE.BufferGeometry;
  /** Ground height at a world XZ. Above water = positive. */
  heightAt: (x: number, z: number) => number;
  /** 0 flat, 1 vertical — used to place props only where they'd really grow. */
  slopeAt: (x: number, z: number) => number;
}

export function buildTerrain(opts: TerrainOptions): Terrain {
  const { radius, segments, seed, relief, flattenAt, ruggedness } = opts;

  const heightAt = (x: number, z: number): number => {
    const d = Math.hypot(x, z) / radius;
    if (d > 1.06) return -2.5;

    // island mask: flat-ish middle, quick shelf, then it drops into the sea
    const mask = 1 - THREE.MathUtils.smoothstep(d, 0.70, 1.04);

    const rolling = fbm(x * 0.15, z * 0.15, 5, seed) * 0.5 + 0.5;
    const peaks = ridged(x * 0.1, z * 0.1, 4, seed + 900);
    let h = (rolling * (1 - ruggedness) + peaks * ruggedness) * relief;

    // a beach shelf: keep the last stretch before the water low and gentle
    const beach = THREE.MathUtils.smoothstep(d, 0.80, 0.99);
    h = THREE.MathUtils.lerp(h, 0.75, beach);
    h = h * mask + 0.9 * mask;  // lift the whole plateau clear of the sea

    // level the ground under the trail, with a soft shoulder
    for (const [px, pz] of flattenAt) {
      const pd = Math.hypot(x - px, z - pz);
      const infl = 1 - THREE.MathUtils.smoothstep(pd, 0.9, 3.4);
      if (infl > 0) h = THREE.MathUtils.lerp(h, 1.35, infl * 0.9);
    }

    // below the shelf the surface plunges to form the underwater base
    if (d > 0.98) h -= (d - 0.98) * 26;
    return h;
  };

  const slopeAt = (x: number, z: number): number => {
    const e = 0.35;
    const hx = heightAt(x + e, z) - heightAt(x - e, z);
    const hz = heightAt(x, z + e) - heightAt(x, z - e);
    return Math.min(1, Math.hypot(hx, hz) / (2 * e));
  };

  // Build the surface grid, then discard triangles that sit entirely below the
  // seabed cut so the mesh stays cheap.
  const size = radius * 2.25;
  const geo = new THREE.PlaneGeometry(size, size, segments, segments);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    pos.setY(i, Math.max(-3.4, heightAt(x, z)));
  }
  geo.computeVertexNormals();

  // Vertex colours carry the biome blend: sand at the waterline, grass on the
  // flats, rock on anything steep. The shader multiplies these over the albedo
  // texture, which is what makes one material look like three.
  const colors = new Float32Array(pos.count * 3);
  const tmp = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const slope = slopeAt(x, z);
    // sand only right at the waterline, not halfway up the island
    const sand = 1 - THREE.MathUtils.smoothstep(y, 0.62, 0.95);
    const rock = THREE.MathUtils.smoothstep(slope, 0.55, 1.15);
    // start white (texture shows through), tint toward sand and rock
    tmp.setRGB(1, 1, 1);
    tmp.lerp(new THREE.Color(1.3, 1.2, 0.95), sand * 0.55);
    tmp.lerp(new THREE.Color(0.82, 0.78, 0.72), rock * 0.75);
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  return { geometry: geo, heightAt, slopeAt };
}
