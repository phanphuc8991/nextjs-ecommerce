import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vercel: "#0070F3",
      },
    },
  },
  plugins: [],
};

export default config;
