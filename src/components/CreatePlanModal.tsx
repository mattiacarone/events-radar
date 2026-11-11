'use client';

import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Check, 
  Copy, 
  ArrowRight 
} from 'lucide-react';
import { EventItem, SquadPlan } from '../lib/types';
import { savePlan } from '../lib/storage';

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableEvents: EventItem[];
  preSelectedEvent?: EventItem | null;
  onPlanCreated: (plan: SquadPlan) => void;
}

export default function CreatePlanModal({
  isOpen,
  onClose,
  availableEvents,
  preSelectedEvent,
  onPlanCreated
}: CreatePlanModalProps) {
  const [title, setTitle] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>(
    preSelectedEvent ? [preSelectedEvent.id] : []
  );
  const [createdPlan, setCreatedPlan] = useState<SquadPlan | null>(null);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (preSelectedEvent && !selectedEventIds.includes(preSelectedEvent.id)) {
      setSelectedEventIds((prev) => [...prev, preSelectedEvent.id]);
    }
  }, [preSelectedEvent]);

  if (!isOpen) return null;

  const toggleEventSelect = (id: string) => {
    if (selectedEventIds.includes(id)) {
      setSelectedEventIds(selectedEventIds.filter((item) => item !== id));
    } else {
      if (selectedEventIds.length >= 4) {
        alert('Maximum of 4 event candidates per squad dispatch.');
        return;
      }
      setSelectedEventIds([...selectedEventIds, id]);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !creatorName.trim()) {
      alert('Provide plan title and identity callsign.');
      return;
    }
    if (selectedEventIds.length === 0) {
      alert('Select at least 1 candidate signal.');
      return;
    }

    const chosenEvents = availableEvents.filter((ev) => selectedEventIds.includes(ev.id));
    const planId = `plan-${Date.now().toString(36)}`;

    const newPlan: SquadPlan = {
      id: planId,
      title,
      creatorName,
      citySlug: 'amsterdam',
      createdAt: new Date().toISOString(),
      events: chosenEvents,
      votes: {
        [chosenEvents[0]?.id || '']: [creatorName]
      },
      comments: [
        {
          id: `c-${Date.now()}`,
          author: creatorName,
          text: `Squad plan initialized. Review candidates and log your preference.`,
          time: 'INITIAL'
        }
      ]
    };

    savePlan(newPlan);
    setCreatedPlan(newPlan);
    onPlanCreated(newPlan);
  };

  const getShareUrl = () => {
    if (typeof window !== 'undefined' && createdPlan) {
      return `${window.location.origin}/plans/${createdPlan.id}`;
    }
    return '';
  };

  const handleCopyLink = () => {
    const url = getShareUrl();
    if (url) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
            <Users className="w-4 h-4 text-[#FFFFFF]" />
            <span className="font-bold text-[#FFFFFF]">SQUAD_COORDINATOR // NEW_DISPATCH</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#222222] text-[#888888] hover:text-[#FFFFFF]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1: Form */}
        {!createdPlan ? (
          <form onSubmit={handleCreate} className="p-5 space-y-3.5 max-h-[70vh] overflow-y-auto no-scrollbar text-xs">
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-[#666666]">DISPATCH_NAME *</label>
              <input
                type="text"
                placeholder="e.g. FRIDAY_DE_PIJP_TO_NOORD"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-1.5 bg-[#000000] border border-[#2b2b2b] text-white focus:outline-none focus:border-[#FFFFFF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase text-[#666666]">INITIATOR CALLSIGN *</label>
              <input
                type="text"
                placeholder="e.g. MATTIA"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                required
                className="w-full px-3 py-1.5 bg-[#000000] border border-[#2b2b2b] text-white focus:outline-none focus:border-[#FFFFFF]"
              />
            </div>

            {/* Candidate selection */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-[#666666] uppercase">
                <span>SELECT CANDIDATE SIGNALS ({selectedEventIds.length}/4)</span>
                <span>TOGGLE TO ADD</span>
              </div>

              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {availableEvents.slice(0, 10).map((ev) => {
                  const isChecked = selectedEventIds.includes(ev.id);
                  return (
                    <div
                      key={ev.id}
                      onClick={() => toggleEventSelect(ev.id)}
                      className={`flex items-center justify-between p-2 border cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-[#141414] border-[#FFFFFF]'
                          : 'bg-[#000000] border-[#222222] hover:border-[#444444]'
                      }`}
                    >
                      <div className="truncate max-w-[85%] space-y-0.5">
                        <div className="font-bold text-[#FFFFFF] truncate text-[11px]">{ev.title.toUpperCase()}</div>
                        <div className="text-[9px] text-[#777777] truncate">
                          {ev.venue.name} // {ev.venue.neighborhood} // {ev.price.label}
                        </div>
                      </div>

                      <div className={`w-4 h-4 border flex items-center justify-center text-[10px] ${
                        isChecked
                          ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF] font-bold'
                          : 'border-[#444444] text-transparent'
                      }`}>
                        {isChecked && '✓'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#FFFFFF] hover:bg-[#D4D4D4] text-[#000000] font-bold text-xs uppercase flex items-center justify-center space-x-1.5 transition-colors mt-2"
            >
              <span>GENERATE SQUAD TELEMETRY LINK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          /* Step 2: Generated Link */
          <div className="p-6 text-center space-y-4">
            <div className="w-10 h-10 border border-[#FFFFFF] bg-[#FFFFFF] text-[#000000] flex items-center justify-center mx-auto font-bold">
              ✓
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#FFFFFF] uppercase">{createdPlan.title}</h3>
              <p className="text-xs text-[#888888]">
                Dispatch generated with {createdPlan.events.length} candidate options. Transmit this link to your group.
              </p>
            </div>

            {/* Link Box */}
            <div className="flex items-center p-1 bg-[#000000] border border-[#222222]">
              <input
                type="text"
                readOnly
                value={getShareUrl()}
                className="flex-1 bg-transparent text-xs text-[#CCCCCC] font-mono px-2 focus:outline-none truncate"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1 bg-[#FFFFFF] text-[#000000] font-bold text-xs uppercase flex items-center space-x-1"
              >
                {copied ? <span>COPIED</span> : <span>COPY</span>}
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2 pt-2">
              <a
                href={`/plans/${createdPlan.id}`}
                className="px-4 py-2 bg-[#1c1c1c] border border-[#333333] hover:border-[#FFFFFF] text-white text-xs uppercase"
              >
                [OPEN VOTING BOARD]
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#090909] text-[#777777] hover:text-[#FFFFFF] text-xs uppercase"
              >
                [CLOSE]
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
