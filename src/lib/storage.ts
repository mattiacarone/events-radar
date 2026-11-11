'use client';

import { SquadPlan, EventItem } from './types';
import { INITIAL_EVENTS } from './data/events';

const STORAGE_KEY_PLANS = 'radar_squad_plans';
const STORAGE_KEY_SAVED = 'radar_saved_event_ids';
const STORAGE_KEY_EVENTS = 'radar_custom_events';

export function getSavedEventIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SAVED);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleSaveEventId(id: string): string[] {
  if (typeof window === 'undefined') return [];
  const current = getSavedEventIds();
  const next = current.includes(id)
    ? current.filter(item => item !== id)
    : [...current, id];
  localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(next));
  return next;
}

export function getAllEvents(): EventItem[] {
  if (typeof window === 'undefined') return INITIAL_EVENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EVENTS);
    if (!raw) return INITIAL_EVENTS;
    const customEvents: EventItem[] = JSON.parse(raw);
    return [...customEvents, ...INITIAL_EVENTS];
  } catch {
    return INITIAL_EVENTS;
  }
}

export function addCustomEvent(event: EventItem): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getAllEvents();
    const customOnly = current.filter(e => e.id.startsWith('custom-'));
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify([event, ...customOnly]));
  } catch (e) {
    console.error('Failed to save event to localStorage', e);
  }
}

export function getAllPlans(): Record<string, SquadPlan> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PLANS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getPlanById(id: string): SquadPlan | null {
  const plans = getAllPlans();
  if (plans[id]) return plans[id];

  // Default demo plan if requesting the sample
  if (id === 'amsterdam-friday-crawl') {
    const events = INITIAL_EVENTS.slice(0, 3);
    return {
      id: 'amsterdam-friday-crawl',
      title: 'Amsterdam Friday Kickoff: De Pijp to Noord',
      creatorName: 'Sophie & Lars',
      citySlug: 'amsterdam',
      createdAt: new Date().toISOString(),
      events,
      votes: {
        [events[0]?.id || '']: ['Sophie', 'Lars', 'Daan'],
        [events[1]?.id || '']: ['Lars'],
        [events[2]?.id || '']: ['Sophie', 'Daan']
      },
      comments: [
        {
          id: 'c1',
          author: 'Sophie',
          text: 'Starting with natural wine in Jordaan then ferry to Shelter around 01:00?',
          time: '18:40'
        },
        {
          id: 'c2',
          author: 'Lars',
          text: 'Voted! The acoustics at Skatecafe are unreal right now.',
          time: '19:05'
        }
      ]
    };
  }

  return null;
}

export function savePlan(plan: SquadPlan): void {
  if (typeof window === 'undefined') return;
  const plans = getAllPlans();
  plans[plan.id] = plan;
  localStorage.setItem(STORAGE_KEY_PLANS, JSON.stringify(plans));
}

export function voteOnPlanEvent(planId: string, eventId: string, voterName: string): SquadPlan | null {
  const plan = getPlanById(planId);
  if (!plan) return null;

  if (!plan.votes[eventId]) {
    plan.votes[eventId] = [];
  }

  const existingIndex = plan.votes[eventId].indexOf(voterName);
  if (existingIndex > -1) {
    plan.votes[eventId].splice(existingIndex, 1);
  } else {
    plan.votes[eventId].push(voterName);
  }

  savePlan(plan);
  return plan;
}

