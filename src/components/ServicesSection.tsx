import React from 'react';
import { Clock, Check, Sparkles, ArrowRight, Shield } from 'lucide-react';
import { SERVICES } from '../data/detailingData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 sm:py-28 bg-neutral-900/40 border-b border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Master Crafted Automotive Treatments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            Our Specialist <span className="text-amber-400">Detailing Services</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Every package is executed by Alex and Nathan in our dedicated Chelmsford studio bay with medical-grade precision and industry-leading products.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="group flex flex-col rounded-2xl border border-neutral-800 bg-neutral-950/90 overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5"
            >
              {/* Service Image with Verified Matching Detailing Shot */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                <img
                  src={service.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                
                {/* Duration Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md bg-black/80 px-2.5 py-1 text-xs font-semibold text-neutral-200 border border-neutral-700 backdrop-blur-md">
                  <Clock className="h-3 w-3 text-amber-400" />
                  <span>{service.duration}</span>
                </div>
              </div>

              {/* Service Details */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors uppercase font-sans">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs font-medium text-amber-400/90 tracking-wide">
                  {service.tagline}
                </p>
                <p className="mt-3 text-sm text-neutral-300 leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="mt-5 space-y-2 border-t border-neutral-800/80 pt-4 flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">What's Included:</span>
                  <ul className="space-y-1.5 mt-2">
                    {service.features.slice(0, 4).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal For note */}
                <div className="mt-4 rounded-lg bg-neutral-900/60 p-2.5 border border-neutral-800/60 text-[11px] text-neutral-400">
                  <strong className="text-neutral-300">Recommended for: </strong>
                  {service.idealFor}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onSelectService(service.title)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3 text-xs font-bold uppercase tracking-wider text-white border border-neutral-700 hover:border-amber-400 hover:bg-amber-500 hover:text-black transition-all cursor-pointer group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-400"
                >
                  <span>Select & Request Quote</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
