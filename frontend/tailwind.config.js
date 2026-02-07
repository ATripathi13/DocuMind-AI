/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E293B",
          light: "#334155",
          dark: "#0F172A",
        },
        accent: {
          DEFAULT: "#22D3EE",
          hover: "#06B6D4",
        },
        success: "#10B981",
        error: "#F43F5E",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
