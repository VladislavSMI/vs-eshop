const animations = {
  animation: {
    wobble: 'wobble 0.5s ease-in-out',
    fadeIn: 'fadeIn 1s ease-out',
    carousel: 'scrollX 60s linear infinite',
    blink: 'blink 1.4s both infinite',
    breathing: 'breathing 1.5s ease-in-out infinite',
    heartBeat: 'heartBeat 1.2s ease-in-out infinite',
    bouncing: 'bouncing 1s ease-in-out infinite',
    sliding: 'sliding 1.5s ease-in-out forwards',
    completeBorder:
      'drawTopAndRight 1s linear forwards, drawBottomAndLeft 1s linear 0.3s forwards',
  },
  keyframes: {
    wobble: {
      '0%, 100%': { transform: 'rotate(0deg)' },
      '25%': { transform: 'rotate(-3deg)' },
      '75%': { transform: 'rotate(3deg)' },
    },
    fadeIn: {
      from: { opacity: '0' },
      to: { opacity: '1' },
    },
    scrollX: {
      '0%': { transform: 'translateX(0%)' },
      '100%': { transform: 'translateX(-100%)' },
    },
    blink: {
      '0%': { opacity: '0.2' },
      '20%': { opacity: '1' },
      '100%': { opacity: '0.2' },
    },
    breathing: {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.1)' },
      '100%': { transform: 'scale(1)' },
    },
    heartBeat: {
      '0%': { transform: 'scale(1)' },
      '14%': { transform: 'scale(1.1)' },
      '28%': { transform: 'scale(1)' },
      '42%': { transform: 'scale(1.1)' },
      '70%': { transform: 'scale(1)' },
    },
    bouncing: {
      '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
      '40%': { transform: 'translateY(-4px)' },
      '60%': { transform: 'translateY(-2px)' },
    },
    sliding: {
      '0%': {
        transform: 'skewX(50deg) translateX(500px)',
        opacity: '0',
      },
      '60%': {
        transform: 'translateX(0px)',
      },
      '70%': {
        transform: 'skewX(0deg) translateX(30px)',
      },
      '80%': {
        transform: 'translate(0)',
      },
      '90%': {
        transform: 'skew(-5deg)',
      },
      '100%': {
        transform: 'skew(0deg)',
      },
    },
    drawTopAndRight: {
      '0%': {
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopWidth: '0',
        borderRightWidth: '0',
      },
      '50%': {
        borderTopColor: 'currentColor',
        borderRightColor: 'currentColor',
        borderTopWidth: '2px',
        borderRightWidth: '2px',
      },
      '100%': {
        borderTopColor: 'currentColor',
        borderRightColor: 'currentColor',
        borderTopWidth: '2px',
        borderRightWidth: '2px',
      },
    },
    drawBottomAndLeft: {
      '0%': {
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderBottomWidth: '0',
        borderLeftWidth: '0',
      },
      '50%': {
        borderBottomColor: 'currentColor',
        borderLeftColor: 'currentColor',
        borderBottomWidth: '2px',
        borderLeftWidth: '2px',
      },
      '100%': {
        borderBottomColor: 'currentColor',
        borderLeftColor: 'currentColor',
        borderBottomWidth: '2px',
        borderLeftWidth: '2px',
      },
    },
  },
};

export default animations;
