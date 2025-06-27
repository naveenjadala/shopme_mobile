import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../features/auth/screens/LoginScreen';
import SignUp from '../features/auth/screens/SignUp';
import { AuthStackParamList } from './types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
