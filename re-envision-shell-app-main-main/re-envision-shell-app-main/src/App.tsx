import { useState, useEffect } from 'react';
import { Screen } from './types';
import Navigation from './navigation/Navigation';
import HomeScreen from './screens/HomeScreen.tsx';
import UnitMapScreen from './screens/UnitMapScreen.tsx';
import LessonScreen from './screens/LessonScreen.tsx';
import BossBattleScreen from './screens/BossBattleScreen.tsx';
import LeaderboardScreen from './screens/LeaderboardScreen.tsx';
import CertificationScreen from './screens/CertificationScreen.tsx';
import ProfileScreen from './screens/ProfileScreen.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';
import SplashScreen from './screens/SplashScreen';
import SignIn from './screens/SignIn';
import { CourseUnit, findUnit } from './data/curriculum';
import { Level, completeLevel } from './lib/progress';
import './lib/supabase'; // registers the backend sync seams
import { hydrateProfileFromBackend } from './lib/profile';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activeUnit, setActiveUnit] = useState<CourseUnit | undefined>();
  const [activeLevel, setActiveLevel] = useState<Level | undefined>();
  const [showSplash, setShowSplash] = useState(true);
  const [signedIn, setSignedIn] = useState(() => {
    try {
      return localStorage.getItem('signedIn') === 'true';
    } catch {
      return false;
    }
  });

  const handleSignInComplete = () => {
    try {
      localStorage.setItem('signedIn', 'true');
    } catch {
      // ignore
    }
    setSignedIn(true);
  };

  // Pull the account's saved name and picture once a session exists
  useEffect(() => {
    void hydrateProfileFromBackend();
  }, [signedIn]);

  // Register service worker on mount
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration.scope);
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
        });
    }
  }, []);

  const handleNavigate = (screen: Screen, lessonId?: string) => {
    // Navigating to a unit goes through its world map, never straight to a page.
    if (screen === 'lesson' || screen === 'unitmap') {
      const unit = findUnit(lessonId);
      if (unit) {
        setActiveUnit(unit);
        setCurrentScreen('unitmap');
        return;
      }
    }
    setCurrentScreen(screen);
  };

  const handlePlayLevel = (unit: CourseUnit, level: Level) => {
    setActiveUnit(unit);
    setActiveLevel(level);
    setCurrentScreen('lesson');
  };

  const handleLevelDone = () => {
    if (activeLevel) completeLevel(activeLevel.id);
    setActiveLevel(undefined);
    setCurrentScreen('unitmap');
  };

  const handleExitLesson = () => {
    setActiveLevel(undefined);
    setCurrentScreen('unitmap');
  };

  // Lesson and boss screens have their own layout (no bottom nav)
  if (currentScreen === 'lesson' && activeUnit && activeLevel) {
    const Screen = activeLevel.kind === 'quiz' ? BossBattleScreen : LessonScreen;
    return (
      <Screen
        unit={activeUnit}
        level={activeLevel}
        onComplete={handleLevelDone}
        onExit={handleExitLesson}
      />
    );
  }
  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  return (
    <div className="min-h-screen bg-neutral dark:bg-[#0b0d12]">
      {!signedIn && <SignIn onComplete={handleSignInComplete} />}

      {/* Desktop sidebar + mobile bottom nav */}
      <Navigation currentScreen={currentScreen} onNavigate={handleNavigate} />

      {/* Main content area - with left padding for desktop sidebar. No top header offset. */}
      <main className="pb-16 lg:pl-64 lg:pb-0">
        <div className="lg:p-8">
          {currentScreen === 'home' && <HomeScreen onNavigate={handleNavigate} />}
          {currentScreen === 'unitmap' && activeUnit && (
            <UnitMapScreen
              unit={activeUnit}
              onBack={() => setCurrentScreen('home')}
              onPlay={handlePlayLevel}
            />
          )}
          {currentScreen === 'leaderboard' && <LeaderboardScreen />}
          {currentScreen === 'certification' && <CertificationScreen />}
          {currentScreen === 'profile' && <ProfileScreen />}
          {currentScreen === 'settings' && <SettingsScreen />}
        </div>
      </main>
    </div>
  );
}

export default App;
