// ============================================
// Design Tokens — AnswerST
// ============================================

// --- Color Scales ---
export const colors = {
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#04268c',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#31bf2c',
    600: '#2aa626',
    700: '#166534',
    800: '#14532d',
    900: '#052e16',
    950: '#021a0a',
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
} as const;

// --- Semantic Tokens ---
export const semanticColors = {
  light: {
    background: '#ffffff',
    foreground: '#0f172a',
    surface: '#f8fafc',
    'surface-hover': '#f1f5f9',
    primary: '#04268c',
    'primary-foreground': '#ffffff',
    secondary: '#31bf2c',
    'secondary-foreground': '#ffffff',
    accent: '#1e3a8a',
    muted: '#f1f5f9',
    'muted-foreground': '#64748b',
    border: '#e2e8f0',
    ring: '#31bf2c',
    card: '#ffffff',
    'card-foreground': '#0f172a',
  },
  dark: {
    background: '#020617',
    foreground: '#f8fafc',
    surface: '#0f172a',
    'surface-hover': '#1e293b',
    primary: '#60a5fa',
    'primary-foreground': '#020617',
    secondary: '#4ade80',
    'secondary-foreground': '#020617',
    accent: '#3b82f6',
    muted: '#1e293b',
    'muted-foreground': '#94a3b8',
    border: '#1e293b',
    ring: '#4ade80',
    card: '#0f172a',
    'card-foreground': '#f8fafc',
  },
} as const;

// --- Typography ---
export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, sans-serif',
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
    sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.0125em' }],
    base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
    lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0' }],
    xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.0125em' }],
    '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.0125em' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em' }],
    '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.0375em' }],
  },
} as const;

// --- Spacing (4px-based) ---
export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
} as const;

// --- Border Radius ---
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

// --- Shadows ---
export const shadows = {
  light: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(49, 191, 44, 0.3)',
    'glow-blue': '0 0 20px rgba(4, 38, 140, 0.3)',
  },
  dark: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    glow: '0 0 20px rgba(74, 222, 128, 0.2)',
    'glow-blue': '0 0 20px rgba(96, 165, 250, 0.2)',
  },
} as const;

// --- Transitions ---
export const transitions = {
  DEFAULT: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  colors: 'color 0.3s ease-in-out, background-color 0.3s ease-in-out, border-color 0.3s ease-in-out',
} as const;

// --- Z-Index ---
export const zIndex = {
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  overlay: 400,
  modal: 500,
  popover: 600,
  toast: 700,
  tooltip: 800,
} as const;
