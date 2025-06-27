import { render, RenderOptions } from '@testing-library/react-native';
import React, { ReactElement } from 'react';
import { ThemeProvider } from '../theme/ThemeContext';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {
  wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
  ...options,
});

export * from '@testing-library/react-native'; // re-export everything
export { customRender as render }; // override the default render
