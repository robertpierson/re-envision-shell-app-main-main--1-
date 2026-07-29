import React, { useEffect, useState } from 'react';
import { Bell, MoonStar, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import Card from '../ui/Card';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const FAQ_ITEMS = [
  {
    q: 'How do I unlock the next unit?',
    a: 'Finish every stop on the current unit’s island — all three lessons and the boss battle at the castle. Units always unlock in order, starting from Unit 1.',
  },
  {
    q: 'What are hearts and why did I lose one?',
    a: 'You get five hearts a day. A wrong answer in a boss battle costs one; reading lessons and their practice questions never does. At zero hearts the boss is safe until tomorrow, when hearts refill on their own.',
  },
  {
    q: 'How does XP work?',
    a: 'Correct answers are +5 XP, clearing a lesson is +20, and beating a boss is +60. Each level needs 100 XP more than the last. Replaying something you already finished earns nothing, so the leaderboard can’t be farmed.',
  },
  {
    q: 'What keeps my streak alive?',
    a: 'Complete at least one lesson or boss on a given day. The streak counts consecutive days and survives until a full day passes with nothing finished.',
  },
  {
    q: 'What are classes?',
    a: 'One class per certification track — Deep Learning Explorers, Foundation Model Builders, Language Wranglers and Vision Voyagers. Join one from the Leaderboard screen to compete on its board; you can switch classes at any time.',
  },
  {
    q: 'Does the app work offline?',
    a: 'Yes. The whole curriculum ships inside the app and your progress is stored on the device. Signing in only adds syncing and leaderboards on top.',
  },
  {
    q: 'I found a mistake in a lesson — what do I do?',
    a: 'Email support with the unit and lesson name. Every code example and quiz answer in the curriculum is machine-checked before release, but reports always get a human look.',
  },
];

const SettingsScreen: React.FC = () => {
  const { theme } = useTheme();

  const [lessonReminders, setLessonReminders] = useState<boolean>(() => {
    try { return localStorage.getItem('lessonReminders') === 'true'; } catch { return true; }
  });
  const [autoPlayVideos, setAutoPlayVideos] = useState<boolean>(() => {
    try { return localStorage.getItem('autoPlayVideos') === 'true'; } catch { return false; }
  });
  const [newLessonsFreq, setNewLessonsFreq] = useState<string>(() => {
    try { return localStorage.getItem('newLessonsFreq') || 'Daily'; } catch { return 'Daily'; }
  });
  const [certificationFreq, setCertificationFreq] = useState<string>(() => {
    try { return localStorage.getItem('certificationFreq') || 'Weekly'; } catch { return 'Weekly'; }
  });

  // persist other preferences
  useEffect(() => {
    try { localStorage.setItem('lessonReminders', lessonReminders ? 'true' : 'false'); } catch {}
  }, [lessonReminders]);
  useEffect(() => {
    try { localStorage.setItem('autoPlayVideos', autoPlayVideos ? 'true' : 'false'); } catch {}
  }, [autoPlayVideos]);
  useEffect(() => {
    try { localStorage.setItem('newLessonsFreq', newLessonsFreq); } catch {}
  }, [newLessonsFreq]);
  useEffect(() => {
    try { localStorage.setItem('certificationFreq', certificationFreq); } catch {}
  }, [certificationFreq]);

  return (
    <div className="pb-20 lg:pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Settings</p>
          <h1 className="mt-2 text-3xl font-bold text-text-primary">Customize your learning experience</h1>
          <p className="mt-2 text-text-secondary">A polished shell for future preferences and account controls.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <SlidersHorizontal className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">Preferences</h2>
                <p className="text-sm text-text-secondary">Adjust how your study experience feels.</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-neutral/60 dark:bg-white/5 shadow-panel px-4 py-3">
                <div>
                  <p className="font-semibold text-text-primary">Dark mode</p>
                  <p className="text-xs text-text-secondary">{theme === 'dark' ? 'Dark theme enabled' : 'Light theme enabled'}</p>
                </div>
                <ThemeToggle />
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-neutral/60 dark:bg-white/5 shadow-panel px-4 py-3">
                <div>
                  <p className="font-semibold text-text-primary">Lesson reminders</p>
                  <p className="text-xs text-text-secondary">Receive reminders for scheduled lessons</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setLessonReminders(true)} className={`px-3 py-1 rounded-xl shadow-panel transition-colors ${lessonReminders ? 'bg-primary text-white' : 'bg-white dark:bg-neutral-dark'}`}>Enabled</button>
                  <button onClick={() => setLessonReminders(false)} className={`px-3 py-1 rounded-xl shadow-panel transition-colors ${!lessonReminders ? 'bg-primary text-white' : 'bg-white dark:bg-neutral-dark'}`}>Disabled</button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-neutral/60 dark:bg-white/5 shadow-panel px-4 py-3">
                <div>
                  <p className="font-semibold text-text-primary">Auto-play videos</p>
                  <p className="text-xs text-text-secondary">Automatically play lesson videos</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setAutoPlayVideos(true)} className={`px-3 py-1 rounded-xl shadow-panel transition-colors ${autoPlayVideos ? 'bg-primary text-white' : 'bg-white dark:bg-neutral-dark'}`}>On</button>
                  <button onClick={() => setAutoPlayVideos(false)} className={`px-3 py-1 rounded-xl shadow-panel transition-colors ${!autoPlayVideos ? 'bg-primary text-white' : 'bg-white dark:bg-neutral-dark'}`}>Off</button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-secondary/10 p-3 text-secondary">
                <Bell className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">Notifications</h2>
                <p className="text-sm text-text-secondary">Stay up to date without overwhelming your feed.</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-neutral/60 dark:bg-white/5 shadow-panel px-4 py-3">
                <div>
                  <p className="font-semibold text-text-primary">New lessons</p>
                  <p className="text-xs text-text-secondary">Frequency for new lesson notifications</p>
                </div>
                <select value={newLessonsFreq} onChange={(e) => setNewLessonsFreq(e.target.value)} className="rounded-xl bg-white dark:bg-neutral-dark shadow-panel px-3 py-1">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-neutral/60 dark:bg-white/5 shadow-panel px-4 py-3">
                <div>
                  <p className="font-semibold text-text-primary">Certification updates</p>
                  <p className="text-xs text-text-secondary">Frequency for certification-related notifications</p>
                </div>
                <select value={certificationFreq} onChange={(e) => setCertificationFreq(e.target.value)} className="rounded-xl bg-white dark:bg-neutral-dark shadow-panel px-3 py-1">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        <Card className="mt-6 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-accent/10 p-3 text-accent">
              <MoonStar className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">Privacy & Security</h2>
              <p className="text-sm text-text-secondary">Secure and simple controls for account safety.</p>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-primary/5 shadow-panel px-4 py-3 text-sm text-text-secondary">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Your data stays private and is ready for future account sync.</span>
          </div>
        </Card>

        <Card className="mt-6 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-secondary/10 p-3 text-secondary">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">Change Language</h2>
              <p className="text-sm text-text-secondary">Select your preferred language for the interface.</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <button className="w-full text-left px-4 py-3 rounded-xl shadow-panel hover:shadow-card-hover transition-shadow">Change Language</button>
          </div>
        </Card>

        <Card className="mt-6 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <SlidersHorizontal className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">Help & Support</h2>
              <p className="text-sm text-text-secondary">Access FAQ, contact support, and view app documentation.</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="rounded-xl px-4 py-3 shadow-panel transition-shadow open:shadow-card-hover">
                <summary className="cursor-pointer text-sm font-bold text-text-primary marker:text-primary">{item.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.a}</p>
              </details>
            ))}
            <a
              href="mailto:support@reenvision.app?subject=ReEnvision%20support"
              className="block w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-primary shadow-panel transition-shadow hover:shadow-card-hover"
            >
              Contact support — support@reenvision.app
            </a>
            <details className="rounded-xl px-4 py-3 shadow-panel">
              <summary className="cursor-pointer text-sm font-bold text-text-primary marker:text-primary">Privacy, in one paragraph</summary>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                Your lessons, XP, hearts and streak live on this device. If you sign in, the same
                numbers sync to your account so leaderboards work — nothing else is collected: no
                ads, no trackers, no selling data, and guest accounts carry no personal details at
                all. Signed-in classmates can see your display name, avatar and XP on the
                leaderboard, and nothing more.
              </p>
            </details>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsScreen;
