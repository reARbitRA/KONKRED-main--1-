/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Industrial control panel colors
        primary: '#050608',
        secondary: '#101218',
        tertiary: '#151821',
        'text-primary': '#f5f5f5',
        'text-secondary': '#a5a8b5',
        'accent-red': '#ff2c40',
        'accent-gold': '#d8a14d',
        border: '#262a35',
        'border-glow': '#ff2c4033',
        'panel-bg': 'linear-gradient(135deg, #101218 0%, #151821 100%)',
        'terminal-green': '#00ff41',
        'led-red': '#ff0000',
        'led-amber': '#ff9900',
        'led-green': '#00ff00',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      borderRadius: {
        'panel': '8px',
        'button': '4px',
        'card': '6px',
      },
      boxShadow: {
        'glow-red': '0 0 20px rgba(255, 44, 64, 0.5)',
        'glow-gold': '0 0 20px rgba(216, 161, 77, 0.3)',
        'panel': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'panel': 'linear-gradient(135deg, #101218 0%, #151821 100%)',
        'scan-line': 'linear-gradient(180deg, transparent 50%, rgba(255, 44, 64, 0.1) 50%)',
        'glow-line': 'linear-gradient(90deg, transparent, #ff2c40, transparent)',
      },
      animation: {
        'scan': 'scan 8s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'led-blink': 'ledBlink 2s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 44, 64, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 44, 64, 0.8)' },
        },
        ledBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      backdropBlur: {
        'panel': '8px',
      },
    },
  },
  plugins: [],
}