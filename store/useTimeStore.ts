import { create } from 'zustand';

export const useTimeStore = create((set) => ({
  seconds: 0,
  setSeconds: (seconds: number) => set({ seconds })
}));
