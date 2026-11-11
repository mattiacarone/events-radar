'use client';

import React, { useState } from 'react';
import { 
  X, 
  Key, 
  CreditCard, 
  ShieldCheck, 
  Lock 
} from 'lucide-react';

interface InsiderModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMember: boolean;
  onActivateMembership: () => void;
}

export default function InsiderModal({
  isOpen,
  onClose,
  isMember,
  onActivateMembership
}: InsiderModalProps) {
  const [targetAudience, setTargetAudience] = useState<'consumer' | 'business'>('consumer');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onActivateMembership();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#000000]/90 backdrop-blur-sm overflow-y-auto font-mono text-[#EAEAEA]">
      <div className="relative w-full max-w-lg bg-[#090909] border border-[#333333] shadow-2xl overflow-hidden my-auto">
        
        {/* Precision Crosshairs */}
        <span className="absolute -top-1.5 -left-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>
        <span className="absolute -top-1.5 -right-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>
        <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>
        <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>

        {/* Header */}
        <div className="p-4 border-b border-[#222222] bg-[#000000] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-[#FFFFFF]" />
            <span className="font-bold text-[#FFFFFF]">RADAR_INSIDER_KEY // ENCRYPTED ACCESS</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#222222] text-[#888888] hover:text-[#FFFFFF]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto no-scrollbar">
          
          {/* Plan Type Selector */}
          <div className="flex items-center p-0.5 bg-[#000000] border border-[#222222]">
            <button
              onClick={() => setTargetAudience('consumer')}
              className={`flex-1 py-1.5 text-xs uppercase font-mono transition-colors ${
                targetAudience === 'consumer'
                  ? 'bg-[#FFFFFF] text-[#000000] font-bold'
                  : 'text-[#888888] hover:text-[#FFFFFF]'
              }`}
            >
              CITIZEN ACCESS [RADAR_BLACK]
            </button>
            <button
              onClick={() => setTargetAudience('business')}
              className={`flex-1 py-1.5 text-xs uppercase font-mono transition-colors ${
                targetAudience === 'business'
                  ? 'bg-[#FFFFFF] text-[#000000] font-bold'
                  : 'text-[#888888] hover:text-[#FFFFFF]'
              }`}
            >
              VENUE & PROMOTER [CONSOLE_PRO]
            </button>
          </div>

          {targetAudience === 'consumer' ? (
            <>
              {isMember ? (
                <div className="p-5 border border-[#FFFFFF] bg-[#111111] text-center space-y-2">
                  <div className="text-xs text-[#FFFFFF] font-bold uppercase tracking-wider">
                    [ACTIVE ACCESS KEY VERIFIED]
                  </div>
                  <div className="text-[10px] text-[#777777] font-mono">
                    KEY_SERIAL: 0x9924-RADAR-BLACK-VERIFIED
                  </div>
                  <p className="text-xs text-[#AAAAAA]">
                    All unannounced warehouse pop-ups, squad friend radar feeds, and partner perks are unlocked on this terminal.
                  </p>
                </div>
              ) : (
                <>
                  {/* Billing Switcher */}
                  <div className="flex items-center p-0.5 bg-[#000000] border border-[#222222]">
                    <button
                      onClick={() => setBillingCycle('monthly')}
                      className={`flex-1 py-1.5 text-xs uppercase font-mono transition-colors ${
                        billingCycle === 'monthly'
                          ? 'bg-[#222222] text-[#FFFFFF] font-bold'
                          : 'text-[#666666] hover:text-[#AAAAAA]'
                      }`}
                    >
                      MONTHLY [€4.99 / MO]
                    </button>
                    <button
                      onClick={() => setBillingCycle('yearly')}
                      className={`flex-1 py-1.5 text-xs uppercase font-mono transition-colors ${
                        billingCycle === 'yearly'
                          ? 'bg-[#222222] text-[#FFFFFF] font-bold'
                          : 'text-[#666666] hover:text-[#AAAAAA]'
                      }`}
                    >
                      ANNUAL [€39.00 / YR // SAVE 35%]
                    </button>
                  </div>

                  {/* Technical Specifications */}
                  <div className="space-y-2 text-xs">
                    {[
                      {
                        code: 'PERK_01',
                        title: 'SECRET DROPS & UNANNOUNCED POP-UPS',
                        desc: 'GPS coordinates decrypted 2 hours prior to start for underground warehouse raves, secret courtyard dining, and rooftop sets.'
                      },
                      {
                        code: 'PERK_02',
                        title: 'SQUAD RADAR & LIVE SOCIAL CLUSTERS',
                        desc: 'See mutual friend check-ins, squad routes, and WhatsApp/Instagram group beacons without platform lock-in.'
                      },
                      {
                        code: 'PERK_03',
                        title: 'SKIP-THE-LINE VIP QR TOKEN',
                        desc: 'Direct priority queue scanning and complimentary welcome pour at verified partner venues.'
                      },
                      {
                        code: 'PERK_04',
                        title: 'OFFLINE TACTICAL MAP & BATTERY CACHE',
                        desc: 'Full offline navigation raster cached locally for festivals and underground clubs with zero cellular reception.'
                      }
                    ].map((item) => (
                      <div key={item.code} className="p-2.5 bg-[#000000] border border-[#1f1f1f] space-y-0.5">
                        <div className="flex items-center justify-between text-[#FFFFFF] font-bold">
                          <span>[{item.code}] {item.title}</span>
                        </div>
                        <p className="text-[10px] text-[#888888] leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Checkout Action */}
                  <div className="pt-2">
                    <button
                      onClick={handleSubscribe}
                      disabled={isProcessing}
                      className="w-full py-2.5 bg-[#FFFFFF] hover:bg-[#D4D4D4] text-[#000000] font-bold text-xs uppercase transition-colors flex items-center justify-center space-x-2"
                    >
                      {isProcessing ? (
                        <span>PROCESSING CRYPTOGRAPHIC ENROLLMENT...</span>
                      ) : (
                        <span>
                          INITIALIZE RADAR BLACK // {billingCycle === 'monthly' ? '€4.99/MO' : '€39.00/YR'}
                        </span>
                      )}
                    </button>
                    <div className="text-center text-[9px] text-[#555555] uppercase mt-2">
                      DISENGAGE ANYTIME WITH 1-CLICK. 14-DAY FULL MONEY-BACK GUARANTEE.
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            /* Business / Venue Tier */
            <div className="space-y-3 text-xs">
              <div className="p-3 border border-[#333333] bg-[#000000] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#FFFFFF] uppercase">RADAR VENUE PRO TELEMETRY</div>
                  <div className="text-[10px] text-[#777777]">FOR CLUBS, BARS, POP-UPS & FESTIVAL ORGANIZERS</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-[#FFFFFF]">€99.00</div>
                  <div className="text-[9px] text-[#777777]">/ MONTH</div>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  {
                    code: 'B2B_01',
                    title: '3KM PROXIMITY RADAR SPOTLIGHT',
                    desc: 'Your venue or event pinned at the apex of the feed whenever users are within 3km of your location.'
                  },
                  {
                    code: 'B2B_02',
                    title: 'FLASH CAPACITY BALANCING ALERTS',
                    desc: 'Trigger a flash incentive ("First 30 arrivals receive free cocktail") pushed directly to nearby phones when capacity is low.'
                  },
                  {
                    code: 'B2B_03',
                    title: '0% TICKETING PLATFORM SURCHARGE',
                    desc: 'Sell tickets directly through your Stripe account with zero intermediary commissions (save 7-15% vs Eventbrite/RA).'
                  },
                  {
                    code: 'B2B_04',
                    title: 'FOOT-TRAFFIC DENSITY HEATMAPS',
                    desc: 'Real-time telemetry showing foot-traffic surges, competitive night trends, and neighborhood arrival curves.'
                  }
                ].map((item) => (
                  <div key={item.code} className="p-2.5 bg-[#000000] border border-[#1f1f1f] space-y-0.5">
                    <div className="flex items-center justify-between text-[#FFFFFF] font-bold">
                      <span>[{item.code}] {item.title}</span>
                    </div>
                    <p className="text-[10px] text-[#888888] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert('Venue Pro Telemetry on-boarding initiated. Welcome to Radar Partner Network.')}
                  className="w-full py-2.5 bg-[#FFFFFF] hover:bg-[#D4D4D4] text-[#000000] font-bold text-xs uppercase transition-colors"
                >
                  CONNECT VENUE TERMINAL // €99.00/MO
                </button>
                <div className="text-center text-[9px] text-[#555555] uppercase mt-2">
                  INCLUDES DEDICATED VENUE BEACON HARDWARE & GUESTLIST SCANNER APP.
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
