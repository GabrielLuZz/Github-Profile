import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          gray: {
            DEFAULT: "hsl(var(--gray))",
            "100": "hsl(var(--gray-100))",
            "200": "hsl(var(--gray-200))",
            "300": "hsl(var(--gray-300))",
            "400": "hsl(var(--gray-400))",
          },
          primary: {
            DEFAULT: "hsl(var(--primary))",
            dark: "hsl(var(--primary-dark))",
          },
          white: "hsl(var(--white))",
          black: "hsl(var(--black))",
          border: "hsl(var(--border))",
        },
      },
      fontFamily: {
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
