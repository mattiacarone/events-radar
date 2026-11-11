'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  getPlanById, 
  voteOnPlanEvent, 
  savePlan 
} from '@/lib/storage';
import { SquadPlan, EventItem } from '@/lib/types';
import { 
  Users, 
  Check, 
  MessageSquare, 
  Share2, 
  Clock, 
  MapPin, 
  ArrowLeft, 
  Send 
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function PlanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params?.id as string;

  const [plan, setPlan] = useState<SquadPlan | null>(null);
  const [userName, setUserName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (planId) {
      const p = getPlanById(planId);
      setPlan(p);
      const savedName = localStorage.getItem('radar_user_name');
      if (savedName) setUserName(savedName);
    }
  }, [planId]);

  if (!plan) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#FFFFFF] font-mono flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-3 border border-[#333333] p-8 bg-[#090909]">
          <h2 className="text-sm font-bold uppercase">[DISPATCH NOT FOUND]</h2>
          <p className="text-xs text-[#888888]">This squad telemetry link has expired or was decommissioned.</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-[#FFFFFF] text-[#000000] font-bold text-xs uppercase"
          >
            [RETURN TO RADAR]
          </button>
        </div>
      </div>
    );
  }

  const handleVote = (eventId: string) => {
    let voter = userName.trim();
    if (!voter) {
      const input = prompt('Enter your callsign to log vote:') || '';
      if (!input.trim()) return;
      voter = input.trim().toUpperCase();
      setUserName(voter);
      localStorage.setItem('radar_user_name', voter);
    }

    const updated = voteOnPlanEvent(plan.id, eventId, voter);
    if (updated) {
      setPlan({ ...updated });
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    let author = userName.trim();
    if (!author) {
      const input = prompt('Enter your callsign:') || '';
      if (!input.trim()) return;
      author = input.trim().toUpperCase();
      setUserName(author);
      localStorage.setItem('radar_user_name', author);
    }

    const updatedComments = [
      ...plan.comments,
      {
        id: `c-${Date.now()}`,
        author,
        text: newComment.trim(),
        time: format(new Date(), 'HH:mm')
      }
    ];

    const updatedPlan = {
      ...plan,
      comments: updatedComments
    };

    savePlan(updatedPlan);
    setPlan(updatedPlan);
    setNewComment('');
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const allVoters = new Set<string>();
  Object.values(plan.votes).forEach((voters) => {
    voters.forEach((v) => allVoters.add(v));
  });

  return (
    <div className="min-h-screen bg-[#050505] text-[#EAEAEA] font-mono pb-24 selection:bg-[#FFFFFF] selection:text-[#000000]">
      
      {/* Header Bar */}
      <header className="sticky top-0 z-30 bg-[#000000] border-b border-[#222222]">
        <div className="max-w-4xl mx-auto px-4 h-12 flex items-center justify-between text-xs">
          <button
            onClick={() => router.push('/')}
            className="flex items-center space-x-1.5 text-[#888888] hover:text-[#FFFFFF] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[BACK_TO_RADAR]</span>
          </button>

          <button
            onClick={handleShare}
            className="px-3 py-1 bg-[#141414] border border-[#333333] hover:border-[#FFFFFF] text-[#FFFFFF] text-xs uppercase transition-colors flex items-center space-x-1"
          >
            <Share2 className="w-3 h-3" />
            <span>{copied ? 'LINK_COPIED' : 'DISPATCH_LINK'}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 pt-5 space-y-4">
        
        {/* Dossier Header */}
        <div className="relative p-5 bg-[#090909] border border-[#222222] space-y-2">
          <span className="absolute -top-1 -left-1 text-[9px] text-[#444444]">+</span>
          <span className="absolute -top-1 -right-1 text-[9px] text-[#444444]">+</span>
          <span className="absolute -bottom-1 -left-1 text-[9px] text-[#444444]">+</span>
          <span className="absolute -bottom-1 -right-1 text-[9px] text-[#444444]">+</span>

          <div className="flex items-center space-x-2 text-[10px] text-[#777777]">
            <span>SQUAD_TELEMETRY // {plan.id.toUpperCase()}</span>
            <span>|</span>
            <span>SECTOR: AMSTERDAM</span>
          </div>

          <h1 className="text-lg sm:text-xl font-black text-[#FFFFFF] uppercase tracking-tight">
            {plan.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#888888] pt-1 border-t border-[#1a1a1a]">
            <div>INITIATOR: <span className="text-[#FFFFFF] font-bold">{plan.creatorName.toUpperCase()}</span></div>
            <span>|</span>
            <div>CONFIRMED PARTICIPANTS: <span className="text-[#FFFFFF] font-bold">{allVoters.size}</span></div>
          </div>
        </div>

        {/* Voting Options */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] text-[#666666] uppercase">
            <span>CANDIDATE SIGNALS ({plan.events.length}) — CAST CALLSIGN TALLY</span>
            {userName && <span>ACTIVE CALLSIGN: <strong className="text-[#FFFFFF]">{userName}</strong></span>}
          </div>

          <div className="space-y-2 pt-1">
            {plan.events.map((ev, index) => {
              const votes = plan.votes[ev.id] || [];
              const hasVoted = userName ? votes.includes(userName) : false;
              const startDate = parseISO(ev.startTime);

              return (
                <div
                  key={ev.id}
                  className={`p-3.5 bg-[#090909] border transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    hasVoted ? 'border-[#FFFFFF] bg-[#121212]' : 'border-[#222222]'
                  }`}
                >
                  <div className="space-y-1 max-w-full sm:max-w-[70%]">
                    <div className="flex items-center space-x-2 text-[10px] text-[#777777]">
                      <span className="text-[#FFFFFF] font-bold">CANDIDATE #{index + 1}</span>
                      <span>|</span>
                      <span>{format(startDate, 'HH:mm')} CEST</span>
                    </div>

                    <h3 className="text-sm font-bold text-[#FFFFFF] uppercase tracking-tight">
                      {ev.title}
                    </h3>

                    <div className="text-[11px] text-[#888888]">
                      {ev.venue.name} // {ev.venue.neighborhood} // {ev.price.label}
                    </div>
                  </div>

                  <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1a1a1a]">
                    <button
                      onClick={() => handleVote(ev.id)}
                      className={`px-3 py-1.5 text-xs font-bold uppercase transition-colors ${
                        hasVoted
                          ? 'bg-[#FFFFFF] text-[#000000]'
                          : 'bg-[#141414] border border-[#333333] hover:border-[#FFFFFF] text-[#CCCCCC]'
                      }`}
                    >
                      {hasVoted ? '✓ TALLY LOGGED' : '+ CAST TALLY'} [{votes.length}]
                    </button>

                    {votes.length > 0 && (
                      <div className="text-[10px] text-[#666666]">
                        {votes.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Squad Comms Log */}
        <div className="p-4 bg-[#090909] border border-[#222222] space-y-3">
          <div className="flex items-center space-x-2 text-[10px] text-[#666666] uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>DISPATCH LOGISTICS & COMMS FEED</span>
          </div>

          <div className="space-y-2">
            {plan.comments.map((c) => (
              <div key={c.id} className="p-2.5 bg-[#000000] border border-[#1a1a1a] text-xs space-y-0.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-[#FFFFFF]">{c.author}</span>
                  <span className="text-[#555555]">{c.time}</span>
                </div>
                <p className="text-[#CCCCCC]">{c.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="flex items-center space-x-2 pt-1">
            <input
              type="text"
              placeholder="TRANSMIT COMMS DISPATCH..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-[#000000] border border-[#2b2b2b] text-xs text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#FFFFFF] hover:bg-[#D4D4D4] text-[#000000] font-bold text-xs uppercase"
            >
              [TRANSMIT]
            </button>
          </form>
        </div>

      </main>

    </div>
  );
}
