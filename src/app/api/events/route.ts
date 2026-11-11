import { NextResponse } from 'next/server';
import { INITIAL_EVENTS, CITIES } from '@/lib/data/events';
import { calculateDistanceKm, calculateBearingDeg } from '@/lib/geo';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'amsterdam';
  const category = searchParams.get('category');
  const lat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : null;
  const lng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')!) : null;
  const radius = searchParams.get('radius') ? parseFloat(searchParams.get('radius')!) : null;

  let results = INITIAL_EVENTS.filter((e) => e.citySlug === city);

  if (category && category !== 'all') {
    results = results.filter((e) => e.category === category);
  }

  if (lat !== null && lng !== null) {
    results = results.map((e) => ({
      ...e,
      distanceKm: calculateDistanceKm({ lat, lng }, { lat: e.venue.lat, lng: e.venue.lng }),
      bearingDeg: calculateBearingDeg({ lat, lng }, { lat: e.venue.lat, lng: e.venue.lng })
    }));

    if (radius !== null) {
      results = results.filter((e) => (e.distanceKm || 0) <= radius);
    }

    results.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
  }

  return NextResponse.json({
    city,
    count: results.length,
    events: results,
    supportedCities: CITIES.map((c) => ({
      slug: c.slug,
      name: c.name,
      code: c.code,
      country: c.country,
      eventCount: INITIAL_EVENTS.filter((e) => e.citySlug === c.slug).length
    }))
  });
}
