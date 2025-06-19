import React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import styled from 'styled-components/native';

interface ButtonProps {
  title?: string;
  type?: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'rounded';
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
}

const Button = ({
  title,
  type = 'primary',
  onPress,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
  disabled = false,
}: ButtonProps) => {
  return (
    <ButtonContainer
      testID="button"
      type={type}
      onPress={onPress}
      disabled={disabled}
      style={style}
      activeOpacity={0.8}>
      {icon && iconPosition === 'left' && (
        <IconWrapper testID="left-icon">{icon}</IconWrapper>
      )}
      {title && (
        <ButtonText type={type} style={textStyle}>
          {title}
        </ButtonText>
      )}
      {icon && iconPosition === 'right' && (
        <IconWrapper testID="right-icon">{icon}</IconWrapper>
      )}
    </ButtonContainer>
  );
};

export default Button;

interface ButtonStyleProps {
  type: ButtonProps['type'];
}

const ButtonContainer = styled.TouchableOpacity<ButtonStyleProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: 15px;
  padding-horizontal: 15px;
  border-radius: 24px;
  background-color: ${({type, theme}) => {
    switch (type) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'tertiary':
        return 'transparent';
      case 'icon':
        return '#f5f5f5';
      case 'rounded':
        return '#111';
      default:
        return '#111';
    }
  }};
  border: ${({type}) => (type === 'secondary' ? '1px solid #111' : '0px')};
`;

const ButtonText = styled.Text<ButtonStyleProps>`
  color: ${({type, theme}) =>
    type === 'secondary'
      ? theme.colors.textPrimary
      : theme.colors.textSecondary};
  font-size: ${({theme}) => theme.fontSize.md}px;
  font-weight: 600;
  margin-left: ${({type}) => (type === 'icon' ? '8px' : '0px')};
`;

const IconWrapper = styled.View`
  margin-horizontal: 6px;
`;
