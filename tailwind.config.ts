import { transform } from "next/dist/build/swc";
import { blob } from "stream/consumers";
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blob:{
          '0%':{
            transform : "translate(0px,0px) scale(1)"
          },
          "33%": {
            transform:"translate(30px,-50px) scale(1.2)"
          },
          "66%" :{
            transform :"translate(-20px,20px) scale(0.8)",
          },
          "100%":{
            transform : "translate(0px,0px) scale(1)",
          }
        },
        blob2:{
          '0%':{
            transform : "translate(0px,0px) scale(1)"
          },
          "33%": {
            transform:"translate(10px,-18px) scale(1.2)"
          },
          "66%" :{
            transform :"translate(-7px,7px) scale(0.8)",
          },
          "100%":{
            transform : "translate(0px,0px) scale(1)",
          }
        },
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out',
        fastFade : 'fadeIn 1s ease-in-out',
        fadeStep1: 'fadeIn 3s ease-in-out',
        fadeStep2: 'fadeIn 4s ease-in-out',
        blob:"blob 7s infinite",
      },
      backgroundImage:{
        authBg:"url(https://lh3.googleusercontent.com/p/AF1QipOm1uKGkk3eh_TFYYireSIS-i5fZzfPfnAfQKNz=s1360-w1360-h1020)"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
