import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  emoji?: string;
}

const AchievementModal: React.FC<Props> = ({ open, onClose, title = 'Achievement unlocked', description = 'You earned a new achievement', emoji }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-overlay-in">
      <div className="bg-white dark:bg-neutral-dark rounded-2xl shadow-overlay p-6 max-w-sm w-full mx-4 animate-scale-in">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{emoji ?? '🏅'}</div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">{title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{description}</p>
          </div>
        </div>
        <div className="mt-6 text-right">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-primary text-white font-semibold">Close</button>
        </div>
      </div>
    </div>
  );
};

export default AchievementModal;
