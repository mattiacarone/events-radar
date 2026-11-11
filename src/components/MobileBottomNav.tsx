'use client';

import React from 'react';
import { 
  Radio, 
  Map as MapIcon, 
  Users, 
  Plus, 
  Bookmark 
} from 'lucide-react';

interface MobileBottomNavProps {
  viewMode: 'feed' | 'map' | 'split';
  onChangeViewMode: (mode: 'feed' | 'map' | 'split') => void;
  onOpenCreatePlan: () => void;
  onOpenBoostModal: () => void;
  onOpenSavedModal: () => void;
  savedCount: number;
}

export default function MobileBottomNav({
  viewMode,
  onChangeViewMode,
  onOpenCreatePlan,
  onOpenBoostModal,
  onOpenSavedModal,
  savedCount
}: MobileBottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#000000] border-t border-[#222222] px-2 py-1 flex items-center justify-around font-mono text-[10px]">
      
      {/* Radar Feed */}
      <button
        onClick={() => onChangeViewMode('feed')}
        className={`flex flex-col items-center py-1 px-3 transition-colors ${
          viewMode === 'feed'
            ? 'text-[#FFFFFF] font-bold'
            : 'text-[#666666] hover:text-[#FFFFFF]'
        }`}
      >
        <Radio className="w-4 h-4 mb-0.5" />
        <span>RADAR</span>
      </button>

      {/* Map Scope */}
      <button
        onClick={() => onChangeViewMode('map')}
        className={`flex flex-col items-center py-1 px-3 transition-colors ${
          viewMode === 'map'
            ? 'text-[#FFFFFF] font-bold'
            : 'text-[#666666] hover:text-[#FFFFFF]'
        }`}
      >
        <MapIcon className="w-4 h-4 mb-0.5" />
        <span>SCOPE</span>
      </button>

      {/* Boost Action */}
      <button
        onClick={onOpenBoostModal}
        className="flex flex-col items-center justify-center w-10 h-10 bg-[#FFFFFF] text-[#000000] border border-[#FFFFFF] font-bold -mt-3 shadow-lg"
      >
        <Plus className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Squad Plan */}
      <button
        onClick={onOpenCreatePlan}
        className="flex flex-col items-center py-1 px-3 text-[#666666] hover:text-[#FFFFFF] transition-colors"
      >
        <Users className="w-4 h-4 mb-0.5" />
        <span>PLAN</span>
      </button>

      {/* Bookmarks */}
      <button
        onClick={onOpenSavedModal}
        className="relative flex flex-col items-center py-1 px-3 text-[#666666] hover:text-[#FFFFFF] transition-colors"
      >
        <Bookmark className="w-4 h-4 mb-0.5" />
        {savedCount > 0 && (
          <span className="absolute top-0 right-2 w-3.5 h-3.5 bg-[#FFFFFF] text-[#000000] text-[8px] font-bold flex items-center justify-center">
            {savedCount}
          </span>
        )}
        <span>SAVED</span>
      </button>

    </div>
  );
}
