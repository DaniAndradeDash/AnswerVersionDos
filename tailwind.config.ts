import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,html}", // Ajusta según tu estructura de carpetas
    ],
    theme: {
        extend: {
            animation: {
                'fade-in-up': 'fadeInUp 1s ease-out',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}

export default config
