import React, { useEffect, useState } from 'react';

interface Props {
  onFinish: () => void;
}

const SplashScreen: React.FC<Props> = ({ onFinish }) => {
  const [stage, setStage] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    const holdT = setTimeout(() => setStage('hold'), 60);
    const exitT = setTimeout(() => setStage('exit'), 1700);
    const finishT = setTimeout(() => onFinish(), 2050);
    return () => {
      clearTimeout(holdT);
      clearTimeout(exitT);
      clearTimeout(finishT);
    };
  }, [onFinish]);

  const visible = stage !== 'enter';
  const leaving = stage === 'exit';

  return (
    <div
      className={`
        min-h-screen flex items-center justify-center overflow-hidden
        bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500
        transition-opacity duration-300 ease-out
        ${leaving ? 'opacity-0' : 'opacity-100'}
      `}
    >
      {/* Ambient background glow accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />

      <div
        className={`
          relative text-center text-white transition-all duration-700 ease-out
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          ${leaving ? '!-translate-y-3 !opacity-0' : ''}
        `}
      >
        <div
          className={`
            mx-auto w-32 h-32 rounded-[2rem] bg-white/10 shadow-overlay
            flex items-center justify-center mb-6
            ${visible ? 'animate-logo-pop' : 'opacity-0'}
          `}
        >
          <img src="/icon.png" alt="ReEnvision logo" className="w-16 h-16" />
        </div>

        <h1
          className={`text-3xl font-bold tracking-tight transition-all duration-700 delay-150 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          ReEnvision
        </h1>
        <p
          className={`mt-2 text-white/85 transition-all duration-700 delay-300 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          AI literacy, reimagined
        </p>

        {/* Progress shimmer */}
        <div
          className={`mx-auto mt-8 h-1 w-40 overflow-hidden rounded-full bg-white/15 transition-opacity duration-700 delay-500 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="h-full w-full rounded-full bg-gradient-to-r from-white/10 via-white to-white/10 bg-[length:200%_100%] animate-shimmer"
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
