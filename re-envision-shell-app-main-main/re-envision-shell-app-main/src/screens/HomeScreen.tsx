import React, { useState } from 'react';
import { Bell, BookOpen, Clock, Heart, Sparkles, TrendingUp, Zap } from 'lucide-react';
import Card from '../ui/Card';
import RoadmapPath from '../ui/RoadmapPath';
import { courses } from '../data/curriculum';
import { unitStatuses } from '../lib/progress';
import { Screen } from '../types';

interface HomeScreenProps {
  onNavigate: (screen: Screen, lessonId?: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0].id);
  const [activeUnitId, setActiveUnitId] = useState<string | undefined>();

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) ?? courses[0];

  // Real, stored progress decides what is open — units unlock strictly in order.
  const statuses = unitStatuses(selectedCourse.units);
  const defaultUnit =
    selectedCourse.units[Math.max(0, statuses.indexOf('active'))] ?? selectedCourse.units[0];
  const activeUnit =
    selectedCourse.units.find((u) => u.id === activeUnitId) ?? defaultUnit;

  const userXP = 3450;
  const streak = 7;
  const completedCount = statuses.filter((s) => s === 'completed').length;
  const progress = Math.round((completedCount / selectedCourse.units.length) * 100);

  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveUnitId(undefined); // snap back to the first open unit of that course
  };

  return (
    <div className="pb-20 lg:pb-8">
      {/* Mobile Top Bar removed to ensure no top header is present */}

      {/* Desktop Welcome + status header */}
      <div className="hidden lg:flex lg:items-end lg:justify-between lg:mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Welcome back!</h1>
          <p className="mt-1 text-text-secondary">Choose a course and continue your AI literacy journey</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white dark:bg-neutral-dark px-4 py-3 shadow-panel">
          <div className="flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-600">
            <Heart className="h-4 w-4 fill-orange-500" />
            <span>{20} Hearts</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
            <Zap className="h-4 w-4" />
            <span>{userXP.toLocaleString()} XP</span>
          </div>
          <button className="rounded-full bg-white dark:bg-white/5 shadow-panel p-2 text-text-secondary transition hover:shadow-card-hover">
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-0">
        {/* Duolingo-style Course Selector Container */}
        <div className="mb-6 rounded-3xl bg-white dark:bg-neutral-dark p-4 shadow-panel">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">Select Your Course</p>
          <div className="flex flex-wrap gap-2">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => handleCourseChange(course.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedCourseId === course.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-neutral-100 text-text-secondary hover:bg-neutral-200'
                }`}
              >
                {course.name}
              </button>
            ))}
          </div>
        </div>

        {/* Core Layout Split */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Module Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Current Unit Display Banner */}
            <div className={`rounded-3xl bg-gradient-to-r ${selectedCourse.accent} p-6 text-white shadow-lg`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white/80">Current Unit</p>
                  <h2 className="mt-1 text-2xl font-bold">{activeUnit.title}</h2>
                  <p className="mt-2 text-sm text-white/90">{activeUnit.lessonDetail}</p>
                </div>
                <div className="rounded-2xl bg-white/15 p-3">
                  <BookOpen className="h-8 w-8" />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                  {activeUnit.lessonTitle}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  {selectedCourse.name}
                </span>
              </div>
              <button
                onClick={() => onNavigate('unitmap', activeUnit.lessonId)}
                className="mt-5 rounded-2xl bg-white px-5 py-3 font-semibold text-primary transition hover:bg-white/90"
              >
                Enter this unit's world
              </button>
            </div>

            {/* Duolingo-style learning path for the selected course only */}
            <Card className="p-4 lg:p-8">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Your Learning Path</p>
                  <h3 className="text-lg font-bold text-text-primary">{selectedCourse.name}</h3>
                </div>
                <div className="rounded-full bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">
                  {selectedCourse.units.length} Units
                </div>
              </div>
              <RoadmapPath
                units={selectedCourse.units}
                statuses={statuses}
                activeUnitId={activeUnit.id}
                onSelect={setActiveUnitId}
                onOpen={(unit) => onNavigate('unitmap', unit.lessonId)}
              />
            </Card>
          </div>

          {/* Sidebar Panel Section */}
          <div className="hidden lg:block">
            <Card className="sticky top-8">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-primary">Your Progress</h3>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Live
                </div>
              </div>
              <div className="rounded-2xl bg-primary/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-text-secondary">Course completion</span>
                  <span className="text-lg font-bold text-primary">{progress}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-dark">
                  <div className="h-full rounded-full bg-primary transition-all duration-3xl" style={{ width: `${progress}%` }} />
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-orange-50 p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <p className="font-bold text-text-primary">{streak} Days</p>
                      <p className="text-xs text-text-secondary">Current streak</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between rounded-xl bg-secondary/10 p-3">
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-secondary" />
                    <div>
                      <p className="font-bold text-text-primary">{userXP.toLocaleString()} XP</p>
                      <p className="text-xs text-text-secondary">Total earned</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between rounded-xl bg-accent/10 p-3">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-bold text-text-primary">Level 5</p>
                      <p className="text-xs text-text-secondary">750 XP to next</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between rounded-xl bg-primary/10 p-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-accent" />
                    <div>
                      <p className="font-bold text-text-primary">
                        {completedCount} Units
                      </p>
                      <p className="text-xs text-text-secondary">Completed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 shadow-divider-top pt-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-text-secondary">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Curriculum synced to your active view</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Mobile View Indicators */}
        <div className="lg:hidden mt-8">
          <div className="mx-auto grid max-w-lg grid-cols-2 gap-4">
            <div className="bg-white dark:bg-neutral-dark rounded-2xl shadow-panel p-4 text-center">
              <p className="text-3xl font-bold text-primary">{streak}</p>
              <p className="text-sm font-semibold text-text-secondary">Day Streak</p>
            </div>
            <div className="bg-white dark:bg-neutral-dark rounded-2xl shadow-panel p-4 text-center">
              <p className="text-3xl font-bold text-secondary">{userXP.toLocaleString()}</p>
              <p className="text-sm font-semibold text-text-secondary">Total XP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
