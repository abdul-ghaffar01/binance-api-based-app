import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: typeof window !== "undefined" ? localStorage.getItem("theme") || "dark" : "dark",

    setTheme: (newTheme) => {
        localStorage.setItem("theme", newTheme);
        set({ theme: newTheme });
    },

    toggleTheme: () => {
        set((state) => {
            const newTheme = state.theme === "dark" ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            return { theme: newTheme };
        });
    },
}));
