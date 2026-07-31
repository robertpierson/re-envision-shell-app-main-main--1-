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
import Podium from '../ui/Podium';
import Sandy from '../ui/Sandy';
import { getSnapshot, onStatsChange } from '../lib/stats';
import { getProfile, onProfileChange } from '../lib/profile';

type Tab = 'weekly' | 'alltime';

// Real leaderboard: rows come from the re_leaderboard view, one class per
// certification track. Your own row always shows — even offline, from the
// local stats — so the board is never a wall of strangers or a blank page.
const LeaderboardScreen: React.FC = () => {
  const stats = useSyncExternalStore(onStatsChange, getSnapshot, getSnapshot);
  const profile = useSyncExternalStore(onProfileChange, getProfile, getProfile);
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
  const metric = (r: LeaderboardRow) => (tab === 'weekly' ? r.week_xp : r.total_xp);
  const top = sorted.slice(0, 3);
  const rest = sorted.slice(3);
  const leader = sorted.length ? metric(sorted[0]) : 0;
  const myRank = myId ? sorted.findIndex((r) => r.user_id === myId) + 1 : 0;
  const ahead = myRank > 1 ? sorted[myRank - 2] : null;
  const gap = ahead && myRank > 1 ? metric(ahead) - metric(sorted[myRank - 1]) : 0;

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

        {/* Where you stand, and what it would take to move up */}
        <div className="flex flex-wrap items-center gap-3 rounded-3xl bg-white p-4 shadow-panel dark:bg-neutral-dark">
          <Sandy pose={myRank === 1 ? 'thumbs-goodjob' : 'ball-correct'} className="h-16 w-16 shrink-0 object-contain" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-extrabold text-text-primary dark:text-white">
              {myRank === 1
                ? "You're top of this board."
                : myRank > 1
                  ? `You're #${myRank}${ahead ? ` — ${gap.toLocaleString()} XP behind ${ahead.display_name}` : ''}`
                  : 'Not on this board yet'}
            </p>
            <p className="text-xs text-text-secondary dark:text-neutral-300">
              {myRank === 1
                ? 'Hold it — everyone else is one lesson away.'
                : gap > 0
                  ? `That's about ${Math.max(1, Math.ceil(gap / 20))} lesson${Math.ceil(gap / 20) === 1 ? '' : 's'} of catching up.`
                  : 'Clear a lesson to put your name up here.'}
            </p>
          </div>
          <span className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-extrabold text-primary">
            {stats.xp.toLocaleString()} XP
          </span>
        </div>

        {/* Top three */}
        {sorted.length > 0 && <Podium top={top} metric={metric} meId={myId} />}

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
            {rest.map((r, i) => {
              const value = metric(r);
              const rank = i + 4; // the top three live on the podium
              return (
                <li
                  key={r.user_id}
                  className={`group relative flex items-center gap-3 px-4 py-3 transition-colors ${
                    r.user_id === myId ? 'bg-primary/10' : 'hover:bg-neutral/60 dark:hover:bg-white/5'
                  }`}
                >
                  {/* how big this score is next to the leader, drawn behind the row */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 bg-primary/5 transition-all duration-700 group-hover:bg-primary/10"
                    style={{ width: `${leader ? (value / leader) * 100 : 0}%` }}
                  />
                  <span className="relative flex h-8 w-8 items-center justify-center">{rankBadge(rank)}</span>
                  <span className="relative">
                    {r.avatar_url ? (
                      <img src={r.avatar_url} alt="" className="h-9 w-9 rounded-full object-cover" />
                    ) : (
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral text-lg dark:bg-white/10">
                        {r.avatar}
                      </span>
                    )}
                  </span>
                  <span className="relative min-w-0 flex-1 truncate text-sm font-bold text-text-primary dark:text-white">
                    {r.display_name}
                    {r.user_id === myId && ' (you)'}
                  </span>
                  <span className="relative text-sm font-extrabold text-primary">
                    {value.toLocaleString()} XP
                  </span>
                </li>
              );
            })}

            {/* Your local row when you're not on the shared board */}
            {!iAmListed && (
              <li className="flex items-center gap-3 bg-primary/10 px-4 py-3">
                <span className="flex h-8 w-8 items-center justify-center text-sm font-extrabold text-text-light">—</span>
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt="" className="h-9 w-9 rounded-full object-cover" />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg dark:bg-white/10">
                    {profile.avatar}
                  </span>
                )}
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
