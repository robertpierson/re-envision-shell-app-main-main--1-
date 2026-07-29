import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { QuizQuestion } from '../data/quizzes';

interface QuestionCardProps {
  question: QuizQuestion;
  selected: number | null;
  answered: boolean;
  onSelect: (index: number) => void;
}

// One interactive question: pick an option, get instant right/wrong color,
// and the explanation from the curriculum appears underneath.
const QuestionCard: React.FC<QuestionCardProps> = ({ question, selected, answered, onSelect }) => (
  <div>
    <p className="text-base font-bold leading-relaxed text-text-primary dark:text-white lg:text-lg">
      {question.stem}
    </p>

    <div className="mt-4 space-y-2.5">
      {question.choices.map((choice, i) => {
        const isPicked = selected === i;
        const isRight = i === question.correct;
        let look =
          'border-neutral-dark/15 bg-white hover:border-primary/60 dark:border-white/15 dark:bg-white/5';
        if (answered && isRight) look = 'border-[#58CC02] bg-[#58CC02]/10';
        else if (answered && isPicked) look = 'border-accent bg-accent/10';
        else if (isPicked) look = 'border-primary bg-primary/10';

        return (
          <button
            key={i}
            disabled={answered}
            onClick={() => onSelect(i)}
            className={`flex w-full items-start gap-3 rounded-2xl border-2 p-3.5 text-left transition ${look} ${
              answered ? '' : 'active:scale-[0.99]'
            }`}
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-dark/10 text-xs font-extrabold text-text-secondary dark:bg-white/10 dark:text-neutral-300">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="text-sm font-semibold leading-relaxed text-text-primary dark:text-neutral-100">
              {choice}
            </span>
            {answered && isRight && <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-[#58CC02]" />}
            {answered && isPicked && !isRight && <XCircle className="ml-auto h-5 w-5 shrink-0 text-accent" />}
          </button>
        );
      })}
    </div>

    {answered && question.explain && (
      <div
        className={`mt-4 rounded-2xl border-l-4 p-4 text-sm leading-relaxed ${
          selected === question.correct
            ? 'border-[#58CC02] bg-[#58CC02]/10 text-text-primary dark:text-neutral-100'
            : 'border-accent bg-accent/10 text-text-primary dark:text-neutral-100'
        }`}
      >
        <p className="font-extrabold">{selected === question.correct ? 'Correct!' : 'Not quite.'}</p>
        <p className="mt-1">{question.explain}</p>
      </div>
    )}
  </div>
);

export default QuestionCard;
