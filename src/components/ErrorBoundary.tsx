import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Log error conditionally
    if (__DEV__) {
      console.error('Error caught in ErrorBoundary:', error, info);
    }
  }

  handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <View style={styles.centered}>
          <Text>Oops! Something went wrong.</Text>
          <Text>{error?.message}</Text>
          <Button title="Try Again" onPress={this.handleRetry} />
        </View>
      );
    }

    return children;
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
