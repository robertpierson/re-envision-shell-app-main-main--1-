import React from 'react';

// A hand-drawn isometric world for one unit: a floating island with a winding
// trail past four stops. Pure SVG — no textures to load, no 3D library, and it
// scales to any width. The screen positions its level buttons on NODE_POINTS,
// so the art and the interactive nodes stay in lockstep.

export const VIEW_W = 900;
export const VIEW_H = 470;

/** Trail stops, in viewBox units: lesson 1, 2, 3, then the castle (quiz). */
export const NODE_POINTS = [
  { x: 168, y: 322 },
  { x: 356, y: 268 },
  { x: 552, y: 232 },
  { x: 742, y: 168 },
];

export interface IslandPalette {
  grass: string;
  grassDark: string;
  soil: string;
  soilDark: string;
  water: string;
  accent: string;
}

export const ISLAND_PALETTES: IslandPalette[] = [
  { grass: '#5BD24A', grassDark: '#2F9E3C', soil: '#B4763C', soilDark: '#7A4A22', water: '#3FC0F0', accent: '#1CB0F6' },
  { grass: '#B98CFF', grassDark: '#7C4DD6', soil: '#8A6BC4', soilDark: '#563E86', water: '#8A7BF0', accent: '#CE82FF' },
  { grass: '#4BD6B0', grassDark: '#1E9D82', soil: '#C08A55', soilDark: '#7E5630', water: '#37C7C0', accent: '#2EC4B6' },
  { grass: '#FFB44D', grassDark: '#E07C1E', soil: '#C97A3C', soilDark: '#8A4B1E', water: '#F09A4B', accent: '#FF9600' },
];

const trail = (points: { x: number; y: number }[]) => {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    d += ` C ${p1.x + (p2.x - p0.x) / 5} ${p1.y + (p2.y - p0.y) / 5},`;
    d += ` ${p2.x - (p3.x - p1.x) / 5} ${p2.y - (p3.y - p1.y) / 5},`;
    d += ` ${p2.x} ${p2.y}`;
  }
  return d;
};

const Tree: React.FC<{ x: number; y: number; s?: number; p: IslandPalette }> = ({ x, y, s = 1, p }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx="0" cy="4" rx="16" ry="5" fill="rgba(0,0,0,0.18)" />
    <rect x="-4" y="-14" width="8" height="18" rx="3" fill={p.soilDark} />
    <path d="M0 -54 L20 -22 L-20 -22 Z" fill={p.grassDark} />
    <path d="M0 -54 L20 -22 L0 -22 Z" fill={p.grass} opacity="0.65" />
    <path d="M0 -40 L26 -6 L-26 -6 Z" fill={p.grassDark} />
    <path d="M0 -40 L26 -6 L0 -6 Z" fill={p.grass} opacity="0.65" />
  </g>
);

const Cloud: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 0.9 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx="0" cy="0" rx="34" ry="18" fill="#fff" />
    <ellipse cx="26" cy="6" rx="26" ry="14" fill="#fff" />
    <ellipse cx="-26" cy="6" rx="22" ry="12" fill="#fff" />
  </g>
);

/** Isometric block, used for the castle and the little floating platforms. */
const Block: React.FC<{ x: number; y: number; w: number; h: number; top: string; side: string; face: string }> = ({
  x, y, w, h, top, side, face,
}) => (
  <g transform={`translate(${x} ${y})`}>
    <polygon points={`0,0 ${w / 2},${-w / 4} ${w},0 ${w / 2},${w / 4}`} fill={top} />
    <polygon points={`0,0 ${w / 2},${w / 4} ${w / 2},${w / 4 + h} 0,${h}`} fill={face} />
    <polygon points={`${w},0 ${w / 2},${w / 4} ${w / 2},${w / 4 + h} ${w},${h}`} fill={side} />
  </g>
);

interface WorldIslandProps {
  palette: IslandPalette;
  /** Dims the far end of the trail while those levels are still locked. */
  unlockedThrough: number;
  className?: string;
}

