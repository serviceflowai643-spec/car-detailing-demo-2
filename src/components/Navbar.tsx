import React, { useState } from 'react';
import { Phone, Menu, X, Shield, Calendar, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/detailingData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href="#"
          className="group flex items-center gap-3 transition-opacity focus:outline-none"
          aria-label="Pure Detailing UK Home"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-neutral-900 border border-amber-500/40 text-amber-400 shadow-inner group-hover:border-amber-400 transition-colors">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-wider text-base sm:text-lg text-white font-sans uppercase">
              Pure Detailing <span className="text-amber-400">UK</span>
            </span>
            <span className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
              Chelmsford • CM1 3QL
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          <button
            onClick={() => scrollTo('services')}
            className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => scrollTo('before-after')}
            className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Before & After
          </button>
          <button
            onClick={() => scrollTo('process')}
            className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer"
          >
            Our Process
          </button>
          <button
            onClick={() => scrollTo('gallery')}
            className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollTo('reviews')}
            className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer"
          >
            Reviews
          </button>
          <button
            onClick={() => scrollTo('location')}
            className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer"
          >
            Location
          </button>
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={BUSINESS_INFO.phoneTel}
            className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/60 px-3.5 py-2 text-xs font-semibold text-neutral-200 hover:border-amber-500/50 hover:text-white transition-all shadow-sm"
            aria-label={`Call ${BUSINESS_INFO.phoneDisplay}`}
          >
            <Phone className="h-3.5 w-3.5 text-amber-400" />
            <span>{BUSINESS_INFO.phoneDisplay}</span>
          </a>

          <button
            onClick={() => {
              scrollTo('booking');
              onOpenBooking();
            }}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer active:scale-95"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Get a Quote</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={BUSINESS_INFO.phoneTel}
            className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-900 text-amber-400"
            aria-label="Call Pure Detailing UK"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-neutral-800 bg-neutral-950/98 px-5 py-6 lg:hidden animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => scrollTo('services')}
              className="flex items-center justify-between text-left text-base font-medium text-neutral-300 hover:text-amber-400 py-2 border-b border-neutral-900"
            >
              <span>Services</span>
              <span className="text-xs text-neutral-500">6 Detailing Packages</span>
            </button>
            <button
              onClick={() => scrollTo('before-after')}
              className="flex items-center justify-between text-left text-base font-semibold text-amber-400 py-2 border-b border-neutral-900"
            >
              <span>Before & After Comparison</span>
              <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">Priority</span>
            </button>
            <button
              onClick={() => scrollTo('process')}
              className="flex items-center justify-between text-left text-base font-medium text-neutral-300 hover:text-amber-400 py-2 border-b border-neutral-900"
            >
              <span>Our Process</span>
              <span className="text-xs text-neutral-500">4-Stage Methodology</span>
            </button>
            <button
              onClick={() => scrollTo('gallery')}
              className="flex items-center justify-between text-left text-base font-medium text-neutral-300 hover:text-amber-400 py-2 border-b border-neutral-900"
            >
              <span>Detailing Gallery</span>
              <span className="text-xs text-neutral-500">Studio Shots</span>
            </button>
            <button
              onClick={() => scrollTo('reviews')}
              className="flex items-center justify-between text-left text-base font-medium text-neutral-300 hover:text-amber-400 py-2 border-b border-neutral-900"
            >
              <span>Google Reviews</span>
              <span className="text-xs text-amber-400">5.0 ★</span>
            </button>
            <button
              onClick={() => scrollTo('location')}
              className="flex items-center justify-between text-left text-base font-medium text-neutral-300 hover:text-amber-400 py-2 border-b border-neutral-900"
            >
              <span>Location & Studio</span>
              <span className="text-xs text-neutral-500">Chelmsford</span>
            </button>

            <div className="pt-4 flex flex-col gap-3">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 py-3 text-sm font-semibold text-white hover:border-amber-400"
              >
                <Phone className="h-4 w-4 text-amber-400" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>
              <button
                onClick={() => {
                  scrollTo('booking');
                  onOpenBooking();
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-sm font-bold uppercase tracking-wider text-black shadow-lg shadow-amber-500/20"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Now / Request Quote</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
