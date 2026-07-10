/**
 * CrazySort brand and gameplay color palette.
 * Original palette — not derived from any existing game.
 */

/** @type {Record<string, string>} */
export const LIQUID_COLORS = {
  ruby: '#E74C6C',
  amber: '#F5A623',
  emerald: '#2ECC87',
  sapphire: '#4A9EFF',
  amethyst: '#9B59F5',
  coral: '#FF7F66',
  citrine: '#F9D56E',
  teal: '#1ABC9C',
};

/** Ordered list of liquid color keys for level data. */
export const LIQUID_COLOR_KEYS = Object.keys(LIQUID_COLORS);

/** @type {Record<string, string>} */
export const THEME = {
  background: '#1A1B2E',
  backgroundGradientEnd: '#252742',
  surface: '#2D2E45',
  surfaceLight: '#3A3B58',
  primary: '#7B5CFA',
  primaryLight: '#9B7FFF',
  secondary: '#4ECDC4',
  accent: '#FF6B9D',
  text: '#F4F4F8',
  textMuted: '#A0A3BD',
  textDark: '#1A1B2E',
  success: '#2ECC87',
  warning: '#F5A623',
  error: '#E74C6C',
  jarGlass: 'rgba(255, 255, 255, 0.12)',
  jarBorder: 'rgba(255, 255, 255, 0.35)',
  jarHighlight: 'rgba(255, 255, 255, 0.55)',
  jarSelected: '#7B5CFA',
  jarShadow: 'rgba(0, 0, 0, 0.35)',
};
