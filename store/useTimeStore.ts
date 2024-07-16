// TODO profitTab里的数据拿来给全局使用;

import { create } from 'zustand';

export const useTimeStore = create((set) => ({
  seconds: 0,
  setSeconds: (seconds: number) => set({ seconds })
}));
