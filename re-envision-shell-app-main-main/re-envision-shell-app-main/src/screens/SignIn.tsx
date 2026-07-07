import React, { useState } from 'react';
import { Mail, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

interface Props {
  onComplete: () => void;
}

const SignIn: React.FC<Props> = ({ onComplete }) => {
  const [mode, setMode] = useState<'landing' | 'email'>('landing');
  const [email, setEmail] = useState('');
  const [closing, setClosing] = useState(false);

  const finish = () => {
    setClosing(true);
    setTimeout(onComplete, 200);
  };

  return (
    <div
      className={`
        fixed inset-0 z-[100] flex items-center justify-center p-4
        bg-black/40 backdrop-blur-sm
        transition-opacity duration-200 ease-out
        ${closing ? 'opacity-0' : 'animate-overlay-in'}
      `}
    >
      <div
        className={`
          w-full max-w-sm rounded-3xl bg-white dark:bg-neutral-dark
          shadow-overlay p-8 text-center
          transition-all duration-200 ease-out
          ${closing ? 'scale-95 opacity-0' : 'animate-scale-in'}
        `}
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Sparkles className="h-7 w-7" />
        </div>

        <h1 className="text-xl font-bold text-text-primary">Welcome to ReEnvision</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Sign in to sync your progress, or continue as a guest.
        </p>

        <div className="mt-6 space-y-3">
          {mode === 'landing' ? (
            <>
              <Button variant="primary" className="w-full !py-3 !text-base" onClick={finish}>
                Continue with Google
              </Button>
              <button
                onClick={() => setMode('email')}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-neutral/60 dark:bg-white/5 px-4 py-3 text-sm font-semibold text-text-primary shadow-panel transition hover:shadow-card-hover"
              >
                <Mail className="h-4 w-4" />
                Sign in with email
              </button>
            </>
          ) : (
            <>
              <input
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input !text-base text-center"
              />
              <Button variant="primary" className="w-full !py-3 !text-base" onClick={finish}>
                Continue
              </Button>
            </>
          )}
        </div>

        <button
          onClick={finish}
          className="mt-5 text-sm font-semibold text-text-secondary transition hover:text-text-primary"
        >
          Continue as guest
        </button>

        <p className="mt-4 text-xs text-text-light">
          Placeholder flow — authentication to be integrated later.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
