import React from 'react';
import { Award, BookOpenCheck, Sparkles } from 'lucide-react';
import Card from '../ui/Card';
import { placeholderUnits } from '../data/placeholders';

const CertificationScreen: React.FC = () => {
  return (
    <div className="pb-20 lg:pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Certification</p>
            <h1 className="mt-2 text-3xl font-bold text-text-primary">AI Literacy Certification</h1>
            <p className="mt-2 max-w-2xl text-text-secondary">
              Complete the learning path and assessments to unlock your next achievement.
            </p>
          </div>
          <div className="rounded-2xl bg-white dark:bg-neutral-dark px-4 py-3 shadow-panel">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2 text-primary">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Ready to certify</p>
                <p className="text-sm text-text-secondary">2 modules left</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <BookOpenCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">Available Certifications</h2>
                <p className="mt-2 text-sm text-text-secondary">
                  Purchase a certification to validate your learning. Each listing is a one-time purchase of $39.99.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {['AI Literacy - Foundation', 'AI Literacy - Advanced', 'Prompting Mastery'].map((title) => {
                const incompleteUnits = placeholderUnits.filter(u => u.status !== 'completed').length;
                const disabled = incompleteUnits > 0;
                return (
                  <div key={title} className="flex items-center justify-between rounded-2xl bg-white dark:bg-white/5 shadow-panel p-4">
                    <div>
                      <p className="font-semibold text-text-primary">{title}</p>
                      <p className="text-sm text-text-secondary">One-time certification • $39.99</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (disabled) {
                            alert('Please complete the course units before certifying.');
                            return;
                          }
                          alert('Purchase flow placeholder — certification purchased.');
                        }}
                        className={`px-4 py-2 rounded-xl font-semibold ${disabled ? 'bg-neutral-dark/20 text-text-secondary' : 'bg-primary text-white'}`}>
                        {disabled ? 'Complete course first' : 'Purchase'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">
              <Sparkles className="h-4 w-4" />
              <span>Certification guidance</span>
            </div>
            <div className="mt-5 space-y-3">
              <p className="text-sm text-text-secondary">Complete all course units and assessments before attempting a certification. If you see the "Complete course first" state, you have unfinished units.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CertificationScreen;
