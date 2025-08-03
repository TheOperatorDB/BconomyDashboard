/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      backgroundColor: {
        "table-hover": {
          light: "#f9fafb", // gray-50
          dark: "#374151", // gray-700
        },
        card: {
          light: "#ffffff",
          dark: "#1f2937", // gray-800
        },
        surface: {
          light: "#f9fafb", // gray-50
          dark: "#374151", // gray-900
        },
        error: {
          light: "#fef2f2", // red-50
          dark: "#7f1d1d", // red-900
        },
      },
      textColor: {
        "table-primary": {
          light: "#374151", // gray-700
          dark: "#e5e7eb", // gray-200
        },
        "table-secondary": {
          light: "#6b7280", // gray-500
          dark: "#9ca3af", // gray-400
        },
        "content-primary": {
          light: "#111827", // gray-900
          dark: "#f9fafb", // gray-50
        },
        "content-secondary": {
          light: "#4b5563", // gray-600
          dark: "#9ca3af", // gray-400
        },
        badge: {
          purple: {
            light: "#7e22ce", // purple-700
            dark: "#e9d5ff", // purple-200
          },
          blue: {
            light: "#1d4ed8", // blue-700
            dark: "#bfdbfe", // blue-200
          },
          green: {
            light: "#15803d", // green-700
            dark: "#bbf7d0", // green-200
          },
          yellow: {
            light: "#a16207", // yellow-700
            dark: "#fef08a", // yellow-200
          },
          orange: {
            light: "#c2410c", // orange-700
            dark: "#ffedd5", // orange-200
          },
        },
      },
      borderColor: {
        "table-border": {
          light: "#e5e7eb", // gray-200
          dark: "#374151", // gray-700
        },
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        body: {
          backgroundColor: "white",
          color: "#111827",
          transitionProperty:
            "background-color, border-color, color, fill, stroke",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDuration: "200ms",
        },
        ".dark body": {
          backgroundColor: "#111827",
          color: "#f3f4f6",
        },
      });
    },
  ],
};
