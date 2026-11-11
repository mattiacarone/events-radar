import { City, EventItem } from '../types';

export const CITIES: City[] = [
  {
    slug: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    code: 'AMS',
    center: { lat: 52.3676, lng: 4.9041 },
    zoom: 13,
    active: true,
    eventCount: 12,
    neighborhoods: ['Centrum', 'De Pijp', 'Jordaan', 'Oud-West', 'Noord / NDSM', 'Oost', 'Westerpark'],
    timezone: 'CET'
  },
  {
    slug: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    code: 'BER',
    center: { lat: 52.5200, lng: 13.4050 },
    zoom: 12,
    active: true,
    eventCount: 6,
    neighborhoods: ['Mitte', 'Kreuzberg', 'Friedrichshain', 'Neukölln', 'Prenzlauer Berg'],
    timezone: 'CET'
  },
  {
    slug: 'london',
    name: 'London',
    country: 'United Kingdom',
    code: 'LDN',
    center: { lat: 51.5074, lng: -0.1278 },
    zoom: 12,
    active: true,
    eventCount: 5,
    neighborhoods: ['Hackney / Dalston', 'Shoreditch', 'Soho', 'Peckham', 'Brixton', 'Camden'],
    timezone: 'GMT'
  },
  {
    slug: 'paris',
    name: 'Paris',
    country: 'France',
    code: 'PAR',
    center: { lat: 48.8566, lng: 2.3522 },
    zoom: 12,
    active: true,
    eventCount: 5,
    neighborhoods: ['Le Marais', 'Belleville', 'Canal Saint-Martin', '11th / Bastille', 'Montmartre'],
    timezone: 'CET'
  },
  {
    slug: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    code: 'TYO',
    center: { lat: 35.6762, lng: 139.6503 },
    zoom: 12,
    active: true,
    eventCount: 4,
    neighborhoods: ['Shibuya', 'Shinjuku', 'Shimokitazawa', 'Roppongi', 'Ginza'],
    timezone: 'JST'
  },
  {
    slug: 'new-york',
    name: 'New York',
    country: 'United States',
    code: 'NYC',
    center: { lat: 40.7128, lng: -74.0060 },
    zoom: 12,
    active: true,
    eventCount: 5,
    neighborhoods: ['Brooklyn / Bushwick', 'Lower East Side', 'Williamsburg', 'Greenwich Village', 'SoHo'],
    timezone: 'EST'
  },
  {
    slug: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    code: 'BCN',
    center: { lat: 41.3879, lng: 2.1699 },
    zoom: 13,
    active: true,
    eventCount: 4,
    neighborhoods: ['Poblenou', 'El Born', 'Gràcia', 'Raval', 'Gothic Quarter'],
    timezone: 'CET'
  }
];

const now = new Date();
const addHours = (h: number) => new Date(now.getTime() + h * 3600 * 1000).toISOString();
const addDays = (d: number, hourOfDay = 21) => {
  const date = new Date(now);
  date.setDate(date.getDate() + d);
  date.setHours(hourOfDay, 0, 0, 0);
  return date.toISOString();
};

