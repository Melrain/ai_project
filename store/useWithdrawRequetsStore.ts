import { create } from 'zustand';

export const useWithdrawRequestsStore = create((set) => ({
  withdrawRequests: [],
  setWithdrawRequests: (withdrawRequests: any) => set({ withdrawRequests })
}));
