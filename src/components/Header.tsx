'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Crosshair, 
  Plus, 
  Bookmark, 
  Zap, 
  Compass, 
  Globe,
  Smartphone,
  Users
} from 'lucide-react';
import { City, UserCoordinates } from '../lib/types';
import { CITIES } from '../lib/data/events';
import { CITY_MOCK_LOCATIONS } from '../lib/geo';

interface HeaderProps {
  currentCity: City;
  onSelectCity: (city: City) => void;
  userCoords: UserCoordinates;
  onUpdateCoords: (coords: UserCoordinates, locationName: string) => void;
  currentLocationName: string;
  viewMode: 'feed' | 'map' | 'split';
  onChangeViewMode: (mode: 'feed' | 'map' | 'split') => void;
  onOpenCreatePlan: () => void;
  onOpenBoostModal: () => void;
  onOpenInsiderModal: () => void;
  savedCount: number;
  onOpenSavedModal: () => void;
  onOpenMobileSimulator?: () => void;
  onOpenSocialModal?: () => void;
}

export default function Header({
  currentCity,
  onSelectCity,
  userCoords,
  onUpdateCoords,
  currentLocationName,
  viewMode,
  onChangeViewMode,
  onOpenCreatePlan,
  onOpenBoostModal,
  onOpenInsiderModal,
  savedCount,
  onOpenSavedModal,
  onOpenMobileSimulator,
  onOpenSocialModal
}: HeaderProps) {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [clockTime, setClockTime] = useState('');

  // Live ticking mechanical time
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setClockTime(d.toTimeString().split(' ')[0] + ' UTC');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const availableLandmarks = CITY_MOCK_LOCATIONS[currentCity.slug] || CITY_MOCK_LOCATIONS.amsterdam;

  const requestRealGPS = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onUpdateCoords(
            { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy },
            'DEVICE_GPS_LOCK'
          );
          setLocationDropdownOpen(false);
        },
        () => {
          alert('GPS hardware rejected or timed out. Defaulting to city center.');
        }
      );
    } else {
      alert('Geolocation API unavailable.');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505] border-b border-[#222222] text-[#F4F4F4] select-none font-mono">
      {/* Top Telemetry Ticker Line */}
      <div className="w-full bg-[#000000] border-b border-[#181818] px-4 py-1 flex items-center justify-between text-[10px] tracking-wider text-[#888888]">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-[#FFFFFF]">
            <span className="inline-block w-1.5 h-1.5 bg-[#FFFFFF] animate-pulse"></span>
            <span>SYSTEM // RADAR_ONLINE</span>
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">SECTOR: {currentCity.name.toUpperCase()} [{currentCity.center.lat.toFixed(4)}°N, {currentCity.center.lng.toFixed(4)}°W/E]</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="hidden md:inline">FREQ: 104.2 MHZ</span>
          <span className="hidden md:inline">|</span>
          <span className="text-[#FFFFFF]">{clockTime}</span>
        </div>
      </div>

      {/* Main Command Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Brand & City Selector */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-[#FFFFFF] text-[#000000] flex items-center justify-center font-black text-xs font-mono">
              RD
            </div>
            <div>
              <span className="text-base font-black tracking-tight font-mono text-[#FFFFFF]">RADAR</span>
              <span className="text-[10px] text-[#777777] ml-1.5 tracking-widest hidden md:inline">
                [{currentCity.code}]
              </span>
            </div>
          </div>

          <div className="h-4 w-[1px] bg-[#222222] hidden sm:block"></div>

          {/* Multi-City Dropdown Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setCityDropdownOpen(!cityDropdownOpen);
                setLocationDropdownOpen(false);
              }}
              className="flex items-center space-x-1.5 px-2.5 py-1 bg-[#111111] border border-[#2b2b2b] hover:border-[#666666] text-xs font-mono text-[#EAEAEA] uppercase transition-colors"
            >
              <Globe className="w-3 h-3 text-[#888888]" />
              <span className="font-bold">[{currentCity.code}] {currentCity.name}</span>
              <ChevronDown className="w-3 h-3 text-[#777777]" />
            </button>

            {cityDropdownOpen && (
              <div className="absolute left-0 mt-1 w-56 bg-[#090909] border border-[#333333] p-1 z-50 shadow-2xl font-mono text-xs">
                <div className="px-2 py-1 text-[9px] uppercase tracking-wider text-[#666666] border-b border-[#1c1c1c] flex justify-between">
                  <span>METROPOLITAN NODES</span>
                  <span>STATUS</span>
                </div>
                {CITIES.map((city) => (
                  <button
                    key={city.slug}
                    onClick={() => {
                      onSelectCity(city);
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2 py-1.5 text-xs text-left transition-colors ${
                      city.slug === currentCity.slug
                        ? 'bg-[#FFFFFF] text-[#000000] font-bold'
                        : 'text-[#AAAAAA] hover:bg-[#1a1a1a] hover:text-[#FFFFFF]'
                    }`}
                  >
                    <span>[{city.code}] {city.name.toUpperCase()}</span>
                    <span className="text-[9px] font-mono">
                      {city.eventCount} SIGS
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Coordinate Lock Dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => {
                setLocationDropdownOpen(!locationDropdownOpen);
                setCityDropdownOpen(false);
              }}
              className="flex items-center space-x-1.5 px-2 py-1 bg-[#090909] border border-[#222222] hover:border-[#555555] text-[11px] font-mono text-[#888888] transition-colors"
            >
              <Crosshair className="w-3 h-3 text-[#FFFFFF]" />
              <span className="max-w-[140px] truncate uppercase">{currentLocationName}</span>
              <ChevronDown className="w-2.5 h-2.5 text-[#555555]" />
            </button>

            {locationDropdownOpen && (
              <div className="absolute left-0 mt-1 w-64 bg-[#090909] border border-[#333333] p-1 z-50 shadow-2xl font-mono text-xs">
                <div className="px-2 py-1 text-[9px] uppercase text-[#666666] border-b border-[#1c1c1c]">
                  {currentCity.name.toUpperCase()} SECTOR CALIBRATION
                </div>
                <button
                  onClick={requestRealGPS}
                  className="w-full flex items-center space-x-2 px-2 py-1.5 text-left text-xs bg-[#141414] text-[#FFFFFF] hover:bg-[#222222] my-1"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>LOCK DEVICE GPS HARDWARE</span>
                </button>
                {availableLandmarks.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() => {
                      onUpdateCoords(loc.coords, loc.name);
                      setLocationDropdownOpen(false);
                    }}
                    className="w-full text-left px-2 py-1 text-[11px] text-[#999999] hover:bg-[#1c1c1c] hover:text-[#FFFFFF] transition-colors uppercase"
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          
          {/* Feed / Split / Map Toggle */}
          <div className="hidden sm:flex items-center bg-[#000000] border border-[#222222] p-0.5">
            <button
              onClick={() => onChangeViewMode('feed')}
              className={`px-2 py-1 text-xs font-mono uppercase transition-colors ${
                viewMode === 'feed'
                  ? 'bg-[#FFFFFF] text-[#000000] font-bold'
                  : 'text-[#777777] hover:text-[#FFFFFF]'
              }`}
            >
              FEED
            </button>
            <button
              onClick={() => onChangeViewMode('split')}
              className={`px-2 py-1 text-xs font-mono uppercase transition-colors ${
                viewMode === 'split'
                  ? 'bg-[#FFFFFF] text-[#000000] font-bold'
                  : 'text-[#777777] hover:text-[#FFFFFF]'
              }`}
            >
              SPLIT_MAP
            </button>
            <button
              onClick={() => onChangeViewMode('map')}
              className={`px-2 py-1 text-xs font-mono uppercase transition-colors ${
                viewMode === 'map'
                  ? 'bg-[#FFFFFF] text-[#000000] font-bold'
                  : 'text-[#777777] hover:text-[#FFFFFF]'
              }`}
            >
              FULL_MAP
            </button>
          </div>

          {/* Mobile Simulator Launcher */}
          {onOpenMobileSimulator && (
            <button
              onClick={onOpenMobileSimulator}
              className="px-2.5 py-1 bg-[#111111] border border-[#333333] hover:border-[#FFFFFF] text-xs font-mono uppercase text-[#FFFFFF] flex items-center space-x-1.5 transition-colors"
              title="Launch Interactive Mobile Device Simulator"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#FFFFFF]" />
              <span className="hidden md:inline">PHONE_APP</span>
            </button>
          )}

          {/* Social Squad Modal Launcher */}
          {onOpenSocialModal && (
            <button
              onClick={onOpenSocialModal}
              className="px-2.5 py-1 bg-[#111111] border border-[#333333] hover:border-[#FFFFFF] text-xs font-mono uppercase text-[#CCCCCC] hover:text-[#FFFFFF] flex items-center space-x-1.5 transition-colors"
              title="Social Squad Sync & Beacons"
            >
              <Users className="w-3.5 h-3.5 text-[#AAAAAA]" />
              <span className="hidden lg:inline">SQUAD</span>
            </button>
          )}

          {/* Squad Plan Creator */}
          <button
            onClick={onOpenCreatePlan}
            className="px-2.5 sm:px-3 py-1 bg-[#111111] border border-[#2c2c2c] hover:border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000] text-xs font-mono uppercase text-[#EAEAEA] transition-colors flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PLAN</span>
          </button>

          {/* Bookmarks */}
          <button
            onClick={onOpenSavedModal}
            className="px-2 py-1 bg-[#111111] border border-[#2c2c2c] hover:border-[#FFFFFF] hover:text-[#FFFFFF] text-xs font-mono uppercase text-[#888888] transition-colors flex items-center space-x-1"
          >
            <Bookmark className="w-3 h-3" />
            <span>[{savedCount}]</span>
          </button>

          {/* Insider Key Pass */}
          <button
            onClick={onOpenInsiderModal}
            className="hidden lg:flex items-center space-x-1.5 px-3 py-1 bg-[#000000] border border-[#444444] hover:border-[#FFFFFF] text-xs font-mono uppercase text-[#EAEAEA] transition-colors"
          >
            <Zap className="w-3 h-3 text-[#FFFFFF]" />
            <span>KEY [€4.99]</span>
          </button>

          {/* Boost Event */}
          <button
            onClick={onOpenBoostModal}
            className="px-3 py-1 bg-[#FFFFFF] hover:bg-[#D4D4D4] text-[#000000] font-mono font-bold text-xs uppercase transition-colors tracking-tight"
          >
            + BOOST_SIGNAL
          </button>
        </div>

      </div>
    </header>
  );
}
