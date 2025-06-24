import React from 'react';
import {Provider} from 'react-redux';

import ErrorBoundary from './src/components/ErrorBoundary';
import SafeView from './src/components/SafeView';
import {AuthProvider} from './src/context/AuthProvider';
import AppNavigator from './src/navigation/AppNavigator';
import {store} from './src/store';
import {ThemeProvider} from './src/theme/ThemeContext';

/**
 * The main application component that sets up the global providers
 * and navigation for the app. It includes the following:
 * - ErrorBoundary: Captures and handles JavaScript errors.
 * - Redux Provider: Supplies the Redux store to the app.
 * - AuthProvider: Manages authentication state and provides user context.
 * - ThemeProvider: Applies theming and styling to the app.
 * - SafeView: Ensures safe area for content on different devices.
 * - AppNavigator: Handles the navigation structure of the app.
 */

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <ThemeProvider>
            <SafeView>
              <AppNavigator />
            </SafeView>
          </ThemeProvider>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
