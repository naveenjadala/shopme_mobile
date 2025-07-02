import { render, screen } from '@utils/test-utils';
import React from 'react';
import Spacing from './Spacing';

describe('Spacing', () => {
  it('should render correctly', () => {
    render(<Spacing />);
    expect(screen.getByTestId('spacing')).toBeTruthy();
  });

  it('should render with custom height and width', () => {
    render(<Spacing height={10} width={20} />);
    const spacing = screen.getByTestId('spacing');
    expect(spacing.props.height).toBe(10);
    expect(spacing.props.width).toBe(20);
  });

  it('should render with default height and width', () => {
    render(<Spacing />);
    const spacing = screen.getByTestId('spacing');
    expect(spacing.props.height).toBe(0);
    expect(spacing.props.width).toBe(0);
  });
});
