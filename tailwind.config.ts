import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        fontSize: {
            '8xl': "clamp(3.125rem, -0.7813rem + 12.5vw, 6.25rem)",
            '7xl': "clamp(3.125rem, 0rem + 10vw, 5.625rem)",
            '6xl': "clamp(2.8125rem, 0.0781rem + 8.75vw, 5rem)",
            '5xl': "clamp(2.5rem, 0.1563rem + 7.5vw, 4.375rem)",
            '4xl': "clamp(2.1875rem, 0.2344rem + 6.25vw, 3.75rem)",
            '3xl': "clamp(1.75rem, 0.0313rem + 5.5vw, 3.125rem)",
            '2xl': "clamp(1.5rem, 0.25rem + 4vw, 2.5rem)",
        },
    },
  },
  plugins: [],
}
export default config
