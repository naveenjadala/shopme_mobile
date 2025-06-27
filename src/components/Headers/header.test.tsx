import { render, screen } from '@utils/test-utils';
import React from 'react';
import Header from './Header';

describe('Header', () => {
  render(<Header title="test" />);
  it('should render correctly', () => {
    expect(screen.getByText('test')).toBeTruthy();
  });

  it('should render back button', () => {
    render(<Header title="test" isBackButton />);
    expect(screen.getByTestId('back-button')).toBeTruthy();
  });

  it('should render back button', () => {
    render(<Header title="test" isBackButton={false} />);
    expect(screen.queryByTestId('back-button')).toBeNull();
  });
});
