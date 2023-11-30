import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('../public/hero-image-github-profile.png')",
      },
      colors: {
        "ebony-clay": "rgb(32 41 58 / <alpha-value>)",
        ebony: "rgb(17 23 41 / <alpha-value>)",
        "gull-gray": "rgb(151 162 181 / <alpha-value>)",
        geyser: "rgb(205 213 224 / <alpha-value>)",
        "port-gore": "rgb(29 27 72 / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
