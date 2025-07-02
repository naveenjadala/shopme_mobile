import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useTheme } from '../theme/ThemeContext';

const SafeAreaViewStyled = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

/**
 * A convenience component that wraps a given component with
 * a `SafeAreaProvider` and a `SafeAreaView` with the `top` edge.
 * Additionally, it sets the status bar's background color to the
 * current theme's background color and sets the bar style to "light-content".
 */
const SafeView = ({ children }: { children: React.ReactNode }) => {
  const { theme, isDarkMode } = useTheme();
  return (
    <SafeAreaProvider>
      <SafeAreaViewStyled edges={['top']}>
        <StatusBar
          backgroundColor={theme.colors.background}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        {children}
      </SafeAreaViewStyled>
    </SafeAreaProvider>
  );
};

export default SafeView;
