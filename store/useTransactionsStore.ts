import { create } from 'zustand';

export const useTranscationsStore = create((set) => ({
  transactions: [],
  setTransactions: (transactions: []) => set({ transactions })
}));
