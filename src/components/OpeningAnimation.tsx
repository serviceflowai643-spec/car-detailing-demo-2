import React, { useState, useEffect } from 'react';
import { Sparkles, Shield, ChevronRight } from 'lucide-react';

interface OpeningAnimationProps {
  onComplete?: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'entering' | 'sweeping' | 'finishing' | 'exited'>('entering');
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setStage('exited');
      onComplete?.();
      return;
    }

    // Step-by-step automotive cinematic timeline
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    const sweepTimer = setTimeout(() => {
      setStage('sweeping');
    }, 500);

    const finishTimer = setTimeout(() => {
      setStage('finishing');
    }, 1800);

    const exitTimer = setTimeout(() => {
      setStage('exited');
      onComplete?.();
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(sweepTimer);
      clearTimeout(finishTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setStage('exited');
    onComplete?.();
  };

  if (stage === 'exited') return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 text-white select-none transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        stage === 'finishing' ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
      aria-label="Website intro animation"
    >
      {/* Background Subtle Hexagon LED Bay Motif */}
      <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-neutral-950 pointer-events-none" />

      {/* Cinematic Glint Light Beam */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -inset-full w-[200%] h-full bg-gradient-to-r from-transparent via-amber-400/10 to-transparent skew-x-[-25deg] transition-transform duration-1000 ${
            stage === 'sweeping' || stage === 'finishing'
              ? 'translate-x-full'
              : '-translate-x-full'
          }`}
        />
      </div>

      {/* Central Brand Reveal Container */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center max-w-md w-full">
        {/* Animated Brand Emblem */}
        <div className="relative mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 via-neutral-900 to-black border border-amber-500/50 text-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.25)] animate-pulse">
            <Sparkles className="h-10 w-10 text-amber-400 stroke-[1.8]" />
          </div>
          {/* Rotating halo ring */}
          <div className="absolute -inset-2 rounded-3xl border border-amber-500/20 animate-spin [animation-duration:8s] pointer-events-none" />
        </div>

        {/* Brand Name with Optical Gloss Wipe */}
        <div className="overflow-hidden">
          <span className="block text-2xl sm:text-3xl font-extrabold uppercase tracking-widest text-white font-sans drop-shadow-md">
            Pure Detailing <span className="text-amber-400">UK</span>
          </span>
        </div>

        {/* Subtitle */}
        <p className="mt-2 text-xs sm:text-sm font-semibold tracking-[0.25em] text-neutral-400 uppercase">
          Precision Studio • Chelmsford
        </p>

        {/* Inspection Laser Line */}
        <div className="mt-8 w-64 sm:w-80 h-1 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(251,191,36,0.9)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Phase Status Readout */}
        <div className="mt-4 flex items-center justify-between w-64 sm:w-80 text-[10px] uppercase font-mono tracking-wider text-neutral-500">
          <span className="text-amber-400/80">
            {progress < 40
              ? 'Calibrating Bay...'
              : progress < 80
              ? 'Inspecting Clear Coat...'
              : 'Studio Ready'}
          </span>
          <span className="text-neutral-400">{progress}%</span>
        </div>
      </div>

      {/* Skip Button (Bottom Right) */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 z-20 flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/80 px-4 py-1.5 text-xs font-semibold text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer backdrop-blur-md"
        aria-label="Skip opening animation"
      >
        <span>Skip Intro</span>
        <ChevronRight className="h-3.5 w-3.5 text-amber-400" />
      </button>
    </div>
  );
};
