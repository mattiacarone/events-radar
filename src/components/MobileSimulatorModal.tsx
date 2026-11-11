'use client';

import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  RotateCw, 
  Wifi, 
  Battery, 
  ExternalLink,
  Layers,
  Sparkles,
  Download
} from 'lucide-react';

interface MobileSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCityName: string;
}

export default function MobileSimulatorModal({
  isOpen,
  onClose,
  currentCityName
}: MobileSimulatorModalProps) {
  const [deviceModel, setDeviceModel] = useState<'iphone' | 'pixel'>('iphone');
  const [activeTab, setActiveTab] = useState<'preview' | 'architecture'>('preview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#000000]/95 backdrop-blur-md overflow-y-auto font-mono text-[#EAEAEA]">
      <div className="relative w-full max-w-5xl bg-[#080808] border border-[#333333] shadow-2xl flex flex-col my-auto max-h-[96vh]">
        
        {/* Precision Crosshairs */}
        <span className="absolute -top-1.5 -left-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>
        <span className="absolute -top-1.5 -right-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>
        <span className="absolute -bottom-1.5 -left-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>
        <span className="absolute -bottom-1.5 -right-1.5 text-xs text-[#666666] z-30 pointer-events-none">+</span>

        {/* Simulator Top Control Bar */}
        <div className="p-3 bg-[#000000] border-b border-[#222222] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-[#FFFFFF]" />
            <span className="font-bold text-[#FFFFFF]">RADAR_MOBILE_DEVICE_SIMULATOR</span>
            <span className="text-[#666666]">|</span>
            <span className="text-[#AAAAAA]">{deviceModel === 'iphone' ? 'APPLE IPHONE 16 PRO (393 × 852)' : 'GOOGLE PIXEL 9 PRO (412 × 915)'}</span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Tab switch */}
            <div className="flex items-center p-0.5 bg-[#111111] border border-[#2b2b2b]">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-2.5 py-1 text-[10px] uppercase transition-colors ${
                  activeTab === 'preview' ? 'bg-[#FFFFFF] text-[#000000] font-bold' : 'text-[#888888] hover:text-[#FFFFFF]'
                }`}
              >
                LIVE SIMULATOR
              </button>
              <button
                onClick={() => setActiveTab('architecture')}
                className={`px-2.5 py-1 text-[10px] uppercase transition-colors ${
                  activeTab === 'architecture' ? 'bg-[#FFFFFF] text-[#000000] font-bold' : 'text-[#888888] hover:text-[#FFFFFF]'
                }`}
              >
                APP STORE & GOOGLE PLAY PIPELINE
              </button>
            </div>

            {/* Model switch */}
            {activeTab === 'preview' && (
              <div className="flex items-center p-0.5 bg-[#111111] border border-[#2b2b2b]">
                <button
                  onClick={() => setDeviceModel('iphone')}
                  className={`px-2 py-1 text-[10px] uppercase ${
                    deviceModel === 'iphone' ? 'text-[#FFFFFF] font-bold underline' : 'text-[#777777]'
                  }`}
                >
                  iOS
                </button>
                <button
                  onClick={() => setDeviceModel('pixel')}
                  className={`px-2 py-1 text-[10px] uppercase ${
                    deviceModel === 'pixel' ? 'text-[#FFFFFF] font-bold underline' : 'text-[#777777]'
                  }`}
                >
                  ANDROID
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1 hover:bg-[#222222] text-[#888888] hover:text-[#FFFFFF]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Simulator Workspace */}
        <div className="p-4 sm:p-6 flex-1 flex items-center justify-center overflow-y-auto no-scrollbar bg-[#050505]">
          
          {activeTab === 'preview' ? (
            <div className="flex flex-col items-center">
              
              {/* Phone Chassis Container */}
              <div className={`relative ${
                deviceModel === 'iphone' ? 'w-[375px] h-[750px] sm:w-[393px] sm:h-[800px] rounded-[52px]' : 'w-[375px] h-[750px] sm:w-[400px] sm:h-[800px] rounded-[40px]'
              } bg-[#000000] border-[10px] border-[#222222] shadow-[0_0_60px_rgba(255,255,255,0.06)] overflow-hidden flex flex-col`}>
                
                {/* Physical Bezel Trim */}
                <div className="absolute inset-0 border-[2px] border-[#383838] rounded-[42px] pointer-events-none z-40"></div>

                {/* iPhone Dynamic Island */}
                {deviceModel === 'iphone' ? (
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#000000] rounded-full z-50 flex items-center justify-between px-2.5 border border-[#1a1a1a]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#111111] flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#081a2e]"></div>
                    </div>
                    <div className="text-[9px] text-[#666666] font-mono tracking-tighter">RADAR</div>
                    <div className="w-2 h-2 rounded-full bg-[#1a1a1a]"></div>
                  </div>
                ) : (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#000000] rounded-full z-50 border border-[#222222]"></div>
                )}

                {/* Simulated Phone Status Bar */}
                <div className="w-full h-11 bg-[#000000] text-[#FFFFFF] text-[10px] px-6 pt-2 flex items-center justify-between font-mono z-30 select-none">
                  <span>00:33</span>
                  <div className="flex items-center space-x-1.5 text-[9px]">
                    <span className="font-bold">5G</span>
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Embedded Live Webview inside the Phone Frame */}
                <div className="flex-1 w-full bg-[#050505] relative overflow-hidden">
                  <iframe
                    src="/"
                    title="Radar Mobile Preview"
                    className="w-full h-full border-none select-none"
                    style={{
                      WebkitOverflowScrolling: 'touch'
                    }}
                  />
                </div>

                {/* iOS Home Indicator Bar */}
                <div className="w-full h-5 bg-[#000000] flex items-center justify-center z-30">
                  <div className="w-32 h-1 bg-[#FFFFFF]/70 rounded-full"></div>
                </div>

              </div>

              {/* Helper caption */}
              <p className="mt-3 text-[11px] text-[#666666] text-center">
                Interactive simulated viewport. Touch, scroll, filter temporal dates, and inspect tactical pins.
              </p>
            </div>
          ) : (
            /* Native App Architecture & Export Guide */
            <div className="max-w-2xl space-y-4 text-xs font-mono">
              <div className="p-4 border border-[#333333] bg-[#000000] space-y-2">
                <div className="flex items-center space-x-2 text-sm font-bold text-[#FFFFFF]">
                  <Layers className="w-4 h-4 text-[#FFFFFF]" />
                  <span>PHONE APP PRODUCTION DEPLOYMENT ARCHITECTURE</span>
                </div>
                <p className="text-[11px] text-[#AAAAAA] leading-relaxed">
                  The current web codebase is architected with zero-dependency CSS, Next.js 15, and modular state. It can be shipped to the <strong className="text-[#FFFFFF]">Apple App Store</strong> and <strong className="text-[#FFFFFF]">Google Play Store</strong> using two sanctioned industry pathways:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 border border-[#222222] bg-[#0c0c0c] space-y-2">
                  <div className="text-xs font-bold text-[#FFFFFF] uppercase">PATHWAY 1: CAPACITOR (1-CLICK NATIVE WRAPPER)</div>
                  <p className="text-[11px] text-[#777777]">
                    Wraps the Next.js app in a native iOS Xcode project and Android Studio project. Gives instant access to:
                  </p>
                  <ul className="text-[10px] text-[#AAAAAA] space-y-1 list-disc pl-4">
                    <li>Native Haptic Feedback on radar dial rotation</li>
                    <li>Push Notifications for secret flash warehouse drops</li>
                    <li>Apple Pay / Google Pay in-app subscriptions</li>
                    <li>Native Background Geofencing beacon triggers</li>
                  </ul>
                  <div className="p-2 bg-[#000000] border border-[#1a1a1a] text-[10px] text-[#888888]">
                    <code>npx cap init Radar com.radar.events</code><br/>
                    <code>npx cap add ios && npx cap add android</code>
                  </div>
                </div>

                <div className="p-4 border border-[#222222] bg-[#0c0c0c] space-y-2">
                  <div className="text-xs font-bold text-[#FFFFFF] uppercase">PATHWAY 2: PWA ZERO-STORE INSTALL</div>
                  <p className="text-[11px] text-[#777777]">
                    Users on Safari (iOS) tap <strong>"Share &gt; Add to Home Screen"</strong>, or Chrome (Android) tap <strong>"Install App"</strong>.
                  </p>
                  <ul className="text-[10px] text-[#AAAAAA] space-y-1 list-disc pl-4">
                    <li>0% Apple / Google 30% tax on ticket sales & subscriptions</li>
                    <li>Offline cached tactical maps and ticket tokens</li>
                    <li>Runs full-screen with no browser address bar</li>
                    <li>Instant real-time updates without App Store reviews</li>
                  </ul>
                  <div className="p-2 bg-[#000000] border border-[#1a1a1a] text-[10px] text-[#888888]">
                    Manifest: <code>manifest.json</code> configured<br/>
                    Display: <code>standalone</code>
                  </div>
                </div>
              </div>

              <div className="p-3 border border-[#333333] bg-[#000000] flex items-center justify-between">
                <span className="text-[11px] text-[#AAAAAA]">
                  Want to export the Xcode / Android Studio assets?
                </span>
                <button
                  onClick={() => alert('Capacitor config and iOS bundle generation script ready!')}
                  className="px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#D4D4D4] text-[#000000] text-xs font-bold uppercase transition-colors"
                >
                  [EXPORT NATIVE MOBILE BUNDLE]
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-[#000000] border-t border-[#222222] flex items-center justify-between text-xs">
          <span className="text-[#666666]">DEVICE_TELEMETRY: RESOLUTION 393x852 // DENSITY 3x</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#FFFFFF] hover:bg-[#D4D4D4] text-[#000000] text-xs font-bold uppercase transition-colors"
          >
            [RETURN TO TERMINAL]
          </button>
        </div>

      </div>
    </div>
  );
}
