import React, { useEffect, useState } from 'react';
import { Bell, MoonStar, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import Card from '../ui/Card';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

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
            <button className="w-full text-left px-4 py-3 rounded-xl shadow-panel hover:shadow-card-hover transition-shadow">FAQ</button>
            <button className="w-full text-left px-4 py-3 rounded-xl shadow-panel hover:shadow-card-hover transition-shadow">Contact Support</button>
            <button className="w-full text-left px-4 py-3 rounded-xl shadow-panel hover:shadow-card-hover transition-shadow">Privacy Policy</button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsScreen;
