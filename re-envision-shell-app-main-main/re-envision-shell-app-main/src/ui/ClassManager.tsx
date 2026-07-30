import React, { useState } from 'react';
import { Copy, Check, LogOut, Plus, Users, X } from 'lucide-react';
import { ClassRow, createClass, joinClass, joinClassByCode, leaveClass } from '../lib/supabase';
import { courses } from '../data/curriculum';
import Sandy from './Sandy';

interface ClassManagerProps {
  classes: ClassRow[];
  /** Reload the board after anything changes. */
  onChanged: () => void;
  signedIn: boolean;
}

const EMOJI = ['📘', '🧠', '🚀', '🔥', '🐶', '🎯', '⭐', '🏆', '💡', '🌍', '👁️', '💬'];

// Create a class, or join one by its 6-character code. Both write straight to
// Supabase; membership is per-user so a learner can sit on several boards.
const ClassManager: React.FC<ClassManagerProps> = ({ classes, onChanged, signedIn }) => {
  const [open, setOpen] = useState<null | 'create' | 'join'>(null);
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('📘');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState(courses[0]?.id ?? 'course-1');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const mine = classes.filter((c) => c.joined);

  const submitCreate = async () => {
    if (name.trim().length < 3) {
      setNotice('Give the class a name of at least 3 characters.');
      return;
    }
    setBusy(true);
    const res = await createClass({ name: name.trim(), emoji, description: description.trim(), course_id: courseId });
    setBusy(false);
    setNotice(res.message);
    if (res.ok) {
      setName('');
      setDescription('');
      setOpen(null);
      onChanged();
    }
  };

  const submitJoin = async () => {
    setBusy(true);
    const res = await joinClassByCode(code);
    setBusy(false);
    setNotice(res.message);
    if (res.ok) {
      setCode('');
      setOpen(null);
      onChanged();
    }
  };

  const toggleMembership = async (c: ClassRow) => {
    setBusy(true);
    const ok = c.joined ? await leaveClass(c.id) : await joinClass(c.id);
    setBusy(false);
    setNotice(ok ? (c.joined ? `Left ${c.name}.` : `Joined ${c.name}.`) : 'That did not work — are you signed in?');
    if (ok) onChanged();
  };

  const copyCode = async (c: ClassRow) => {
    try {
      await navigator.clipboard.writeText(c.join_code);
      setCopied(c.id);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setNotice(`Code is ${c.join_code} — copy it by hand, the clipboard was blocked.`);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-4 shadow-panel dark:bg-neutral-dark lg:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <Sandy pose="sit-point" className="h-14 w-14 shrink-0 object-contain" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold text-text-primary dark:text-white">Your classes</p>
          <p className="text-xs text-text-secondary dark:text-neutral-300">
            {mine.length === 0
              ? 'Not in a class yet — make one for your group, or join with a code.'
              : `In ${mine.length} class${mine.length === 1 ? '' : 'es'}: ${mine.map((c) => c.name).join(', ')}`}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setOpen(open === 'create' ? null : 'create'); setNotice(null); }}
            className="flex items-center gap-1.5 rounded-2xl bg-primary px-3.5 py-2 text-sm font-extrabold text-white shadow-md transition hover:brightness-105"
          >
            <Plus className="h-4 w-4" /> Create
          </button>
          <button
            onClick={() => { setOpen(open === 'join' ? null : 'join'); setNotice(null); }}
            className="flex items-center gap-1.5 rounded-2xl bg-secondary px-3.5 py-2 text-sm font-extrabold text-white shadow-md transition hover:brightness-105"
          >
            <Users className="h-4 w-4" /> Join by code
          </button>
        </div>
      </div>

      {!signedIn && (
        <p className="mt-3 rounded-2xl bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
          Creating and joining classes needs an account — sign in from the welcome screen so your XP lands on the board.
        </p>
      )}

      {open === 'create' && (
        <div className="mt-4 space-y-3 rounded-2xl bg-neutral p-3 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-extrabold text-text-primary dark:text-white">New class</p>
            <button onClick={() => setOpen(null)} aria-label="Close" className="rounded-lg p-1 hover:bg-black/5 dark:hover:bg-white/10">
              <X className="h-4 w-4 text-text-secondary" />
            </button>
          </div>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Class name — e.g. Ms. Reed's Period 3"
            maxLength={60}
            className="input !text-base"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional: who it's for"
            maxLength={120}
            className="input !text-base"
          />
          <div className="flex flex-wrap gap-1.5">
            {EMOJI.map((e) => (
              <button
                key={e}
                onClick={() => setEmoji(e)}
                aria-label={`Icon ${e}`}
                className={`h-9 w-9 rounded-xl text-lg transition ${
                  emoji === e ? 'bg-primary/20 ring-2 ring-primary' : 'bg-white shadow-panel dark:bg-white/10'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-text-primary shadow-panel dark:bg-white/10 dark:text-white"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button
            onClick={submitCreate}
            disabled={busy || !signedIn}
            className="w-full rounded-2xl bg-primary px-4 py-3 font-extrabold text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? 'Creating…' : 'Create class'}
          </button>
        </div>
      )}

      {open === 'join' && (
        <div className="mt-4 space-y-3 rounded-2xl bg-neutral p-3 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-extrabold text-text-primary dark:text-white">Join with a code</p>
            <button onClick={() => setOpen(null)} aria-label="Close" className="rounded-lg p-1 hover:bg-black/5 dark:hover:bg-white/10">
              <X className="h-4 w-4 text-text-secondary" />
            </button>
          </div>
          <input
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="ABC123"
            maxLength={6}
            className="input !text-base text-center tracking-[0.4em]"
          />
          <button
            onClick={submitJoin}
            disabled={busy || code.trim().length < 6 || !signedIn}
            className="w-full rounded-2xl bg-secondary px-4 py-3 font-extrabold text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? 'Joining…' : 'Join class'}
          </button>
        </div>
      )}

      {notice && <p className="mt-3 text-xs font-semibold text-text-secondary dark:text-neutral-300">{notice}</p>}

      {/* Classes you're in: share the code, or leave */}
      {mine.length > 0 && (
        <ul className="mt-4 space-y-2">
          {mine.map((c) => (
            <li key={c.id} className="flex items-center gap-2 rounded-2xl bg-neutral px-3 py-2 dark:bg-white/5">
              <span className="text-lg">{c.emoji}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-text-primary dark:text-white">{c.name}</span>
                <span className="text-[11px] text-text-secondary dark:text-neutral-400">
                  {c.member_count} member{c.member_count === 1 ? '' : 's'}
                  {c.owner_id ? '' : ' · built in'}
                </span>
              </span>
              <button
                onClick={() => copyCode(c)}
                className="flex items-center gap-1 rounded-xl bg-white px-2.5 py-1.5 font-mono text-xs font-bold text-text-primary shadow-panel dark:bg-white/10 dark:text-white"
                title="Copy the join code"
              >
                {copied === c.id ? <Check className="h-3.5 w-3.5 text-[#58CC02]" /> : <Copy className="h-3.5 w-3.5" />}
                {c.join_code}
              </button>
              <button
                onClick={() => toggleMembership(c)}
                disabled={busy}
                aria-label={`Leave ${c.name}`}
                className="rounded-xl p-2 text-text-secondary transition hover:bg-accent/10 hover:text-accent"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassManager;
