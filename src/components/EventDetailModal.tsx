'use client';

import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  Share2, 
  Bookmark, 
  Plus, 
  Check, 
  ArrowUpRight, 
  FileText, 
  Calendar 
} from 'lucide-react';
import { EventItem } from '../lib/types';
import { format, parseISO } from 'date-fns';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onAddToPlan: (event: EventItem) => void;
}

export default function EventDetailModal({
  event,
  onClose,
  isSaved,
  onToggleSave,
  onAddToPlan
}: EventDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!event) return null;

  const startDate = parseISO(event.startTime);
  const endDate = parseISO(event.endTime);
  const now = new Date();
  const isLive = now >= startDate && now <= endDate;

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.tagline}\n\n${event.description}\n\nVenue: ${event.venue.name}`);
    const location = encodeURIComponent(`${event.venue.name}, ${event.venue.address}`);
    const startStr = format(startDate, "yyyyMMdd'T'HHmmss");
    const endStr = format(endDate, "yyyyMMdd'T'HHmmss");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}`;
  };

  const downloadIcsFile = () => {
    const startStr = format(startDate, "yyyyMMdd'T'HHmmss'Z'");
    const endStr = format(endDate, "yyyyMMdd'T'HHmmss'Z'");
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Radar Tactical Events//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.tagline} - ${event.description}`,
      `LOCATION:${event.venue.name}, ${event.venue.address}`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.slug}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}?event=${event.id}`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#000000]/90 backdrop-blur-sm overflow-y-auto font-mono">
      <div className="relative w-full max-w-2xl bg-[#090909] border border-[#333333] shadow-2xl overflow-hidden my-auto text-[#EAEAEA]">
        
        {/* Precision Crosshairs */}
        <span className="absolute -top-1.5 -left-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>
        <span className="absolute -top-1.5 -right-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>
        <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>
        <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>

        {/* Modal Top Title Bar */}
        <div className="px-4 py-2 bg-[#000000] border-b border-[#222222] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-[#FFFFFF] font-bold">SIGNAL_DOSSIER // {event.id.toUpperCase()}</span>
            <span className="text-[#555555]">|</span>
            <span className="text-[#888888]">{event.category.toUpperCase()}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#222222] text-[#888888] hover:text-[#FFFFFF]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Media / Schematic Hero */}
        <div className="relative aspect-[16/7] w-full overflow-hidden bg-[#000000] border-b border-[#222222]">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent"></div>

          {/* Status Label */}
          <div className="absolute top-3 left-3">
            {isLive ? (
              <span className="px-2 py-0.5 bg-[#FFFFFF] text-[#000000] text-[9px] font-bold uppercase tracking-wider">
                ● BROADCAST_TRANSMITTING_LIVE
              </span>
            ) : event.isPromoted ? (
              <span className="px-2 py-0.5 bg-[#000000] text-[#FFFFFF] text-[9px] font-bold uppercase border border-[#555555]">
                [PRIORITY_BROADCAST]
              </span>
            ) : null}
          </div>

          <div className="absolute bottom-3 left-3 right-3 space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-[#FFFFFF] uppercase tracking-tight">
              {event.title}
            </h2>
            <p className="text-xs text-[#AAAAAA]">
              {event.tagline}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar text-xs">
          
          {/* Telemetry Matrix Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border border-[#222222] p-2.5 bg-[#050505]">
            <div className="space-y-0.5 border-r border-[#1a1a1a] pr-2">
              <span className="text-[9px] text-[#666666] uppercase">SCHEDULE</span>
              <div className="text-[11px] font-bold text-[#FFFFFF]">
                {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
              </div>
              <span className="text-[9px] text-[#888888]">{format(startDate, 'dd.MM.yyyy')}</span>
            </div>

            <div className="space-y-0.5 border-r border-[#1a1a1a] pr-2">
              <span className="text-[9px] text-[#666666] uppercase">TARIFF</span>
              <div className="text-[11px] font-bold text-[#FFFFFF]">
                {event.price.label}
              </div>
              <span className="text-[9px] text-[#888888]">{event.price.isFree ? 'NO CHARGE' : 'ADMISSION PASS'}</span>
            </div>

            <div className="space-y-0.5 border-r border-[#1a1a1a] pr-2">
              <span className="text-[9px] text-[#666666] uppercase">COORDINATES</span>
              <div className="text-[11px] font-bold text-[#FFFFFF] truncate">
                {event.venue.neighborhood.toUpperCase()}
              </div>
              <span className="text-[9px] text-[#888888] truncate">{event.venue.name}</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[9px] text-[#666666] uppercase">CONFIRMED LOGS</span>
              <div className="text-[11px] font-bold text-[#FFFFFF]">
                {event.attendeeCount} UNITS
              </div>
              <span className="text-[9px] text-[#888888]">HIGH RELIABILITY</span>
            </div>
          </div>

          {/* Curator Intel Report */}
          {event.curatorNotes && (
            <div className="p-3 border border-[#333333] bg-[#000000] text-xs space-y-1">
              <div className="text-[10px] text-[#FFFFFF] font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>CURATION_INTELLIGENCE // VERIFIED</span>
              </div>
              <p className="text-[#AAAAAA] italic leading-relaxed">
                "{event.curatorNotes}"
              </p>
            </div>
          )}

          {/* Description */}
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase text-[#666666] tracking-wider">
              DESCRIPTION // SCOPE
            </div>
            <p className="text-xs text-[#CCCCCC] leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase text-[#666666] tracking-wider">
              DESCRIPTIVE_TAGS
            </div>
            <div className="flex flex-wrap gap-1">
              {event.vibeTags.map((t) => (
                <span key={t} className="px-2 py-0.5 bg-[#141414] border border-[#2b2b2b] text-[10px] text-[#AAAAAA]">
                  #{t.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          {/* Venue Blueprint & Navigation */}
          <div className="p-3 bg-[#000000] border border-[#222222] flex items-center justify-between">
            <div className="space-y-0.5 max-w-[70%]">
              <span className="text-[9px] text-[#666666] uppercase">PHYSICAL POSITION</span>
              <div className="text-xs font-bold text-[#FFFFFF]">{event.venue.name}</div>
              <div className="text-[10px] text-[#777777] truncate">{event.venue.address}</div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${event.venue.name} ${event.venue.address}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-[#141414] border border-[#333333] hover:border-[#FFFFFF] hover:text-[#FFFFFF] text-xs uppercase text-[#AAAAAA] transition-colors"
            >
              [NAVIGATE]
            </a>
          </div>

          {/* Calendar Sync Options */}
          <div className="pt-2 border-t border-[#222222] flex flex-wrap gap-2 items-center justify-between text-[10px]">
            <span className="text-[#666666] uppercase">EXPORT TELEMETRY TO CALENDAR:</span>
            <div className="flex items-center space-x-2">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-[#141414] border border-[#2b2b2b] hover:border-[#FFFFFF] text-[#CCCCCC] hover:text-[#FFFFFF]"
              >
                GOOGLE_CAL
              </a>
              <button
                onClick={downloadIcsFile}
                className="px-2.5 py-1 bg-[#141414] border border-[#2b2b2b] hover:border-[#FFFFFF] text-[#CCCCCC] hover:text-[#FFFFFF]"
              >
                APPLE_ICAL (.ICS)
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Actions */}
        <div className="p-3 bg-[#000000] border-t border-[#222222] flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleSave(event.id)}
              className={`p-2 border transition-colors ${
                isSaved ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF]' : 'bg-[#141414] text-[#888888] border-[#333333] hover:text-[#FFFFFF]'
              }`}
              title="Bookmark"
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleCopyShareLink}
              className="p-2 bg-[#141414] border border-[#333333] text-[#888888] hover:text-[#FFFFFF] transition-colors"
              title="Copy link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#FFFFFF]" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => {
                onAddToPlan(event);
                onClose();
              }}
              className="px-3 py-1.5 bg-[#141414] border border-[#333333] hover:border-[#FFFFFF] text-xs uppercase text-[#CCCCCC] hover:text-[#FFFFFF]"
            >
              + SQUAD_PLAN
            </button>
          </div>

          <div>
            {event.ticketUrl ? (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#FFFFFF] hover:bg-[#D4D4D4] text-[#000000] font-bold text-xs uppercase flex items-center space-x-1.5 transition-colors"
              >
                <span>OBTAIN ADMISSION PASS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                onClick={() => alert('RSVP confirmed in local telemetry registry.')}
                className="px-4 py-2 bg-[#FFFFFF] hover:bg-[#D4D4D4] text-[#000000] font-bold text-xs uppercase flex items-center space-x-1 transition-colors"
              >
                <span>REGISTER RSVP</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
