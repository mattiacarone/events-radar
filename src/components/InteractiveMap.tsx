'use client';

import React, { useEffect, useRef } from 'react';
import { EventItem, UserCoordinates } from '../lib/types';

interface InteractiveMapProps {
  events: EventItem[];
  userCoords: UserCoordinates;
  selectedEvent: EventItem | null;
  onSelectEvent: (event: EventItem) => void;
  radiusKm: number | null;
}

export default function InteractiveMap({
  events,
  userCoords,
  selectedEvent,
  onSelectEvent,
  radiusKm
}: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const radiusCircleRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;
      const L = (await import('leaflet')).default;

      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (!mapInstanceRef.current && mapContainerRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [userCoords.lat, userCoords.lng],
          zoom: 14,
          zoomControl: false,
          attributionControl: false
        });

        // CartoDB Dark Matter with CSS grayscale & high contrast
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          subdomains: 'abcd',
          className: 'tactical-map-tiles'
        }).addTo(map);

        const markersGroup = L.layerGroup().addTo(map);
        markersGroupRef.current = markersGroup;
        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;
      const markersGroup = markersGroupRef.current;

      if (!map || !markersGroup || !isMounted) return;

      // Clear previous user layers
      if (userMarkerRef.current) map.removeLayer(userMarkerRef.current);
      if (radiusCircleRef.current) map.removeLayer(radiusCircleRef.current);

      // Mechanical Crosshair User Beacon
      const userIcon = L.divIcon({
        className: 'user-radar-crosshair',
        html: `
          <div class="relative flex items-center justify-center w-10 h-10 -translate-x-1/2 -translate-y-1/2 font-mono">
            <span class="absolute w-8 h-8 border border-[#FFFFFF] opacity-40 animate-ping"></span>
            <span class="absolute w-6 h-6 border border-[#FFFFFF]"></span>
            <span class="absolute w-1.5 h-1.5 bg-[#FFFFFF]"></span>
            <span class="absolute -top-3 text-[8px] text-[#FFFFFF] tracking-tighter whitespace-nowrap bg-[#000000] px-0.5 border border-[#333333]">USER_LOCK</span>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      userMarkerRef.current = L.marker([userCoords.lat, userCoords.lng], {
        icon: userIcon,
        zIndexOffset: 1000
      }).addTo(map);

      // Radar Range Perimeter Ring
      if (radiusKm) {
        radiusCircleRef.current = L.circle([userCoords.lat, userCoords.lng], {
          radius: radiusKm * 1000,
          color: '#FFFFFF',
          weight: 1,
          dashArray: '2, 6',
          fillColor: '#FFFFFF',
          fillOpacity: 0.02
        }).addTo(map);
      }

      // Event Markers
      markersGroup.clearLayers();

      events.forEach((event, idx) => {
        const isSelected = selectedEvent?.id === event.id;
        const now = new Date();
        const isLive = now >= new Date(event.startTime) && now <= new Date(event.endTime);

        const tagCode = `TGT_${(idx + 1).toString().padStart(2, '0')}`;

        const iconHtml = `
          <div class="relative flex flex-col items-center justify-center font-mono cursor-pointer transition-transform ${isSelected ? 'scale-125 z-50' : 'hover:scale-110'}">
            <div class="${isLive ? 'bg-[#FFFFFF] text-[#000000] font-black' : isSelected ? 'bg-[#FFFFFF] text-[#000000]' : 'bg-[#000000] text-[#FFFFFF]'} border border-[#FFFFFF] px-1 py-0.5 text-[9px] whitespace-nowrap tracking-tighter shadow-lg flex items-center space-x-1">
              <span>${isLive ? '●' : '■'}</span>
              <span>${tagCode}</span>
            </div>
            ${isSelected ? `<div class="bg-[#000000] text-[#FFFFFF] text-[9px] font-bold px-1.5 py-0.5 border border-[#666666] whitespace-nowrap mt-0.5">${event.venue.name.toUpperCase()}</div>` : ''}
          </div>
        `;

        const eventIcon = L.divIcon({
          className: 'custom-event-pin',
          html: iconHtml,
          iconSize: [30, 20],
          iconAnchor: [15, 10]
        });

        const marker = L.marker([event.venue.lat, event.venue.lng], { icon: eventIcon });
        marker.on('click', () => {
          onSelectEvent(event);
        });

        marker.addTo(markersGroup);
      });
    };

    initMap();

    return () => {
      isMounted = false;
    };
  }, [events, userCoords, selectedEvent, radiusKm]);

  useEffect(() => {
    if (selectedEvent && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(
        [selectedEvent.venue.lat, selectedEvent.venue.lng],
        15,
        { duration: 0.8 }
      );
    }
  }, [selectedEvent]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-[#050505] border border-[#222222] font-mono text-[#EAEAEA] overflow-hidden select-none">
      
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Crosshair grid overlay */}
      <div className="absolute top-2 left-2 pointer-events-none z-20 text-[10px] text-[#666666] space-y-0.5 bg-[#000000]/80 p-2 border border-[#222222]">
        <div className="text-[#FFFFFF] font-bold flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 bg-[#FFFFFF] animate-pulse"></span>
          <span>TACTICAL_RADAR_SCOPE</span>
        </div>
        <div>COORDS: {userCoords.lat.toFixed(4)}°N, {userCoords.lng.toFixed(4)}°E</div>
        <div>RANGE_GATE: {radiusKm ? `${radiusKm}.0 KM` : 'METRO_UNLIMITED'}</div>
        <div>SIGNALS_IN_FOV: {events.length} TRANSMITTERS</div>
      </div>

      {/* Recenter & Range Controls */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-2">
        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.flyTo([userCoords.lat, userCoords.lng], 14, { duration: 0.6 });
            }
          }}
          className="px-3 py-1 bg-[#000000] border border-[#333333] hover:border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000] text-xs font-mono uppercase text-[#FFFFFF] transition-colors"
        >
          [⊕ CENTER_LOCK]
        </button>
      </div>

      {/* Bottom Right Coordinates Telemetry */}
      <div className="absolute bottom-4 right-4 z-20 hidden sm:block text-[9px] text-[#555555] bg-[#000000]/80 px-2 py-1 border border-[#1a1a1a]">
        AZIMUTH: 360° // ELEV: 02M // CARTOGRAPHY: CARTO_MONO
      </div>

      {/* Corner Registration Marks */}
      <span className="absolute top-1 left-1 text-[10px] text-[#444444] z-20 pointer-events-none">+</span>
      <span className="absolute top-1 right-1 text-[10px] text-[#444444] z-20 pointer-events-none">+</span>
      <span className="absolute bottom-1 left-1 text-[10px] text-[#444444] z-20 pointer-events-none">+</span>
      <span className="absolute bottom-1 right-1 text-[10px] text-[#444444] z-20 pointer-events-none">+</span>
    </div>
  );
}
