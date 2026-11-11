'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import RadarFilter, { SortMode, PriceFilter } from '../components/RadarFilter';
import EventCard from '../components/EventCard';
import EventDetailModal from '../components/EventDetailModal';
import InteractiveMap from '../components/InteractiveMap';
import CreatePlanModal from '../components/CreatePlanModal';
import OrganizerBoostModal from '../components/OrganizerBoostModal';
import InsiderModal from '../components/InsiderModal';
import SavedEventsModal from '../components/SavedEventsModal';
import MobileBottomNav from '../components/MobileBottomNav';
import SocialRadarModal from '../components/SocialRadarModal';
import MobileSimulatorModal from '../components/MobileSimulatorModal';

import { City, EventCategory, EventItem, UserCoordinates } from '../lib/types';
import { CITIES } from '../lib/data/events';
import { calculateDistanceKm, calculateBearingDeg, CITY_MOCK_LOCATIONS } from '../lib/geo';
import { 
  getAllEvents, 
  getSavedEventIds, 
  toggleSaveEventId 
} from '../lib/storage';
import { 
  parseISO, 
  isToday, 
  isTomorrow, 
  isWeekend, 
  differenceInHours 
} from 'date-fns';
import { Crosshair, Radio, Smartphone, Users, Map as MapIcon, Columns } from 'lucide-react';

