import { fireEvent, render, screen } from '@utils/test-utils';
import React from 'react';
import PrimaryTextInput from './PrimaryTextInput';

describe('PrimaryTextInput', () => {
  const baseProps = {
    placeholder: 'test',
    value: 'test',
    setValue: () => {},
  };
  it('should render correct placeholder', () => {
    render(<PrimaryTextInput {...baseProps} />);
    expect(screen.getByPlaceholderText('test')).toBeTruthy();
  });

  it('should render correct value', () => {
    render(<PrimaryTextInput {...baseProps} />);
    expect(screen.getByDisplayValue('test')).toBeTruthy();
  });

  it('should call setValue function', () => {
    const setValue = jest.fn();
    render(<PrimaryTextInput {...baseProps} setValue={setValue} />);
    const input = screen.getByPlaceholderText('test');
    fireEvent.changeText(input, 'new value');
    expect(setValue).toHaveBeenCalledWith('new value');
  });

  it('should apply custom input styles', () => {
    render(
      <PrimaryTextInput
        {...baseProps}
        inputStyles={{ backgroundColor: 'red' }}
      />,
    );
    const input = screen.getByPlaceholderText('test');
    expect(input.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: 'red' }),
      ]),
    );
  });
});
