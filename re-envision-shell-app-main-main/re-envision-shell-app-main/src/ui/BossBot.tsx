import React from 'react';

// The unit boss: a grumpy little AI core. Pure SVG so it ships with the app.
// `mood` drives the face and the aura; `hit` plays a shake + flash when the
// learner lands a correct answer.

interface BossBotProps {
  mood: 'idle' | 'hurt' | 'ko';
  hit: boolean;
  accent: string;
  className?: string;
}

const BossBot: React.FC<BossBotProps> = ({ mood, hit, accent, className }) => (
  <div className={`${className ?? ''} ${hit ? 'boss-hit' : ''} ${mood === 'ko' ? 'boss-ko' : 'boss-float'}`}>
    <style>{`
      @keyframes boss-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
      @keyframes boss-hit { 0% { transform: translateX(0) } 20% { transform: translateX(-9px) rotate(-3deg) } 40% { transform: translateX(8px) rotate(2deg) } 60% { transform: translateX(-5px) } 80% { transform: translateX(4px) } 100% { transform: translateX(0) } }
      @keyframes boss-ko { 0% { transform: rotate(0) translateY(0) } 100% { transform: rotate(14deg) translateY(16px) } }
      .boss-float { animation: boss-float 3s ease-in-out infinite }
      .boss-hit { animation: boss-hit 450ms ease-out }
      .boss-ko { animation: boss-ko 700ms ease-in forwards; filter: grayscale(0.7) }
      @media (prefers-reduced-motion: reduce) { .boss-float, .boss-hit, .boss-ko { animation: none } }
    `}</style>
    <svg viewBox="0 0 240 240" role="img" aria-label="The unit boss">
      {/* aura */}
      <circle cx="120" cy="120" r="96" fill={accent} opacity={mood === 'ko' ? 0.08 : 0.18} />
      <circle cx="120" cy="120" r="72" fill={accent} opacity={mood === 'ko' ? 0.1 : 0.24} />
      {/* shadow */}
      <ellipse cx="120" cy="210" rx="62" ry="12" fill="rgba(0,0,0,0.25)" />
      {/* body */}
      <rect x="58" y="66" width="124" height="112" rx="30" fill="#2E3440" />
      <rect x="58" y="66" width="124" height="56" rx="30" fill="#3B4252" />
      {/* horns */}
      <path d="M70 74 L52 40 L92 58 Z" fill={accent} />
      <path d="M170 74 L188 40 L148 58 Z" fill={accent} />
      {/* face plate */}
      <rect x="74" y="92" width="92" height="64" rx="18" fill="#0b0d12" />
      {/* eyes */}
      {mood === 'ko' ? (
        <g stroke={accent} strokeWidth="6" strokeLinecap="round">
          <path d="M92 112 l14 14 M106 112 l-14 14" />
          <path d="M134 112 l14 14 M148 112 l-14 14" />
        </g>
      ) : (
        <g fill={accent}>
          <circle cx="99" cy="119" r={mood === 'hurt' ? 7 : 10} />
          <circle cx="141" cy="119" r={mood === 'hurt' ? 7 : 10} />
          {mood === 'hurt' && (
            <g stroke={accent} strokeWidth="4" strokeLinecap="round" fill="none">
              <path d="M88 104 l22 6" />
              <path d="M152 104 l-22 6" />
            </g>
          )}
        </g>
      )}
      {/* mouth */}
      {mood === 'ko' ? (
        <ellipse cx="120" cy="144" rx="10" ry="6" fill={accent} opacity="0.8" />
      ) : mood === 'hurt' ? (
        <path d="M104 146 q16 -10 32 0" stroke={accent} strokeWidth="5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M102 142 l8 6 l8 -6 l8 6 l8 -6 l8 6" stroke={accent} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {/* arms */}
      <rect x="34" y="108" width="24" height="52" rx="12" fill="#3B4252" transform={mood === 'ko' ? 'rotate(24 46 134)' : undefined} />
      <rect x="182" y="108" width="24" height="52" rx="12" fill="#3B4252" transform={mood === 'ko' ? 'rotate(-24 194 134)' : undefined} />
      {/* chest core */}
      <circle cx="120" cy="176" r="14" fill={accent} opacity="0.9" />
      <circle cx="120" cy="176" r="7" fill="#fff" opacity="0.85" />
    </svg>
  </div>
);

export default BossBot;