export default function HomePage() {
  const [currentCity, setCurrentCity] = useState<City>(CITIES[0]);
  const [userCoords, setUserCoords] = useState<UserCoordinates>(CITIES[0].center);
  const [currentLocationName, setCurrentLocationName] = useState<string>(CITIES[0].name + ' CENTER');

  const [timeFilter, setTimeFilter] = useState<'now' | 'tonight' | 'tomorrow' | 'weekend' | 'all'>('now');
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortMode, setSortMode] = useState<SortMode>('distance');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [friendsOnly, setFriendsOnly] = useState<boolean>(false);

  // Default to 'split' view so the Map is IMMEDIATELY visible alongside event cards!
  const [viewMode, setViewMode] = useState<'feed' | 'map' | 'split'>('split');

  const [selectedEventForDetail, setSelectedEventForDetail] = useState<EventItem | null>(null);
  const [selectedEventOnMap, setSelectedEventOnMap] = useState<EventItem | null>(null);
  const [isBoostModalOpen, setIsBoostModalOpen] = useState(false);
  const [isInsiderModalOpen, setIsInsiderModalOpen] = useState(false);
  const [isCreatePlanModalOpen, setIsCreatePlanModalOpen] = useState(false);
  const [preSelectedPlanEvent, setPreSelectedPlanEvent] = useState<EventItem | null>(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [isMobileSimulatorOpen, setIsMobileSimulatorOpen] = useState(false);

  const [isInsiderMember, setIsInsiderMember] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [eventsList, setEventsList] = useState<EventItem[]>([]);

  useEffect(() => {
    setEventsList(getAllEvents());
    setSavedIds(getSavedEventIds());
    const member = localStorage.getItem('radar_insider_member');
    if (member === 'true') setIsInsiderMember(true);
  }, []);

  // Global Keyboard Shortcuts (Taste Skill: Pro ergonomics)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'm' || e.key === 'M') {
        setViewMode((prev) => (prev === 'feed' ? 'map' : 'feed'));
      } else if (e.key === 'b' || e.key === 'B') {
        setIsBoostModalOpen(true);
      } else if (e.key === 'p' || e.key === 'P') {
        setPreSelectedPlanEvent(null);
        setIsCreatePlanModalOpen(true);
      } else if (e.key === 's' || e.key === 'S') {
        setIsSavedModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSave = (id: string) => {
    const updated = toggleSaveEventId(id);
    setSavedIds(updated);
  };

  const handleActivateInsider = () => {
    setIsInsiderMember(true);
    localStorage.setItem('radar_insider_member', 'true');
    setIsInsiderModalOpen(false);
  };

  const handleOpenPlanForEvent = (event: EventItem) => {
    setPreSelectedPlanEvent(event);
    setIsCreatePlanModalOpen(true);
  };

  const handleCityChange = (newCity: City) => {
    setCurrentCity(newCity);
    setUserCoords(newCity.center);
    const mockLocs = CITY_MOCK_LOCATIONS[newCity.slug];
    setCurrentLocationName(mockLocs && mockLocs[0] ? mockLocs[0].name : newCity.name + ' CENTER');
    setSelectedNeighborhood('all');
  };

  const filteredEvents = useMemo(() => {
    const now = new Date();

    return eventsList
      .map((ev) => {
        const dist = calculateDistanceKm(userCoords, {
          lat: ev.venue.lat,
          lng: ev.venue.lng
        });
        const bearing = calculateBearingDeg(userCoords, {
          lat: ev.venue.lat,
          lng: ev.venue.lng
        });
        const startDate = parseISO(ev.startTime);
        const endDate = parseISO(ev.endTime);
        const isLive = now >= startDate && now <= endDate;
        const diffHours = differenceInHours(startDate, now);

        return {
          ...ev,
          distanceKm: dist,
          bearingDeg: bearing,
          isLiveNow: isLive,
          startsInHours: diffHours
        };
      })
      .filter((ev) => {
        if (ev.citySlug !== currentCity.slug) return false;

        if (distanceKm !== null && ev.distanceKm !== undefined && ev.distanceKm > distanceKm) {
          return false;
        }

        if (selectedCategory !== 'all' && ev.category !== selectedCategory) {
          return false;
        }

        if (selectedNeighborhood !== 'all' && ev.venue.neighborhood !== selectedNeighborhood) {
          return false;
        }

        // Price Filter
        if (priceFilter === 'free' && !ev.price.isFree) return false;
        if (priceFilter === 'under15' && (ev.price.amount !== undefined && ev.price.amount > 15)) return false;
        if (priceFilter === 'premium' && (ev.price.amount === undefined || ev.price.amount < 20)) return false;

        const startDate = parseISO(ev.startTime);
        const endDate = parseISO(ev.endTime);

        if (timeFilter === 'now') {
          const isOngoing = now >= startDate && now <= endDate;
          const startsSoon = startDate > now && differenceInHours(startDate, now) <= 2;
          if (!isOngoing && !startsSoon) return false;
        } else if (timeFilter === 'tonight') {
          if (!isToday(startDate) && !ev.isLiveNow) return false;
        } else if (timeFilter === 'tomorrow') {
          if (!isTomorrow(startDate)) return false;
        } else if (timeFilter === 'weekend') {
          if (!isWeekend(startDate) && !isToday(startDate) && !isTomorrow(startDate)) return false;
        }

        // Squad Friends Filter
        if (friendsOnly && (!ev.friendsGoing || ev.friendsGoing.length === 0)) {
          return false;
        }

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = ev.title.toLowerCase().includes(q);
          const matchVenue = ev.venue.name.toLowerCase().includes(q);
          const matchDesc = ev.description.toLowerCase().includes(q);
          const matchTag = ev.vibeTags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchVenue && !matchDesc && !matchTag) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Promoted priority
        if (a.isPromoted && !b.isPromoted) return -1;
        if (!a.isPromoted && b.isPromoted) return 1;

        if (sortMode === 'time') {
          return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
        }
        if (sortMode === 'popular') {
          return b.attendeeCount - a.attendeeCount;
        }

        // Default: Live now, then distance
        if (a.isLiveNow && !b.isLiveNow) return -1;
        if (!a.isLiveNow && b.isLiveNow) return 1;
        return (a.distanceKm || 0) - (b.distanceKm || 0);
      });
  }, [
    eventsList,
    userCoords,
    currentCity,
    distanceKm,
    selectedCategory,
    selectedNeighborhood,
    timeFilter,
    searchQuery,
    sortMode,
    priceFilter,
    friendsOnly
  ]);

  const savedEventsList = useMemo(() => {
    return eventsList.filter((e) => savedIds.includes(e.id));
  }, [eventsList, savedIds]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F4F4] flex flex-col pb-20 sm:pb-10 font-mono selection:bg-[#FFFFFF] selection:text-[#000000]">
      
      {/* Mechanical Header */}
      <Header
        currentCity={currentCity}
        onSelectCity={handleCityChange}
        userCoords={userCoords}
        onUpdateCoords={(coords, name) => {
          setUserCoords(coords);
          setCurrentLocationName(name);
        }}
        currentLocationName={currentLocationName}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        onOpenCreatePlan={() => {
          setPreSelectedPlanEvent(null);
          setIsCreatePlanModalOpen(true);
        }}
        onOpenBoostModal={() => setIsBoostModalOpen(true)}
        onOpenInsiderModal={() => setIsInsiderModalOpen(true)}
        savedCount={savedIds.length}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenMobileSimulator={() => setIsMobileSimulatorOpen(true)}
        onOpenSocialModal={() => setIsSocialModalOpen(true)}
      />

      {/* Radar Dial Filter */}
      <RadarFilter
        timeFilter={timeFilter}
        onChangeTimeFilter={setTimeFilter}
        distanceKm={distanceKm}
        onChangeDistanceKm={setDistanceKm}
        selectedCategory={selectedCategory}
        onChangeCategory={setSelectedCategory}
        selectedNeighborhood={selectedNeighborhood}
        onChangeNeighborhood={setSelectedNeighborhood}
        neighborhoods={currentCity.neighborhoods}
        searchQuery={searchQuery}
        onChangeSearchQuery={setSearchQuery}
        sortMode={sortMode}
        onChangeSortMode={setSortMode}
        priceFilter={priceFilter}
        onChangePriceFilter={setPriceFilter}
        totalFilteredCount={filteredEvents.length}
        friendsOnly={friendsOnly}
        onChangeFriendsOnly={setFriendsOnly}
        onOpenSocialModal={() => setIsSocialModalOpen(true)}
      />

      {/* Main Tactical Grid Canvas */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-3 pb-8 space-y-3.5">
        
        {/* Structural Mechanical Banner with Quick Device & Social Actions */}
        <div className="relative border border-[#222222] bg-[#090909] p-3.5 sm:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <span className="absolute -top-1 -left-1 text-[9px] text-[#444444]">+</span>
          <span className="absolute -top-1 -right-1 text-[9px] text-[#444444]">+</span>
          <span className="absolute -bottom-1 -left-1 text-[9px] text-[#444444]">+</span>
          <span className="absolute -bottom-1 -right-1 text-[9px] text-[#444444]">+</span>

          <div className="space-y-1 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#888888]">
              <span className="inline-block w-1.5 h-1.5 bg-[#FFFFFF] animate-pulse"></span>
              <span className="text-[#FFFFFF] font-bold">SECTOR: {currentCity.name.toUpperCase()} [{currentCity.country.toUpperCase()}]</span>
              <span>|</span>
              <span>COORDS: {userCoords.lat.toFixed(4)}°N, {userCoords.lng.toFixed(4)}°W/E</span>
              <span>|</span>
              <span className="hidden lg:inline text-[#AAAAAA]">SHORTCUTS: [M: MAP] [P: PLAN] [B: BOOST]</span>
            </div>
            <h1 className="text-sm font-black text-[#FFFFFF] tracking-tight uppercase">
              REAL-TIME EVENT SCOUTING TELEMETRY // {currentCity.name.toUpperCase()}
            </h1>
            <p className="text-[11px] text-[#777777]">
              Showing {filteredEvents.length} active signals within {distanceKm ? `${distanceKm}.0 km perimeter` : `all metropolitan zones`}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Direct Bar */}
            <div className="flex items-center bg-[#000000] border border-[#2a2a2a] p-0.5">
              <button
                onClick={() => setViewMode('split')}
                className={`px-2 py-1 text-[11px] uppercase transition-colors flex items-center space-x-1 ${
                  viewMode === 'split' ? 'bg-[#FFFFFF] text-[#000000] font-bold' : 'text-[#888888] hover:text-[#FFFFFF]'
                }`}
                title="View Map and Events side by side"
              >
                <Columns className="w-3 h-3" />
                <span>SPLIT_MAP</span>
              </button>
              <button
                onClick={() => setViewMode('feed')}
                className={`px-2 py-1 text-[11px] uppercase transition-colors ${
                  viewMode === 'feed' ? 'bg-[#FFFFFF] text-[#000000] font-bold' : 'text-[#888888] hover:text-[#FFFFFF]'
                }`}
                title="Cards Only"
              >
                FEED
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-2 py-1 text-[11px] uppercase transition-colors flex items-center space-x-1 ${
                  viewMode === 'map' ? 'bg-[#FFFFFF] text-[#000000] font-bold' : 'text-[#888888] hover:text-[#FFFFFF]'
                }`}
                title="Full Tactical Map"
              >
                <MapIcon className="w-3 h-3" />
                <span>FULL_MAP</span>
              </button>
            </div>

            {/* Mobile App Simulator trigger */}
            <button
              onClick={() => setIsMobileSimulatorOpen(true)}
              className="px-2.5 py-1.5 bg-[#111111] border border-[#333333] hover:border-[#FFFFFF] text-xs font-mono uppercase text-[#FFFFFF] flex items-center space-x-1 transition-colors"
              title="Launch Mobile Device Simulator"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>📱 PHONE APP</span>
            </button>

            {/* Social Squad Modal trigger */}
            <button
              onClick={() => setIsSocialModalOpen(true)}
              className="px-2.5 py-1.5 bg-[#111111] border border-[#333333] hover:border-[#FFFFFF] text-xs font-mono uppercase text-[#FFFFFF] flex items-center space-x-1 transition-colors"
              title="Friends & Social Network Sync"
            >
              <Users className="w-3.5 h-3.5 text-[#AAAAAA]" />
              <span>SQUAD SYNC</span>
            </button>

            <button
              onClick={() => setIsInsiderModalOpen(true)}
              className="px-3 py-1.5 bg-[#000000] border border-[#333333] hover:border-[#FFFFFF] text-xs font-mono uppercase text-[#FFFFFF] transition-colors"
            >
              {isInsiderMember ? '[KEY: ACTIVE]' : '[INSIDER KEY // €4.99]'}
            </button>
          </div>
        </div>

        {/* View Mode 1: DUAL SPLIT VIEW (Map Sticky + Feed Scrollable) */}
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
            
            {/* Tactical Map Column (Sticky on Desktop) */}
            <div className="lg:col-span-5 w-full lg:sticky lg:top-20 z-20 space-y-2">
              <div className="p-2 bg-[#000000] border border-[#222222] flex items-center justify-between text-[10px] text-[#888888]">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-[#FFFFFF] animate-pulse"></span>
                  <span className="text-[#FFFFFF] font-bold">TACTICAL RADAR SCOPE</span>
                </div>
                <span>{filteredEvents.length} TARGETS IN RANGE</span>
              </div>

              <div className="h-[320px] sm:h-[400px] lg:h-[680px] w-full border border-[#262626] relative overflow-hidden bg-[#000000]">
                <InteractiveMap
                  events={filteredEvents}
                  userCoords={userCoords}
                  selectedEvent={selectedEventOnMap}
                  onSelectEvent={(ev) => {
                    setSelectedEventOnMap(ev);
                    setSelectedEventForDetail(ev);
                  }}
                  radiusKm={distanceKm}
                />
              </div>

              {selectedEventOnMap && (
                <div className="p-2.5 bg-[#0a0a0a] border border-[#333333] flex items-center justify-between text-xs">
                  <div className="truncate max-w-[240px]">
                    <div className="text-[9px] text-[#777777]">TARGET LOCK:</div>
                    <div className="font-bold text-[#FFFFFF] truncate">{selectedEventOnMap.title}</div>
                  </div>
                  <button
                    onClick={() => setSelectedEventForDetail(selectedEventOnMap)}
                    className="px-2 py-1 bg-[#FFFFFF] text-[#000000] text-[10px] font-bold uppercase"
                  >
                    INSPECT
                  </button>
                </div>
              )}
            </div>

            {/* Event Feed Column */}
            <div className="lg:col-span-7 space-y-3">
              {filteredEvents.length === 0 ? (
                <div className="py-20 text-center border border-[#222222] bg-[#080808] space-y-3">
                  <Crosshair className="w-8 h-8 text-[#555555] mx-auto stroke-1" />
                  <h3 className="text-sm font-bold text-[#FFFFFF] uppercase">NO TRANSMISSIONS DETECTED</h3>
                  <p className="text-xs text-[#777777] max-w-sm mx-auto">
                    Expand temporal switch to [TOMORROW] or [ALL_DATES], or increase proximity range.
                  </p>
                  <button
                    onClick={() => {
                      setTimeFilter('all');
                      setDistanceKm(null);
                      setSelectedCategory('all');
                      setSelectedNeighborhood('all');
                      setSearchQuery('');
                      setPriceFilter('all');
                      setFriendsOnly(false);
                    }}
                    className="px-4 py-2 bg-[#1c1c1c] border border-[#333333] text-xs uppercase text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000]"
                  >
                    [RESET FILTERS]
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isSaved={savedIds.includes(event.id)}
                      onToggleSave={handleToggleSave}
                      onOpenDetails={(ev) => setSelectedEventForDetail(ev)}
                      onAddToPlan={handleOpenPlanForEvent}
                      onShowOnMap={(ev) => {
                        setSelectedEventOnMap(ev);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* View Mode 2: FULL MAP SCOPE */}
        {viewMode === 'map' && (
          <div className="h-[75vh] w-full relative border border-[#222222]">
            <InteractiveMap
              events={filteredEvents}
              userCoords={userCoords}
              selectedEvent={selectedEventOnMap}
              onSelectEvent={(ev) => {
                setSelectedEventOnMap(ev);
                setSelectedEventForDetail(ev);
              }}
              radiusKm={distanceKm}
            />
          </div>
        )}

        {/* View Mode 3: FULL GRID FEED */}
        {viewMode === 'feed' && (
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="py-20 text-center border border-[#222222] bg-[#080808] space-y-3">
                <Crosshair className="w-8 h-8 text-[#555555] mx-auto stroke-1" />
                <h3 className="text-sm font-bold text-[#FFFFFF] uppercase">NO TRANSMISSIONS DETECTED IN THIS SCOPE</h3>
                <p className="text-xs text-[#777777] max-w-sm mx-auto">
                  Expand distance to [MAX] or switch temporal filter to [TOMORROW], [WEEKEND] or [ALL_DATES].
                </p>
                <button
                  onClick={() => {
                    setTimeFilter('all');
                    setDistanceKm(null);
                    setSelectedCategory('all');
                    setSelectedNeighborhood('all');
                    setSearchQuery('');
                    setPriceFilter('all');
                    setFriendsOnly(false);
                  }}
                  className="px-4 py-2 bg-[#1c1c1c] border border-[#333333] text-xs uppercase text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000]"
                >
                  [RESET TELEMETRY FILTERS]
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isSaved={savedIds.includes(event.id)}
                    onToggleSave={handleToggleSave}
                    onOpenDetails={(ev) => setSelectedEventForDetail(ev)}
                    onAddToPlan={handleOpenPlanForEvent}
                    onShowOnMap={(ev) => {
                      setSelectedEventOnMap(ev);
                      setViewMode('split');
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Mobile Bottom Dock */}
      <MobileBottomNav
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        onOpenCreatePlan={() => {
          setPreSelectedPlanEvent(null);
          setIsCreatePlanModalOpen(true);
        }}
        onOpenBoostModal={() => setIsBoostModalOpen(true)}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        savedCount={savedIds.length}
      />

      {/* Modals */}
      <EventDetailModal
        event={selectedEventForDetail}
        onClose={() => setSelectedEventForDetail(null)}
        isSaved={selectedEventForDetail ? savedIds.includes(selectedEventForDetail.id) : false}
        onToggleSave={handleToggleSave}
        onAddToPlan={handleOpenPlanForEvent}
      />

      <CreatePlanModal
        isOpen={isCreatePlanModalOpen}
        onClose={() => setIsCreatePlanModalOpen(false)}
        availableEvents={eventsList.filter((e) => e.citySlug === currentCity.slug)}
        preSelectedEvent={preSelectedPlanEvent}
        onPlanCreated={() => {}}
      />

      <OrganizerBoostModal
        isOpen={isBoostModalOpen}
        onClose={() => setIsBoostModalOpen(false)}
        onEventCreated={() => {
          setEventsList(getAllEvents());
        }}
      />

      <InsiderModal
        isOpen={isInsiderModalOpen}
        onClose={() => setIsInsiderModalOpen(false)}
        isMember={isInsiderMember}
        onActivateMembership={handleActivateInsider}
      />

      <SavedEventsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedEvents={savedEventsList}
        onOpenDetails={(ev) => setSelectedEventForDetail(ev)}
        onRemoveSaved={handleToggleSave}
      />

      {/* Social Squad Radar Modal */}
      <SocialRadarModal
        isOpen={isSocialModalOpen}
        onClose={() => setIsSocialModalOpen(false)}
      />

      {/* Interactive Mobile Device Simulator */}
      <MobileSimulatorModal
        isOpen={isMobileSimulatorOpen}
        onClose={() => setIsMobileSimulatorOpen(false)}
        currentCityName={currentCity.name}
      />

    </div>
  );
}
