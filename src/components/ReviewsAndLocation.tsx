import React from 'react';
import { Star, MapPin, Phone, Clock, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/detailingData';

export const ReviewsAndLocation: React.FC = () => {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-neutral-950 border-b border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">
            <Star className="h-3.5 w-3.5 fill-amber-400" />
            <span>Verified Reputation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            Client Rating & <span className="text-amber-400">Workshop Location</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Directly managed and operated by Alex and Nathan. Serving Chelmsford and surrounding Essex areas from our dedicated studio bay.
          </p>
        </div>

        {/* 2-Column Layout: Reviews on Left, Location on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left: Verified Google Review Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-sm">
            <div>
              {/* Google Rating Header */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white font-mono">
                      {BUSINESS_INFO.googleRating.toFixed(1)}
                    </span>
                    <span className="text-sm font-semibold text-neutral-400">out of 5.0</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-lg bg-neutral-800 px-3 py-1 text-xs font-semibold text-neutral-300">
                    Google Business
                  </span>
                  <p className="text-xs text-neutral-400 mt-1">
                    {BUSINESS_INFO.googleReviewCount} Verified Reviews
                  </p>
                </div>
              </div>

              {/* The Actual Verified Review */}
              <div className="relative rounded-xl bg-neutral-950 p-6 border border-neutral-800/80 mb-6">
                <div className="text-amber-400 text-3xl font-serif leading-none mb-3">“</div>
                <blockquote className="text-lg sm:text-xl font-medium text-white italic leading-relaxed">
                  {BUSINESS_INFO.verifiedReview.quote}
                </blockquote>
                <div className="mt-4 flex items-center justify-between text-xs text-neutral-400 border-t border-neutral-900 pt-3">
                  <span className="font-semibold text-amber-300 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    Verified Customer
                  </span>
                  <span>Google Review</span>
                </div>
              </div>

              {/* Detailers guarantee */}
              <div className="flex items-start gap-3 text-xs text-neutral-300 bg-neutral-900/90 p-4 rounded-xl border border-neutral-800">
                <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Personal Touch by Alex & Nathan:</strong> No rushed apprenticeships or high-volume turnover. Each vehicle is personally inspected, corrected, and protected by the business owners.
                </p>
              </div>
            </div>

            {/* Call link */}
            <div className="mt-6 pt-6 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-400">Questions about your car?</span>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right: Studio Location & Contact Info */}
          <div id="location" className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-sm">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white uppercase font-sans">
                    Chelmsford Detailing Studio
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Secure, indoor climate-controlled bay
                  </p>
                </div>
              </div>

              {/* Exact Address */}
              <div className="space-y-4 mb-6">
                <div className="rounded-xl bg-neutral-950 p-4 border border-neutral-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    Studio Address:
                  </span>
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {BUSINESS_INFO.location}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl bg-neutral-950 p-3.5 border border-neutral-800">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                      <Phone className="h-3.5 w-3.5" />
                      <span>Phone Line</span>
                    </div>
                    <a
                      href={BUSINESS_INFO.phoneTel}
                      className="text-sm font-semibold text-white hover:text-amber-400 transition-colors block"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>

                  <div className="rounded-xl bg-neutral-950 p-3.5 border border-neutral-800">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Studio Hours</span>
                    </div>
                    <span className="text-xs font-semibold text-white block">
                      Mon – Sat: 8am – 6pm
                    </span>
                    <span className="text-[10px] text-neutral-400 block">
                      Sunday: By appointment
                    </span>
                  </div>
                </div>
              </div>

              {/* Directions / Map guidance */}
              <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-950/60 p-3 rounded-lg border border-neutral-800/80">
                Located conveniently at Unit 16 in Pool's Lane, Chelmsford. Secure parking and drop-off space available. Drop-off appointments and vehicle assessments can be booked online or via phone.
              </p>
            </div>

            {/* Direct Map Button */}
            <div className="mt-6 pt-6 border-t border-neutral-800">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-800 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-700 transition-colors border border-neutral-700 shadow-md"
              >
                <span>Open in Google Maps / Directions</span>
                <ExternalLink className="h-4 w-4 text-amber-400" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
