import {render} from '@testing-library/react-native';
import React from 'react';
import {ThemeProvider} from '../theme/ThemeContext';

export const customRender = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};
