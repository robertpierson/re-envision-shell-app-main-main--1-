import React from 'react';

// Sandy the dog, the ReEnvision mascot. One sprite per situation, cut from the
// master sheet into public/sandy/. Friendly Sandy teaches; evil Sandy is the
// boss you fight — and the boss escalates through the row-3 poses, with the
// full-rage one saved for a unit's real difficulty spike.

export type SandyPose =
  // friendly
  | 'idle-lounge'
  | 'portrait'
  | 'ball-correct'
  | 'laptop-study'
  // teaching
  | 'teach-map'
  | 'sit-point'
  | 'clipboard-done'
  | 'thumbs-goodjob'
  // boss
  | 'boss-grin'
  | 'boss-chair'
  | 'boss-snarl'
  | 'boss-rage';

const ALT: Record<SandyPose, string> = {
  'idle-lounge': 'Sandy the dog dozing in sunglasses',
  portrait: 'Sandy the dog',
  'ball-correct': 'Sandy catching a ball, pleased',
  'laptop-study': 'Sandy working at a laptop',
  'teach-map': 'Sandy pointing at a map on a clipboard',
  'sit-point': 'Sandy sitting and pointing the way',
  'clipboard-done': 'Sandy holding a checked-off clipboard',
  'thumbs-goodjob': 'Sandy giving a thumbs up: good job!',
  'boss-grin': 'Evil Sandy grinning, paws raised',
  'boss-chair': 'Evil Sandy waiting in an armchair',
  'boss-snarl': 'Evil Sandy snarling',
  'boss-rage': 'Evil Sandy in a rage',
};

interface SandyProps {
  pose: SandyPose;
  className?: string;
  /** Gentle float, for a mascot that shouldn't feel like a static sticker. */
  float?: boolean;
  /** Plays the shake when the boss takes a hit. */
  hit?: boolean;
  /** Tips over once beaten. */
  ko?: boolean;
}

const Sandy: React.FC<SandyProps> = ({ pose, className = '', float = false, hit = false, ko = false }) => (
  <>
    <style>{`
      @keyframes sandy-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
      @keyframes sandy-hit {
        0% { transform: translateX(0) }
        20% { transform: translateX(-10px) rotate(-3deg) }
        40% { transform: translateX(9px) rotate(2deg) }
        60% { transform: translateX(-6px) }
        80% { transform: translateX(4px) }
        100% { transform: translateX(0) }
      }
      @keyframes sandy-ko { to { transform: rotate(14deg) translateY(18px); filter: grayscale(.65) } }
      .sandy-float { animation: sandy-float 3.2s ease-in-out infinite }
      .sandy-hit { animation: sandy-hit 420ms ease-out }
      .sandy-ko { animation: sandy-ko 700ms ease-in forwards }
      @media (prefers-reduced-motion: reduce) {
        .sandy-float, .sandy-hit, .sandy-ko { animation: none }
      }
    `}</style>
    <img
      src={`/sandy/${pose}.png`}
      alt={ALT[pose]}
      draggable={false}
      className={`${className} select-none ${ko ? 'sandy-ko' : hit ? 'sandy-hit' : float ? 'sandy-float' : ''}`}
    />
  </>
);

export default Sandy;

/**
 * Which evil pose fronts a unit's boss. Units 1-3 get the mildest grin, 4-6
 * the armchair, 7 the snarl, and only unit 8 — the synthesis unit that closes
 * a course — gets full rage.
 */
export function bossPoseForUnit(unitNumber: number): SandyPose {
  if (unitNumber >= 8) return 'boss-rage';
  if (unitNumber >= 7) return 'boss-snarl';
  if (unitNumber >= 4) return 'boss-chair';
  return 'boss-grin';
}
