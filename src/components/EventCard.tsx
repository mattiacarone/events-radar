'use client';

import React, { useState } from 'react';
import { 
  Clock, 
  Bookmark, 
  Plus, 
  ArrowUpRight, 
  Compass, 
  Calendar, 
  Share2, 
  Check,
  MapPin,
  Users
} from 'lucide-react';
import { EventItem } from '../lib/types';
import { getBearingDirection } from '../lib/geo';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';

interface EventCardProps {
  event: EventItem;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenDetails: (event: EventItem) => void;
  onAddToPlan: (event: EventItem) => void;
  onShowOnMap?: (event: EventItem) => void;
}

export default function EventCard({
  event,
  isSaved,
  onToggleSave,
  onOpenDetails,
  onAddToPlan,
  onShowOnMap
}: EventCardProps) {
  const [copied, setCopied] = useState(false);
  const [hasRsvpd, setHasRsvpd] = useState(false);

  const startDate = parseISO(event.startTime);
  const endDate = parseISO(event.endTime);
  const now = new Date();

  const isLive = now >= startDate && now <= endDate;

  const formatEventTime = () => {
    if (isLive) {
      return `LIVE_NOW [CONCLUDES ${format(endDate, 'HH:mm')}]`;
    }
    if (isToday(startDate)) {
      return `TONIGHT [${format(startDate, 'HH:mm')} - ${format(endDate, 'HH:mm')}]`;
    }
    if (isTomorrow(startDate)) {
      return `TOMORROW [${format(startDate, 'HH:mm')}]`;
    }
    return format(startDate, 'EEE dd.MM [HH:mm]').toUpperCase();
  };

  const handleDownloadIcs = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}?event=${event.id}`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleQuickRsvp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasRsvpd(!hasRsvpd);
  };

  return (
    <div 
      onClick={() => onOpenDetails(event)}
      className="group relative flex flex-col justify-between bg-[#080808] border border-[#222222] hover:border-[#666666] transition-all duration-150 cursor-pointer text-[#EAEAEA] font-mono select-none"
    >
      {/* Precision corner crosshair markers */}
      <span className="absolute -top-1.5 -left-1.5 text-[10px] text-[#444444] z-20 pointer-events-none">+</span>
      <span className="absolute -top-1.5 -right-1.5 text-[10px] text-[#444444] z-20 pointer-events-none">+</span>
      <span className="absolute -bottom-1.5 -left-1.5 text-[10px] text-[#444444] z-20 pointer-events-none">+</span>
      <span className="absolute -bottom-1.5 -right-1.5 text-[10px] text-[#444444] z-20 pointer-events-none">+</span>

      {/* Top Header Strip: Telemetry ID, Category, & Compass Bearing */}
      <div className="px-3 py-1.5 bg-[#000000] border-b border-[#1c1c1c] flex items-center justify-between text-[10px] text-[#888888]">
        <div className="flex items-center space-x-2">
          <span className="text-[#FFFFFF] font-bold">LOC_{event.id.toUpperCase().slice(-6)}</span>
          <span>|</span>
          <span className="truncate max-w-[110px]">{event.category.replace('-', '_').toUpperCase()}</span>
        </div>
        <div className="flex items-center space-x-2 text-[#FFFFFF]">
          {event.distanceKm !== undefined && (
            <span className="flex items-center space-x-1">
              <Compass className="w-3 h-3 text-[#777777]" />
              <span>
                {event.distanceKm.toFixed(1)}KM {event.bearingDeg !== undefined ? `[${getBearingDirection(event.bearingDeg)}]` : ''}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Media Window: Monochrome with contrast */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#000000] border-b border-[#1c1c1c]">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-300"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80"></div>

        {/* Status Badge */}
        <div className="absolute top-2 left-2 z-10">
          {isLive ? (
            <span className="px-2 py-0.5 bg-[#FFFFFF] text-[#000000] text-[9px] font-bold tracking-wider uppercase border border-[#FFFFFF] flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-[#000000] animate-pulse"></span>
              <span>LIVE TRANSMISSION</span>
            </span>
          ) : event.isPromoted ? (
            <span className="px-2 py-0.5 bg-[#1a1a1a] text-[#FFFFFF] text-[9px] font-bold tracking-wider uppercase border border-[#555555]">
              [PROMOTED_SPOTLIGHT]
            </span>
          ) : null}
        </div>

        {/* Quick Icon Actions (Bookmark, Calendar, Share) */}
        <div className="absolute top-2 right-2 z-10 flex items-center space-x-1">
          <button
            onClick={handleDownloadIcs}
            className="p-1.5 bg-[#000000]/80 text-[#888888] border border-[#333333] hover:text-[#FFFFFF] transition-colors"
            title="Download .ics Calendar File"
          >
            <Calendar className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCopyLink}
            className="p-1.5 bg-[#000000]/80 text-[#888888] border border-[#333333] hover:text-[#FFFFFF] transition-colors"
            title="Share Signal Link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#FFFFFF]" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(event.id);
            }}
            className={`p-1.5 border transition-colors ${
              isSaved
                ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF]'
                : 'bg-[#000000]/80 text-[#888888] border-[#333333] hover:text-[#FFFFFF]'
            }`}
            title={isSaved ? 'Remove Bookmark' : 'Save Signal'}
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Coordinates Strip */}
        <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] text-[#AAAAAA] font-mono">
          <span>{event.venue.lat.toFixed(4)}°N, {event.venue.lng.toFixed(4)}°W/E</span>
          <span className="px-1.5 bg-[#000000] border border-[#2b2b2b] text-[#FFFFFF] font-bold">
            {event.price.label}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="text-[10px] text-[#777777] uppercase flex items-center space-x-1">
            <Clock className="w-3 h-3 text-[#FFFFFF]" />
            <span className={isLive ? 'text-[#FFFFFF] font-bold' : ''}>{formatEventTime()}</span>
          </div>

          <h3 className="text-sm font-bold text-[#FFFFFF] tracking-tight group-hover:underline line-clamp-1">
            {event.title.toUpperCase()}
          </h3>

          <p className="text-[11px] text-[#888888] line-clamp-2 leading-relaxed">
            {event.tagline || event.description}
          </p>
        </div>

        {/* Telemetry Specs Box */}
        <div className="p-2 bg-[#000000] border border-[#1a1a1a] text-[10px] space-y-1">
          <div className="flex justify-between">
            <span className="text-[#555555]">VENUE_NODE:</span>
            <span className="text-[#DDDDDD] truncate max-w-[180px] font-semibold">{event.venue.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#555555]">SECTOR_ZONE:</span>
            <span className="text-[#DDDDDD] uppercase">{event.venue.neighborhood}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#555555]">ATTENDANCE:</span>
            <span className="text-[#DDDDDD]">
              {event.attendeeCount + (hasRsvpd ? 1 : 0)} UNITS {hasRsvpd ? '[YOU]' : ''}
            </span>
          </div>
        </div>

        {/* Squad Radar Friends Attendance */}
        {event.friendsGoing && event.friendsGoing.length > 0 && (
          <div className="p-2 border border-[#333333] bg-[#0c0c0c] text-[10px] space-y-1">
            <div className="flex items-center justify-between text-[#888888]">
              <span className="flex items-center space-x-1 text-[#FFFFFF] font-bold">
                <Users className="w-3 h-3 text-[#FFFFFF]" />
                <span>SQUAD RADAR [{event.friendsGoing.length} GOING]:</span>
              </span>
              <span className="text-[9px] text-[#777777]">SYNCED</span>
            </div>
            <div className="flex flex-wrap gap-1 pt-0.5">
              {event.friendsGoing.map((f, i) => (
                <span 
                  key={i} 
                  className="px-1.5 py-0.5 bg-[#000000] border border-[#2b2b2b] text-[#DDDDDD] text-[9px] flex items-center space-x-1"
                >
                  <span className="text-[#AAAAAA]">●</span>
                  <span className="font-bold">{f.name}</span>
                  <span className="text-[#666666]">({f.platform === 'instagram' ? 'IG' : f.platform === 'whatsapp' ? 'WA' : f.platform === 'tiktok' ? 'TT' : 'FB'})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Curator Intel Note */}
        {event.curatorNotes && (
          <div className="p-2 border border-[#222222] bg-[#050505] text-[10px] text-[#AAAAAA]">
            <span className="text-[#FFFFFF] font-bold mr-1">[INTEL]:</span>
            <span className="italic">{event.curatorNotes}</span>
          </div>
        )}

        {/* Quick Action Controls */}
        <div className="pt-2 border-t border-[#1a1a1a] flex items-center justify-between gap-1.5">
          <button
            onClick={handleQuickRsvp}
            className={`py-1 px-2.5 border text-xs font-mono uppercase transition-colors ${
              hasRsvpd
                ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF] font-bold'
                : 'bg-[#141414] border-[#2b2b2b] text-[#CCCCCC] hover:text-[#FFFFFF] hover:border-[#666666]'
            }`}
            title="Instant RSVP"
          >
            {hasRsvpd ? '✓ RSVP_LOGGED' : 'RSVP'}
          </button>

          {onShowOnMap && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShowOnMap(event);
              }}
              className="py-1 px-2 bg-[#141414] border border-[#2b2b2b] hover:border-[#666666] text-xs font-mono uppercase text-[#CCCCCC] hover:text-[#FFFFFF] flex items-center justify-center space-x-1 transition-colors"
              title="Locate on Tactical Map"
            >
              <MapPin className="w-3 h-3" />
              <span className="hidden sm:inline">MAP</span>
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToPlan(event);
            }}
            className="flex-1 py-1 px-2 bg-[#141414] border border-[#2b2b2b] hover:border-[#666666] text-xs font-mono uppercase text-[#CCCCCC] hover:text-[#FFFFFF] flex items-center justify-center space-x-1 transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>+ PLAN</span>
          </button>

          {event.ticketUrl && (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="py-1 px-3 bg-[#FFFFFF] hover:bg-[#D4D4D4] text-[#000000] text-xs font-mono font-bold uppercase flex items-center space-x-1 transition-colors"
            >
              <span>ACCESS</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
