import { create } from 'zustand';

export const useBalanceStore = create((set) => ({
  balance: 0,
  type: '',

  setBalance: (balance: number) => set({ balance }),
  setType: (type: string) => set({ type })
}));
