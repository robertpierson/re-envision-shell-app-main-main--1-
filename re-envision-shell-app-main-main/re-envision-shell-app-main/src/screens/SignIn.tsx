import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import Button from '../ui/Button';
import Sandy from '../ui/Sandy';
import { backendConfigured, signInAsGuest, signInWithEmail, signInWithGoogle, verifyEmailCode } from '../lib/supabase';

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

  const google = async () => {
    setBusy(true);
    const res = await signInWithGoogle();
    setBusy(false);
    if (!res.ok) setNotice(res.message);
    // on success the browser navigates to Google, so nothing else to do here
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
              <button
                onClick={google}
                disabled={busy}
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#3c4043] shadow-panel transition hover:shadow-card-hover disabled:opacity-60"
              >
                <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                  <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.2 17.7 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9.1h12.4c-.5 2.9-2.2 5.4-4.7 7l7.6 5.9c4.4-4.1 6.8-10.985 6.8-17.4z" />
                  <path fill="#FBBC05" d="M10.4 28.7c-.5-1.4-.8-2.9-.8-4.7s.3-3.3.8-4.7l-7.8-6.1C.9 16.3 0 20 0 24s.9 7.7 2.6 10.8l7.8-6.1z" />
                  <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.8 2.3-8.3 2.3-6.3 0-11.7-3.7-13.6-9.8l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
                </svg>
                {busy ? 'Opening Google…' : 'Continue with Google'}
              </button>
              <button
                onClick={() => setMode('email')}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-neutral/60 dark:bg-white/5 px-4 py-3 text-sm font-semibold text-text-primary shadow-panel transition hover:shadow-card-hover"
              >
                <Mail className="h-4 w-4" />
                Sign in with email
              </button>
              <Button variant="primary" className="w-full !py-3 !text-base" onClick={guest} disabled={busy}>
                {busy ? 'Starting…' : 'Play as guest'}
              </Button>
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
