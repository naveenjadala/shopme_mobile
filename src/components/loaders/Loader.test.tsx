import { render, screen } from '@utils/test-utils';
import React from 'react';
import Loader from './Loader';

describe('Loader', () => {
  it('should render large loader', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toBeTruthy();
  });

  it('should render loader with default props', () => {
    render(<Loader />);
    const loader = screen.getByTestId('loader');
    expect(loader.props.size).toBe('large');
    expect(loader.props.color).toBe('#000');
  });

  it('should render loader with custom size and color', () => {
    render(<Loader size="small" color="red" />);
    const loader = screen.getByTestId('loader');
    expect(loader.props.size).toBe('small');
    expect(loader.props.color).toBe('red');
  });
});
