import {DefaultTheme} from 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      primary: string;
      card: string;
      border: string;
      white: string;
      black: string;
      divider: string;
      textPrimary: string;
      textSecondary: string;
      notification?: string;
      error?: string;
      success?: string;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl?: number; // Optional extra spacing
    };
    fontSize: {
      xs: number;
      sm: number;
      base: number;
      md: number;
      lg: number;
      xl: number;
      xxl?: number;
    };
    borderRadius?: {
      // Optional for consistent border radii
      sm: number;
      md: number;
      lg: number;
    };
  }
}

// 2. Create shared constants for values used in both themes
const SHARED_SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const SHARED_FONT_SIZES = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 20,
  xl: 24,
};

const SHARED_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
};

// 3. Light theme configuration
export const lightTheme: DefaultTheme = {
  colors: {
    background: '#FFFFFF',
    primary: '#007AFF',
    text: '#000000',
    card: '#F2F2F2',
    border: '#DCDCDC',
    white: '#FFFFFF',
    black: '#000000',
    divider: '#DCDCDC',
    error: '#FF3B30',
    success: '#34C759',
    textPrimary: '#000000',
    textSecondary: '#666666',
  },
  spacing: SHARED_SPACING,
  fontSize: SHARED_FONT_SIZES,
  borderRadius: SHARED_RADIUS,
};

// 4. Dark theme configuration
export const darkTheme: DefaultTheme = {
  colors: {
    background: '#000000',
    primary: '#0A84FF',
    text: '#FFFFFF',
    card: '#1C1C1E',
    border: '#3A3A3C',
    white: '#000000',
    black: '#FFFFFF',
    divider: '#3A3A3C',
    error: '#FF453A',
    success: '#30D158',
    textPrimary: '#FFFFFF',
    textSecondary: '#B3B3B3',
  },
  spacing: SHARED_SPACING,
  fontSize: SHARED_FONT_SIZES,
  borderRadius: SHARED_RADIUS,
};
