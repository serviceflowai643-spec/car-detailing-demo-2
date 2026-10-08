export interface ServiceItem {
  id: string;
  title: string;
  category: 'exterior' | 'interior' | 'correction' | 'comprehensive' | 'protection';
  tagline: string;
  description: string;
  image: string;
  features: string[];
  duration: string;
  idealFor: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Exterior' | 'Interior' | 'Correction' | 'Ceramic' | 'Finished';
  image: string;
  description: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  vehicleMakeModel: string;
  vehicleRegistration: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
