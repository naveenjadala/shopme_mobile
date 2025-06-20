import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const InnerContainer = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
`;

export const AppLogo = styled.Image`
  width: 150px;
  height: 150px;
  align-self: center;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: ${({theme}) => theme.fontSize.md}px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const Subtitle = styled.Text`
  font-size: ${({theme}) => theme.fontSize.base}px;
  color: ${({theme}) => theme.colors.textPrimary};
  text-align: center;
  margin-bottom: 30px;
`;

export const LinkContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  align-items: center;
`;

export const LinkText = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const Link = styled.Text`
  color: #4a80f0;
  font-weight: 600;
`;
