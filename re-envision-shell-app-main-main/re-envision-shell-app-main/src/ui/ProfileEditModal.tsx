import React, { useRef, useState } from 'react';
import { Camera, Check, Trash2, X } from 'lucide-react';
import { getProfile, saveProfile } from '../lib/profile';
import { uploadAvatar } from '../lib/supabase';

interface Props {
  open: boolean;
  onClose: () => void;
}

const EMOJI = ['🌟', '🐶', '🚀', '🧠', '🔥', '🦊', '🐼', '🐸', '🦉', '🐙', '🎯', '⚡', '🌈', '🍕', '🎮', '🏆'];

// Picking a name or face actually saves now — the old Save button was wired
// straight to onClose. Writes to the local profile store immediately, mirrors
// to Supabase when signed in, and uploads pictures to storage.
const ProfileEditModal: React.FC<Props> = ({ open, onClose }) => {
  const current = getProfile();
  const [displayName, setDisplayName] = useState(current.displayName);
  const [avatar, setAvatar] = useState(current.avatar);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(current.avatarUrl);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const pickFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    setNotice(null);
    const res = await uploadAvatar(file);
    setBusy(false);
    if (res.ok && res.url) {
      setAvatarUrl(res.url);
      setNotice('Picture uploaded.');
      return;
    }
    // Signed out or offline: keep it on this device rather than losing it.
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarUrl(String(reader.result));
      setNotice(`${res.message} Saved on this device for now.`);
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    setBusy(true);
    await saveProfile({ displayName: displayName.trim() || 'New Learner', avatar, avatarUrl });
    setBusy(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm animate-overlay-in">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-overlay animate-scale-in dark:bg-neutral-dark">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-primary dark:text-white">Edit profile</h2>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1 text-text-secondary hover:bg-black/5 dark:hover:bg-white/10">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Live preview of exactly what everyone else will see */}
        <div className="flex items-center gap-4">
          <div className="relative">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="h-20 w-20 rounded-full object-cover shadow-panel" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-4xl">{avatar}</div>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              aria-label="Upload a picture"
              className="absolute -bottom-1 -right-1 rounded-full bg-primary p-2 text-white shadow-md transition hover:scale-110"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-extrabold text-text-primary dark:text-white">
              {displayName.trim() || 'New Learner'}
            </p>
            <p className="text-xs text-text-secondary dark:text-neutral-400">This is how you appear on leaderboards.</p>
            {avatarUrl && (
              <button
                onClick={() => setAvatarUrl(null)}
                className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-accent"
              >
                <Trash2 className="h-3.5 w-3.5" /> Use an emoji instead
              </button>
            )}
          </div>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => pickFile(e.target.files?.[0])}
        />

        <label className="mt-5 block text-sm font-bold text-text-primary dark:text-white">Display name</label>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          maxLength={32}
          placeholder="Your name"
          className="input mt-1.5 !text-base"
        />

        <p className="mt-5 text-sm font-bold text-text-primary dark:text-white">Or pick an emoji</p>
        <div className="mt-2 grid grid-cols-8 gap-1.5">
          {EMOJI.map((e) => (
            <button
              key={e}
              onClick={() => {
                setAvatar(e);
                setAvatarUrl(null);
              }}
              aria-label={`Use ${e}`}
              className={`flex h-10 items-center justify-center rounded-xl text-xl transition ${
                avatar === e && !avatarUrl ? 'bg-primary/20 ring-2 ring-primary' : 'bg-neutral hover:brightness-95 dark:bg-white/10'
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        {notice && <p className="mt-3 text-xs font-semibold text-text-secondary dark:text-neutral-300">{notice}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-2xl px-4 py-3 text-sm font-semibold text-text-secondary shadow-panel transition hover:shadow-card-hover"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={busy}
            className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-md transition disabled:opacity-60"
          >
            <Check className="h-4 w-4" /> {busy ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
