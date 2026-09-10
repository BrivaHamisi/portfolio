/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#08090a',
        carbon: '#0f1011',
        obsidian: '#161718',
        graphite: '#23252a',
        smoke: '#383b3f',
        ash: '#62666d',
        fog: '#8a8f98',
        mist: '#d0d6e0',
        bone: '#e5e5e6',
        paper: '#ffffff',
        'acid-lime': '#e4f222',
        'pulse-green': '#27a644',
        'coral-red': '#eb5757',
        'signal-teal': '#02b8cc',
        'iris-violet': '#6366f1',
        lavender: '#8b5cf6',
      },
      fontFamily: {
        sans: [
          'Inter Variable',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        caption: ['13px', { lineHeight: '1.2' }],
        'body-sm': ['15px', { lineHeight: '1.6', letterSpacing: '-0.165px' }],
        'body-lg': ['20px', { lineHeight: '1.33', letterSpacing: '-0.24px' }],
        subheading: ['24px', { lineHeight: '1.33', letterSpacing: '-0.288px' }],
        'heading-sm': ['32px', { lineHeight: '1.13', letterSpacing: '-0.704px' }],
        heading: ['48px', { lineHeight: '1', letterSpacing: '-1.056px' }],
        'heading-lg': ['64px', { lineHeight: '1', letterSpacing: '-1.408px' }],
        display: ['72px', { lineHeight: '1', letterSpacing: '-1.584px' }],
      },
      boxShadow: {
