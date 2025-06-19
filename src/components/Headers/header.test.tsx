import {screen} from '@testing-library/react-native';
import {customRender} from '../../utils/test-utils';
import Header from './Header';

describe('Header', () => {
  customRender(<Header title="test" />);
  it('should render correctly', () => {
    expect(screen.getByText('test')).toBeTruthy();
  });

  it('should render back button', () => {
    customRender(<Header title="test" isBackButton />);
    expect(screen.getByTestId('back-button')).toBeTruthy();
  });

  it('should render back button', () => {
    customRender(<Header title="test" isBackButton={false} />);
    expect(screen.queryByTestId('back-button')).toBeNull();
  });
});
