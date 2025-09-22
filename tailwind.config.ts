import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: () => {
        const widths: Record<string, string> = {};
        for (let i = 1; i <= 16; i++) {
          widths[`${i}/16`] = `${(i / 16) * 100}%`;
        }
        return widths;
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        rublik: ["Rubik", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        inter: ["Inter", "sans-serif"],
        sarabun: ["Sarabun", "sans-serif"],
        prompt: ["Prompt", "sans-serif"],
        prompt_Light: ["Prompt-Light", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "20%": {
            transform: "translate(60px,-40px) scale(1.12) rotate(4deg)",
          },
          "40%": {
            transform: "translate(-40px,70px) scale(0.92) rotate(-6deg)",
          },
          "60%": { transform: "translate(50px,30px) scale(1.06) rotate(2deg)" },
          "80%": {
            transform: "translate(-30px,-60px) scale(0.98) rotate(-3deg)",
          },
          "100%": { transform: "translate(0,0) scale(1) rotate(0deg)" },
        },
        pulseOpacity: {
          "0%,100%": { opacity: "0.45" },
          "50%": { opacity: "0.7" },
        },
        bgShift: {
          "0%,100%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
        },
      },
      animation: {
        blobFast: "blob 14s ease-in-out infinite",
        blob: "blob 20s ease-in-out infinite",
        blobSlow: "blob 28s ease-in-out infinite",
        pulseOpacity: "pulseOpacity 12s ease-in-out infinite",
        bgShift: "bgShift 30s ease-in-out infinite",
         "blob-22-pulse-12": "blob 22s ease-in-out infinite, pulseOpacity 12s ease-in-out infinite",
        "blob-26-pulse-15": "blob 26s ease-in-out infinite, pulseOpacity 15s ease-in-out infinite",
        "blob-30-pulse-18": "blob 30s ease-in-out infinite, pulseOpacity 18s ease-in-out infinite",
        "blob-19-pulse-10": "blob 19s ease-in-out infinite, pulseOpacity 10s ease-in-out infinite",
      },
      backgroundImage: {
        authBg: "/images/obac_view.jpg",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
