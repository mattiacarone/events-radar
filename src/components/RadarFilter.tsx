'use client';

import React from 'react';
import { 
  X, 
  SlidersHorizontal, 
  ArrowUpDown, 
  DollarSign 
} from 'lucide-react';
import { EventCategory } from '../lib/types';

export type SortMode = 'distance' | 'time' | 'popular';
export type PriceFilter = 'all' | 'free' | 'under15' | 'premium';

interface RadarFilterProps {
  timeFilter: 'now' | 'tonight' | 'tomorrow' | 'weekend' | 'all';
  onChangeTimeFilter: (filter: 'now' | 'tonight' | 'tomorrow' | 'weekend' | 'all') => void;
  distanceKm: number | null;
  onChangeDistanceKm: (dist: number | null) => void;
  selectedCategory: EventCategory | 'all';
  onChangeCategory: (cat: EventCategory | 'all') => void;
  selectedNeighborhood: string | 'all';
  onChangeNeighborhood: (hood: string | 'all') => void;
  neighborhoods: string[];
  searchQuery: string;
  onChangeSearchQuery: (query: string) => void;
  sortMode: SortMode;
  onChangeSortMode: (mode: SortMode) => void;
  priceFilter: PriceFilter;
  onChangePriceFilter: (pf: PriceFilter) => void;
  totalFilteredCount: number;
  friendsOnly?: boolean;
  onChangeFriendsOnly?: (val: boolean) => void;
  onOpenSocialModal?: () => void;
}

const CATEGORIES: { id: EventCategory | 'all'; label: string; code: string }[] = [
  { id: 'all', label: 'ALL SIGNALS', code: '00' },
  { id: 'nightlife', label: 'NIGHTLIFE', code: '01' },
  { id: 'live-music', label: 'LIVE SOUND', code: '02' },
  { id: 'food-wine', label: 'FOOD & WINE', code: '03' },
  { id: 'art-culture', label: 'EXHIBITIONS', code: '04' },
  { id: 'tech-networking', label: 'TECH & FOUNDERS', code: '05' },
  { id: 'secret-popup', label: 'SECRET DROPS', code: '06' },
  { id: 'community', label: 'COMMUNITY', code: '07' }
];

