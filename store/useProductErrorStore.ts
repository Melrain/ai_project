import { create } from 'zustand';

export const useProductErrorStore = create((set) => ({
  error: '',
  setError: (error: string) => set({ error })
}));
