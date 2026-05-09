import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Progress {
  id: string;
  userId: string;
  moduleType: 'vocabulary' | 'grammar' | 'speaking' | 'listening';
  itemId: string;
  score: number;
  duration: number;
  completedAt: string;
}

export interface DailyProgress {
  date: string;
  minutes: number;
  xp: number;
}

interface ProgressState {
  progressList: Progress[];
  dailyProgress: DailyProgress[];
  totalStudyTime: number;
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
  level: number;
  modulesProgress: {
    vocabulary: number;
    grammar: number;
    speaking: number;
    listening: number;
  };
  addProgress: (progress: Omit<Progress, 'id'>) => void;
  getXpForLevel: (level: number) => number;
  calculateLevel: (xp: number) => number;
  updateStreak: () => void;
  getWeeklyData: () => DailyProgress[];
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progressList: [],
      dailyProgress: [],
      totalStudyTime: 0,
      currentStreak: 0,
      longestStreak: 0,
      totalXp: 0,
      level: 1,
      modulesProgress: {
        vocabulary: 0,
        grammar: 0,
        speaking: 0,
        listening: 0,
      },

      addProgress: (progress) => {
        const newProgress: Progress = {
          ...progress,
          id: `progress_${Date.now()}`,
        };

        set((state) => {
          const xpGain = Math.floor(progress.score / 10);
          const newTotalXp = state.totalXp + xpGain;
          const newLevel = get().calculateLevel(newTotalXp);

          const today = new Date().toISOString().split('T')[0];
          const existingDayIndex = state.dailyProgress.findIndex(
            (d) => d.date === today
          );

          let newDailyProgress = [...state.dailyProgress];
          if (existingDayIndex >= 0) {
            newDailyProgress[existingDayIndex] = {
              ...newDailyProgress[existingDayIndex],
              minutes: newDailyProgress[existingDayIndex].minutes + Math.floor(progress.duration / 60),
              xp: newDailyProgress[existingDayIndex].xp + xpGain,
            };
          } else {
            newDailyProgress.push({
              date: today,
              minutes: Math.floor(progress.duration / 60),
              xp: xpGain,
            });
          }

          const moduleKey = progress.moduleType as keyof typeof state.modulesProgress;
          const newModulesProgress = { ...state.modulesProgress };
          newModulesProgress[moduleKey] = Math.min(100, newModulesProgress[moduleKey] + 5);

          return {
            progressList: [...state.progressList, newProgress],
            totalStudyTime: state.totalStudyTime + progress.duration,
            totalXp: newTotalXp,
            level: newLevel,
            dailyProgress: newDailyProgress,
            modulesProgress: newModulesProgress,
          };
        });
      },

      getXpForLevel: (level: number) => {
        return level * 500;
      },

      calculateLevel: (xp: number) => {
        let level = 1;
        let requiredXp = 500;
        let accumulatedXp = 0;

        while (accumulatedXp + requiredXp <= xp) {
          accumulatedXp += requiredXp;
          level++;
          requiredXp = level * 500;
        }

        return level;
      },

      updateStreak: () => {
        const { currentStreak, longestStreak, dailyProgress } = get();
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        const hasTodayProgress = dailyProgress.some((d) => d.date === today);
        const hasYesterdayProgress = dailyProgress.some((d) => d.date === yesterday);

        if (hasTodayProgress) {
          if (hasYesterdayProgress || currentStreak === 0) {
            const newStreak = currentStreak + 1;
            set({
              currentStreak: newStreak,
              longestStreak: Math.max(longestStreak, newStreak),
            });
          }
        }
      },

      getWeeklyData: () => {
        const { dailyProgress } = get();
        const today = new Date();
        const weekData: DailyProgress[] = [];

        for (let i = 6; i >= 0; i--) {
          const date = new Date(today.getTime() - i * 86400000)
            .toISOString()
            .split('T')[0];
          const existing = dailyProgress.find((d) => d.date === date);
          weekData.push(existing || { date, minutes: 0, xp: 0 });
        }

        return weekData;
      },
    }),
    {
      name: 'lingua-progress',
    }
  )
);
