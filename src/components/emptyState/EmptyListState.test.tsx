import { fireEvent, render, screen } from '@utils/test-utils';
import React from 'react';
import EmptyListState from './EmptyListState';

describe('EmptyListState', () => {
  const baseProps = {
    message: 'it is a empty state',
    icon: 'md-close-circle',
    isIcon: false,
    onPress: () => {},
  };
  it('should render correct message and without an icon', () => {
    render(<EmptyListState {...baseProps} />);
    expect(screen.getByText('it is a empty state')).toBeTruthy();
    expect(screen.queryByTestId('icon')).toBeNull();
  });

  it('should render correct message and with an icon', () => {
    render(<EmptyListState {...baseProps} isIcon />);
    expect(screen.getByText('it is a empty state')).toBeTruthy();
    expect(screen.getByTestId('icon')).toBeTruthy();
  });

  it('should render correct title', () => {
    render(<EmptyListState {...baseProps} isIcon title="test" />);
    expect(screen.getByText('test')).toBeTruthy();
  });

  it('should call onPress function', () => {
    const onPress = jest.fn();
    render(<EmptyListState {...baseProps} onPress={onPress} />);
    const button = screen.getByText('Go back');
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalled();
  });
});
