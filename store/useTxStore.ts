import { create } from 'zustand';

export const useTxStore = create((set) => ({
  tx: {},
  setTx: (tx: {}) => set({ tx })
}));
