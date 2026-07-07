import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, PlayCircle, Heart } from 'lucide-react';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';

interface LessonScreenProps {
  lessonId?: string;
  onExit: () => void;
}

interface AssessmentQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

// Placeholder lesson screen (frontend-only content)
const LessonScreen: React.FC<LessonScreenProps> = ({ lessonId, onExit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [videoWatched, setVideoWatched] = useState(false);
  const [hearts] = useState(20);
  const [progress, setProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  // Placeholder multiple-choice assessment (frontend-only content)
  const questions: AssessmentQuestion[] = [
    {
      question: 'What is the main idea of the video?',
      options: [
        'AI systems think and reason like humans do',
        'AI systems recognize patterns learned from data',
        'AI systems are always 100% accurate',
        'AI systems require no training data',
      ],
      correctIndex: 1,
    },
    {
      question: 'Why is it important to watch the full clip before answering?',
      options: [
        'The ending has no relevant information',
        'Key context and nuance are often introduced later',
        'It is only a formality with no real value',
        'Questions never relate to the video content',
      ],
      correctIndex: 1,
    },
    {
      question: 'Which concept did the video emphasize most?',
      options: [
        'Memorization over understanding',
        'The importance of pattern recognition',
        'Manual rule-based programming',
        'Avoiding data entirely',
      ],
      correctIndex: 1,
    },
    {
      question: 'What will you do differently next time based on this video?',
      options: [
        'Trust AI output without verifying it',
        'Ignore the context window entirely',
        'Apply critical thinking before trusting AI answers',
        'Skip watching future lesson videos',
      ],
      correctIndex: 2,
    },
  ];
  const totalSteps = questions.length + 1;
  const lessonTitle = 'Understanding the Basics';
  const isVideoStep = currentStep === 0;
  const currentQuestion = questions[currentStep - 1];

  const handleSelectOption = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
    setAnswered(true);
  };

  const handleContinue = () => {
    if (isVideoStep) {
      if (!videoWatched) return;
      setCurrentStep(1);
      setProgress(20);
      return;
    }

    if (!answered) return;

    setSelectedOption(null);
    setAnswered(false);

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      setProgress((prev) => Math.min(100, prev + 20));
    } else {
      // Lesson complete
      onExit();
    }
  };

  const handleExit = () => {
    const confirm = window.confirm('Leave lesson? Your progress will not be saved.');
    if (confirm) {
      onExit();
    }
  };

  if (lessonId) {
    void lessonId;
  }

  const isCorrect = answered && selectedOption === currentQuestion?.correctIndex;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed lesson header removed to avoid a top header; close control is available in content */}

      {/* Lesson content area */}
      <div className="flex-1 lg:ml-64">
        <div className="max-w-3xl mx-auto px-4 lg:px-8 py-4 lg:py-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-sm font-semibold text-orange-600">
              <Heart className="h-4 w-4 fill-orange-500" />
              <span>{hearts}</span>
            </div>
            <button onClick={handleExit} className="p-2 rounded-lg hover:bg-neutral-dark/10 dark:hover:bg-white/10 transition-colors">
              <X className="w-6 h-6 text-text-light" />
            </button>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 lg:px-8 py-4 lg:py-12 pb-32">
          {/* Step indicator */}
          <div className="text-center mb-6 lg:mb-8">
            <p className="text-lg font-bold text-text-primary">{lessonTitle}</p>
            <span className="text-sm font-semibold text-text-light">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <ProgressBar progress={progress} className="mt-3 max-w-sm mx-auto" height="sm" />
          </div>

          {/* Placeholder content area */}
          <div className="card min-h-[420px] lg:min-h-[520px] p-6 lg:p-8">
            {isVideoStep ? (
              <div className="rounded-3xl bg-white dark:bg-white/5 shadow-panel p-4 lg:p-6 max-w-xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3">
                    <PlayCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Video introduction</p>
                    <h3 className="mt-2 text-xl font-bold text-text-primary">Watch the full video first</h3>
                  </div>
                </div>

                <div className="mt-5 h-52 rounded-3xl bg-gradient-to-br from-primary/10 via-white dark:via-transparent to-secondary/10 p-6 text-text-secondary flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-semibold">Video placeholder</p>
                    <p className="mt-2 text-sm text-text-secondary">This placeholder represents the full lesson video that must be watched before answering questions.</p>
                  </div>
                  <button
                    onClick={() => setVideoWatched(true)}
                    className={`mt-4 w-full rounded-2xl py-3 font-semibold transition ${videoWatched ? 'bg-primary text-white' : 'bg-secondary/10 text-secondary hover:bg-secondary/20'}`}
                  >
                    {videoWatched ? 'Video watched' : 'Mark video watched'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-xl mx-auto">
                <p className="text-xs uppercase tracking-[0.2em] text-text-secondary text-center">Question {currentStep}</p>
                <h3 className="mt-2 text-xl lg:text-2xl font-bold text-text-primary text-center">
                  {currentQuestion.question}
                </h3>

                <div className="mt-6 space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isRightAnswer = index === currentQuestion.correctIndex;

                    let stateStyles = 'bg-white dark:bg-white/5 shadow-panel hover:shadow-card-hover';
                    if (answered) {
                      if (isRightAnswer) {
                        stateStyles = 'bg-primary/10 shadow-[0_0_0_2px_rgba(28,176,246,0.6)] text-primary';
                      } else if (isSelected && !isRightAnswer) {
                        stateStyles = 'bg-accent/10 shadow-[0_0_0_2px_rgba(255,75,75,0.6)] text-accent';
                      } else {
                        stateStyles = 'bg-white dark:bg-white/5 shadow-panel opacity-60';
                      }
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => handleSelectOption(index)}
                        disabled={answered}
                        className={`w-full flex items-center justify-between gap-3 rounded-2xl px-5 py-4 text-left font-semibold text-text-primary transition-all ${stateStyles} ${
                          answered ? 'cursor-default' : 'cursor-pointer'
                        }`}
                      >
                        <span>{option}</span>
                        {answered && isRightAnswer && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
                        {answered && isSelected && !isRightAnswer && <XCircle className="w-5 h-5 text-accent shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {answered && (
                  <div
                    className={`mt-6 rounded-2xl px-4 py-3 text-sm font-semibold shadow-panel ${
                      isCorrect ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
                    }`}
                  >
                    {isCorrect ? 'Correct! Nice work.' : 'Not quite — the highlighted option is the best answer.'}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop lesson info sidebar */}
          <div className="hidden lg:block mt-8">
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white dark:bg-neutral-dark rounded-xl p-4 text-center shadow-panel">
                <p className="text-sm text-text-secondary">Unit Progress</p>
                <p className="text-2xl font-bold text-primary mt-1">2 of 5</p>
              </div>
              <div className="bg-white dark:bg-neutral-dark rounded-xl p-4 text-center shadow-panel">
                <p className="text-sm text-text-secondary">Accuracy</p>
                <p className="text-2xl font-bold text-secondary mt-1">87%</p>
              </div>
              <div className="bg-white dark:bg-neutral-dark rounded-xl p-4 text-center shadow-panel">
                <p className="text-sm text-text-secondary">Time</p>
                <p className="text-2xl font-bold text-text-primary mt-1">2:34</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-dark shadow-[0_-8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_-8px_24px_rgba(0,0,0,0.4)] p-4 lg:p-6">
        <div className="lg:ml-64">
          <div className="max-w-3xl mx-auto">
            <Button
              variant="primary"
              onClick={handleContinue}
              disabled={isVideoStep ? !videoWatched : !answered}
              className="w-full lg:w-auto lg:px-16 font-bold"
            >
              {isVideoStep && !videoWatched
                ? 'WATCH VIDEO FIRST'
                : !isVideoStep && !answered
                ? 'SELECT AN ANSWER'
                : currentStep === totalSteps - 1
                ? 'FINISH LESSON'
                : 'CONTINUE'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonScreen;
