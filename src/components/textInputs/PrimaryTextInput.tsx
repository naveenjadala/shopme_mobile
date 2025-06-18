import React from 'react';
import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';
import {useTheme} from '../../theme/ThemeContext';

interface Props extends TextInputProps {
  placeholder: string;
  inputStyles?: object;
  value: string;
  setValue: (value: string) => void;
}

const PrimaryTextInput = ({
  inputStyles,
  value,
  setValue,
  placeholder,
  ...rest
}: Props) => {
  const {theme} = useTheme();

  return (
    <PrimaryInput
      style={{...inputStyles}}
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      placeholderTextColor={theme?.colors?.placeholder}
      {...rest}
    />
  );
};

export default PrimaryTextInput;

const PrimaryInput = styled.TextInput`
  font-size: ${({theme}) => theme.fontSize.base}px;
  color: ${({theme}) => theme.colors.textPrimary};
  border-color: ${({theme}) => theme.colors.inputBorder};
  border-width: 1px;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
`;
