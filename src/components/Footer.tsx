import React from 'react';
import { Sparkles, Phone, MapPin, Clock, Star, Heart } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/detailingData';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <span className="font-extrabold tracking-wider text-base text-white uppercase font-sans">
                  Pure Detailing <span className="text-amber-400">UK</span>
                </span>
                <span className="text-[10px] tracking-widest text-neutral-400 uppercase block">
                  Chelmsford • Essex
                </span>
              </div>
            </div>

            <p className="text-neutral-400 leading-relaxed text-xs">
              Specialist vehicle detailing, multi-stage paint correction, and ceramic surface protection managed personally by Alex & Nathan in Chelmsford.
            </p>

            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
              <Star className="h-4 w-4 fill-amber-400" />
              <span>{BUSINESS_INFO.googleRating} Google Rating ({BUSINESS_INFO.googleReviewCount} Reviews)</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Detailing Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('before-after')}
                  className="hover:text-amber-400 transition-colors text-left text-amber-300 font-medium"
                >
                  Before & After Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('process')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  4-Stage Methodology
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('gallery')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Studio Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('reviews')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Client Reviews & Location
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('booking')}
                  className="hover:text-amber-400 transition-colors text-left font-semibold text-white"
                >
                  Request a Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Specialist Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo('services')}
                    className="hover:text-amber-400 transition-colors text-left text-neutral-400"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Studio Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Workshop Contact
            </h4>
            <div className="flex items-start gap-2.5 text-neutral-300">
              <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <address className="not-italic text-xs leading-relaxed">
                {BUSINESS_INFO.location}
              </address>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-300">
              <Phone className="h-4 w-4 text-amber-400 shrink-0" />
              <a
                href={BUSINESS_INFO.phoneTel}
                className="hover:text-amber-400 transition-colors font-semibold"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
            <div className="flex items-start gap-2.5 text-neutral-400">
              <Clock className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{BUSINESS_INFO.hours}</span>
            </div>
            <div className="pt-2">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-semibold text-amber-400 hover:underline"
              >
                Get Directions to Studio →
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} Pure Detailing UK. All rights reserved. Registered in England & Wales.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with pride for</span>
            <span className="text-neutral-300 font-medium">Alex & Nathan</span>
            <span>in Chelmsford</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
