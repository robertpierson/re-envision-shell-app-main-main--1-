// Supabase backend: auth, profile, class, XP sync, level sync, leaderboard.
// The app never blocks on this module — everything is fire-and-forget on top
// of the local stores, so it works offline and works with no env configured.
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { registerStatsBackend } from './stats';
import { registerProgressBackend } from './progress';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let client: SupabaseClient | null = null;
if (url && anonKey) {
  client = createClient(url, anonKey);
}

export const backendConfigured = Boolean(client);

export interface ClassRow {
  id: string;
  slug: string;
  name: string;
  course_id: string;
  emoji: string;
}

export interface LeaderboardRow {
  user_id: string;
  display_name: string;
  avatar: string;
  class_id: string | null;
  total_xp: number;
  week_xp: number;
}

export interface ProfileRow {
  id: string;
  display_name: string;
  avatar: string;
  class_id: string | null;
}

async function userId(): Promise<string | null> {
  if (!client) return null;
  const { data } = await client.auth.getSession();
  return data.session?.user.id ?? null;
}

/**
 * Guest sign-in: anonymous auth when the project allows it. Returns true when
 * a session exists afterwards. Failure is fine — the app stays local-only.
 */
export async function signInAsGuest(): Promise<boolean> {
  if (!client) return false;
  const { data } = await client.auth.getSession();
  if (data.session) return true;
  const { error } = await client.auth.signInAnonymously();
  return !error;
}

/** Email one-time-code / magic-link sign-in. */
export async function signInWithEmail(email: string): Promise<{ ok: boolean; message: string }> {
  if (!client) return { ok: false, message: 'Backend not configured on this build.' };
  const { error } = await client.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.origin },
  });
  return error
    ? { ok: false, message: error.message }
    : { ok: true, message: 'Check your email — tap the link (or enter the code) to sign in.' };
}

export async function verifyEmailCode(email: string, token: string): Promise<boolean> {
  if (!client) return false;
  const { error } = await client.auth.verifyOtp({ email, token, type: 'email' });
  return !error;
}

export async function getMyProfile(): Promise<ProfileRow | null> {
  const uid = await userId();
  if (!client || !uid) return null;
  const { data } = await client.from('re_profiles').select('id, display_name, avatar, class_id').eq('id', uid).maybeSingle();
  return (data as ProfileRow) ?? null;
}

export async function updateMyProfile(patch: Partial<Pick<ProfileRow, 'display_name' | 'avatar' | 'class_id'>>): Promise<boolean> {
  const uid = await userId();
  if (!client || !uid) return false;
  const { error } = await client.from('re_profiles').update(patch).eq('id', uid);
  return !error;
}

export async function listClasses(): Promise<ClassRow[]> {
  if (!client) return [];
  const { data } = await client.from('re_classes').select('id, slug, name, course_id, emoji').order('course_id');
  return (data as ClassRow[]) ?? [];
}

export async function fetchLeaderboard(classId?: string | null): Promise<LeaderboardRow[]> {
  if (!client) return [];
  let q = client.from('re_leaderboard').select('*').order('week_xp', { ascending: false }).limit(50);
  if (classId) q = q.eq('class_id', classId);
  const { data } = await q;
  return (data as LeaderboardRow[]) ?? [];
}

// --- register the sync seams -------------------------------------------------
registerStatsBackend(async (event) => {
  const uid = await userId();
  if (!client || !uid) return;
  await client.from('re_xp_events').insert({ user_id: uid, amount: event.amount, reason: event.reason });
  await client.from('re_active_days').upsert(
    { user_id: uid, day: new Date().toISOString().slice(0, 10) },
    { onConflict: 'user_id,day', ignoreDuplicates: true },
  );
});

registerProgressBackend(async (levelId) => {
  const uid = await userId();
  if (!client || !uid) return;
  await client.from('re_level_completions').upsert(
    { user_id: uid, level_id: levelId },
    { onConflict: 'user_id,level_id', ignoreDuplicates: true },
  );
});
