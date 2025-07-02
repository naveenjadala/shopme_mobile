import { render, screen } from '@utils/test-utils';
import React from 'react';
import { Text } from 'react-native';
import SafeView from './SafeView';

describe('SafeView', () => {
  it('should render correctly', () => {
    render(
      <SafeView>
        <TestChild />
      </SafeView>,
    );
    expect(screen.getByTestId('test-child')).toBeTruthy();
  });
});

const TestChild = () => <Text testID="test-child">Hello</Text>;
