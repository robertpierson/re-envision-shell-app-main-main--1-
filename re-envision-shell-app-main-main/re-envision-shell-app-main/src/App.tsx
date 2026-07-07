import { useState, useEffect } from 'react';
import { Screen } from './types';
import Navigation from './navigation/Navigation';
import HomeScreen from './screens/HomeScreen.tsx';
import LessonScreen from './screens/LessonScreen.tsx';
import LeaderboardScreen from './screens/LeaderboardScreen.tsx';
import CertificationScreen from './screens/CertificationScreen.tsx';
import ProfileScreen from './screens/ProfileScreen.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';
import SplashScreen from './screens/SplashScreen';
import SignIn from './screens/SignIn';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [currentLessonId, setCurrentLessonId] = useState<string | undefined>();
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
    setCurrentScreen(screen);
    setCurrentLessonId(lessonId);
  };

  const handleExitLesson = () => {
    // Frontend-only: save lesson progress will be added with backend
    setCurrentScreen('home');
    setCurrentLessonId(undefined);
  };

  // Lesson screen has its own layout (no bottom nav)
  if (currentScreen === 'lesson') {
    return <LessonScreen lessonId={currentLessonId} onExit={handleExitLesson} />;
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
