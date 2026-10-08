import React, { useState, useRef, useCallback } from 'react';
import { ChevronsLeftRight, Sparkles, CheckCircle2, Eye, RefreshCw } from 'lucide-react';

interface BeforeAfterSliderProps {
  onBookDetailing: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onBookDetailing }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if capture already released
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(prev - 5, 0));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(prev + 5, 100));
    }
  };

  return (
    <section id="before-after" className="relative py-20 sm:py-28 bg-neutral-950 border-b border-neutral-800 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Single Composite Inspection</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            Before & After <span className="text-amber-400">Transformation</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            One single composite comparison showcasing the exact same black premium vehicle in the exact same studio setting. Drag the comparison divider to inspect road grime and dull paint on the left versus our mirror ceramic finish on the right.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-neutral-900 border border-neutral-800 px-4 py-2 text-xs text-neutral-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Single Image Composite:</strong> Exact same black car, model, wheels, camera angle, and lighting. Only surface condition changes across the divider.
            </span>
          </div>
        </div>

        {/* Quick View Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6">
          <button
            onClick={() => setSliderPosition(25)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
              sliderPosition < 35
                ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
            }`}
          >
            Inspect Before (Dirty Left)
          </button>
          <button
            onClick={() => setSliderPosition(50)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              sliderPosition >= 45 && sliderPosition <= 55
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
            }`}
          >
            <RefreshCw className="h-3 w-3" />
            <span>50 / 50 Center Split</span>
          </button>
          <button
            onClick={() => setSliderPosition(75)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
              sliderPosition > 65
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
            }`}
          >
            Inspect After (Detailed Right)
          </button>
        </div>

        {/* Comparison Slider Container with ONE SINGLE COMPOSITE IMAGE */}
        <div className="relative mx-auto max-w-5xl rounded-2xl border border-neutral-800 bg-neutral-900 p-2 sm:p-3 shadow-2xl">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Before and after vehicle detailing comparison slider"
            className="group relative aspect-[16/9] w-full overflow-hidden rounded-xl select-none cursor-ew-resize bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
            style={{ touchAction: 'none' }}
          >
            {/* ONE SINGLE REALISTIC COMPOSITE IMAGE LOADED */}
            <img
              src="/src/assets/images/single_composite_black_car_1791443483446.jpg"
              alt="Before and after single composite photo of the exact same black car: left half shows road grime, dust, and dull paint; right half shows high-gloss ceramic finish and clean wheels"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center pointer-events-none select-none"
            />

            {/* Left BEFORE Label & Badges */}
            <div className="absolute top-4 left-4 z-20 flex flex-col items-start gap-1.5 pointer-events-none">
              <div className="rounded-lg bg-black/85 backdrop-blur-md px-3.5 py-1.5 border border-red-500/60 shadow-lg">
                <span className="text-xs sm:text-sm font-extrabold tracking-wider text-red-400 uppercase">
                  BEFORE (LEFT HALF)
                </span>
              </div>
              <div className="hidden sm:flex flex-col gap-1 text-[11px] text-neutral-300 font-medium bg-black/75 backdrop-blur-sm p-2 rounded-lg border border-neutral-800">
                <span className="flex items-center gap-1.5 text-red-300">
                  • Road grime & splash mud
                </span>
                <span className="flex items-center gap-1.5 text-neutral-300">
                  • Brake dust on wheels & tires
                </span>
                <span className="flex items-center gap-1.5 text-neutral-400">
                  • Dull paintwork & water spots
                </span>
              </div>
            </div>

            {/* Right AFTER Label & Badges */}
            <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1.5 pointer-events-none">
              <div className="rounded-lg bg-black/85 backdrop-blur-md px-3.5 py-1.5 border border-emerald-500/60 shadow-lg">
                <span className="text-xs sm:text-sm font-extrabold tracking-wider text-emerald-400 uppercase flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  AFTER (RIGHT HALF)
                </span>
              </div>
              <div className="hidden sm:flex flex-col gap-1 text-[11px] text-neutral-300 font-medium bg-black/75 backdrop-blur-sm p-2 rounded-lg border border-neutral-800 text-right">
                <span className="flex items-center justify-end gap-1.5 text-emerald-300">
                  • Mirror-like ceramic gloss
                </span>
                <span className="flex items-center justify-end gap-1.5 text-neutral-300">
                  • Immaculate clean wheels
                </span>
                <span className="flex items-center justify-end gap-1.5 text-amber-300">
                  • 9H SiO2 Hydrophobic protection
                </span>
              </div>
            </div>

            {/* Draggable Vertical Divider Line */}
            <div
              className="absolute top-0 bottom-0 z-30 w-1 bg-gradient-to-b from-amber-400 via-white to-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.8)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Draggable Center Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-black shadow-2xl border-2 border-white ring-4 ring-black/40 group-hover:scale-110 active:scale-95 transition-transform">
                <ChevronsLeftRight className="h-6 w-6 stroke-[2.5]" />
              </div>
            </div>

            {/* Bottom Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="rounded-full bg-black/80 backdrop-blur-md px-3.5 py-1 border border-neutral-700/80 text-[11px] font-semibold text-neutral-300 shadow-md flex items-center gap-1.5">
                <Eye className="h-3 w-3 text-amber-400" />
                <span>Drag divider to inspect the composite vehicle</span>
              </div>
            </div>
          </div>

          {/* Under-Slider Technical Metrics */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-left p-2">
            <div className="rounded-xl bg-neutral-950/80 p-3 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Paintwork Reflection</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-red-400 line-through text-xs">Dull & Grimy</span>
                <span className="text-emerald-400 font-extrabold text-sm">Mirror Gloss</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">Machine polish refinement</p>
            </div>

            <div className="rounded-xl bg-neutral-950/80 p-3 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Surface Swirl Marks</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-red-400 text-xs">Visible Wash Scratches</span>
                <span className="text-emerald-400 font-extrabold text-sm">90%+ Corrected</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">Dual-action correction</p>
            </div>

            <div className="rounded-xl bg-neutral-950/80 p-3 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Wheel & Tire Finish</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-red-400 text-xs">Baked Brake Dust</span>
                <span className="text-emerald-400 font-extrabold text-sm">Decon & Dressed</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">Barrels & faces spotless</p>
            </div>

            <div className="rounded-xl bg-neutral-950/80 p-3 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Protective Shield</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-neutral-500 text-xs">Unprotected</span>
                <span className="text-amber-400 font-extrabold text-sm">9H Ceramic SiO2</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">Intense water beading</p>
            </div>
          </div>
        </div>

        {/* Section Bottom CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={onBookDetailing}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-7 py-3 text-sm font-bold uppercase tracking-wider text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all cursor-pointer active:scale-95"
          >
            <span>Book Your Transformation</span>
            <Sparkles className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
