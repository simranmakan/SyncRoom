/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 🌙 This enables dark mode toggling
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all project files
  ],
  theme: {
    extend: {
      colors: {
        // Base colors using CSS variables
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Custom theme colors
        primary: {
          DEFAULT: "#d946ef", // Pink / Purple
          dark: "#a21caf",
        },
        secondary: {
          DEFAULT: "#3b82f6", // Blue
          dark: "#1e3a8a",
        },
      },
    },
  },
  plugins: [],
};
