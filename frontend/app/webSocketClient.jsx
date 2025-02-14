'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggleComponent() {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark';
        }
        return false;
    });


    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <div className="bg-box border border-border p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold text-primary">Theme Toggle</h1>
                <p className="mt-2 text-secondary">Switch between light and dark mode</p>
                <button
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
            </div>
        </div>
    );
}
