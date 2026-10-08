import React, { useState, useEffect } from 'react';
import { BookingFormData } from '../types';
import { BUSINESS_INFO, SERVICES } from '../data/detailingData';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Calendar, 
  Clock, 
  Car, 
  Mail, 
  User, 
  FileText,
  RotateCcw
} from 'lucide-react';

interface ContactBookingFormProps {
  initialService?: string;
}

export const ContactBookingForm: React.FC<ContactBookingFormProps> = ({ initialService }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    vehicleMakeModel: '',
    vehicleRegistration: '',
    service: initialService || 'Paint Enhancement',
    preferredDate: '',
    preferredTime: 'Morning (09:00 - 12:00)',
    message: '',
  });

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+44|0)[0-9\s-]{9,13}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please provide a valid UK telephone or mobile number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.vehicleMakeModel.trim()) {
      newErrors.vehicleMakeModel = 'Vehicle make and model is required (e.g. Porsche 911, BMW M3)';
    }

    if (!formData.vehicleRegistration.trim()) {
      newErrors.vehicleRegistration = 'Vehicle registration is required';
    }

    if (!formData.service) {
      newErrors.service = 'Please choose a detailing service';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate realistic asynchronous local submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedData({ ...formData });
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      vehicleMakeModel: '',
      vehicleRegistration: '',
      service: 'Paint Enhancement',
      preferredDate: '',
      preferredTime: 'Morning (09:00 - 12:00)',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <section id="booking" className="py-20 sm:py-28 bg-neutral-900/60 border-b border-neutral-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4">
            <Calendar className="h-3.5 w-3.5" />
            <span>Direct Studio Booking & Consultation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            Request a <span className="text-amber-400">Tailored Quote</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            Provide your vehicle details and required service below. Alex and Nathan will personally review your enquiry and provide honest pricing and availability.
          </p>
        </div>

        {/* Form or Confirmation View */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-10 shadow-2xl">
          {isSubmitted && submittedData ? (
            <div className="text-center py-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-6">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              
              <h3 className="text-2xl font-bold text-white uppercase font-sans">
                Quote Request Received
              </h3>
              
              <p className="mt-3 text-sm text-neutral-300 max-w-lg mx-auto">
                Thank you, <strong className="text-white">{submittedData.name}</strong>. Your enquiry for <strong className="text-amber-400">{submittedData.vehicleMakeModel}</strong> ({submittedData.vehicleRegistration.toUpperCase()}) has been logged for review by Alex & Nathan.
              </p>

              {/* Enquiry Summary Card */}
              <div className="mt-8 rounded-xl bg-neutral-900/80 p-5 border border-neutral-800 text-left max-w-lg mx-auto text-xs space-y-2">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Requested Service:</span>
                  <span className="font-semibold text-amber-300">{submittedData.service}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Target Date:</span>
                  <span className="font-semibold text-white">{submittedData.preferredDate} ({submittedData.preferredTime})</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Contact Telephone:</span>
                  <span className="font-semibold text-white">{submittedData.phone}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Contact Email:</span>
                  <span className="font-semibold text-white">{submittedData.email}</span>
                </div>
                {submittedData.message && (
                  <div className="pt-1">
                    <span className="text-neutral-400 block mb-1">Additional Notes:</span>
                    <p className="text-neutral-300 italic">{submittedData.message}</p>
                  </div>
                )}
              </div>

              {/* Urgent Contact Note */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors shadow-lg"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Directly: {BUSINESS_INFO.phoneDisplay}</span>
                </a>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 rounded-xl bg-neutral-900 border border-neutral-700 px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Submit Another Enquiry</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Full Name <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. John Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full rounded-xl bg-neutral-900/90 pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 border ${
                        errors.name ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-amber-400'
                      } focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Phone Number <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="e.g. 07875 500935"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full rounded-xl bg-neutral-900/90 pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 border ${
                        errors.phone ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-amber-400'
                      } focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                </div>
              </div>

              {/* Row 2: Email & Vehicle Make/Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="e.g. john@example.co.uk"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full rounded-xl bg-neutral-900/90 pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 border ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-amber-400'
                      } focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="vehicleMakeModel" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Vehicle Make & Model <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input
                      id="vehicleMakeModel"
                      type="text"
                      required
                      placeholder="e.g. BMW M4 Coupe / Range Rover Sport"
                      value={formData.vehicleMakeModel}
                      onChange={(e) => setFormData({ ...formData, vehicleMakeModel: e.target.value })}
                      className={`w-full rounded-xl bg-neutral-900/90 pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 border ${
                        errors.vehicleMakeModel ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-amber-400'
                      } focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.vehicleMakeModel && <p className="mt-1 text-xs text-red-400">{errors.vehicleMakeModel}</p>}
                </div>
              </div>

              {/* Row 3: Vehicle Registration & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="vehicleRegistration" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Vehicle Registration (Reg / Number Plate) <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="vehicleRegistration"
                      type="text"
                      required
                      placeholder="e.g. AB21 CDE"
                      value={formData.vehicleRegistration}
                      onChange={(e) => setFormData({ ...formData, vehicleRegistration: e.target.value.toUpperCase() })}
                      className={`w-full rounded-xl bg-neutral-900/90 px-4 py-3 text-sm font-mono uppercase text-white placeholder-neutral-500 border ${
                        errors.vehicleRegistration ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-amber-400'
                      } focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.vehicleRegistration && <p className="mt-1 text-xs text-red-400">{errors.vehicleRegistration}</p>}
                </div>

                <div>
                  <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Desired Detailing Service <span className="text-amber-400">*</span>
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full rounded-xl bg-neutral-900/90 px-4 py-3 text-sm text-white border border-neutral-800 focus:border-amber-400 focus:outline-none transition-colors"
                  >
                    {SERVICES.map((srv) => (
                      <option key={srv.id} value={srv.title} className="bg-neutral-950 text-white">
                        {srv.title} ({srv.duration})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="preferredDate" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Preferred Booking Date <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 pointer-events-none" />
                    <input
                      id="preferredDate"
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className={`w-full rounded-xl bg-neutral-900/90 pl-10 pr-4 py-3 text-sm text-white border ${
                        errors.preferredDate ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-amber-400'
                      } focus:outline-none transition-colors [color-scheme:dark]`}
                    />
                  </div>
                  {errors.preferredDate && <p className="mt-1 text-xs text-red-400">{errors.preferredDate}</p>}
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Preferred Drop-off Slot
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 pointer-events-none" />
                    <select
                      id="preferredTime"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full rounded-xl bg-neutral-900/90 pl-10 pr-4 py-3 text-sm text-white border border-neutral-800 focus:border-amber-400 focus:outline-none transition-colors"
                    >
                      <option value="Morning (08:30 - 10:00)" className="bg-neutral-950 text-white">Morning (08:30 - 10:00)</option>
                      <option value="Midday (11:00 - 13:00)" className="bg-neutral-950 text-white">Midday (11:00 - 13:00)</option>
                      <option value="Afternoon (14:00 - 16:00)" className="bg-neutral-950 text-white">Afternoon (14:00 - 16:00)</option>
                      <option value="Flexible / Contact Me" className="bg-neutral-950 text-white">Flexible / Contact Me</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 5: Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  Specific Requirements or Paint Concerns (Optional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Tell us about swirl marks, bird lime etching, pet hair, or specific ceramic packages you are interested in..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 border border-neutral-800 focus:border-amber-400 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Detailing Quote Request</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Privacy & Direct Contact Notice */}
              <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-900">
                <span>Personal data is kept strictly confidential.</span>
                <a href={BUSINESS_INFO.phoneTel} className="text-amber-400 hover:underline">
                  Or call directly: {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
