import {fireEvent, screen} from '@testing-library/react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {lightTheme} from '../../theme';
import {customRender} from '../../utils/test-utils';
import Button from './Button';

const baseProps = {
  title: 'test',
  onPress: jest.fn(),
};

const MockIcon = () => <Icon name="chevron-back" testID="icon" />;

describe('Button', () => {
  it('should render label', () => {
    customRender(<Button {...baseProps} />);
    expect(screen.getByText('test')).toBeTruthy();
  });

  it('should render default side icon', () => {
    customRender(<Button {...baseProps} icon={<MockIcon></MockIcon>} />);
    expect(screen.getByTestId('left-icon')).toBeTruthy();
    expect(screen.queryByTestId('right-icon')).toBeNull();
  });

  it('should render right side icon', () => {
    customRender(
      <Button
        {...baseProps}
        icon={<MockIcon></MockIcon>}
        iconPosition="right"
      />,
    );
    expect(screen.getByTestId('right-icon')).toBeTruthy();
    expect(screen.queryByTestId('left-icon')).toBeNull();
  });

  it('should be disabled', () => {
    customRender(<Button {...baseProps} disabled />);
    expect(screen.getByTestId('button')).toBeDisabled();
  });

  it('should render primary button', () => {
    customRender(<Button {...baseProps} type="primary" />);
    expect(screen.getByTestId('button')).toHaveStyle({
      backgroundColor: lightTheme.colors.primary,
    });
  });

  it('should render secondary button', () => {
    customRender(<Button {...baseProps} type="secondary" />);
    expect(screen.getByTestId('button')).toHaveStyle({
      backgroundColor: lightTheme.colors.secondary,
    });
  });

  it('should render tertiary button', () => {
    customRender(<Button {...baseProps} type="tertiary" />);
    expect(screen.getByTestId('button')).toHaveStyle({
      backgroundColor: 'transparent',
    });
  });

  it('should render rounded button', () => {
    customRender(<Button {...baseProps} type="rounded" />);
    expect(screen.getByTestId('button')).toHaveStyle({
      backgroundColor: '#111',
    });
  });

  it('should render icon button', () => {
    customRender(<Button {...baseProps} type="icon" />);
    expect(screen.getByTestId('button')).toHaveStyle({
      backgroundColor: '#f5f5f5',
    });
  });

  it('should be pressed', () => {
    customRender(<Button {...baseProps} />);
    expect(screen.getByTestId('button')).not.toBeDisabled();
    fireEvent.press(screen.getByTestId('button'));
    expect(baseProps.onPress).toHaveBeenCalledTimes(1);
  });
});
