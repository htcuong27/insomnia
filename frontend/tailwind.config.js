/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                bg: '#0f0f13',
                surface: {
                    DEFAULT: '#18181b',
                    hover: '#27272a',
                },
                primary: {
                    DEFAULT: '#6366f1',
                    hover: '#4f46e5',
                },
                text: {
                    DEFAULT: '#f4f4f5',
                    muted: '#a1a1aa',
                },
                border: '#27272a',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
