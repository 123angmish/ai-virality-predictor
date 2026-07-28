/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          500: '#635BFF',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#1E1B4B',
        },
        navy: {
          900: '#111827',
          800: '#1F2937',
          700: '#374151',
        },
        coral: {
          500: '#FF7A59',
          600: '#F05833',
        },
        emerald: {
          500: '#17A673',
          600: '#0F875B',
        },
        amber: {
          500: '#F5A524',
        },
        rose: {
          500: '#E5484D',
        },
        slate: {
          50: '#F7F8FC',
          100: '#F1F3F9',
          200: '#E6E8F0',
          300: '#D1D5E3',
          400: '#9DA4B9',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#1D2939',
          900: '#101828',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(16, 24, 40, 0.05), 0 1px 2px -1px rgba(16, 24, 40, 0.05)',
        'card': '0 4px 20px -2px rgba(99, 91, 255, 0.06), 0 2px 6px -1px rgba(16, 24, 40, 0.03)',
        'elevated': '0 12px 32px -4px rgba(16, 24, 40, 0.08), 0 4px 12px -2px rgba(16, 24, 40, 0.03)',
      }
    },
  },
  plugins: [],
}
