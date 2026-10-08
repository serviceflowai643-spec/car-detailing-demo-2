import React, { useState } from 'react';
import { OpeningAnimation } from './components/OpeningAnimation';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsAndLocation } from './components/ReviewsAndLocation';
import { ContactBookingForm } from './components/ContactBookingForm';
import { Footer } from './components/Footer';
import { AIAssistant } from './components/AIAssistant';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('Paint Enhancement');
  const [introFinished, setIntroFinished] = useState<boolean>(false);

  const scrollToBooking = (service?: string) => {
    if (service) {
      setSelectedService(service);
    }
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col overflow-x-hidden">
      {/* Website Opening Intro Animation */}
      <OpeningAnimation onComplete={() => setIntroFinished(true)} />

      {/* Top Navigation */}
      <Navbar onOpenBooking={() => scrollToBooking()} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onBookNow={() => scrollToBooking()}
          onGetQuote={() => scrollToBooking()}
        />

        {/* Priority 1: Before & After Same-Vehicle Comparison */}
        <BeforeAfterSlider onBookDetailing={() => scrollToBooking('Full Detail')} />

        {/* Specialist Detailing Services with Verified Photos */}
        <ServicesSection onSelectService={(service) => scrollToBooking(service)} />

        {/* 4-Stage Detailing Methodology */}
        <ProcessSection />

        {/* Studio Detailing Gallery with Lightbox */}
        <GallerySection />

        {/* Client Reputation & Workshop Location */}
        <ReviewsAndLocation />

        {/* Complete 9-Field Booking & Quote Form */}
        <ContactBookingForm initialService={selectedService} />
      </main>

      {/* Footer with Business Details */}
      <Footer />

      {/* Compact Circular AI Assistant (Closed: 48px circular logo only) */}
      <AIAssistant />
    </div>
  );
}
