import React, { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  initialName: string;
  initialAvatar: string;
}

const ProfileEditModal: React.FC<Props> = ({ open, onClose, initialName, initialAvatar }) => {
  const [displayName, setDisplayName] = useState(initialName);
  const [avatar, setAvatar] = useState(initialAvatar);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 animate-overlay-in">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-neutral-dark p-6 shadow-overlay animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text-primary">Edit Profile</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">Close</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Profile Picture</label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full rounded-2xl shadow-panel px-4 py-3 text-text-primary bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/60"
              placeholder="Emoji or image URL"
            />
            <p className="mt-2 text-xs text-text-secondary">Enter a new emoji or image URL for your profile avatar.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-2xl shadow-panel px-4 py-3 text-text-primary bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/60"
              placeholder="Your display name"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-2xl shadow-panel px-4 py-3 text-sm font-semibold text-text-secondary hover:shadow-card-hover transition-shadow">
            Cancel
          </button>
          <button onClick={onClose} className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
