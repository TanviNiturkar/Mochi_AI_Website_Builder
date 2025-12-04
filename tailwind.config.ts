/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}", // ⭐ makes global.css work
    "./**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        denim: "var(--denim)",
        pistachio: "var(--pistachio)",
        cactus: "var(--cactus)",
        sand: "var(--sand)",
        terracotta: "var(--terracotta)",
        creamsicle: "var(--creamsicle)",

        // ⭐ VERY IMPORTANT:
        input: "var(--sand)", // bg-input now works
      },

      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },

  plugins: ["@tailwindcss/postcss"],
};

export default config;
