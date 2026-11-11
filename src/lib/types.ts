export type CitySlug = 
  | 'amsterdam' 
  | 'berlin' 
  | 'london' 
  | 'paris' 
  | 'tokyo' 
  | 'new-york' 
  | 'barcelona';

export interface City {
  slug: CitySlug;
  name: string;
  country: string;
  code: string;
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  active: boolean;
  eventCount: number;
  neighborhoods: string[];
  timezone: string;
}

export type EventCategory = 
  | 'nightlife'
  | 'art-culture'
  | 'tech-networking'
  | 'food-wine'
  | 'live-music'
  | 'secret-popup'
  | 'community';

export interface EventVenue {
  name: string;
  neighborhood: string;
  address: string;
  lat: number;
  lng: number;
  googleMapsUrl?: string;
}

export interface FriendAttendee {
  name: string;
  handle: string;
  avatarUrl?: string;
  platform: 'instagram' | 'tiktok' | 'whatsapp' | 'facebook';
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: EventCategory;
  citySlug: CitySlug;
  venue: EventVenue;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  price: {
    isFree: boolean;
    amount?: number;
    currency: string;
    label: string;
  };
  imageUrl: string;
  curatorNotes?: string;
  isCurated: boolean;
  isPromoted?: boolean;
  promotedTier?: 'spotlight' | 'radar_blast';
  ticketUrl?: string;
  affiliatePlatform?: 'resident-advisor' | 'eventbrite' | 'dice' | 'direct';
  attendeeCount: number;
  vibeTags: string[];
  distanceKm?: number;
  bearingDeg?: number;
  isLiveNow?: boolean;
  startsInHours?: number;
  friendsGoing?: FriendAttendee[];
}

export interface SquadPlanOption {
  eventId: string;
  votes: string[];
}

export interface SquadPlan {
  id: string;
  title: string;
  creatorName: string;
  citySlug: CitySlug;
  createdAt: string;
  events: EventItem[];
  votes: Record<string, string[]>;
  comments: {
    id: string;
    author: string;
    text: string;
    time: string;
  }[];
}

export interface UserCoordinates {
  lat: number;
  lng: number;
  accuracy?: number;
}
