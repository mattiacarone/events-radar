import { UserCoordinates } from './types';

/**
 * Calculates distance in kilometers between two lat/lng points using Haversine formula
 */
export function calculateDistanceKm(
  coord1: { lat: number; lng: number },
  coord2: { lat: number; lng: number }
): number {
  const R = 6371; // Earth radius in km
  const dLat = deg2rad(coord2.lat - coord1.lat);
  const dLng = deg2rad(coord2.lng - coord1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.lat)) *
      Math.cos(deg2rad(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

/**
 * Calculates bearing azimuth angle in degrees (0 - 360) from coord1 to coord2
 */
export function calculateBearingDeg(
  coord1: { lat: number; lng: number },
  coord2: { lat: number; lng: number }
): number {
  const lat1 = deg2rad(coord1.lat);
  const lat2 = deg2rad(coord2.lat);
  const dLng = deg2rad(coord2.lng - coord1.lng);

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  let brng = Math.atan2(y, x) * (180 / Math.PI);
  brng = (brng + 360) % 360;
  return Math.round(brng);
}

export function getBearingDirection(deg: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export const CITY_MOCK_LOCATIONS: Record<string, { name: string; coords: { lat: number; lng: number } }[]> = {
  amsterdam: [
    { name: 'CENTRUM / DAM', coords: { lat: 52.3731, lng: 4.8926 } },
    { name: 'DE PIJP / SARPHATI', coords: { lat: 52.3547, lng: 4.8967 } },
    { name: 'JORDAAN / NOORDER', coords: { lat: 52.3794, lng: 4.8860 } },
    { name: 'OUD-WEST / HALLEN', coords: { lat: 52.3667, lng: 4.8687 } },
    { name: 'NOORD / NDSM WERF', coords: { lat: 52.3995, lng: 4.8938 } },
    { name: 'WESTERPARK', coords: { lat: 52.3882, lng: 4.8735 } },
  ],
  berlin: [
    { name: 'KREUZBERG / KOTTI', coords: { lat: 52.4990, lng: 13.4180 } },
    { name: 'FRIEDRICHSHAIN / RAW', coords: { lat: 52.5075, lng: 13.4530 } },
    { name: 'MITTE / ROSENTHALER', coords: { lat: 52.5298, lng: 13.4010 } },
    { name: 'NEUKÖLLN / MAYBACH', coords: { lat: 52.4920, lng: 13.4320 } },
  ],
  london: [
    { name: 'HACKNEY / DALSTON', coords: { lat: 51.5462, lng: -0.0754 } },
    { name: 'SHOREDITCH / REDCHURCH', coords: { lat: 51.5244, lng: -0.0768 } },
    { name: 'SOHO / WARDOUR', coords: { lat: 51.5136, lng: -0.1332 } },
    { name: 'PECKHAM / RYE LANE', coords: { lat: 51.4699, lng: -0.0673 } },
  ],
  paris: [
    { name: 'LE MARAIS / BRETAGNE', coords: { lat: 48.8627, lng: 2.3619 } },
    { name: 'BELLEVILLE / PYRÉNÉES', coords: { lat: 48.8722, lng: 2.3848 } },
    { name: 'CANAL SAINT-MARTIN', coords: { lat: 48.8718, lng: 2.3660 } },
    { name: '11TH / BASTILLE', coords: { lat: 48.8532, lng: 2.3698 } },
  ],
  tokyo: [
    { name: 'SHIBUYA / UTAGAWA', coords: { lat: 35.6617, lng: 139.6990 } },
    { name: 'SHINJUKU / GOLDEN GAI', coords: { lat: 35.6942, lng: 139.7047 } },
    { name: 'SHIMOKITAZAWA', coords: { lat: 35.6614, lng: 139.6675 } },
    { name: 'ROPPONGI / TOKYO MID', coords: { lat: 35.6628, lng: 139.7314 } },
  ],
  'new-york': [
    { name: 'BROOKLYN / BUSHWICK', coords: { lat: 40.7028, lng: -73.9218 } },
    { name: 'LOWER EAST SIDE', coords: { lat: 40.7180, lng: -73.9896 } },
    { name: 'WILLIAMSBURG / WYTHE', coords: { lat: 40.7190, lng: -73.9610 } },
    { name: 'GREENWICH VILLAGE', coords: { lat: 40.7335, lng: -74.0027 } },
  ],
  barcelona: [
    { name: 'POBLENOU / DESIGN HUB', coords: { lat: 41.3980, lng: 2.1890 } },
    { name: 'EL BORN / DEL MAR', coords: { lat: 41.3833, lng: 2.1818 } },
    { name: 'GRACIA / DEL SOL', coords: { lat: 41.4036, lng: 2.1565 } },
    { name: 'RAVAL / MACBA', coords: { lat: 41.3833, lng: 2.1670 } },
  ]
};

export const AMSTERDAM_MOCK_LOCATIONS = CITY_MOCK_LOCATIONS.amsterdam;
