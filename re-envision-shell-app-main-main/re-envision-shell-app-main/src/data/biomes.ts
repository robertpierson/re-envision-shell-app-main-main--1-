// One biome per unit position, so no two islands in a course look alike, and
// the four courses re-tint the same eight worlds differently — 32 distinct
// places to visit rather than the same meadow 32 times.

export type Foliage = 'pine' | 'palm' | 'crystal' | 'dead' | 'mushroom' | 'cactus';
export type Motes = 'pollen' | 'snow' | 'ember' | 'spark' | 'bubble' | 'none';

export interface Biome {
  name: string;
  /** Hex numbers, ready for three.js materials. */
  grass: number;
  grassDark: number;
  soil: number;
  soilDark: number;
  water: number;
  accent: number;
  path: number;
  /** Sky dome gradient, top to horizon. */
  skyTop: number;
  skyMid: number;
  skyBottom: number;
  fog: number;
  foliage: Foliage;
  motes: Motes;
  /** How thick the ground cover is, 0-1. Deserts are bare, jungles are not. */
  grassDensity: number;
  /** Warm noon sun, cold dusk, and so on. */
  sunColor: number;
  sunIntensity: number;
}

export const BIOMES: Biome[] = [
  {
    name: 'Meadow',
    grass: 0x6ad04a, grassDark: 0x2f9e3c, soil: 0xb4763c, soilDark: 0x7a4a22,
    water: 0x3fc0f0, accent: 0x1cb0f6, path: 0xf1dfb4,
    skyTop: 0x2f7fd4, skyMid: 0x9fd4f5, skyBottom: 0xfdf0d5, fog: 0xa9d8f0,
    foliage: 'pine', motes: 'pollen', grassDensity: 1, sunColor: 0xfff4dc, sunIntensity: 2.6,
  },
  {
    name: 'Frostpeak',
    grass: 0xe8f4ff, grassDark: 0xb9d9f0, soil: 0x8fa3b8, soilDark: 0x5d6f85,
    water: 0x76c7e8, accent: 0x7fd1ff, path: 0xdfe9f5,
    skyTop: 0x2a5f9e, skyMid: 0xa8cfe8, skyBottom: 0xf0f6ff, fog: 0xcfe4f5,
    foliage: 'pine', motes: 'snow', grassDensity: 0.25, sunColor: 0xeaf4ff, sunIntensity: 2.2,
  },
  {
    name: 'Dunes',
    grass: 0xe4c67a, grassDark: 0xc79f4e, soil: 0xc9924f, soilDark: 0x8a5f2c,
    water: 0x46c8c0, accent: 0xffb44d, path: 0xf6e6c0,
    skyTop: 0x3f8fd0, skyMid: 0xf0d9a8, skyBottom: 0xffe9c0, fog: 0xf3dcb0,
    foliage: 'cactus', motes: 'none', grassDensity: 0.18, sunColor: 0xfff0c8, sunIntensity: 3.0,
  },
  {
    name: 'Jungle',
    grass: 0x3fae4a, grassDark: 0x1e7a34, soil: 0x8a5a34, soilDark: 0x53341c,
    water: 0x35b79a, accent: 0x58cc02, path: 0xd8c69a,
    skyTop: 0x2b8f8a, skyMid: 0x9fdcc4, skyBottom: 0xe8f6da, fog: 0xa9dcc8,
    foliage: 'palm', motes: 'bubble', grassDensity: 1, sunColor: 0xf6ffe0, sunIntensity: 2.3,
  },
  {
    name: 'Emberfall',
    grass: 0x6b4a44, grassDark: 0x47302c, soil: 0x5a3a34, soilDark: 0x30201d,
    water: 0xff6a3c, accent: 0xff7a3c, path: 0x8c6a56,
    skyTop: 0x3a1f34, skyMid: 0xa04a44, skyBottom: 0xffb27a, fog: 0x7a4038,
    foliage: 'dead', motes: 'ember', grassDensity: 0.3, sunColor: 0xffd0a0, sunIntensity: 2.4,
  },
  {
    name: 'Crystal Hollow',
    grass: 0x9a7fe0, grassDark: 0x6a4fc0, soil: 0x54407e, soilDark: 0x342a52,
    water: 0xb07aff, accent: 0xce82ff, path: 0xd9c8f5,
    skyTop: 0x2a1f5e, skyMid: 0x7a5fc0, skyBottom: 0xdcc8ff, fog: 0x6a54a0,
    foliage: 'crystal', motes: 'spark', grassDensity: 0.5, sunColor: 0xe8d8ff, sunIntensity: 2.2,
  },
  {
    name: 'Mushroom Vale',
    grass: 0x5ec8a8, grassDark: 0x2f9e84, soil: 0x9a6a8a, soilDark: 0x5f3f58,
    water: 0x4fd8c0, accent: 0x2ec4b6, path: 0xe2d6c0,
    skyTop: 0x2f6f8f, skyMid: 0x8fdcd0, skyBottom: 0xfbe8f0, fog: 0xa8dcd4,
    foliage: 'mushroom', motes: 'spark', grassDensity: 0.85, sunColor: 0xf0fff8, sunIntensity: 2.4,
  },
  {
    name: 'Skyreach',
    grass: 0x8fd8ff, grassDark: 0x4fa8e0, soil: 0xc9c0e8, soilDark: 0x8f86b8,
    water: 0x9fd8ff, accent: 0xffc800, path: 0xfff0d0,
    skyTop: 0x1f4f9e, skyMid: 0x7fb8f0, skyBottom: 0xffe8f6, fog: 0xbcdcf8,
    foliage: 'crystal', motes: 'pollen', grassDensity: 0.6, sunColor: 0xfff6e0, sunIntensity: 2.8,
  },
];

/** Course tint, applied on top of the biome so a course still reads as itself. */
const COURSE_TINT = [0x1cb0f6, 0xce82ff, 0x2ec4b6, 0xff9600];

function mix(a: number, b: number, t: number): number {
  const ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255;
  const br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255;
  return (
    (Math.round(ar + (br - ar) * t) << 16) |
    (Math.round(ag + (bg - ag) * t) << 8) |
    Math.round(ab + (bb - ab) * t)
  );
}

/**
 * The biome for a given unit, tinted by its course. Unit 1 of every course is
 * a meadow so the very first world is friendly; after that they diverge.
 */
export function biomeFor(courseIndex: number, unitNumber: number): Biome {
  const base = BIOMES[(unitNumber - 1) % BIOMES.length];
  const tint = COURSE_TINT[courseIndex % COURSE_TINT.length];
  return {
    ...base,
    accent: tint,
    grass: mix(base.grass, tint, 0.12),
    water: mix(base.water, tint, 0.22),
    skyMid: mix(base.skyMid, tint, 0.14),
  };
}
