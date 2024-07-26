import { create } from 'zustand';

export const useConsoleDataStore = create((set) => ({
  allUsers: [],
  allTransactions: [],
  setAllUsers: (allUsers: any[]) => set({ allUsers }),
  setAllTransactions: (allTransactions: any[]) => set({ allTransactions })
}));
