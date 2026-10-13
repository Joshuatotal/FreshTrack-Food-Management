import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,jsx}',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                script: ['Caveat', 'cursive'],
            },
            colors: {
                forest: {
                    50: '#F0FDF4',
                    100: '#E6F4EA',
                    200: '#BBF7D0',
                    300: '#86EFAC',
                    400: '#34D399',
                    500: '#10B981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065F46',
                },
                coral: {
                    100: '#FFEDD5',
                    500: '#F97316',
                    600: '#EA580C',
                },
            },
            boxShadow: {
                soft: '0 10px 40px -10px rgba(5, 150, 105, 0.25)',
                card: '0 4px 20px rgba(15, 23, 42, 0.06)',
            },
            keyframes: {
                floaty: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                grow: {
                    from: { transform: 'scaleY(0)' },
                    to: { transform: 'scaleY(1)' },
                },
                floatySm: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
                toastIn: {
                    from: { opacity: '0', transform: 'translateY(-10px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                toastOut: {
                    from: { opacity: '1', transform: 'translateY(0)' },
                    to: { opacity: '0', transform: 'translateY(-10px)' },
                },
            },
            animation: {
                floaty: 'floaty 4s ease-in-out infinite',
                grow: 'grow 1.4s ease-out forwards',
                'floaty-sm': 'floatySm 4s ease-in-out infinite',
                toast: 'toastIn 0.3s ease-out forwards, toastOut 0.3s ease-in 2.7s forwards',
            },
        },
    },

    plugins: [forms],
};
