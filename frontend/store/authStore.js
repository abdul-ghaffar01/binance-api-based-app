import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,

      // ✅ Set token & user after login
      login: (token, user) => set({ token, user }),

      // ✅ Logout (clear auth state)
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage", // Key for localStorage
      getStorage: () => localStorage, // Use localStorage
    }
  )
);

export default useAuthStore;
