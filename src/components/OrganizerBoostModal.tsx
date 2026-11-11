'use client';

import React, { useState } from 'react';
import { 
  X, 
  Radio, 
  Check, 
  ArrowRight, 
  CreditCard 
} from 'lucide-react';
import { EventCategory, EventItem } from '../lib/types';
import { addCustomEvent } from '../lib/storage';

interface OrganizerBoostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated?: (event: EventItem) => void;
}

export default function OrganizerBoostModal({
  isOpen,
  onClose,
  onEventCreated
}: OrganizerBoostModalProps) {
  const [selectedTier, setSelectedTier] = useState<'spotlight' | 'blast' | 'venue'>('spotlight');
  const [step, setStep] = useState<'tier' | 'details' | 'success'>('tier');

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [venueName, setVenueName] = useState('');
  const [neighborhood, setNeighborhood] = useState('Centrum');
  const [category, setCategory] = useState<EventCategory>('nightlife');
  const [priceLabel, setPriceLabel] = useState('€15.00');
  const [ticketUrl, setTicketUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop');

  if (!isOpen) return null;

  const handleCreateAndBoost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !venueName) {
      alert('Fill in event title and venue node.');
      return;
    }

    const now = new Date();
    const newEvent: EventItem = {
      id: `custom-${Date.now()}`,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: tagline || 'Community broadcast active in Amsterdam sector',
      description: `${tagline}\n\nVenue node: ${venueName}. Promoted telemetry signal on Radar.`,
      category,
      citySlug: 'amsterdam',
      venue: {
        name: venueName,
        neighborhood,
        address: `${venueName}, ${neighborhood}, Amsterdam`,
        lat: 52.3676 + (Math.random() - 0.5) * 0.03,
        lng: 4.9041 + (Math.random() - 0.5) * 0.03
      },
      startTime: new Date(now.getTime() + 2 * 3600 * 1000).toISOString(),
      endTime: new Date(now.getTime() + 6 * 3600 * 1000).toISOString(),
      price: {
        isFree: priceLabel.toLowerCase().includes('free'),
        currency: 'EUR',
        label: priceLabel
      },
      imageUrl,
      isCurated: true,
      isPromoted: true,
      promotedTier: selectedTier === 'blast' ? 'radar_blast' : 'spotlight',
      ticketUrl: ticketUrl || 'https://eventbrite.com',
      attendeeCount: 50,
      vibeTags: ['Promoted', neighborhood, category],
      curatorNotes: 'Priority verified promoter dispatch.'
    };

    addCustomEvent(newEvent);
    if (onEventCreated) {
      onEventCreated(newEvent);
    }
    setStep('success');
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
            <Radio className="w-4 h-4 text-[#FFFFFF]" />
            <span className="font-bold text-[#FFFFFF]">TRANSMISSION_BOOST // B2B_PORTAL</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#222222] text-[#888888] hover:text-[#FFFFFF]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1: Select Tier */}
        {step === 'tier' && (
          <div className="p-5 space-y-4">
            <div className="text-[10px] uppercase text-[#666666] tracking-wider">
              SELECT AMPLIFICATION TIER:
            </div>

            <div className="space-y-2.5">
              {/* Tier 1 */}
              <div
                onClick={() => setSelectedTier('spotlight')}
                className={`p-3.5 border cursor-pointer transition-colors ${
                  selectedTier === 'spotlight'
                    ? 'bg-[#141414] border-[#FFFFFF]'
                    : 'bg-[#050505] border-[#222222] hover:border-[#444444]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#FFFFFF]">
                  <span>TIER 01: SPOTLIGHT FREQUENCY</span>
                  <span>€29.00 / TRANSMISSION</span>
                </div>
                <p className="text-[11px] text-[#888888] mt-1">
                  Top placement in radar feed, priority distance sorting, high-contrast spotlight marker.
                </p>
              </div>

              {/* Tier 2 */}
              <div
                onClick={() => setSelectedTier('blast')}
                className={`p-3.5 border cursor-pointer transition-colors ${
                  selectedTier === 'blast'
                    ? 'bg-[#141414] border-[#FFFFFF]'
                    : 'bg-[#050505] border-[#222222] hover:border-[#444444]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#FFFFFF]">
                  <span>TIER 02: 5KM RADAR BLAST</span>
                  <span>€79.00 / TRANSMISSION</span>
                </div>
                <p className="text-[11px] text-[#888888] mt-1">
                  Includes Tier 01 + instant proximity push broadcast to all active telemetry devices within 5 km.
                </p>
              </div>

              {/* Tier 3 */}
              <div
                onClick={() => setSelectedTier('venue')}
                className={`p-3.5 border cursor-pointer transition-colors ${
                  selectedTier === 'venue'
                    ? 'bg-[#141414] border-[#FFFFFF]'
                    : 'bg-[#050505] border-[#222222] hover:border-[#444444]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#FFFFFF]">
                  <span>TIER 03: PERMANENT VENUE TRANSPONDER</span>
                  <span>€129.00 / MONTH</span>
                </div>
                <p className="text-[11px] text-[#888888] mt-1">
                  Unlimited monthly event injection, verified venue telemetry seal, real-time footfall metrics.
                </p>
              </div>
            </div>

            <button
              onClick={() => setStep('details')}
              className="w-full py-2.5 bg-[#FFFFFF] hover:bg-[#D4D4D4] text-[#000000] font-bold text-xs uppercase flex items-center justify-center space-x-2 transition-colors mt-2"
            >
              <span>PROCEED TO DISPATCH SETUP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Form */}
        {step === 'details' && (
          <form onSubmit={handleCreateAndBoost} className="p-5 space-y-3 max-h-[70vh] overflow-y-auto no-scrollbar text-xs">
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-[#666666]">EVENT_NAME *</label>
              <input
                type="text"
                placeholder="e.g. ADE PREVIEW / ROOFTOP UNDERGROUND"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-1.5 bg-[#000000] border border-[#2b2b2b] text-white focus:outline-none focus:border-[#FFFFFF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase text-[#666666]">ONE-LINE TELEMETRY HOOK</label>
              <input
                type="text"
                placeholder="Short statement defining the signal"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#000000] border border-[#2b2b2b] text-white focus:outline-none focus:border-[#FFFFFF]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-[#666666]">VENUE_NODE *</label>
                <input
                  type="text"
                  placeholder="e.g. Shelter, Skatecafe"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 bg-[#000000] border border-[#2b2b2b] text-white focus:outline-none focus:border-[#FFFFFF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-[#666666]">SECTOR_ZONE</label>
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#000000] border border-[#2b2b2b] text-white focus:outline-none focus:border-[#FFFFFF]"
                >
                  <option value="Centrum">Centrum</option>
                  <option value="De Pijp">De Pijp</option>
                  <option value="Jordaan">Jordaan</option>
                  <option value="Oud-West">Oud-West</option>
                  <option value="Noord / NDSM">Noord / NDSM</option>
                  <option value="Oost">Oost</option>
                  <option value="Westerpark">Westerpark</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-[#666666]">CATEGORY_CODE</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as EventCategory)}
                  className="w-full px-3 py-1.5 bg-[#000000] border border-[#2b2b2b] text-white focus:outline-none focus:border-[#FFFFFF]"
                >
                  <option value="nightlife">Nightlife</option>
                  <option value="live-music">Live Sound</option>
                  <option value="food-wine">Food & Wine</option>
                  <option value="art-culture">Exhibitions</option>
                  <option value="tech-networking">Tech & Founders</option>
                  <option value="secret-popup">Secret Drops</option>
                  <option value="community">Community</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-[#666666]">TARIFF LABEL</label>
                <input
                  type="text"
                  placeholder="e.g. €15.00 or FREE"
                  value={priceLabel}
                  onChange={(e) => setPriceLabel(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#000000] border border-[#2b2b2b] text-white focus:outline-none focus:border-[#FFFFFF]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase text-[#666666]">TICKET / RSVP DESTINATION URL</label>
              <input
                type="url"
                placeholder="https://residentadvisor.net or https://dice.fm"
                value={ticketUrl}
                onChange={(e) => setTicketUrl(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#000000] border border-[#2b2b2b] text-white focus:outline-none focus:border-[#FFFFFF]"
              />
            </div>

            {/* Total readout */}
            <div className="p-2.5 bg-[#000000] border border-[#222222] flex items-center justify-between text-xs">
              <span className="text-[#888888]">PAYMENT_DUE:</span>
              <span className="font-bold text-[#FFFFFF]">
                {selectedTier === 'spotlight' ? '€29.00' : selectedTier === 'blast' ? '€79.00' : '€129.00 / MO'}
              </span>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setStep('tier')}
                className="w-1/3 py-2 bg-[#141414] border border-[#2b2b2b] text-[#AAAAAA] hover:text-[#FFFFFF]"
              >
                [BACK]
              </button>
              <button
                type="submit"
                className="w-2/3 py-2 bg-[#FFFFFF] hover:bg-[#D4D4D4] text-[#000000] font-bold uppercase transition-colors"
              >
                [AUTHORIZE & TRANSMIT]
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-4">
            <div className="w-10 h-10 border border-[#FFFFFF] bg-[#FFFFFF] text-[#000000] flex items-center justify-center mx-auto font-bold">
              ✓
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#FFFFFF] uppercase">TRANSMISSION BROADCAST ONLINE</h3>
              <p className="text-xs text-[#888888] max-w-sm mx-auto">
                Signal registered and pinned to top frequency on the Amsterdam radar telemetry stream.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#FFFFFF] text-[#000000] font-bold text-xs uppercase"
            >
              [RETURN TO RADAR]
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
