"use client";

import { useThemeStore } from "@/store/themeStore";

export function ThemeProvider({ children }) {
    const { theme } = useThemeStore();

    return (
        <html lang="en" className={theme}>
            <body>{children}</body>
        </html>
    );
}
