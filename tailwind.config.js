/** @type {import('tailwindcss').Config} */
// Colours are the exact hex values from the Armal Visual Identity guide (page 6).
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        alizarin: { DEFAULT: '#DB232E', light: '#ED7E8A', dark: '#961522', darker: '#51060D' },
        revolver: { DEFAULT: '#38383A', light: '#575760', lighter: '#88889E', dark: '#151516' },
        manatee: { DEFAULT: '#939598', light: '#9AA3AF', dark: '#5A5F68', darker: '#2E353F' },
        snow: { DEFAULT: '#FFFFFF', dark: '#D1D2D2', darker: '#B1B3B4', darkest: '#87898C' },
      },
      fontFamily: { sans: ['Fustat', 'system-ui', 'sans-serif'] },
      maxWidth: { site: '1320px' },
    },
  },
  plugins: [],
}
