import { create } from "zustand";

export const useTradeStore = create((set) => ({
  trades: [],
  isConnected: false,

  addTrade: (trade) =>
    set((state) => ({
      trades: [trade, ...state.trades.slice(0, 49)], // Keep only the latest 50 trades
    })),

  setConnected: (status) => set({ isConnected: status }),
}));
