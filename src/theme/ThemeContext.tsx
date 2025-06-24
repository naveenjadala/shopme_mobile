import {createContext, useContext, useState} from 'react';
import {
  DefaultTheme,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components/native';
import {darkTheme, lightTheme} from '../theme';

export type ThemeContextType = {
  theme: DefaultTheme;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider wraps the `StyledThemeProvider` and provides the theme and
 * other theme-related values to the components via the `ThemeContext`.
 *
 * It also provides a `toggleTheme` function which can be used to switch
 * between light and dark themes.
 *
 * @param children The children components that should receive the theme.
 */
export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{theme, isDarkMode, toggleTheme}}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access the theme context. It returns the current theme, the boolean
 * value of whether the app is in dark mode, and a function to toggle between
 * light and dark mode.
 *
 * @throws {Error} If the hook is used outside of a ThemeProvider
 *
 * @returns {{theme: DefaultTheme, isDarkMode: boolean, toggleTheme: () => void}}
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
