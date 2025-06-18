import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import {useTheme} from '../../theme/ThemeContext';

interface Props {
  backPressed?: () => void;
  title: string;
  isBackButton?: boolean;
}

const Header = ({backPressed, title, isBackButton = true}: Props) => {
  const {theme} = useTheme();
  return (
    <Container>
      {isBackButton ? (
        <Left>
          <BackButton
            onPress={backPressed}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon
              name="chevron-back"
              size={24}
              color={theme.colors.textPrimary}
            />
          </BackButton>
        </Left>
      ) : (
        <Left />
      )}
      <Center>
        <Title>{title}</Title>
      </Center>
      <Right />
    </Container>
  );
};

export default Header;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 60px;
  padding-horizontal: 10px;
`;

const Left = styled.View`
  width: 50px;
  justify-content: center;
  align-items: flex-start;
`;

const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Right = styled.View`
  width: 50px;
`;

const BackButton = styled.TouchableOpacity`
  padding: 8px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.textPrimary};
`;
