import { create } from 'zustand';

export const useTxStore = create((set) => ({
  tx: [{ type: 'topup', amount: 0, status: 'pending', date: '2021-09-01T00:00:00.000Z' }],
  setTx: (tx: []) => set({ tx })
}));
