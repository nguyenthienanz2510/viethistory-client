/**
 * @type {import('tailwindcss').Config}
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */

module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './public/**/*.html',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1440px'
      },
      padding: {
        DEFAULT: '15px',
        sm: '0'
      }
    },
    extend: {
      colors: {
        'color-primary': '#38BDF8',
        'color-secondary': '#EC4899',
        'color-third': '#3B82F6',

        'color-text-default': '#94A3B8',
        'color-text-primary': '#E2E8F0',
        'color-text-dark': '#333333',
        'color-bg-default': '#10172a',
        'color-bg-hover': '#161f32',

        'color-white': '#ffffff',
        'color-black': '#000000',
        'color-success': '#03a66d',
        'color-info': '#17a2b8',
        'color-warning': '#ffc107',
        'color-danger': '#cf304a',

        'color-border-primary': '#c1c1c1'
      },
      fontSize: {
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
        22: '22px',
        24: '24px',
        26: '26px',
        28: '28px',
        30: '30px',
        32: '32px',
        34: '34px',
        36: '36px',
        38: '38px',
        40: '40px'
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}