export default function RadarFilter({
  timeFilter,
  onChangeTimeFilter,
  distanceKm,
  onChangeDistanceKm,
  selectedCategory,
  onChangeCategory,
  selectedNeighborhood,
  onChangeNeighborhood,
  neighborhoods,
  searchQuery,
  onChangeSearchQuery,
  sortMode,
  onChangeSortMode,
  priceFilter,
  onChangePriceFilter,
  totalFilteredCount,
  friendsOnly = false,
  onChangeFriendsOnly,
  onOpenSocialModal
}: RadarFilterProps) {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  return (
    <div className="w-full bg-[#050505] border-b border-[#222222] font-mono text-[#EAEAEA] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 space-y-2.5">
        
        {/* Row 1: Time spectrum & Proximity Range + Search & Sort */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Time Spectrum Dial */}
          <div className="flex items-center space-x-1 p-0.5 bg-[#000000] border border-[#222222] overflow-x-auto no-scrollbar">
            <span className="text-[10px] uppercase text-[#666666] px-2 hidden sm:inline">
              TEMPORAL:
            </span>

            <button
              onClick={() => onChangeTimeFilter('now')}
              className={`px-3 py-1 text-xs uppercase tracking-tight transition-colors ${
                timeFilter === 'now'
                  ? 'bg-[#FFFFFF] text-[#000000] font-bold'
                  : 'text-[#888888] hover:text-[#FFFFFF]'
              }`}
            >
              [● NOW]
            </button>

            <button
              onClick={() => onChangeTimeFilter('tonight')}
              className={`px-3 py-1 text-xs uppercase tracking-tight transition-colors ${
                timeFilter === 'tonight'
                  ? 'bg-[#FFFFFF] text-[#000000] font-bold'
                  : 'text-[#888888] hover:text-[#FFFFFF]'
              }`}
            >
              [TONIGHT]
            </button>

            <button
              onClick={() => onChangeTimeFilter('tomorrow')}
              className={`px-3 py-1 text-xs uppercase tracking-tight transition-colors ${
                timeFilter === 'tomorrow'
                  ? 'bg-[#FFFFFF] text-[#000000] font-bold'
                  : 'text-[#888888] hover:text-[#FFFFFF]'
              }`}
            >
              [TOMORROW]
            </button>

            <button
              onClick={() => onChangeTimeFilter('weekend')}
              className={`px-3 py-1 text-xs uppercase tracking-tight transition-colors ${
                timeFilter === 'weekend'
                  ? 'bg-[#FFFFFF] text-[#000000] font-bold'
                  : 'text-[#888888] hover:text-[#FFFFFF]'
              }`}
            >
              [WEEKEND]
            </button>

            <button
              onClick={() => onChangeTimeFilter('all')}
              className={`px-3 py-1 text-xs uppercase tracking-tight transition-colors ${
                timeFilter === 'all'
                  ? 'bg-[#FFFFFF] text-[#000000] font-bold'
                  : 'text-[#888888] hover:text-[#FFFFFF]'
              }`}
            >
              [ALL_DATES]
            </button>
          </div>

          {/* Proximity Range & Search */}
          <div className="flex items-center space-x-2">
            
            {/* Search */}
            <div className="relative flex-1 md:w-56 bg-[#000000] border border-[#242424] focus-within:border-[#888888]">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#555555]">
                &gt;
              </span>
              <input
                type="text"
                placeholder="SEARCH_SIGNALS..."
                value={searchQuery}
                onChange={(e) => onChangeSearchQuery(e.target.value)}
                className="w-full bg-transparent pl-6 pr-6 py-1 text-xs font-mono text-[#FFFFFF] placeholder-[#555555] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onChangeSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#FFFFFF]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Distance Scope Selector */}
            <div className="flex items-center space-x-1 p-0.5 bg-[#000000] border border-[#242424]">
              <span className="text-[10px] text-[#666666] px-1 hidden xl:inline">RAD:</span>
              {[
                { label: 'R<2KM', value: 2 },
                { label: 'R<5KM', value: 5 },
                { label: 'MAX', value: null }
              ].map((r) => (
                <button
                  key={r.label}
                  onClick={() => onChangeDistanceKm(r.value)}
                  className={`px-2 py-1 text-[10px] font-mono uppercase transition-colors ${
                    distanceKm === r.value
                      ? 'bg-[#333333] text-[#FFFFFF] font-bold'
                      : 'text-[#777777] hover:text-[#FFFFFF]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Advanced toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="p-1.5 border border-[#242424] bg-[#000000] text-[#888888] hover:text-[#FFFFFF]"
              title="Toggle Sort & Filters"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Row 2: Category Switches */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-0.5 border-t border-[#141414] pt-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onChangeCategory(cat.id)}
                className={`px-2.5 py-1 text-[11px] font-mono tracking-tight uppercase whitespace-nowrap transition-colors border ${
                  isSelected
                    ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF] font-bold'
                    : 'bg-[#000000] text-[#777777] border-[#202020] hover:border-[#444444] hover:text-[#CCCCCC]'
                }`}
              >
                <span className="text-[9px] mr-1 opacity-60">[{cat.code}]</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Row 3: Extended Controls (Sort, Price, Sector) */}
        <div className={`pt-2 border-t border-[#141414] space-y-2 ${showAdvanced ? 'block' : 'hidden md:block'}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px]">
            
            {/* Sector / Neighborhoods */}
            <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
              <span className="text-[#555555] uppercase mr-1">
                SECTOR:
              </span>
              <button
                onClick={() => onChangeNeighborhood('all')}
                className={`px-2 py-0.5 border transition-colors ${
                  selectedNeighborhood === 'all'
                    ? 'bg-[#222222] text-[#FFFFFF] border-[#444444]'
                    : 'bg-transparent text-[#666666] border-transparent hover:text-[#AAAAAA]'
                }`}
              >
                [ALL_SECTORS]
              </button>
              {neighborhoods.map((hood) => (
                <button
                  key={hood}
                  onClick={() => onChangeNeighborhood(hood)}
                  className={`px-2 py-0.5 whitespace-nowrap border transition-colors ${
                    selectedNeighborhood === hood
                      ? 'bg-[#222222] text-[#FFFFFF] border-[#444444]'
                      : 'bg-transparent text-[#666666] border-transparent hover:text-[#AAAAAA]'
                  }`}
                >
                  {hood.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Sort & Tariff Dials */}
            <div className="flex items-center space-x-2">
              {/* Friends Going Quick Filter */}
              {onChangeFriendsOnly && (
                <button
                  onClick={() => onChangeFriendsOnly(!friendsOnly)}
                  className={`px-2 py-0.5 border text-[10px] font-mono uppercase flex items-center space-x-1 transition-colors ${
                    friendsOnly
                      ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF] font-bold'
                      : 'bg-[#000000] text-[#888888] border-[#333333] hover:text-[#FFFFFF] hover:border-[#666666]'
                  }`}
                  title="Filter events your squad & friends are attending"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${friendsOnly ? 'bg-[#000000]' : 'bg-[#FFFFFF]'}`}></span>
                  <span>[SQUAD_RADAR]</span>
                </button>
              )}

              {/* Tariff Filter */}
              <div className="flex items-center space-x-0.5 p-0.5 bg-[#000000] border border-[#222222]">
                <span className="text-[#555555] px-1 uppercase">TARIFF:</span>
                {[
                  { id: 'all', label: 'ANY' },
                  { id: 'free', label: 'FREE' },
                  { id: 'under15', label: '<€15' },
                  { id: 'premium', label: 'PRM' }
                ].map((pf) => (
                  <button
                    key={pf.id}
                    onClick={() => onChangePriceFilter(pf.id as PriceFilter)}
                    className={`px-1.5 py-0.5 uppercase transition-colors ${
                      priceFilter === pf.id
                        ? 'bg-[#333333] text-[#FFFFFF] font-bold'
                        : 'text-[#666666] hover:text-[#AAAAAA]'
                    }`}
                  >
                    {pf.label}
                  </button>
                ))}
              </div>

              {/* Sort Order */}
              <div className="flex items-center space-x-0.5 p-0.5 bg-[#000000] border border-[#222222]">
                <span className="text-[#555555] px-1 uppercase">SORT:</span>
                {[
                  { id: 'distance', label: 'PROXIMITY' },
                  { id: 'time', label: 'CHRONO' },
                  { id: 'popular', label: 'POPULAR' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onChangeSortMode(s.id as SortMode)}
                    className={`px-1.5 py-0.5 uppercase transition-colors ${
                      sortMode === s.id
                        ? 'bg-[#FFFFFF] text-[#000000] font-bold'
                        : 'text-[#666666] hover:text-[#AAAAAA]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
