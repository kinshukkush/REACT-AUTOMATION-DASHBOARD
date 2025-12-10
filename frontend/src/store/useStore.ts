import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, User, ApiConfig } from '../types';

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            user: null,
            theme: 'dark',
            apiConfig: {
                openaiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
                backendUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
            },
            setUser: (user: User | null) => set({ user }),
            setTheme: (theme: 'dark' | 'light') => set({ theme }),
            updateApiConfig: (config: Partial<ApiConfig>) =>
                set((state) => ({
                    apiConfig: { ...state.apiConfig, ...config },
                })),
        }),
        {
            name: 'ai-dashboard-storage',
        }
    )
);
