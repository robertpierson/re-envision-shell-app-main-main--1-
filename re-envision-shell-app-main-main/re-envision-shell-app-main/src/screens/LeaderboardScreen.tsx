import React, { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { Crown, Medal, RefreshCw, Trophy, Users, WifiOff } from 'lucide-react';
import {
  backendConfigured,
  ClassRow,
  fetchLeaderboard,
  getMyProfile,
  joinClass,
  LeaderboardRow,
  listClasses,
} from '../lib/supabase';
import ClassManager from '../ui/ClassManager';
import { getSnapshot, onStatsChange } from '../lib/stats';

type Tab = 'weekly' | 'alltime';

// Real leaderboard: rows come from the re_leaderboard view, one class per
// certification track. Your own row always shows — even offline, from the
// local stats — so the board is never a wall of strangers or a blank page.
const LeaderboardScreen: React.FC = () => {
  const stats = useSyncExternalStore(onStatsChange, getSnapshot, getSnapshot);
  const [tab, setTab] = useState<Tab>('weekly');
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [classId, setClassId] = useState<string | null>(null); // null = everyone
  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [myId, setMyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [joining, setJoining] = useState(false);

  const load = async (cid: string | null) => {
    setLoading(true);
    const [board, profile, cls] = await Promise.all([fetchLeaderboard(cid), getMyProfile(), listClasses()]);
    setRows(board);
    setMyId(profile?.id ?? null);
    setClasses(cls);
    setLoading(false);
  };

  useEffect(() => {
    void load(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickClass = (cid: string | null) => {
    setClassId(cid);
    void load(cid);
  };

  const join = async (cid: string) => {
    setJoining(true);
    await joinClass(cid);
    setJoining(false);
    void load(classId);
  };

  const sorted = useMemo(
    () => [...rows].sort((a, b) => (tab === 'weekly' ? b.week_xp - a.week_xp : b.total_xp - a.total_xp)),
    [rows, tab],
  );
  const iAmListed = myId !== null && sorted.some((r) => r.user_id === myId);

  const rankBadge = (rank: number) =>
    rank === 1 ? (
      <Crown className="h-5 w-5 text-yellow-500" />
    ) : rank === 2 ? (
      <Medal className="h-5 w-5 text-gray-400" />
    ) : rank === 3 ? (
      <Medal className="h-5 w-5 text-amber-600" />
    ) : (
      <span className="text-sm font-extrabold text-text-light">{rank}</span>
    );

  return (
    <div className="min-h-screen pb-20 lg:pb-8">
      <div className="mb-6 hidden lg:block">
        <h1 className="text-3xl font-bold text-text-primary">Leaderboard</h1>
        <p className="mt-1 text-text-secondary">Weekly and all-time XP, per class or across everyone</p>
      </div>

      <div className="mx-auto max-w-4xl space-y-4 px-4 sm:px-6 lg:px-0">
        {/* Class picker — the four certification tracks */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => pickClass(null)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              classId === null ? 'bg-primary text-white shadow-md' : 'bg-white text-text-secondary shadow-panel dark:bg-white/10'
            }`}
          >
            🌍 Everyone
          </button>
          {classes.map((c) => (
            <button
              key={c.id}
              onClick={() => pickClass(c.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                classId === c.id ? 'bg-primary text-white shadow-md' : 'bg-white text-text-secondary shadow-panel dark:bg-white/10'
              }`}
            >
              {c.emoji} {c.name}
              {c.joined && ' · joined'}
            </button>
          ))}
        </div>

        {/* Join the class you're viewing */}
        {classId && myId && !classes.find((c) => c.id === classId)?.joined && (
          <button
            onClick={() => join(classId)}
            disabled={joining}
            className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-2.5 text-sm font-extrabold text-white shadow-md transition hover:brightness-105"
          >
            <Users className="h-4 w-4" /> {joining ? 'Joining…' : 'Join this class'}
          </button>
        )}

        {/* Create a class, or join one with a code */}
        <ClassManager classes={classes} onChanged={() => load(classId)} signedIn={Boolean(myId)} />

        {/* Week / all-time */}
        <div className="flex gap-2">
          {(['weekly', 'alltime'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === t ? 'bg-text-primary text-white dark:bg-white dark:text-text-primary' : 'bg-white text-text-secondary shadow-panel dark:bg-white/10'
              }`}
            >
              {t === 'weekly' ? 'This week' : 'All time'}
            </button>
          ))}
          <button
            onClick={() => load(classId)}
            aria-label="Refresh leaderboard"
            className="ml-auto rounded-full bg-white p-2.5 text-text-secondary shadow-panel transition hover:shadow-card-hover dark:bg-white/10"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Board */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-panel dark:bg-neutral-dark">
          {!backendConfigured && (
            <div className="flex items-center gap-3 border-b border-neutral-dark/10 p-4 text-sm text-text-secondary dark:border-white/10">
              <WifiOff className="h-4 w-4 shrink-0" />
              Offline build — sign-in and the shared board need the backend configured. Your own XP still counts below.
            </div>
          )}
          {sorted.length === 0 && backendConfigured && !loading && (
            <div className="flex items-center gap-3 border-b border-neutral-dark/10 p-4 text-sm text-text-secondary dark:border-white/10">
              <Trophy className="h-4 w-4 shrink-0 text-secondary" />
              No one on this board yet — finish a lesson and you'll be first.
            </div>
          )}

          <ul>
            {sorted.map((r, i) => (
              <li
                key={r.user_id}
                className={`flex items-center gap-3 px-4 py-3 ${
                  r.user_id === myId ? 'bg-primary/10' : i % 2 ? 'bg-neutral/50 dark:bg-white/5' : ''
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center">{rankBadge(i + 1)}</span>
                <span className="text-xl">{r.avatar}</span>
                <span className="min-w-0 flex-1 truncate text-sm font-bold text-text-primary dark:text-white">
                  {r.display_name}
                  {r.user_id === myId && ' (you)'}
                </span>
                <span className="text-sm font-extrabold text-primary">
                  {(tab === 'weekly' ? r.week_xp : r.total_xp).toLocaleString()} XP
                </span>
              </li>
            ))}

            {/* Your local row when you're not on the shared board */}
            {!iAmListed && (
              <li className="flex items-center gap-3 bg-primary/10 px-4 py-3">
                <span className="flex h-8 w-8 items-center justify-center text-sm font-extrabold text-text-light">—</span>
                <span className="text-xl">🌟</span>
                <span className="min-w-0 flex-1 truncate text-sm font-bold text-text-primary dark:text-white">
                  You{backendConfigured ? ' (not signed in to the board yet)' : ''}
                </span>
                <span className="text-sm font-extrabold text-primary">{stats.xp.toLocaleString()} XP</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScreen;
