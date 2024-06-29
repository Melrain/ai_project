import { create } from 'zustand';

export const useTxStore = create((set) => ({
  tx: [],
  addTx: (transaction: any) => set((state: { tx: any }) => ({ tx: [...state.tx, transaction] }))
}));
