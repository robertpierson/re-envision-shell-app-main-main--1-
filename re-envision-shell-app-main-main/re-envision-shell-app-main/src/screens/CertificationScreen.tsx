import React, { useSyncExternalStore } from 'react';
import { Award, Clock, Lock } from 'lucide-react';
import { courses } from '../data/curriculum';
import { levelsOf, readProgress } from '../lib/progress';
import { getSnapshot, onStatsChange } from '../lib/stats';
import Sandy from '../ui/Sandy';

// One certification per course, named after the course it certifies. All four
// are locked while the programme is still being finished — each card shows how
// far along you are so progress still means something in the meantime.
const CERTS = [
  {
    courseId: 'course-1',
    title: 'Certified: Deep Learning Foundations',
    blurb: 'Perceptrons and activations through backprop, optimizers, regularization, CNNs and RNNs.',
    accent: 'from-blue-500 to-cyan-500',
  },
  {
    courseId: 'course-2',
    title: 'Certified: Foundational Model Development',
    blurb: 'Transformers, tokenization, pretraining objectives, scaling laws, PEFT and alignment.',
    accent: 'from-violet-500 to-fuchsia-500',
  },
  {
    courseId: 'course-3',
    title: 'Certified: Text Processing (NLP)',
    blurb: 'Preprocessing, TF-IDF, embeddings, LSTMs, BERT vs GPT, NER, seq2seq and RAG.',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    courseId: 'course-4',
    title: 'Certified: Computer Vision',
    blurb: 'Image representation, classical CV, CNNs, detection, segmentation, ViT and generative models.',
    accent: 'from-amber-500 to-orange-500',
  },
];

const CertificationScreen: React.FC = () => {
  useSyncExternalStore(onStatsChange, getSnapshot, getSnapshot);
  const done = readProgress();

  const progressFor = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return { done: 0, total: 0, pct: 0 };
    const levels = course.units.flatMap((u) => levelsOf(u));
    const finished = levels.filter((l) => done.has(l.id)).length;
    return { done: finished, total: levels.length, pct: Math.round((finished / levels.length) * 100) };
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-0">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Sandy pose="clipboard-done" className="h-24 w-24 shrink-0 object-contain" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Certification</p>
            <h1 className="mt-1 text-2xl font-bold text-text-primary dark:text-white lg:text-3xl">
              Four courses, four certificates
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-text-secondary dark:text-neutral-300">
              One certificate per course. They aren't open yet — but every level you clear counts
              toward the one it belongs to.
            </p>
          </div>
        </div>

        {/* Honest status instead of a purchase flow that goes nowhere */}
        <div className="mb-5 flex items-center gap-3 rounded-3xl bg-secondary/15 px-4 py-3">
          <Clock className="h-5 w-5 shrink-0 text-secondary" />
          <p className="text-sm font-semibold text-text-primary dark:text-white">
            Certificates aren't available yet — nothing to buy today. Keep clearing units; your
            progress carries over.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {CERTS.map((cert) => {
            const p = progressFor(cert.courseId);
            const course = courses.find((c) => c.id === cert.courseId);
            return (
              <div
                key={cert.courseId}
                className="relative overflow-hidden rounded-3xl bg-white shadow-panel dark:bg-neutral-dark"
              >
                <div className={`h-2 w-full bg-gradient-to-r ${cert.accent}`} />
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-2xl bg-gradient-to-br ${cert.accent} p-2.5 text-white`}>
                      <Award className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base font-extrabold leading-snug text-text-primary dark:text-white">
                        {cert.title}
                      </h2>
                      <p className="mt-1 text-xs text-text-secondary dark:text-neutral-400">
                        {course?.name ?? ''} · {p.total} levels
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-neutral-300">
                    {cert.blurb}
                  </p>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-bold text-text-secondary dark:text-neutral-300">
                      <span>Your progress</span>
                      <span>
                        {p.done}/{p.total} · {p.pct}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-neutral-dark/10 dark:bg-white/10">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${cert.accent} transition-all`}
                        style={{ width: `${p.pct}%` }}
                      />
                    </div>
                  </div>

                  <button
                    disabled
                    className="mt-4 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-neutral-dark/10 px-4 py-3 text-sm font-extrabold text-text-light dark:bg-white/10"
                  >
                    <Lock className="h-4 w-4" />
                    {p.pct === 100 ? 'Course complete — certificate opens soon' : 'Locked for now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CertificationScreen;
