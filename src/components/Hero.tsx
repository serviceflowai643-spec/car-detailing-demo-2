import React from 'react';
import { Phone, ShieldCheck, Sparkles, MapPin, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/detailingData';

interface HeroProps {
  onBookNow: () => void;
  onGetQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookNow, onGetQuote }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-neutral-800 bg-neutral-950">
      {/* Background Image with Dark Automotive Vignette Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/src/assets/images/hero_detailing_1791441008724.jpg"
          alt="Professional automotive detailer machine polishing a luxury vehicle at Pure Detailing UK studio in Chelmsford"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center filter brightness-[0.38] contrast-[1.12] transform scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Badges */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 rounded-full border border-neutral-700/80 bg-neutral-900/80 px-4 py-1.5 backdrop-blur-md mb-8 shadow-xl">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold">{BUSINESS_INFO.googleRating} Google Rating</span>
            <span className="text-neutral-400 text-xs">({BUSINESS_INFO.googleReviewCount} Reviews)</span>
          </div>
          <span className="h-3 w-px bg-neutral-700" />
          <div className="flex items-center gap-1.5 text-neutral-300 text-xs font-medium">
            <MapPin className="h-3.5 w-3.5 text-amber-400" />
            <span>Unit 16, Chelmsford CM1 3QL</span>
          </div>
          <span className="h-3 w-px bg-neutral-700 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-1 text-neutral-300 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Master Detailers Alex & Nathan</span>
          </div>
        </div>

        {/* Main H1 - Single H1 on page per SEO specs */}
        <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl uppercase font-sans">
          Professional Car Detailing in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
            Chelmsford
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
          Bespoke paint correction, multi-stage machine polishing, deep interior rejuvenation, and professional ceramic coatings. Dedicated automotive care tailored to restore and protect your vehicle.
        </p>

        {/* CTA Buttons - Tested per specification #5 */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Book Now */}
          <button
            onClick={onBookNow}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-amber-300 transition-all cursor-pointer active:scale-95 group"
          >
            <span>Book Now</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Get a Quote */}
          <button
            onClick={onGetQuote}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl border border-neutral-700 bg-neutral-900/90 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:border-amber-400 hover:bg-neutral-800 transition-all cursor-pointer shadow-md"
          >
            <span>Get a Quote</span>
          </button>

          {/* Call Now */}
          <a
            href={BUSINESS_INFO.phoneTel}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-7 py-4 text-sm font-semibold text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 transition-all shadow-md"
            aria-label={`Call Pure Detailing UK at ${BUSINESS_INFO.phoneDisplay}`}
          >
            <Phone className="h-4 w-4 text-amber-400 animate-pulse" />
            <span>Call Now: {BUSINESS_INFO.phoneDisplay}</span>
          </a>
        </div>

        {/* Core Pillars */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl text-left">
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <CheckCircle2 className="h-4 w-4" />
              <span>Same Vehicle Matched</span>
            </div>
            <p className="text-xs text-neutral-400">Authentic condition before & after comparisons</p>
          </div>

          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Dedicated Studio</span>
            </div>
            <p className="text-xs text-neutral-400">Unit 16, Yard, 1 Pool's Ln, Chelmsford</p>
          </div>

          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <Star className="h-4 w-4 fill-amber-400" />
              <span>5.0 Star Rated</span>
            </div>
            <p className="text-xs text-neutral-400">Alex & Nathan's verified client satisfaction</p>
          </div>

          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4" />
              <span>9H Ceramic Armor</span>
            </div>
            <p className="text-xs text-neutral-400">Multi-year paint and clear-coat shielding</p>
          </div>
        </div>
      </div>
    </section>
  );
};
