export enum RideType {
  CARPOOL = 'CARPOOL',
  AUTO = 'AUTO',
  TAXI = 'TAXI'
}

export interface SearchParams {
  from: string;
  to: string;
  date: string;
  passengers: number;
  type: RideType;
  showFreeOnly: boolean;
}

export interface Ride {
  id: string;
  driver: {
    name: string;
    rating: number;
    avatarUrl: string;
    verified: boolean;
  };
  departureTime: string;
  arrivalTime: string;
  price: number;
  currency: string;
  origin: string;
  destination: string;
  seatsAvailable: number;
  type: RideType;
}

export interface TripSuggestion {
  destination: string;
  description: string;
  estimatedPrice: string;
  vibe: string;
}

export enum AppView {
  LANDING = 'LANDING',
  SEARCH_RESULTS = 'SEARCH_RESULTS',
  AI_PLANNER = 'AI_PLANNER',
  DRIVER_REGISTRATION = 'DRIVER_REGISTRATION'
}