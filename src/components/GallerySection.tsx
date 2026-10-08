import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/detailingData';
import { GalleryItem } from '../types';
import { Sparkles, X, ZoomIn, CheckCircle2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Exterior', 'Interior', 'Correction', 'Ceramic', 'Finished'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-neutral-900/40 border-b border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Studio Detailing Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            Detailing <span className="text-amber-400">Gallery</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Every photo showcases authentic automotive detailing techniques: multi-stage machine correction, ceramic coating installation, snow foam pre-washes, and interior steam rejuvenation.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 cursor-pointer hover:border-amber-500/60 transition-all duration-300 shadow-md"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="h-full w-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="rounded-md bg-black/75 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 border border-neutral-800 backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="rounded-full bg-amber-500/90 p-1.5 text-black">
                  <ZoomIn className="h-4 w-4" />
                </div>
              </div>

              {/* Title & Description Overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <h3 className="text-sm font-bold text-white uppercase font-sans line-clamp-1 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-neutral-300 line-clamp-1 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl border border-neutral-700 bg-neutral-950 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 rounded-full bg-black/80 p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors border border-neutral-700"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            {/* High-res Image */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain"
              />
            </div>

            {/* Modal Caption */}
            <div className="p-6 bg-neutral-950 border-t border-neutral-800 text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider px-2 py-0.5 border border-amber-500/30">
                  {activeItem.category}
                </span>
                <span className="text-xs text-neutral-400">Pure Detailing UK Studio</span>
              </div>
              <h3 className="text-xl font-bold text-white uppercase font-sans">
                {activeItem.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
