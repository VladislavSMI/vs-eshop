import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import animations from './styles/animations';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.css',
  ],
  theme: {
    extend: {
      animation: animations.animation,
      keyframes: animations.keyframes,
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        vsShopDark: {
          primary: '#FFD800', // School bus yellow
          'primary-content': '#000000', // Black (content on primary background)
          secondary: '#1e1e1d', // Dark Gray (supportive secondary elements)
          'secondary-content': '#E0E0E0', // Light Gray (content on secondary background)
          accent: '#A6A6A6', // Highlight color for interactive or focus elements
          'accent-content': '#2C2C2C', // Dark Gray (content on accent background)
          neutral: '#121212', // Neutral background for subdued or secondary elements
          'neutral-content': '#E0E0E0', // Content on neutral backgrounds
          'base-100': '#000000', // Pure black background
          'base-content': '#FFD800', // School buss yellow (content on pure black background)
          info: '#A6A6A6', // Medium Gray (general information highlights)
          success: '#4CAF50', // Green (success feedback)
          warning: '#FFC107', // Yellow-orange (warning feedback)
          error: '#F44336', // Red (error feedback)
        },
      },
    ],
  },
};
export default config;
