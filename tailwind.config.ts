import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    
    // Include passport-ui source files for class scanning
    './node_modules/passport-ui/src/**/*.{js,ts,jsx,tsx}',
    './node_modules/passport-ui/dist/**/*.{js,mjs}',
  ],
} satisfies Config
