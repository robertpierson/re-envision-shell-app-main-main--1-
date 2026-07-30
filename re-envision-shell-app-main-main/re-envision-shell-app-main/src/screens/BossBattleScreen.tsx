import React, { useMemo, useState } from 'react';
import { ArrowLeft, Heart, Swords, Trophy } from 'lucide-react';
import { CourseUnit, courses } from '../data/curriculum';
import { Level, isLevelComplete } from '../lib/progress';
import { bossQuestions, shuffleSet } from '../data/quizzes';
import { awardXp, getSnapshot, loseHeart, XP_PER_BOSS, XP_PER_CORRECT } from '../lib/stats';
import BossBot from '../ui/BossBot';
import QuestionCard from '../ui/QuestionCard';

interface BossBattleScreenProps {
  unit: CourseUnit;
  level: Level;
  onComplete: () => void;
  onExit: () => void;
}

const ACCENTS = ['#1CB0F6', '#CE82FF', '#2EC4B6', '#FF9600'];

// The unit quiz as a boss fight. The boss's HP equals the question count:
// every correct answer lands a hit, every wrong answer costs a heart from
// the shared daily pool. Zero hearts ends the run — they refill tomorrow.
const BossBattleScreen: React.FC<BossBattleScreenProps> = ({ unit, level, onComplete, onExit }) => {
  const questions = useMemo(() => shuffleSet(bossQuestions(unit.lessonId)), [unit]);
  const courseIndex = Math.max(0, courses.findIndex((c) => c.units.some((u) => u.id === unit.id)));
  const accent = ACCENTS[courseIndex % ACCENTS.length];
  const alreadyDone = isLevelComplete(level.id);

  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [hits, setHits] = useState(0);
  const [hitFlash, setHitFlash] = useState(0);
  const [heartsLeft, setHeartsLeft] = useState(() => getSnapshot().hearts);
  const [outcome, setOutcome] = useState<'fighting' | 'won' | 'lost'>('fighting');

  const total = questions.length;
  const bossHp = total - hits;
  const question = questions[qIndex];

  const pick = (i: number) => {
    if (answered || outcome !== 'fighting') return;
    setSelected(i);
    setAnswered(true);
    if (i === question.correct) {
      setHits((h) => h + 1);
      setHitFlash((f) => f + 1);
      if (!alreadyDone) awardXp(XP_PER_CORRECT, 'Boss hit');
    } else {
      const left = alreadyDone ? heartsLeft : loseHeart();
      setHeartsLeft(left);
      if (left <= 0) setOutcome('lost');
    }
  };

  const next = () => {
    if (outcome !== 'fighting') return;
    if (qIndex >= total - 1) {
      // Ran the whole gauntlet — the boss falls if most hits landed.
      if (hits >= Math.ceil(total * 0.6)) {
        if (!alreadyDone) awardXp(XP_PER_BOSS, `Beat the ${unit.title} boss`);
        setOutcome('won');
      } else {
        setOutcome('lost');
      }
      return;
    }
    setQIndex((i) => i + 1);
    setSelected(null);
    setAnswered(false);
  };

  const mood = outcome === 'won' ? 'ko' : answered && selected === question?.correct ? 'hurt' : 'idle';

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#141824] to-[#0b0d12] text-white">
      <div className="mx-auto w-full max-w-4xl px-4 pt-4 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            aria-label="Retreat to the unit map"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 transition-transform hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em]" style={{ color: accent }}>
              <Swords className="h-3.5 w-3.5" /> Boss battle
            </p>
            <h1 className="truncate text-lg font-extrabold lg:text-xl">{unit.title}</h1>
          </div>
          <div className="flex shrink-0 items-center gap-1" aria-label={`${heartsLeft} hearts left`}>
            {Array.from({ length: getSnapshot().maxHearts }).map((_, i) => (
              <Heart key={i} className={`h-5 w-5 ${i < heartsLeft ? 'fill-accent text-accent' : 'text-white/25'}`} />
            ))}
          </div>
        </div>

        {/* Boss HP bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-widest text-white/70">
            <span>Boss HP</span>
            <span>{Math.max(0, bossHp)} / {total}</span>
          </div>
          <div className="mt-1.5 h-3.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(Math.max(0, bossHp) / Math.max(1, total)) * 100}%`, backgroundColor: accent }}
            />
          </div>
        </div>
      </div>

      {outcome === 'fighting' && question && (
        <div className="mx-auto grid w-full max-w-4xl flex-1 gap-6 px-4 pb-24 pt-4 lg:grid-cols-[280px_1fr] lg:px-8">
          <BossBot key={hitFlash} mood={mood} hit={answered && selected === question.correct} accent={accent} className="mx-auto w-52 lg:w-full" />
          <div className="rounded-3xl bg-white p-5 text-text-primary shadow-overlay dark:bg-[#161b28] dark:text-white lg:p-6">
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-widest text-text-light">
              Question {qIndex + 1} of {total}
            </p>
            <QuestionCard question={question} selected={selected} answered={answered} onSelect={pick} />
            {answered && (
              <button
                onClick={next}
                className="mt-5 w-full rounded-2xl px-6 py-3.5 font-extrabold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: accent }}
              >
                {qIndex >= total - 1 ? 'Finish the fight' : selected === question.correct ? 'Strike again!' : 'Shake it off — next'}
              </button>
            )}
          </div>
        </div>
      )}

      {outcome === 'won' && (
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 text-center">
          <BossBot mood="ko" hit={false} accent={accent} className="w-56" />
          <h2 className="mt-4 text-3xl font-extrabold">Boss defeated!</h2>
          <p className="mt-2 text-sm text-white/80">
            {hits} of {total} hits landed{alreadyDone ? ' (replay — no extra XP)' : ` · +${XP_PER_BOSS + hits * XP_PER_CORRECT} XP`}. The next unit is now open.
          </p>
          <button
            onClick={onComplete}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-6 py-3.5 font-extrabold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <Trophy className="h-5 w-5" /> Claim the castle
          </button>
        </div>
      )}

      {outcome === 'lost' && (
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 text-center">
          <BossBot mood="idle" hit={false} accent={accent} className="w-56" />
          <h2 className="mt-4 text-3xl font-extrabold">{heartsLeft <= 0 ? 'Out of hearts!' : 'The boss held on!'}</h2>
          <p className="mt-2 text-sm text-white/80">
            {heartsLeft <= 0
              ? 'Hearts refill tomorrow — or reread a lesson and come back stronger.'
              : `You landed ${hits} of ${total}. Land ${Math.ceil(total * 0.6)} to win. Reread the lessons and try again!`}
          </p>
          <button
            onClick={onExit}
            className="mt-7 w-full rounded-2xl bg-white/15 px-6 py-3.5 font-extrabold text-white transition-transform hover:scale-105 active:scale-95"
          >
            Back to the island
          </button>
        </div>
      )}
    </div>
  );
};

export default BossBattleScreen;
