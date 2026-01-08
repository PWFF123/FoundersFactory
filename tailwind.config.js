/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Founders Factory brand colors
        ffBlack: '#121212',
        ffYellow: '#f4db42',
        ffGreen: '#1b5e20',

        // Stripe-inspired refined color palette
        slate: {
          50: '#f6f9fc',
          100: '#e7ecf1',
          200: '#cbd6e0',
          300: '#adbdcc',
          400: '#8792a2',
          500: '#697386',
          600: '#425466',
          700: '#3c4257',
          800: '#1a1f36',
          900: '#0a2540',
        },
        primary: {
          50: '#f0f4ff',
          100: '#e5edff',
          200: '#cdd9ff',
          300: '#a6c1ff',
          400: '#7a9eff',
          500: '#635bff', // Stripe blurple
          600: '#5649cc',
          700: '#4839a3',
          800: '#3b2f7d',
          900: '#2e2359',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],     // 11px
        'xs': ['0.8125rem', { lineHeight: '1.25rem' }],   // 13px
        'sm': ['0.875rem', { lineHeight: '1.5rem' }],     // 14px
        'base': ['0.9375rem', { lineHeight: '1.625rem' }], // 15px
        'lg': ['1.0625rem', { lineHeight: '1.75rem' }],   // 17px
        'xl': ['1.25rem', { lineHeight: '1.875rem' }],    // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px
        '3xl': ['1.875rem', { lineHeight: '2.375rem' }],  // 30px
        '4xl': ['2.375rem', { lineHeight: '2.875rem' }],  // 38px
        '5xl': ['3rem', { lineHeight: '3.5rem' }],        // 48px
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 2px 5px -1px rgba(50, 50, 93, 0.25), 0 1px 3px -1px rgba(0, 0, 0, 0.3)',
        'md': '0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3)',
        'lg': '0 30px 60px -12px rgba(50, 50, 93, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3)',
        'xl': '0 50px 100px -20px rgba(50, 50, 93, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.3)',
      },
      borderRadius: {
        'sm': '0.25rem',    // 4px
        'DEFAULT': '0.5rem', // 8px
        'md': '0.5rem',     // 8px
        'lg': '0.75rem',    // 12px
        'xl': '1rem',       // 16px
        '2xl': '1.5rem',    // 24px
      },
      transitionDuration: {
        '150': '150ms',
      },
      transitionTimingFunction: {
        'stripe': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
