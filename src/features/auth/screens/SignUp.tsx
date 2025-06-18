import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'navigation/AuthNavigator';
import React, {useState} from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';

import Logo from '../../../asserts/images/logo.png';
import Button from '../../../components/buttons/Button';
import PrimaryTextInput from '../../../components/textInputs/PrimaryTextInput';
import {useSignUpMutation} from '../authApi';
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

export default function SignUp() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [signUp, {isLoading}] = useSignUpMutation();

  const handleSignup = async () => {
    try {
      await signUp({name, email, password}).unwrap();
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <InnerContainer>
        <AppLogo source={Logo} resizeMode="contain" />

        <Title>Create Account</Title>
        <Subtitle>Be Bold. Be Styled. Be You.</Subtitle>

        <PrimaryTextInput
          value={name}
          setValue={setName}
          placeholder="Full Name"
          autoCapitalize="words"
          inputStyles={inputStyle}
        />

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
          onPress={handleSignup}
          title={isLoading ? 'Signing up...' : 'Sign Up'}
          type="primary"
        />

        <LinkContainer onPress={() => navigation.navigate('Login')}>
          <LinkText>
            Already have an account? <Link>Login</Link>
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
