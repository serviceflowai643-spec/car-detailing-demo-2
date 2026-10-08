import React from 'react';
import { DETAILING_STEPS } from '../data/detailingData';
import { Sparkles, ShieldCheck, Gauge, Wrench } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-20 sm:py-28 bg-neutral-950 border-b border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">
            <Gauge className="h-3.5 w-3.5" />
            <span>Strict Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            Our 4-Stage <span className="text-amber-400">Detailing Protocol</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Every vehicle undergoing treatment at Pure Detailing UK follows a proven, non-destructive methodology to safely enhance and protect your vehicle.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DETAILING_STEPS.map((item, index) => (
            <div
              key={item.step}
              className="relative flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 backdrop-blur-sm hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-extrabold font-mono text-amber-400">
                  {item.step}
                </span>
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                  Stage {index + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white uppercase font-sans mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Studio Note */}
        <div className="mt-12 rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900 to-neutral-950 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white uppercase font-sans">
                Non-Destructive Clear Coat Preservation
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                We measure paint thickness in microns across every panel prior to machine polishing, guaranteeing maximum gloss with minimal clear coat reduction.
              </p>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <span className="inline-block rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200">
              Studio Bay: CM1 3QL Chelmsford
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
