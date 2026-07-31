import React from 'react';
import Sandy from './Sandy';

// Sandy in the cage GLITCH put him in. The bars weaken as the boss takes
// damage, and the whole thing bursts when you win — the rescue is the reward,
// not a score screen.

interface CapturedSandyProps {
  /** 0 = fully caged, 1 = about to break out. */
  freedom: number;
  freed?: boolean;
  className?: string;
}

const CapturedSandy: React.FC<CapturedSandyProps> = ({ freedom, freed = false, className }) => (
  <div className={`relative ${className ?? ''}`}>
    <style>{`
      @keyframes cage-rattle { 0%,100% { transform: translateX(0) } 25% { transform: translateX(-2px) } 75% { transform: translateX(2px) } }
      @keyframes cage-burst { to { transform: scale(1.5) rotate(8deg); opacity: 0 } }
      @keyframes sandy-free { 0% { transform: translateY(0) scale(1) } 60% { transform: translateY(-16px) scale(1.08) } 100% { transform: translateY(0) scale(1) } }
      .cage-rattle { animation: cage-rattle 1.6s ease-in-out infinite }
      .cage-burst { animation: cage-burst 700ms ease-out forwards }
      .sandy-free { animation: sandy-free 900ms cubic-bezier(.22,1.4,.36,1) }
      @media (prefers-reduced-motion: reduce) { .cage-rattle, .cage-burst, .sandy-free { animation: none } }
    `}</style>

    <Sandy
      pose={freed ? 'thumbs-goodjob' : 'sit-point'}
      className={`w-full object-contain transition-[filter] duration-500 ${
        freed ? 'sandy-free' : 'grayscale-[.55] brightness-90'
      }`}
    />

    {/* the cage itself */}
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${freed ? 'cage-burst' : 'cage-rattle'}`}
    >
      <defs>
        <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8C93A8" />
          <stop offset="50%" stopColor="#E4E8F2" />
          <stop offset="100%" stopColor="#7A8098" />
        </linearGradient>
      </defs>
      <g stroke="url(#bar)" strokeWidth={7 - freedom * 3} strokeLinecap="round" opacity={0.95 - freedom * 0.35}>
        {[28, 62, 96, 130, 164].map((x, i) => (
          // bars snap away one at a time as the boss weakens
          <line key={x} x1={x} y1="16" x2={x} y2="184" opacity={freedom > (i + 1) / 6 ? 0 : 1} />
        ))}
        <line x1="16" y1="18" x2="184" y2="18" strokeWidth="9" />
        <line x1="16" y1="182" x2="184" y2="182" strokeWidth="9" />
      </g>
    </svg>

    {!freed && (
      <p className="mt-1 text-center text-[11px] font-extrabold uppercase tracking-widest text-white/70">
        Sandy — captured
      </p>
    )}
  </div>
);

export default CapturedSandy;
