import { Injectable, signal, effect } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    isDarkMode = signal<boolean>(false);

    constructor() {
        // Load theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

        this.isDarkMode.set(initialDark);

        // Apply theme whenever it changes
        effect(() => {
            const isDark = this.isDarkMode();
            if (isDark) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    toggleTheme() {
        this.isDarkMode.update((value) => !value);
    }

    setDarkMode(isDark: boolean) {
        this.isDarkMode.set(isDark);
    }
}
