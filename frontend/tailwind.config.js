module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/JSX files in the src folder
  ],
  theme: {
    extend: {}, // Extend Tailwind's default theme here if needed
  },
  plugins: [require("@tailwindcss/typography")],
};