export const INITIAL_EVENTS: EventItem[] = [
  // ================= AMSTERDAM =================
  {
    id: 'ams-01',
    title: 'Analog Horizons: Modular Live & Audiophile Vinyl',
    slug: 'analog-horizons-modular-live',
    tagline: 'Deep listening session with vintage synths on restored Klipschorn sound',
    description: 'An intimate audiophile sanctuary in Amsterdam Noord. Features live hardware patch improvisations followed by low-intervention natural wine pairings.',
    category: 'live-music',
    citySlug: 'amsterdam',
    venue: {
      name: 'Skatecafe (1900 Room)',
      neighborhood: 'Noord / NDSM',
      address: 'Gedempt Hamerkanaal 42, 1021 KM Amsterdam',
      lat: 52.3831,
      lng: 4.9218
    },
    startTime: addHours(-0.5),
    endTime: addHours(3.5),
    price: { isFree: false, amount: 12, currency: 'EUR', label: '€12.00' },
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Seating is limited to 45 floor cushions. Arrive early for sweet spot acoustic alignment.',
    isCurated: true,
    isPromoted: true,
    promotedTier: 'spotlight',
    ticketUrl: 'https://residentadvisor.net',
    affiliatePlatform: 'resident-advisor',
    attendeeCount: 142,
    vibeTags: ['Audiophile', 'Natural Wine', 'Modular', 'Listening Bar'],
    friendsGoing: [
      { name: 'Sophie V.', handle: '@sophie.ams', platform: 'instagram' },
      { name: 'Lars Jansen', handle: '+31 6 1234 5678', platform: 'whatsapp' },
      { name: 'Daan K.', handle: '@daank', platform: 'tiktok' }
    ]
  },
  {
    id: 'ams-02',
    title: 'Kanaal40: Sub-bass Explorations & UK Garage',
    slug: 'kanaal40-sub-bass-explorations',
    tagline: 'Precision bass acoustics with underground London and Dutch selectors',
    description: 'Stripped-back sound system culture in the red light district basement. Strictly no flash photography; heavyweight low frequencies.',
    category: 'nightlife',
    citySlug: 'amsterdam',
    venue: {
      name: 'Kanaal40',
      neighborhood: 'Centrum',
      address: 'Warmoesstraat 40, 1012 JE Amsterdam',
      lat: 52.3745,
      lng: 4.8988
    },
    startTime: addHours(1.5),
    endTime: addHours(7),
    price: { isFree: false, amount: 15, currency: 'EUR', label: '€15.00' },
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Room capacity is tightly capped at 180 dancers. Door entry strictly cash or contactless.',
    isCurated: true,
    isPromoted: false,
    ticketUrl: 'https://dice.fm',
    affiliatePlatform: 'dice',
    attendeeCount: 189,
    vibeTags: ['Club Culture', 'No Flash', 'Sound System'],
    friendsGoing: [
      { name: 'Emma De Boer', handle: 'emma.deboer', platform: 'facebook' },
      { name: 'Milan R.', handle: '@milan.wav', platform: 'instagram' }
    ]
  },
  {
    id: 'ams-03',
    title: 'De Pijp Founder & Angel Meet: Hardware & Edge AI',
    slug: 'de-pijp-founders-hardware-edge-ai',
    tagline: '4 lightning 3-minute physical demos followed by canal rooftop beers',
    description: 'No slide decks. Founders bringing prototypes and hardware rigs to demo live. Open bar provided by Amsterdam Tech Fund.',
    category: 'tech-networking',
    citySlug: 'amsterdam',
    venue: {
      name: 'Spaces Vijzelstraat (Rooftop)',
      neighborhood: 'De Pijp',
      address: 'Vijzelstraat 68, 1017 HL Amsterdam',
      lat: 52.3614,
      lng: 4.8921
    },
    startTime: addDays(1, 18), // Tomorrow 18:00
    endTime: addDays(1, 22),
    price: { isFree: true, currency: 'EUR', label: 'FREE_RSVP' },
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'High signal networking. First 60 RSVPs receive craft beers on the host.',
    isCurated: true,
    isPromoted: true,
    promotedTier: 'radar_blast',
    ticketUrl: 'https://eventbrite.com',
    affiliatePlatform: 'eventbrite',
    attendeeCount: 94,
    vibeTags: ['Hardware', 'Founders', 'Open Bar'],
    friendsGoing: [
      { name: 'Alex Chen', handle: '@alexchen_ai', platform: 'instagram' },
      { name: 'Thomas Bakker', handle: '+31 6 8765 4321', platform: 'whatsapp' }
    ]
  },
  {
    id: 'ams-04',
    title: 'Secret Courtyard Ramen & Natural Cider Pop-up',
    slug: 'secret-courtyard-ramen-cider',
    tagline: 'Hand-pulled duck paitan ramen inside a 17th-century Jordaan courtyard',
    description: 'Chef Kenji collaborates with Basque cider makers. 40 bowls per seating; communal wooden benches under oil lamps.',
    category: 'food-wine',
    citySlug: 'amsterdam',
    venue: {
      name: 'Hofje de Zeven Keurvorsten',
      neighborhood: 'Jordaan',
      address: 'Tuinstraat 197, 1015 PB Amsterdam',
      lat: 52.3776,
      lng: 4.8814
    },
    startTime: addHours(0.5),
    endTime: addHours(4),
    price: { isFree: false, amount: 24, currency: 'EUR', label: '€24.00' },
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Ring brass buzzer marked "K&C". Payment via PIN / Tikkie only.',
    isCurated: true,
    isPromoted: false,
    attendeeCount: 38,
    vibeTags: ['Courtyard Pop-up', 'Handmade Ramen', 'Natural Cider'],
    friendsGoing: [
      { name: 'Lisa M.', handle: '@lisafoods', platform: 'tiktok' }
    ]
  },
  {
    id: 'ams-05',
    title: 'Foam Late: Architectural Light & Spatial Sound',
    slug: 'foam-late-architectural-light',
    tagline: 'Late-night gallery opening with quadraphonic tape composition',
    description: 'Foam opens its canal-side rooms until midnight. Featuring brutalist photography with responsive lighting synced to ambient soundscapes.',
    category: 'art-culture',
    citySlug: 'amsterdam',
    venue: {
      name: 'Foam Photography Museum',
      neighborhood: 'Centrum',
      address: 'Keizersgracht 609, 1017 EK Amsterdam',
      lat: 52.3644,
      lng: 4.8942
    },
    startTime: addDays(1, 20), // Tomorrow night 20:00
    endTime: addDays(1, 24),
    price: { isFree: false, amount: 16, currency: 'EUR', label: '€16.00' },
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Canal garden bar open for attendees.',
    isCurated: true,
    isPromoted: false,
    ticketUrl: 'https://foam.org',
    attendeeCount: 162,
    vibeTags: ['Exhibition', 'Night Gallery', 'Ambient Tape'],
    friendsGoing: [
      { name: 'Niels H.', handle: '@niels_h', platform: 'instagram' },
      { name: 'Sarah B.', handle: 'sarah.b', platform: 'facebook' }
    ]
  },
  {
    id: 'ams-06',
    title: 'Shelter Underground: Subterranean Hypnotic Groove',
    slug: 'shelter-underground-subterranean',
    tagline: 'Sub-river acoustics underneath the IJ with custom Funktion-One',
    description: 'Entered via the hydraulic hatch on Overhoeksplein. Hypnotic techno rhythms, zero phone cameras permitted on the floor.',
    category: 'nightlife',
    citySlug: 'amsterdam',
    venue: {
      name: 'Shelter Amsterdam',
      neighborhood: 'Noord / NDSM',
      address: 'Overhoeksplein 3, 1031 KS Amsterdam',
      lat: 52.3838,
      lng: 4.9015
    },
    startTime: addDays(1, 23), // Tomorrow 23:00
    endTime: addDays(2, 9),
    price: { isFree: false, amount: 22, currency: 'EUR', label: '€22.00' },
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Take the free 3-minute ferry from Centraal. Door policy applies.',
    isCurated: true,
    isPromoted: true,
    promotedTier: 'spotlight',
    ticketUrl: 'https://residentadvisor.net',
    affiliatePlatform: 'resident-advisor',
    attendeeCount: 420,
    vibeTags: ['Techno', 'No Camera', 'Subterranean'],
    friendsGoing: [
      { name: 'Lars Jansen', handle: '+31 6 1234 5678', platform: 'whatsapp' },
      { name: 'Milan R.', handle: '@milan.wav', platform: 'instagram' },
      { name: 'Daan K.', handle: '@daank', platform: 'tiktok' }
    ]
  },
  {
    id: 'ams-07',
    title: 'NDSM Loods Warehouse Rave: Audio-Reactive Lasers',
    slug: 'ndsm-loods-warehouse-rave',
    tagline: 'Monumental hangar transformed into an audiovisual playground',
    description: 'Massive former shipyard hangar hosting Dutch and international breakbeat, electro, and spatial lasers.',
    category: 'nightlife',
    citySlug: 'amsterdam',
    venue: {
      name: 'NDSM Loods',
      neighborhood: 'Noord / NDSM',
      address: 'Tt. Neveritaweg 15, 1033 WB Amsterdam',
      lat: 52.4011,
      lng: 4.8945
    },
    startTime: addDays(2, 22),
    endTime: addDays(3, 6),
    price: { isFree: false, amount: 28, currency: 'EUR', label: '€28.00' },
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Wear comfortable shoes. Massive concrete terrain with chillout dock outside.',
    isCurated: true,
    isPromoted: true,
    promotedTier: 'spotlight',
    ticketUrl: 'https://dice.fm',
    affiliatePlatform: 'dice',
    attendeeCount: 650,
    vibeTags: ['NDSM Shipyard', 'Lasers', 'Warehouse']
  },
  {
    id: 'ams-08',
    title: 'Oost Natural Wine Block Party: 14 Low-Intervention Vignerons',
    slug: 'oost-natural-wine-block-party',
    tagline: 'Pét-nats, orange wines, and wood-fired sourdough pizzas on Javastraat',
    description: 'Celebration of zero-sulfur natural wine, vinyl funk selectors, and artisan cheese makers in Amsterdam Oost.',
    category: 'food-wine',
    citySlug: 'amsterdam',
    venue: {
      name: 'Bar Bachrach & Terrace',
      neighborhood: 'Oost',
      address: 'Javastraat 35, 1094 HA Amsterdam',
      lat: 52.3636,
      lng: 4.9312
    },
    startTime: addDays(2, 14),
    endTime: addDays(2, 22),
    price: { isFree: false, amount: 18, currency: 'EUR', label: '€18.00' },
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Tasting glass + 5 pours included with ticket.',
    isCurated: true,
    isPromoted: false,
    attendeeCount: 210,
    vibeTags: ['Natural Wine', 'Street Vibe', 'Amsterdam Oost']
  },
  {
    id: 'ams-09',
    title: 'Jordaan Canal Candlelit Jazz: The Rozenboom Session',
    slug: 'jordaan-canal-candlelit-jazz',
    tagline: 'Acoustic saxophone and double bass quartet in Amsterdam’s oldest pub',
    description: 'No microphone amplification. Dutch bebop standards, historic genever tastings, and old wooden beams in an alleyway establishment from 1798.',
    category: 'live-music',
    citySlug: 'amsterdam',
    venue: {
      name: 'Café de Dokter Salon',
      neighborhood: 'Centrum',
      address: 'Rozenboomsteeg 4, 1012 PR Amsterdam',
      lat: 52.3688,
      lng: 4.8906
    },
    startTime: addDays(1, 20), // Tomorrow 20:00
    endTime: addDays(1, 23.5),
    price: { isFree: false, amount: 10, currency: 'EUR', label: '€10.00' },
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Only 25 seats total. Door opens 19:30.',
    isCurated: true,
    isPromoted: false,
    attendeeCount: 25,
    vibeTags: ['Intimate Jazz', 'Historic Pub', 'Candlelit', 'Genever']
  },

  // ================= BERLIN =================
  {
    id: 'ber-01',
    title: 'Funkhaus Shed: Minimalist Drone & Spatial Modular',
    slug: 'funkhaus-minimalist-drone',
    tagline: 'Reverberant acoustic architecture on the Spree riverbanks',
    description: 'Historic GDR recording studios host a live 4-hour continuum of acoustic drone and analog modular synths.',
    category: 'live-music',
    citySlug: 'berlin',
    venue: {
      name: 'Funkhaus Berlin (Saal 1)',
      neighborhood: 'Friedrichshain',
      address: 'Nalepastraße 18, 12459 Berlin',
      lat: 52.4851,
      lng: 13.5042
    },
    startTime: addHours(1),
    endTime: addHours(6),
    price: { isFree: false, amount: 20, currency: 'EUR', label: '€20.00' },
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Acoustic reverb in Saal 1 is world-renowned. Tram 21 to Nalepastr.',
    isCurated: true,
    isPromoted: true,
    promotedTier: 'spotlight',
    ticketUrl: 'https://residentadvisor.net',
    affiliatePlatform: 'resident-advisor',
    attendeeCount: 310,
    vibeTags: ['Acoustics', 'Drone', 'Funkhaus', 'Modular'],
    friendsGoing: [
      { name: 'Klara S.', handle: '@klara.ber', platform: 'instagram' },
      { name: 'Felix Weber', handle: '+49 171 1234567', platform: 'whatsapp' }
    ]
  },
  {
    id: 'ber-02',
    title: 'OHM Basement: Raw Electro & Broken Beat Matrix',
    slug: 'ohm-basement-raw-electro',
    tagline: 'Industrial battery room acoustics inside the Köpenicker power station',
    description: 'Raw, tiled walls and intimate sound pressure. Leftfield selectors playing vinyl-only electro and rhythmic industrial.',
    category: 'nightlife',
    citySlug: 'berlin',
    venue: {
      name: 'OHM Berlin',
      neighborhood: 'Mitte',
      address: 'Köpenicker Str. 70, 10179 Berlin',
      lat: 52.5115,
      lng: 13.4194
    },
    startTime: addHours(3),
    endTime: addHours(11),
    price: { isFree: false, amount: 15, currency: 'EUR', label: '€15.00' },
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Strictly cash at door. 200 capacity limit.',
    isCurated: true,
    isPromoted: false,
    attendeeCount: 195,
    vibeTags: ['Power Station', 'Underground', 'Vinyl Only']
  },
  {
    id: 'ber-03',
    title: 'Kreuzberg Courtyard: Natural Orange Wine & Sourdough',
    slug: 'kreuzberg-courtyard-natural-wine',
    tagline: '8 low-intervention natural vintners pouring rare Georgian and Austrian vintages',
    description: 'Industrial courtyard gathering near Paul-Lincke-Ufer. Fresh wood-fired flatbreads, ambient selections, and unreleased pet-nats.',
    category: 'food-wine',
    citySlug: 'berlin',
    venue: {
      name: 'Michelberger Hof',
      neighborhood: 'Kreuzberg',
      address: 'Warschauer Str. 39, 10243 Berlin',
      lat: 52.5065,
      lng: 13.4497
    },
    startTime: addDays(1, 17), // Tomorrow 17:00
    endTime: addDays(1, 23),
    price: { isFree: true, currency: 'EUR', label: 'FREE_ENTRY' },
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Tasting tokens purchasable by card on entry.',
    isCurated: true,
    isPromoted: false,
    attendeeCount: 160,
    vibeTags: ['Natural Wine', 'Courtyard', 'Kreuzberg']
  },

  // ================= LONDON =================
  {
    id: 'ldn-01',
    title: 'Brilliant Corners: Audiophile Japanese Jazz & Vinyl',
    slug: 'brilliant-corners-audiophile-jazz',
    tagline: 'Klipschorn custom analog sound system with robata grill and natural wine',
    description: 'Dalston’s original listening sanctuary. Needle drops on rare Japanese spiritual jazz and blue note pressings.',
    category: 'live-music',
    citySlug: 'london',
    venue: {
      name: 'Brilliant Corners',
      neighborhood: 'Hackney / Dalston',
      address: '470 Kingsland Rd, London E8 4AE',
      lat: 51.5458,
      lng: -0.0762
    },
    startTime: addHours(0.5),
    endTime: addHours(4),
    price: { isFree: true, currency: 'GBP', label: 'FREE_RSVP' },
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Table booking advised for food; bar listening space walk-in only.',
    isCurated: true,
    isPromoted: true,
    promotedTier: 'spotlight',
    attendeeCount: 110,
    vibeTags: ['Audiophile', 'Listening Bar', 'Jazz', 'Dalston'],
    friendsGoing: [
      { name: 'James W.', handle: '@james_ldn', platform: 'instagram' }
    ]
  },
  {
    id: 'ldn-02',
    title: 'Fold London: 24-Hour Nonstop Polymeric Sound',
    slug: 'fold-london-24-hour-polymeric',
    tagline: 'Industrial warehouse unit overlooking the Lea Valley waterways',
    description: 'Precision d&b audiotechnik rig in an insulated warehouse cube. Strict no-photo sticker policy and diverse community ethos.',
    category: 'nightlife',
    citySlug: 'london',
    venue: {
      name: 'FOLD London',
      neighborhood: 'Hackney / Dalston',
      address: 'Gillian House, Stephenson St, London E16 4SA',
      lat: 51.5165,
      lng: 0.0035
    },
    startTime: addDays(1, 23), // Tomorrow 23:00
    endTime: addDays(2, 23),
    price: { isFree: false, amount: 24, currency: 'GBP', label: '£24.00' },
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Physical photo ID strictly required. Shuttle service running from Canning Town.',
    isCurated: true,
    isPromoted: true,
    promotedTier: 'radar_blast',
    ticketUrl: 'https://dice.fm',
    affiliatePlatform: 'dice',
    attendeeCount: 550,
    vibeTags: ['Industrial', 'Warehouse', 'Community']
  },

  // ================= PARIS =================
  {
    id: 'par-01',
    title: 'Belleville Cave Naturelle: Low-Intervention Pet-Nat Salon',
    slug: 'belleville-cave-naturelle-petnat',
    tagline: 'Unfiltered Jura and Beaujolais wines poured inside a 19th-century cellar',
    description: 'Independent vignerons showcase zero-sulfur bottlings paired with cured charcuterie and sourdough from neighboring wood-fired ovens.',
    category: 'food-wine',
    citySlug: 'paris',
    venue: {
      name: 'La Cave de Belleville',
      neighborhood: 'Belleville',
      address: '51 Rue de Belleville, 75019 Paris',
      lat: 48.8722,
      lng: 2.3848
    },
    startTime: addHours(1),
    endTime: addHours(5),
    price: { isFree: false, amount: 18, currency: 'EUR', label: '€18.00' },
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Communal wooden tables. Metro Pyrénées exit 1.',
    isCurated: true,
    isPromoted: false,
    attendeeCount: 75,
    vibeTags: ['Natural Wine', 'Paris Underground', 'Belleville']
  },
  {
    id: 'par-02',
    title: 'Le Marais After Hours: Contemporary Light Sculptures',
    slug: 'le-marais-contemporary-light-sculptures',
    tagline: 'Private gallery opening with generative algorithmic projections',
    description: 'Three interconnected Marais courtyards host kinetic light sculptures and real-time generative computer graphics.',
    category: 'art-culture',
    citySlug: 'paris',
    venue: {
      name: 'Galerie Perrotin Courtyard',
      neighborhood: 'Le Marais',
      address: '76 Rue de Turenne, 75003 Paris',
      lat: 48.8601,
      lng: 2.3667
    },
    startTime: addDays(1, 19), // Tomorrow 19:00
    endTime: addDays(1, 23.5),
    price: { isFree: true, currency: 'EUR', label: 'FREE_PASS' },
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Champagne service in the sculpture garden from 20:00.',
    isCurated: true,
    isPromoted: true,
    promotedTier: 'spotlight',
    attendeeCount: 220,
    vibeTags: ['Contemporary Art', 'Light Sculpture', 'Le Marais'],
    friendsGoing: [
      { name: 'Antoine M.', handle: '@antoine_par', platform: 'instagram' },
      { name: 'Camille L.', handle: '+33 6 1234 5678', platform: 'whatsapp' }
    ]
  },

  // ================= TOKYO =================
  {
    id: 'tyo-01',
    title: 'Lion Cafe: Heavy Classical Vinyl in Complete Silence',
    slug: 'lion-cafe-heavy-classical-vinyl',
    tagline: '1926 historic wooden acoustic hall with custom 3-meter horn speakers',
    description: 'No talking, no phone calls. Customers sit facing the colossal speaker wall in cathedral-like silence, sipping dark roast siphon coffee.',
    category: 'live-music',
    citySlug: 'tokyo',
    venue: {
      name: 'Meikyoku Kissa Lion',
      neighborhood: 'Shibuya',
      address: '2-19-13 Dogenzaka, Shibuya City, Tokyo',
      lat: 35.6595,
      lng: 139.6975
    },
    startTime: addHours(-1),
    endTime: addHours(4),
    price: { isFree: false, amount: 6, currency: 'JPY', label: '¥850' },
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Established 1926. Order coffee or tea on entry. Absolute silence enforced.',
    isCurated: true,
    isPromoted: false,
    attendeeCount: 65,
    vibeTags: ['Historic', 'Horn Speakers', 'Silence', 'Shibuya']
  },
  {
    id: 'tyo-02',
    title: 'Vent Tokyo: Acoustic Waveguide Minimal Techno',
    slug: 'vent-tokyo-waveguide-minimal-techno',
    tagline: 'Custom SR Sound structural acoustic engineering in Omotesando',
    description: 'Engineered from the ground up for acoustic neutrality. Featuring Tokyo selectors alongside European minimalists.',
    category: 'nightlife',
    citySlug: 'tokyo',
    venue: {
      name: 'VENT Tokyo',
      neighborhood: 'Roppongi',
      address: '3-18-19 Minamiaoyama, Minato City, Tokyo',
      lat: 35.6644,
      lng: 139.7128
    },
    startTime: addDays(1, 23), // Tomorrow 23:00
    endTime: addDays(2, 6),
    price: { isFree: false, amount: 25, currency: 'JPY', label: '¥3,500' },
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Government photo ID checked at entrance. Omotesando Station Exit A4.',
    isCurated: true,
    isPromoted: true,
    promotedTier: 'spotlight',
    ticketUrl: 'https://residentadvisor.net',
    affiliatePlatform: 'resident-advisor',
    attendeeCount: 380,
    vibeTags: ['Precision Audio', 'Omotesando', 'Minimal'],
    friendsGoing: [
      { name: 'Kenji T.', handle: '@kenji_sound', platform: 'instagram' }
    ]
  },

  // ================= NEW YORK =================
  {
    id: 'nyc-01',
    title: 'Public Records: Analog Sound Room & Plant-Based Canteen',
    slug: 'public-records-analog-sound-room',
    tagline: 'Gowanus canal sanctuary with walnut speaker baffles and low-sulfur wines',
    description: 'Multi-room music complex featuring an acoustic sound room lined with perforated acoustic panels. High-fidelity selectors and record releases.',
    category: 'live-music',
    citySlug: 'new-york',
    venue: {
      name: 'Public Records',
      neighborhood: 'Brooklyn / Bushwick',
      address: '233 Butler St, Brooklyn, NY 11217',
      lat: 40.6833,
      lng: -73.9850
    },
    startTime: addHours(0.5),
    endTime: addHours(5),
    price: { isFree: false, amount: 15, currency: 'USD', label: '$15.00' },
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Sound room capacity is 150. Enjoy the atrium garden before entering the sound sanctuary.',
    isCurated: true,
    isPromoted: true,
    promotedTier: 'spotlight',
    ticketUrl: 'https://dice.fm',
    affiliatePlatform: 'dice',
    attendeeCount: 240,
    vibeTags: ['Gowanus', 'Audiophile', 'Acoustic Sound'],
    friendsGoing: [
      { name: 'Maya Stern', handle: '@mayastern', platform: 'instagram' },
      { name: 'Danielle P.', handle: '+1 917 555 0192', platform: 'whatsapp' }
    ]
  },
  {
    id: 'nyc-02',
    title: 'Basement NY: Subterranean Brutalist Concrete Vaults',
    slug: 'basement-ny-subterranean-concrete-vaults',
    tagline: 'Underground brick caverns beneath the Knockdown Center in Queens',
    description: 'Pure hypnotic techno through custom Funktion-One sound. No photos, low ceiling, labyrinth of historic industrial passages.',
    category: 'nightlife',
    citySlug: 'new-york',
    venue: {
      name: 'Basement NY',
      neighborhood: 'Brooklyn / Bushwick',
      address: '52-19 Flushing Ave, Maspeth, NY 11378',
      lat: 40.7153,
      lng: -73.9142
    },
    startTime: addDays(1, 23), // Tomorrow 23:00
    endTime: addDays(2, 8),
    price: { isFree: false, amount: 30, currency: 'USD', label: '$30.00' },
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Strict door selection prioritizing music passion and respect for the dancefloor.',
    isCurated: true,
    isPromoted: true,
    promotedTier: 'radar_blast',
    ticketUrl: 'https://dice.fm',
    affiliatePlatform: 'dice',
    attendeeCount: 650,
    vibeTags: ['Techno', 'Vaults', 'No Photos']
  },

  // ================= BARCELONA =================
  {
    id: 'bcn-01',
    title: 'Poblenou Industrial Studio: Modular Live & Sourdough Tapas',
    slug: 'poblenou-modular-live-tapas',
    tagline: 'Converted textile factory space with courtyard natural vermut',
    description: 'Independent sound artists and visual designers gather in Barcelona’s creative district for an afternoon of live electronic sets and local craft vermut.',
    category: 'live-music',
    citySlug: 'barcelona',
    venue: {
      name: 'Nau Bostik & Studio 08',
      neighborhood: 'Poblenou',
      address: 'Carrer de Ferran Turné 11, 08027 Barcelona',
      lat: 41.4235,
      lng: 2.1905
    },
    startTime: addHours(1),
    endTime: addHours(6),
    price: { isFree: false, amount: 10, currency: 'EUR', label: '€10.00' },
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Industrial terrace open until dusk. Metro L1 La Sagrera.',
    isCurated: true,
    isPromoted: true,
    promotedTier: 'spotlight',
    attendeeCount: 190,
    vibeTags: ['Poblenou', 'Textile Factory', 'Vermut', 'Modular']
  },
  {
    id: 'bcn-02',
    title: 'Input High Fidelity: Void Acoustics Sub-frequency Ritual',
    slug: 'input-high-fidelity-void-acoustics',
    tagline: 'Custom Void Nexus sound system inside Poble Espanyol',
    description: 'Focused dance music environment engineered strictly around acoustic fidelity and immersive dark visuals.',
    category: 'nightlife',
    citySlug: 'barcelona',
    venue: {
      name: 'INPUT High Fidelity Dance Club',
      neighborhood: 'Raval',
      address: 'Av. Francesc Ferrer i Guàrdia 13, 08038 Barcelona',
      lat: 41.3687,
      lng: 2.1480
    },
    startTime: addDays(1, 23.5), // Tomorrow night 23:30
    endTime: addDays(2, 6),
    price: { isFree: false, amount: 20, currency: 'EUR', label: '€20.00' },
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop',
    curatorNotes: 'Presale tickets recommended. Door opens 23:30.',
    isCurated: true,
    isPromoted: false,
    ticketUrl: 'https://residentadvisor.net',
    affiliatePlatform: 'resident-advisor',
    attendeeCount: 480,
    vibeTags: ['Void Acoustics', 'Poble Espanyol', 'High Fidelity'],
    friendsGoing: [
      { name: 'Carlos R.', handle: '@carlos_bcn', platform: 'instagram' },
      { name: 'Mireia V.', handle: 'mireia.v', platform: 'facebook' }
    ]
  }
];
