// Display name and picture. Local-first like everything else: it saves on the
// device instantly so guests get a real profile, and mirrors to Supabase when
// signed in so leaderboards show the same name and face.
import { getMyProfile, updateMyProfile } from './supabase';

const KEY = 'reenvision:profile:v1';

export interface Profile {
  displayName: string;
  /** Emoji fallback, used when there's no uploaded picture. */
  avatar: string;
  /** Uploaded picture, if any. */
  avatarUrl: string | null;
}

const DEFAULTS: Profile = { displayName: 'New Learner', avatar: '🌟', avatarUrl: null };

let cached: Profile | null = null;
const listeners = new Set<() => void>();

function read(): Profile {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };
  } catch {
    return { ...DEFAULTS };
  }
}

function write(p: Profile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // storage unavailable — the in-memory copy still drives this session
  }
  cached = p;
  listeners.forEach((fn) => fn());
}

export function onProfileChange(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/** Referentially stable, as useSyncExternalStore requires. */
export function getProfile(): Profile {
  if (!cached) cached = read();
  return cached;
}

export async function saveProfile(patch: Partial<Profile>): Promise<void> {
  const next = { ...getProfile(), ...patch };
  write(next);
  await updateMyProfile({
    display_name: next.displayName,
    avatar: next.avatar,
    avatar_url: next.avatarUrl,
  }).catch(() => undefined);
}

/** Pull the server copy once a session exists, so a new device matches. */
export async function hydrateProfileFromBackend(): Promise<void> {
  try {
    const row = await getMyProfile();
    if (!row) return;
    write({
      displayName: row.display_name || DEFAULTS.displayName,
      avatar: row.avatar || DEFAULTS.avatar,
      avatarUrl: row.avatar_url ?? null,
    });
  } catch {
    // offline — keep what's on the device
  }
}
