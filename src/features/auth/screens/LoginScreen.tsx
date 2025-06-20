import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'navigation/AuthNavigator';
import React, {useState} from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';

import Logo from '../../../asserts/images/logo.png';
import Button from '../../../components/buttons/Button';
import PrimaryTextInput from '../../../components/textInputs/PrimaryTextInput';
import {useLoginMutation} from '../authApi';
import {
  AppLogo,
  Container,
  InnerContainer,
  Link,
  LinkContainer,
  LinkText,
  Subtitle,
  Title,
} from '../AuthSharedStyles';

export default function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login, {isLoading}] = useLoginMutation();

  const handleLogin = async () => {
    try {
      await login({email, password}).unwrap();
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <InnerContainer>
        <AppLogo source={Logo} resizeMode="contain" />

        <Title>Login in Now</Title>
        <Subtitle>Trend It. Wear It. Love It.</Subtitle>

        <PrimaryTextInput
          value={email}
          setValue={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          inputStyles={inputStyle}
        />

        <PrimaryTextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          setValue={setPassword}
          inputStyles={inputStyle}
        />

        <StyledButton
          disabled={isLoading}
          onPress={handleLogin}
          title={isLoading ? 'Logging in...' : 'Login'}
          type="primary"
        />

        <LinkContainer onPress={() => navigation.navigate('SignUp')}>
          <LinkText>
            Don’t have an account? <Link>Sign up</Link>
          </LinkText>
        </LinkContainer>
      </InnerContainer>
    </Container>
  );
}

const inputStyle = {
  height: 50,
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 15,
  marginBottom: 15,
  fontSize: 16,
};

const StyledButton = styled(Button)`
  align-items: center;
  margin-top: 15px;
`;
