import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#4DC591", // primary-1
          2: "#6BCFA4", // primary-2
          3: "#B6E7D2", // primary-3
          4: "#EDF9F4", // primary-4
        },
        // Secondary colors
        secondary: {
          1: "#181B20", // secondary-1
          2: "#3F4246", // secondary-2
          3: "#B6E7D2", // secondary-3
          4: "#EDF9F4", // secondary-4
        },
        // Other specific colors
        blue: "#0072F5", // #0072F5
        green: "#0F9549", // #0F9549
        red: "#EF4444", // #EF4444
        orange: "#F5A524", // #F5A524
        dark: "#16181A", // #16181A
        gray: "#A3A3A3",
        light_gray: "#F4F4F4", // #A3A3A3
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
      },
      fontFamily: {
        jakarta: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      height: {
        "300px": "300px",
        "500px": "500px",
        sidebar: "calc(100vh - 32px)",
      },

      container: {
        center: true,
        padding: "2rem",
        screens: {
          sm: "576px",
          "sm-max": {
            max: "576px",
          },
          md: "768px",
          "md-max": {
            max: "768px",
          },
          lg: "992px",
          "lg-max": {
            max: "992px",
          },
          xl: "1200px",
          "xl-max": {
            max: "1200px",
          },
          "2xl": "1320px",
          "2xl-max": {
            max: "1320px",
          },
          "3xl": "1600px",
          "3xl-max": {
            max: "1600px",
          },
          "4xl": "1850px",
          "4xl-max": {
            max: "1850px",
          },
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
