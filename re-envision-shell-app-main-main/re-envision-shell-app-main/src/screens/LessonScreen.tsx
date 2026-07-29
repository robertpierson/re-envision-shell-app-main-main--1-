import React, { useState } from 'react';
import { X, BookOpen, ExternalLink } from 'lucide-react';
import { findUnit } from '../data/curriculum';

interface LessonScreenProps {
  lessonId?: string;
  onExit: () => void;
}

// Reads a unit from public/curriculum/. Each unit is a self-contained HTML
// page — three lessons, worked code, and a quiz with toggleable answers — so
// it is loaded in a frame rather than re-implemented as React state.
const LessonScreen: React.FC<LessonScreenProps> = ({ lessonId, onExit }) => {
  const unit = findUnit(lessonId);
  const [loaded, setLoaded] = useState(false);

  if (!unit) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center lg:ml-64">
        <BookOpen className="h-10 w-10 text-text-light" />
        <p className="text-lg font-bold text-text-primary">That unit isn&apos;t available yet.</p>
        <button
          onClick={onExit}
          className="rounded-2xl bg-primary px-5 py-2.5 font-semibold text-white"
        >
          Back to courses
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:ml-64">
      <div className="mx-auto w-full max-w-4xl px-4 pt-4 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-text-primary">{unit.title}</p>
            <p className="text-sm text-text-light">
              {unit.lessons.length} lessons · {unit.quizCount} quiz questions
            </p>
          </div>
          <button
            onClick={onExit}
            aria-label="Close unit"
            className="rounded-lg p-2 transition-colors hover:bg-neutral-dark/10 dark:hover:bg-white/10"
          >
            <X className="w-6 h-6 text-text-light" />
          </button>
        </div>

        <ol className="mt-3 flex flex-wrap gap-2 text-xs text-text-light">
          {unit.lessons.map((lesson, index) => (
            <li key={lesson} className="rounded-full border border-neutral-dark/20 px-3 py-1">
              {index + 1}. {lesson}
            </li>
          ))}
        </ol>
      </div>

      <div className="relative mt-4 flex-1 px-4 pb-6 lg:px-8">
        {!loaded && (
          <p className="absolute inset-x-0 top-8 text-center text-sm text-text-light">
            Loading unit…
          </p>
        )}
        <iframe
          src={unit.href}
          title={unit.title}
          onLoad={() => setLoaded(true)}
          className="h-[calc(100vh-13rem)] w-full rounded-3xl border border-neutral-dark/15"
        />
        <a
          href={unit.href}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          Open in a new tab <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default LessonScreen;
