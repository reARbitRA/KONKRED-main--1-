import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-void': '#000000',
        'bg-primary': '#020202',
        'bg-secondary': '#0a0a0a',
        'bg-tertiary': '#0f0f0f',
        'bg-elevated': '#141414',
        'bg-surface': '#1a1a1a',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0a0',
        'text-tertiary': '#606060',
        'text-muted': '#404040',
        'accent-red': '#ff2a2a',
        'accent-red-bright': '#ff4444',
        'accent-orange': '#ff6b00',
        'accent-gold': '#d4a012',
        'accent-cyan': '#00f0ff',
        'accent-green': '#00ff41',
        'border-primary': '#2a2a2a',
        'border-secondary': '#1f1f1f',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;