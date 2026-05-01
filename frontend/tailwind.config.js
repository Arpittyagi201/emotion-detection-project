/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: "#6366F1", // Indigo-500
        secondary: "#8B5CF6", // Violet-500
        darkBg: "#09090b", // zinc-950
        cardBg: "#18181b", // zinc-900
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        glow: "0 0 20px rgba(99, 102, 241, 0.4)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }
    }
  },
  plugins: []
};
