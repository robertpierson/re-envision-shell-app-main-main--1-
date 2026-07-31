import React from 'react';

// GLITCH — the thing that took Sandy. A hovering slab of corrupted model with
// one hungry eye, drawn in SVG so it ships with the app and scales anywhere.
// Deliberately more strange than scary: kids should want to beat it, not have
// nightmares about it.

interface GlitchProps {
  /** 0 = untouched, 1 = destroyed. Drives cracks, colour drain and the eye. */
  damage: number;
  hit?: boolean;
  defeated?: boolean;
  className?: string;
}

const Glitch: React.FC<GlitchProps> = ({ damage, hit = false, defeated = false, className }) => {
  const uid = React.useId();
  const shake = hit ? 'glitch-hit' : defeated ? '' : 'glitch-hover';
  const openEye = Math.max(0.25, 1 - damage * 0.75);

  return (
    <div className={`${className ?? ''} ${defeated ? 'glitch-fall' : ''}`}>
      <style>{`
        @keyframes glitch-hover { 0%,100% { transform: translateY(0) rotate(-1deg) } 50% { transform: translateY(-12px) rotate(1deg) } }
        @keyframes glitch-hit {
          0% { transform: translate(0,0) }
          15% { transform: translate(-10px,3px) skewX(6deg) }
          30% { transform: translate(9px,-4px) skewX(-5deg) }
          45% { transform: translate(-6px,2px) }
          60% { transform: translate(5px,-2px) }
          100% { transform: translate(0,0) }
        }
        @keyframes glitch-fall { to { transform: translateY(40px) rotate(12deg) scale(.9); opacity: .35 } }
        @keyframes glitch-scan { 0% { transform: translateY(-100%) } 100% { transform: translateY(220%) } }
        .glitch-hover { animation: glitch-hover 3.4s ease-in-out infinite }
        .glitch-hit { animation: glitch-hit 420ms steps(2, end) }
        .glitch-fall { animation: glitch-fall 900ms ease-in forwards }
        @media (prefers-reduced-motion: reduce) {
          .glitch-hover, .glitch-hit, .glitch-fall { animation: none }
        }
      `}</style>

      <svg viewBox="0 0 260 260" role="img" aria-label="GLITCH, the thing holding Sandy" className={shake}>
        <defs>
          <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#6E4BD8" />
            <stop offset="55%" stopColor="#3B2A78" />
            <stop offset="100%" stopColor="#1B1436" />
          </linearGradient>
          <radialGradient id={`${uid}-glow`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#C4A5FF" stopOpacity={defeated ? 0.15 : 0.75} />
            <stop offset="100%" stopColor="#C4A5FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-eye`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE8A3" />
            <stop offset="100%" stopColor="#FF9A3C" />
          </linearGradient>
          <clipPath id={`${uid}-clip`}>
            <path d="M52 74 L208 60 L222 176 L64 196 Z" />
          </clipPath>
        </defs>

        <circle cx="130" cy="126" r="112" fill={`url(#${uid}-glow)`} />
        <ellipse cx="130" cy="232" rx="72" ry="12" fill="rgba(0,0,0,.3)" />

        {/* offset colour ghosts — the "glitch" read */}
        <path d="M52 74 L208 60 L222 176 L64 196 Z" fill="#FF3B6B" opacity={defeated ? 0.1 : 0.35} transform="translate(-6 4)" />
        <path d="M52 74 L208 60 L222 176 L64 196 Z" fill="#37E5FF" opacity={defeated ? 0.1 : 0.3} transform="translate(6 -4)" />

        {/* main slab */}
        <path d="M52 74 L208 60 L222 176 L64 196 Z" fill={`url(#${uid}-body)`} />

        <g clipPath={`url(#${uid}-clip)`}>
          {/* scanlines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={i} x="40" y={70 + i * 15} width="200" height="4" fill="#ffffff" opacity="0.05" />
          ))}
          {/* damage cracks appear as it loses HP */}
          {damage > 0.25 && (
            <path d="M120 62 L132 118 L108 132 L128 190" stroke="#FFD36E" strokeWidth="3" fill="none" opacity=".85" />
          )}
          {damage > 0.5 && (
            <path d="M176 64 L162 120 L190 140 L172 194" stroke="#FFD36E" strokeWidth="3" fill="none" opacity=".8" />
          )}
          {damage > 0.75 && (
            <path d="M72 78 L96 126 L70 150 L92 192" stroke="#FF8A5C" strokeWidth="3" fill="none" opacity=".8" />
          )}
        </g>

        {/* horns */}
        <path d="M70 76 L48 30 L104 62 Z" fill="#4B3596" />
        <path d="M196 62 L226 22 L214 78 Z" fill="#4B3596" />

        {/* eye */}
        <ellipse cx="136" cy="124" rx="46" ry={46 * openEye} fill="#0E0A1C" />
        <ellipse cx="136" cy="124" rx="34" ry={34 * openEye} fill={`url(#${uid}-eye)`} />
        <ellipse cx="136" cy="124" rx="12" ry={12 * openEye} fill="#241203" />
        {defeated && (
          <g stroke="#FFD36E" strokeWidth="7" strokeLinecap="round">
            <path d="M116 108 l40 34 M156 108 l-40 34" />
          </g>
        )}

        {/* mouth of static */}
        <g opacity={defeated ? 0.3 : 0.9}>
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={i} x={92 + i * 12} y={168 - (i % 2) * 5} width="8" height={12 + (i % 3) * 5} fill="#0E0A1C" />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default Glitch;
