'use client';

import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { EventItem } from '../lib/types';

interface SavedEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedEvents: EventItem[];
  onOpenDetails: (event: EventItem) => void;
  onRemoveSaved: (id: string) => void;
}

export default function SavedEventsModal({
  isOpen,
  onClose,
  savedEvents,
  onOpenDetails,
  onRemoveSaved
}: SavedEventsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#000000]/90 backdrop-blur-sm overflow-y-auto font-mono text-[#EAEAEA]">
      <div className="relative w-full max-w-lg bg-[#090909] border border-[#333333] shadow-2xl overflow-hidden my-auto">
        
        {/* Precision Crosshairs */}
        <span className="absolute -top-1.5 -left-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>
        <span className="absolute -top-1.5 -right-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>
        <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>
        <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>

        {/* Modal Header */}
        <div className="p-4 border-b border-[#222222] bg-[#000000] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-4 h-4 text-[#FFFFFF]" />
            <span className="font-bold text-[#FFFFFF]">BOOKMARKED_SIGNALS [{savedEvents.length} STORED]</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#222222] text-[#888888] hover:text-[#FFFFFF]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="p-4 max-h-[65vh] overflow-y-auto no-scrollbar space-y-2 text-xs">
          {savedEvents.length === 0 ? (
            <div className="py-12 text-center text-[#666666] space-y-2">
              <div className="text-sm font-bold">[NO SIGNALS LOGGED]</div>
              <p className="text-[11px]">Click the bookmark icon on any event card to store it in local memory.</p>
            </div>
          ) : (
            savedEvents.map((ev) => (
              <div
                key={ev.id}
                onClick={() => {
                  onOpenDetails(ev);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 bg-[#000000] border border-[#222222] hover:border-[#666666] cursor-pointer group transition-colors"
              >
                <div className="truncate max-w-[80%] space-y-0.5">
                  <div className="font-bold text-[#FFFFFF] truncate group-hover:underline">
                    {ev.title.toUpperCase()}
                  </div>
                  <div className="text-[10px] text-[#777777] truncate">
                    {ev.venue.name} // {ev.venue.neighborhood} // {ev.price.label}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSaved(ev.id);
                    }}
                    className="p-1.5 text-[#555555] hover:text-[#FFFFFF] transition-colors"
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <ArrowRight className="w-3.5 h-3.5 text-[#555555] group-hover:text-[#FFFFFF]" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
