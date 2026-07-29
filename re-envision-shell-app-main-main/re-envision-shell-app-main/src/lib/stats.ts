// Player stats: XP, level, hearts, streak, and the notification feed.
// Everything starts at zero and only moves when the learner actually does
// something. Local-first (localStorage); pushStatsToBackend() mirrors the
// same events to Supabase when it's configured, so the UI never blocks on
// the network.

const KEY = 'reenvision:stats:v1';

export interface XpEvent {
  amount: number;
  reason: string;
  at: string; // ISO date-time
}

export interface StatsState {
  xpEvents: XpEvent[];
  /** ISO dates (YYYY-MM-DD) with at least one completed level. */
  activeDays: string[];
  heartsLost: number; // lost today, resets daily
  heartsDay: string;
  notifications: { text: string; at: string }[];
}

export const MAX_HEARTS = 5;
export const XP_PER_LESSON = 20;
export const XP_PER_BOSS = 60;
export const XP_PER_CORRECT = 5;

const empty = (): StatsState => ({
  xpEvents: [],
  activeDays: [],
  heartsLost: 0,
  heartsDay: today(),
  notifications: [],
});

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function read(): StatsState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const s = { ...empty(), ...JSON.parse(raw) } as StatsState;
    if (s.heartsDay !== today()) {
      s.heartsDay = today();
      s.heartsLost = 0; // hearts refill each day
    }
    return s;
  } catch {
    return empty();
  }
}

function write(s: StatsState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // no storage — stats just don't persist
  }
  cachedSnapshot = null; // stats changed: next getSnapshot() rebuilds
  listeners.forEach((fn) => fn());
}

const listeners = new Set<() => void>();
export function onStatsChange(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function totalXp(s = read()): number {
  return s.xpEvents.reduce((sum, e) => sum + e.amount, 0);
}

/** Level 1 at 0 XP; each level needs 100 more XP than the one before. */
export function levelFromXp(xp: number): { level: number; into: number; needed: number } {
  let level = 1;
  let need = 100;
  let rest = xp;
  while (rest >= need) {
    rest -= need;
    level += 1;
    need += 100;
  }
  return { level, into: rest, needed: need };
}

export function hearts(s = read()): number {
  return Math.max(0, MAX_HEARTS - s.heartsLost);
}

/** Consecutive active days ending today or yesterday. */
export function streak(s = read()): number {
  const days = new Set(s.activeDays);
  let d = new Date();
  if (!days.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (days.has(d.toISOString().slice(0, 10))) {
    n += 1;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export type StatsSnapshot = {
  xp: number;
  level: number;
  into: number;
  needed: number;
  hearts: number;
  maxHearts: number;
  streak: number;
  notifications: { text: string; at: string }[];
};

// useSyncExternalStore compares snapshots by reference, so this MUST hand back
// the same object until something actually changes — building a fresh one per
// call sends React into an infinite re-render loop.
let cachedSnapshot: StatsSnapshot | null = null;

export function getSnapshot(): StatsSnapshot {
  if (cachedSnapshot) return cachedSnapshot;
  const s = read();
  const xp = totalXp(s);
  cachedSnapshot = {
    xp,
    ...levelFromXp(xp),
    hearts: hearts(s),
    maxHearts: MAX_HEARTS,
    streak: streak(s),
    notifications: [...s.notifications].reverse().slice(0, 20),
  };
  return cachedSnapshot;
}

function notify(s: StatsState, text: string) {
  s.notifications.push({ text, at: new Date().toISOString() });
  if (s.notifications.length > 50) s.notifications.splice(0, s.notifications.length - 50);
}

export function awardXp(amount: number, reason: string) {
  const s = read();
  const before = levelFromXp(totalXp(s)).level;
  s.xpEvents.push({ amount, reason, at: new Date().toISOString() });
  const day = today();
  if (!s.activeDays.includes(day)) {
    s.activeDays.push(day);
    const st = streak(s);
    if (st > 1) notify(s, `🔥 ${st}-day streak — keep it going!`);
  }
  notify(s, `⚡ +${amount} XP · ${reason}`);
  const after = levelFromXp(totalXp(s)).level;
  if (after > before) notify(s, `🎉 Level up! You reached level ${after}`);
  write(s);
  void pushStatsToBackend({ kind: 'xp', amount, reason });
}

/** @returns hearts remaining after the loss. */
export function loseHeart(): number {
  const s = read();
  s.heartsLost = Math.min(MAX_HEARTS, s.heartsLost + 1);
  const left = MAX_HEARTS - s.heartsLost;
  if (left === 0) notify(s, '💔 Out of hearts — they refill tomorrow.');
  write(s);
  return left;
}

export function resetStats() {
  write(empty());
}

// ---------------------------------------------------------------------------
// Backend seam. supabase.ts registers a sender here when it's configured;
// without it, events simply stay local.
type BackendSender = (event: { kind: 'xp'; amount: number; reason: string }) => Promise<void>;
let sender: BackendSender | null = null;

export function registerStatsBackend(fn: BackendSender) {
  sender = fn;
}

async function pushStatsToBackend(event: { kind: 'xp'; amount: number; reason: string }) {
  try {
    if (sender) await sender(event);
  } catch {
    // offline or unconfigured — local copy is the source of truth for the UI
  }
}
