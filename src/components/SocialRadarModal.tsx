'use client';

import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Users, 
  Check, 
  Copy, 
  ShieldAlert, 
  Smartphone, 
  ExternalLink,
  MessageCircle,
  Radio
} from 'lucide-react';

interface SocialRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SocialRadarModal({ isOpen, onClose }: SocialRadarModalProps) {
  const [instagramHandle, setInstagramHandle] = useState('@alex.vander');
  const [whatsAppNumber, setWhatsAppNumber] = useState('+31 6 1284 9912');
  const [tiktokHandle, setTiktokHandle] = useState('@alex_drops');
  const [facebookName, setFacebookName] = useState('Alex Van Der');
  const [contactsSynced, setContactsSynced] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopySquadLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${window.location.origin}?squad=beacon_alex_${Date.now()}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleDispatchWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const text = encodeURIComponent(
        `📡 RADAR SQUAD BEACON // Check out where we're going in the city tonight and sync your RSVP: ${window.location.origin}`
      );
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    }
  };

  const handleSaveHandles = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#000000]/90 backdrop-blur-sm overflow-y-auto font-mono text-[#EAEAEA]">
      <div className="relative w-full max-w-2xl bg-[#090909] border border-[#333333] shadow-2xl overflow-hidden my-auto">
        
        {/* Precision Crosshairs */}
        <span className="absolute -top-1.5 -left-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>
        <span className="absolute -top-1.5 -right-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>
        <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>
        <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>

        {/* Header */}
        <div className="p-4 border-b border-[#222222] bg-[#000000] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-[#FFFFFF]" />
            <span className="font-bold text-[#FFFFFF]">SOCIAL_SQUAD_RADAR // NETWORK PROTOCOL</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#222222] text-[#888888] hover:text-[#FFFFFF]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto no-scrollbar">
          
          {/* Executive Feasibility Architecture Box */}
          <div className="p-3.5 border border-[#333333] bg-[#050505] space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#FFFFFF]">
              <Radio className="w-3.5 h-3.5 text-[#FFFFFF] animate-pulse" />
              <span>HOW SOCIAL SYNC WORKS (META / TIKTOK / WHATSAPP REALITY)</span>
            </div>
            <p className="text-[11px] text-[#AAAAAA] leading-relaxed">
              Meta (Instagram & Facebook) and TikTok closed automated third-party friend-event scraping in their strict privacy compliance updates. 
              Modern category leaders (<strong className="text-[#FFFFFF]">Partiful, DICE, Luma, RA</strong>) solve this through 
              <strong className="text-[#FFFFFF]"> Squad Beacon Links, Address Book Hashing, and Handle Verification</strong>.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[10px]">
              <div className="p-2 border border-[#222222] bg-[#000000]">
                <div className="text-[#FFFFFF] font-bold">WHATSAPP</div>
                <div className="text-[#777777]">1-Tap Squad Beacons & Group Sync (92% conversion)</div>
              </div>
              <div className="p-2 border border-[#222222] bg-[#000000]">
                <div className="text-[#FFFFFF] font-bold">INSTAGRAM</div>
                <div className="text-[#777777]">Story Drop Stickers & Handle Attestation</div>
              </div>
              <div className="p-2 border border-[#222222] bg-[#000000]">
                <div className="text-[#FFFFFF] font-bold">TIKTOK</div>
                <div className="text-[#777777]">Creator Login Kit & Sound Clip Tags</div>
              </div>
              <div className="p-2 border border-[#222222] bg-[#000000]">
                <div className="text-[#FFFFFF] font-bold">PHONE BOOK</div>
                <div className="text-[#777777]">SHA-256 Hashed Mutual Contact Match</div>
              </div>
            </div>
          </div>

          {/* Connected Handles Form */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider flex items-center justify-between">
              <span>YOUR CONNECTED SQUAD CREDENTIALS</span>
              <span className="text-[10px] text-[#777777] font-normal">[PASSPORT_ID: 0x882A]</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] text-[#777777] flex items-center justify-between">
                  <span>INSTAGRAM HANDLE:</span>
                  <span className="text-[#555555]">VERIFIED</span>
                </label>
                <input
                  type="text"
                  value={instagramHandle}
                  onChange={(e) => setInstagramHandle(e.target.value)}
                  className="w-full bg-[#000000] border border-[#2b2b2b] px-3 py-1.5 text-xs text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
                  placeholder="@your_instagram"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#777777] flex items-center justify-between">
                  <span>WHATSAPP / PHONE:</span>
                  <span className="text-[#555555]">ENCRYPTED</span>
                </label>
                <input
                  type="text"
                  value={whatsAppNumber}
                  onChange={(e) => setWhatsAppNumber(e.target.value)}
                  className="w-full bg-[#000000] border border-[#2b2b2b] px-3 py-1.5 text-xs text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
                  placeholder="+31 6..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#777777] flex items-center justify-between">
                  <span>TIKTOK CALLSIGN:</span>
                  <span className="text-[#555555]">LINKED</span>
                </label>
                <input
                  type="text"
                  value={tiktokHandle}
                  onChange={(e) => setTiktokHandle(e.target.value)}
                  className="w-full bg-[#000000] border border-[#2b2b2b] px-3 py-1.5 text-xs text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
                  placeholder="@your_tiktok"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#777777] flex items-center justify-between">
                  <span>FACEBOOK ALIAS:</span>
                  <span className="text-[#555555]">CONNECTED</span>
                </label>
                <input
                  type="text"
                  value={facebookName}
                  onChange={(e) => setFacebookName(e.target.value)}
                  className="w-full bg-[#000000] border border-[#2b2b2b] px-3 py-1.5 text-xs text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
                  placeholder="First Last"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 text-[11px] text-[#AAAAAA] cursor-pointer">
                <input
                  type="checkbox"
                  checked={contactsSynced}
                  onChange={(e) => setContactsSynced(e.target.checked)}
                  className="accent-[#FFFFFF]"
                />
                <span>Sync with device contacts book (anonymously hashed)</span>
              </label>

              <button
                onClick={handleSaveHandles}
                className="px-3 py-1 bg-[#1a1a1a] hover:bg-[#FFFFFF] hover:text-[#000000] text-[#FFFFFF] border border-[#333333] text-xs font-mono uppercase transition-colors"
              >
                {saveSuccess ? '✓ CREDENTIALS UPDATED' : '[UPDATE CREDENTIALS]'}
              </button>
            </div>
          </div>

          {/* Squad Beacon Dispatcher (Viral Loop) */}
          <div className="p-4 border border-[#333333] bg-[#000000] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#FFFFFF] uppercase">
                DISPATCH SQUAD EVENT BEACON
              </span>
              <span className="text-[10px] text-[#777777]">PEER-TO-PEER</span>
            </div>
            <p className="text-[11px] text-[#888888]">
              Share this cryptographic beacon in your WhatsApp group, Instagram DM, or Telegram squad. Friends who tap it are instantly paired to your radar.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleDispatchWhatsApp}
                className="flex-1 py-2 px-3 bg-[#FFFFFF] hover:bg-[#D4D4D4] text-[#000000] text-xs font-bold uppercase flex items-center justify-center space-x-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>DISPATCH TO WHATSAPP GROUP</span>
              </button>

              <button
                onClick={handleCopySquadLink}
                className="py-2 px-3 bg-[#111111] hover:bg-[#222222] border border-[#333333] text-xs uppercase text-[#FFFFFF] flex items-center justify-center space-x-1.5 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-[#FFFFFF]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'BEACON COPIED' : 'COPY SQUAD LINK'}</span>
              </button>
            </div>
          </div>

          {/* Active Friends Radar Feed Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#FFFFFF] uppercase">CURRENTLY DETECTED SQUAD ATTENDEES</span>
              <span className="text-[10px] text-[#777777]">4 DETECTED</span>
            </div>

            <div className="space-y-1.5">
              {[
                { name: 'Sophie Van Dijk', platform: 'INSTAGRAM', handle: '@sophie_ams', event: 'Shelter Saturday Night: Ben Klock 6H', status: 'CONFIRMED' },
                { name: 'Lars Boersma', platform: 'WHATSAPP', handle: '+31 6 4821 9921', event: 'Warehouse Elementenstraat: Hard Techno', status: 'GOING' },
                { name: 'Elena Rostova', platform: 'TIKTOK', handle: '@elena.sound', event: 'De School Memorial Listening Session', status: 'INTERESTED' },
                { name: 'Mark Jansen', platform: 'FACEBOOK', handle: 'Mark Jansen (AMS)', event: 'Supperclub: Secret Midnight Banquet', status: 'RSVP' }
              ].map((friend, i) => (
                <div key={i} className="p-2 border border-[#222222] bg-[#0c0c0c] flex items-center justify-between text-[11px]">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-[#FFFFFF]"></span>
                    <span className="text-[#FFFFFF] font-bold">{friend.name}</span>
                    <span className="text-[9px] text-[#777777] bg-[#1a1a1a] px-1 py-0.2 border border-[#2c2c2c]">{friend.platform}</span>
                    <span className="text-[10px] text-[#555555] hidden sm:inline">{friend.handle}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[#AAAAAA] truncate max-w-[170px] sm:max-w-xs">{friend.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-[#000000] border-t border-[#222222] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#FFFFFF] hover:bg-[#D4D4D4] text-[#000000] text-xs font-bold uppercase transition-colors"
          >
            [CLOSE PROTOCOL]
          </button>
        </div>

      </div>
    </div>
  );
}
