import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        "8.2": "2.15rem"
      }
    },
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: ["lemonade", "forest", "coffee"]
  }
}

