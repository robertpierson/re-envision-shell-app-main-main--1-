import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import Button from '../ui/Button';
import Sandy from '../ui/Sandy';
import { backendConfigured, signInAsGuest, signInWithEmail, verifyEmailCode } from '../lib/supabase';

interface Props {
  onComplete: () => void;
}

// Real auth: guest = Supabase anonymous session (falls back to local-only if
// the backend is unreachable), email = one-time code / magic link.
const SignIn: React.FC<Props> = ({ onComplete }) => {
  const [mode, setMode] = useState<'landing' | 'email' | 'code'>('landing');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);

  const finish = () => {
    setClosing(true);
    setTimeout(onComplete, 200);
  };

  const guest = async () => {
    setBusy(true);
    await signInAsGuest(); // best effort — local-only is a fine outcome
    setBusy(false);
    finish();
  };

  const sendEmail = async () => {
    if (!email.includes('@')) {
      setNotice('That does not look like an email address.');
      return;
    }
    setBusy(true);
    const res = await signInWithEmail(email);
    setBusy(false);
    setNotice(res.message);
    if (res.ok) setMode('code');
  };

  const submitCode = async () => {
    setBusy(true);
    const ok = await verifyEmailCode(email, code.trim());
    setBusy(false);
    if (ok) finish();
    else setNotice('Code not accepted — if your email had a link instead, tap that and come back.');
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
        <Sandy pose="portrait" float className="mx-auto mb-3 w-28 object-contain" />

        <h1 className="text-xl font-bold text-text-primary">Welcome to ReEnvision</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Sign in to appear on the class leaderboard, or play as a guest.
        </p>

        <div className="mt-6 space-y-3">
          {mode === 'landing' && (
            <>
              <Button variant="primary" className="w-full !py-3 !text-base" onClick={guest} disabled={busy}>
                {busy ? 'Starting…' : 'Start learning'}
              </Button>
              <button
                onClick={() => setMode('email')}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-neutral/60 dark:bg-white/5 px-4 py-3 text-sm font-semibold text-text-primary shadow-panel transition hover:shadow-card-hover"
              >
                <Mail className="h-4 w-4" />
                Sign in with email
              </button>
            </>
          )}
          {mode === 'email' && (
            <>
              <input
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input !text-base text-center"
              />
              <Button variant="primary" className="w-full !py-3 !text-base" onClick={sendEmail} disabled={busy}>
                {busy ? 'Sending…' : 'Send me a sign-in code'}
              </Button>
            </>
          )}
          {mode === 'code' && (
            <>
              <input
                autoFocus
                inputMode="numeric"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="6-digit code"
                className="input !text-base text-center tracking-[0.4em]"
              />
              <Button variant="primary" className="w-full !py-3 !text-base" onClick={submitCode} disabled={busy || code.trim().length < 6}>
                {busy ? 'Checking…' : 'Verify code'}
              </Button>
            </>
          )}
        </div>

        {mode !== 'landing' && (
          <button
            onClick={guest}
            className="mt-5 text-sm font-semibold text-text-secondary transition hover:text-text-primary"
          >
            Skip — play as guest
          </button>
        )}

        {notice && <p className="mt-4 text-xs font-semibold text-text-secondary">{notice}</p>}
        {!backendConfigured && (
          <p className="mt-4 text-xs text-text-light">
            Offline build — progress stays on this device.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignIn;
