import React from 'react';
import {Provider} from 'react-redux';
import ErrorBoundary from './src/components/ErrorBoundary';
import {AuthProvider} from './src/context/AuthProvider';
import AppNavigator from './src/navigation/AppNavigator';
import {store} from './src/store';
import {ThemeProvider} from './src/theme/ThemeContext';
const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <ThemeProvider>
            <AppNavigator />
          </ThemeProvider>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
