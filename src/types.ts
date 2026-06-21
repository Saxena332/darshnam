export interface Vehicle {
  id: string;
  name: string;
  category: "Sedan" | "SUV" | "MUV" | "Tempo Traveller" | "Coobus";
  seatCount: number;
  luggageCount: number;
  ac: boolean;
  pricePerKm: number;
  local8hr80kmRate: number;
  airportTransferRate: number;
  features: string[];
  imageUrl: string;
}

export interface TourPackage {
  id: string;
  name: string;
  duration: string;
  destinations: string[];
  priceStarting: number;
  highlights: string[];
  inclusions: string[];
  description: string;
  imageUrl: string;
  detailedItinerary: { day: number; title: string; desc: string }[];
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  distanceDeoghar: string;
  highlights: string[];
  imageUrl: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
}

export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  serviceType: "local_cab" | "outstation_cab" | "airport_transfer" | "tour_package" | "custom_plan";
  pickupLocation?: string;
  dropoffLocation?: string;
  vehiclePreference?: string;
  packagePreference?: string;
  paxCount?: string;
  userMessage?: string;
}
