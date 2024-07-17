import { create } from 'zustand';

export const useProfitStore = create((set) => ({
  profit: {
    id: '',
    currentProfit: 0
  },
  setProfit: (id: string, profit: number) => set({ id, profit })
}));
