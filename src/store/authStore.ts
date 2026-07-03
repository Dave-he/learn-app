import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar: string;
  targetLanguage: 'english' | 'japanese' | 'korean';
  currentLevel: string;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  createdAt: string;
  lastLogin: string;
}

interface MockUser extends User {
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  checkAuth: () => boolean;
}

interface RegisterData {
  email: string;
  password: string;
  nickname: string;
  targetLanguage: 'english' | 'japanese' | 'korean';
}

const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'demo@lingualearn.com',
    password: 'demo123',
    nickname: '学习达人',
    avatar: '',
    targetLanguage: 'english',
    currentLevel: 'A2',
    totalXp: 1250,
    currentStreak: 7,
    longestStreak: 14,
    createdAt: '2024-01-15',
    lastLogin: '2024-01-22',
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const user = mockUsers.find((u) => u.email === email && u.password === password);
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          const token = btoa(`${user.id}:${Date.now()}`);
          set({ user: userWithoutPassword, token, isAuthenticated: true });
          return true;
        }
        return false;
      },

      register: async (data: RegisterData) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (mockUsers.find((u) => u.email === data.email)) {
          return false;
        }

        const newUser: User = {
          id: `user_${Date.now()}`,
          email: data.email,
          nickname: data.nickname,
          avatar: '',
          targetLanguage: data.targetLanguage,
          currentLevel: 'A1',
          totalXp: 0,
          currentStreak: 0,
          longestStreak: 0,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };

        const token = btoa(`${newUser.id}:${Date.now()}`);
        set({ user: newUser, token, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateUser: (data: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...data } });
        }
      },

      checkAuth: () => {
        const { token, user } = get();
        if (token && user) {
          return true;
        }
        return false;
      },
    }),
    {
      name: 'lingua-auth',
    }
  )
);
