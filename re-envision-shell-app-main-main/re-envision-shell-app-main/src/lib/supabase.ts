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
  join_code: string;
  description: string;
  owner_id: string | null;
  member_count?: number;
  joined?: boolean;
}

export interface LeaderboardRow {
  user_id: string;
  display_name: string;
  avatar: string;
  avatar_url?: string | null;
  class_id?: string | null;
  total_xp: number;
  week_xp: number;
}

export interface ProfileRow {
  id: string;
  display_name: string;
  avatar: string;
  avatar_url: string | null;
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

/** Google (Gmail) sign-in. Returns to wherever the app is running. */
export async function signInWithGoogle(): Promise<{ ok: boolean; message: string }> {
  if (!client) return { ok: false, message: 'Backend not configured on this build.' };
  const { error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin },
  });
  return error ? { ok: false, message: error.message } : { ok: true, message: 'Redirecting to Google…' };
}

export async function signOut(): Promise<void> {
  await client?.auth.signOut();
}

export async function currentUser(): Promise<{ id: string; email?: string } | null> {
  if (!client) return null;
  const { data } = await client.auth.getSession();
  const u = data.session?.user;
  return u ? { id: u.id, email: u.email ?? undefined } : null;
}

/** Upload a profile picture and return its public URL. */
export async function uploadAvatar(file: File): Promise<{ ok: boolean; message: string; url?: string }> {
  const uid = await userId();
  if (!client) return { ok: false, message: 'Backend not configured on this build.' };
  if (!uid) return { ok: false, message: 'Sign in first — pictures are saved to your account.' };
  if (!file.type.startsWith('image/')) return { ok: false, message: 'That file is not an image.' };
  if (file.size > 3 * 1024 * 1024) return { ok: false, message: 'Please pick an image under 3 MB.' };
  const ext = (file.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '');
  const path = `${uid}/avatar-${Date.now()}.${ext}`;
  const { error } = await client.storage.from('re-avatars').upload(path, file, { upsert: true });
  if (error) return { ok: false, message: error.message };
  const { data } = client.storage.from('re-avatars').getPublicUrl(path);
  const url = data.publicUrl;
  await updateMyProfile({ avatar_url: url });
  return { ok: true, message: 'Picture updated.', url };
}

export async function getMyProfile(): Promise<ProfileRow | null> {
  const uid = await userId();
  if (!client || !uid) return null;
  const { data } = await client
    .from('re_profiles')
    .select('id, display_name, avatar, avatar_url, class_id')
    .eq('id', uid)
    .maybeSingle();
  return (data as ProfileRow) ?? null;
}

export async function updateMyProfile(
  patch: Partial<Pick<ProfileRow, 'display_name' | 'avatar' | 'avatar_url' | 'class_id'>>,
): Promise<boolean> {
  const uid = await userId();
  if (!client || !uid) return false;
  const { error } = await client.from('re_profiles').update(patch).eq('id', uid);
  return !error;
}

export async function listClasses(): Promise<ClassRow[]> {
  if (!client) return [];
  const uid = await userId();
  const [{ data: classes }, { data: stats }, mine] = await Promise.all([
    client.from('re_classes').select('id, slug, name, course_id, emoji, join_code, description, owner_id').order('course_id'),
    client.from('re_class_stats').select('class_id, member_count'),
    uid
      ? client.from('re_class_members').select('class_id').eq('user_id', uid)
      : Promise.resolve({ data: [] as { class_id: string }[] }),
  ]);
  const counts = new Map((stats ?? []).map((s: { class_id: string; member_count: number }) => [s.class_id, s.member_count]));
  const joined = new Set((mine.data ?? []).map((m: { class_id: string }) => m.class_id));
  return ((classes as ClassRow[]) ?? []).map((c) => ({
    ...c,
    member_count: counts.get(c.id) ?? 0,
    joined: joined.has(c.id),
  }));
}

/** Create a class. The join code is generated server-side. */
export async function createClass(input: {
  name: string;
  emoji: string;
  description: string;
  course_id: string;
}): Promise<{ ok: boolean; message: string; created?: ClassRow }> {
  const uid = await userId();
  if (!client) return { ok: false, message: 'Backend not configured on this build.' };
  if (!uid) return { ok: false, message: 'Sign in first — classes belong to an account.' };
  const slug =
    input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) ||
    `class-${Date.now()}`;
  const { data, error } = await client
    .from('re_classes')
    .insert({ ...input, slug: `${slug}-${Math.random().toString(36).slice(2, 6)}`, owner_id: uid })
    .select('id, slug, name, course_id, emoji, join_code, description, owner_id')
    .single();
  if (error || !data) return { ok: false, message: error?.message ?? 'Could not create that class.' };
  const created = data as ClassRow;
  await client.from('re_class_members').insert({ class_id: created.id, user_id: uid });
  return { ok: true, message: `Created. Share code ${created.join_code}.`, created };
}

/** Join by the 6-character code someone shares with you. */
export async function joinClassByCode(code: string): Promise<{ ok: boolean; message: string }> {
  const uid = await userId();
  if (!client) return { ok: false, message: 'Backend not configured on this build.' };
  if (!uid) return { ok: false, message: 'Sign in first so your XP counts on the board.' };
  const { data } = await client
    .from('re_classes')
    .select('id, name')
    .eq('join_code', code.trim().toUpperCase())
    .maybeSingle();
  if (!data) return { ok: false, message: 'No class has that code.' };
  const { error } = await client.from('re_class_members').insert({ class_id: data.id, user_id: uid });
  if (error && !error.message.includes('duplicate')) return { ok: false, message: error.message };
  return { ok: true, message: `Joined ${(data as { name: string }).name}.` };
}

export async function joinClass(classId: string): Promise<boolean> {
  const uid = await userId();
  if (!client || !uid) return false;
  const { error } = await client.from('re_class_members').insert({ class_id: classId, user_id: uid });
  return !error || error.message.includes('duplicate');
}

export async function leaveClass(classId: string): Promise<boolean> {
  const uid = await userId();
  if (!client || !uid) return false;
  const { error } = await client.from('re_class_members').delete().eq('class_id', classId).eq('user_id', uid);
  return !error;
}

export async function fetchLeaderboard(classId?: string | null): Promise<LeaderboardRow[]> {
  if (!client) return [];
  const table = classId ? 're_class_leaderboard' : 're_leaderboard';
  let q = client.from(table).select('*').order('week_xp', { ascending: false }).limit(50);
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
