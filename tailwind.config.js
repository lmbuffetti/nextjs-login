module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          100: '#1f2937',
          200: '#444e5e',
          300: '#6d7788',
          400: '#98a2b4',
          500: '#c5d0e3',
        },
      },
    },
  },
  plugins: [],
}
