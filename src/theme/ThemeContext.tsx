import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  DefaultTheme,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components/native';
import { darkTheme, lightTheme } from '.';

export type ThemeContextType = {
  theme: DefaultTheme;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const contextValue = useMemo(
    () => ({ theme, isDarkMode, toggleTheme }),
    [theme, isDarkMode],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvide~r');
  }
  return context;
};
