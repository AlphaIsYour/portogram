/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Ini penting!
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ... ekstensi tema lainnya
      colors: {
        // Definisikan warna kustom untuk light/dark mode jika perlu
        primary: {
          light: "#3b82f6", // blue-500
          DEFAULT: "#2563eb", // blue-600
          dark: "#1d4ed8", // blue-700
        },
        secondary: {
          light: "#6b7280", // gray-500
          DEFAULT: "#374151", // gray-700
          dark: "#1f2937", // gray-800
        },
        background: {
          light: "#ffffff", // white
          DEFAULT: "#f9fafb", // gray-50
          dark: "#111827", // gray-900
        },
        text: {
          light: "#1f2937", // gray-800
          DEFAULT: "#374151", // gray-700
          dark: "#e5e7eb", // gray-200
        },
        card: {
          light: "#ffffff",
          DEFAULT: "#ffffff",
          dark: "#1f2937", // gray-800
        },
        border: {
          light: "#e5e7eb", // gray-200
          DEFAULT: "#d1d5db", // gray-300
          dark: "#374151", // gray-700
        },
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "80%" }, // Sesuaikan target width
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
        progress: "progress 1.5s ease-out forwards",
      },
      backgroundImage: {
        "shimmer-gradient":
          "linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)", // Dark mode shimmer base
        "shimmer-gradient-light":
          "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.05) 50%, transparent 100%)", // Light mode shimmer base
      },
    },
  },
  plugins: [],
};