const WorldIsland: React.FC<WorldIslandProps> = ({ palette: p, unlockedThrough, className }) => {
  const uid = React.useId();
  const grassId = `${uid}-grass`;
  const soilId = `${uid}-soil`;
  const waterId = `${uid}-water`;
  const glowId = `${uid}-glow`;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={className}
      role="img"
      aria-label="Island map of this unit"
    >
      <defs>
        <linearGradient id={grassId} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={p.grass} />
          <stop offset="100%" stopColor={p.grassDark} />
        </linearGradient>
        <linearGradient id={soilId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.soil} />
          <stop offset="100%" stopColor={p.soilDark} />
        </linearGradient>
        <radialGradient id={waterId} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={p.water} stopOpacity="0.55" />
          <stop offset="100%" stopColor={p.water} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={glowId} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFF6C8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFF6C8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* sky glow + clouds */}
      <circle cx="770" cy="70" r="150" fill={`url(#${glowId})`} />
      <Cloud x={120} y={70} s={1.1} o={0.85} />
      <Cloud x={430} y={44} s={0.8} o={0.65} />
      <Cloud x={690} y={96} s={0.9} o={0.5} />

      {/* water halo under the island */}
      <ellipse cx="470" cy="392" rx="430" ry="92" fill={`url(#${waterId})`} />

      {/* island: soil underside, then the grass top plate */}
      <path
        d="M120 322 C60 300 70 246 150 232 C210 148 350 130 430 176
           C520 122 700 132 762 190 C848 206 856 268 792 296
           C744 386 560 424 430 402 C300 424 168 392 120 322 Z"
        fill={`url(#${soilId})`}
        transform="translate(0 44)"
      />
      <path
        d="M120 322 C60 300 70 246 150 232 C210 148 350 130 430 176
           C520 122 700 132 762 190 C848 206 856 268 792 296
           C744 386 560 424 430 402 C300 424 168 392 120 322 Z"
        fill={`url(#${grassId})`}
      />
      {/* a lighter rim so the top plate reads as raised */}
      <path
        d="M150 232 C210 148 350 130 430 176 C520 122 700 132 762 190"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* winding trail */}
      <path d={trail(NODE_POINTS)} fill="none" stroke={p.soilDark} strokeOpacity="0.45" strokeWidth="26" strokeLinecap="round" />
      <path d={trail(NODE_POINTS)} fill="none" stroke="#F3E2B8" strokeWidth="18" strokeLinecap="round" />
      <path
        d={trail(NODE_POINTS)}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.7"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="2 18"
      />
      {/* the stretch you haven't unlocked yet fades out */}
      {unlockedThrough < NODE_POINTS.length - 1 && (
        <path
          d={trail(NODE_POINTS.slice(Math.max(0, unlockedThrough)))}
          fill="none"
          stroke="#8A8A8A"
          strokeOpacity="0.35"
          strokeWidth="20"
          strokeLinecap="round"
        />
      )}

      {/* scenery */}
      <Tree x={250} y={352} s={0.95} p={p} />
      <Tree x={196} y={252} s={0.7} p={p} />
      <Tree x={452} y={330} s={1.05} p={p} />
      <Tree x={648} y={286} s={0.85} p={p} />
      <Tree x={330} y={188} s={0.6} p={p} />
      <ellipse cx="520" cy="368" rx="30" ry="10" fill={p.grassDark} opacity="0.5" />
      <ellipse cx="286" cy="300" rx="22" ry="8" fill={p.grassDark} opacity="0.45" />

      {/* castle marking the unit quiz */}
      <g transform="translate(694 96)">
        <Block x={0} y={40} w={96} h={34} top={p.grass} side={p.soilDark} face={p.soil} />
        <Block x={10} y={4} w={30} h={40} top="#E9E3D6" side="#9C9384" face="#C9C1B2" />
        <Block x={56} y={4} w={30} h={40} top="#E9E3D6" side="#9C9384" face="#C9C1B2" />
        <Block x={30} y={-16} w={38} h={52} top="#F3EEE3" side="#A89F8F" face="#D8D0C1" />
        <path d="M49 -30 L49 -52 L76 -44 L49 -36 Z" fill={p.accent} />
        <rect x="46" y="-54" width="4" height="26" rx="2" fill="#7A7266" />
      </g>

      {/* a couple of floating platforms for depth */}
      <g opacity="0.9">
        <Block x={64} y={198} w={54} h={16} top={p.grass} side={p.soilDark} face={p.soil} />
        <Block x={806} y={306} w={46} h={14} top={p.grass} side={p.soilDark} face={p.soil} />
      </g>
    </svg>
  );
};

export default WorldIsland;
