import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        bg1: '#508bfc',
        bg2:'#dd4b39',
        bg3:'#3b5998',

        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')({
      datatables: true,
  }),
  ],
} satisfies Config;

