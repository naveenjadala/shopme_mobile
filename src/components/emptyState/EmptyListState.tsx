import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

import { ViewStyle } from 'react-native';
import Button from '../buttons/Button';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  padding: 15px;
`;

const Message = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.md}px;
  padding: 15px;
`;

const ButtonContainer = styled(Button)`
  position: absolute;
  bottom: 0;
  width: 90%;
  height: 50px;
`;

interface EmptyListProps {
  title?: string;
  message: string;
  isIcon: boolean;
  icon: string;
  onPress: () => void;
  style?: ViewStyle;
}

const EmptyListState = ({
  title,
  message,
  isIcon,
  icon,
  onPress,
  style,
}: EmptyListProps) => (
  <Container style={style}>
    {isIcon && <Icon name={icon} size={60} />}
    {title && <Title>{title}</Title>}
    <Message>{message}</Message>
    <ButtonContainer
      title="Go back"
      onPress={onPress}
      type="primary"
      style={{
        position: 'absolute',
        bottom: 0,
        width: '90%',
        height: 50,
      }}
    />
  </Container>
);

export default EmptyListState;
