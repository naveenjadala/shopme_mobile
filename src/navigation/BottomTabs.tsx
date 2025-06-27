import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions, RouteProp } from '@react-navigation/native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../features/Profile/Profile';
import CartStackNavigator from './CartStackNavigator';
import FavStackNavigator from './FavStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';
import { BottomTabParamList } from './types';

const BottomNav = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {
  const tabBarIcons = ({
    route,
    color,
  }: {
    route: RouteProp<BottomTabParamList>;
    color: string;
  }) => {
    let iconName: string = 'home';

    if (route.name === 'Home') iconName = 'home-outline';
    else if (route.name === 'Favorites') iconName = 'heart-outline';
    else if (route.name === 'Cart') iconName = 'cart-outline';
    else if (route.name === 'Profile') iconName = 'person-outline';
    return <Ionicons name={iconName} size={20} color={color} />;
  };

  return (
    <BottomNav.Navigator
      screenOptions={({ route, theme }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => tabBarIcons({ route, color }),

        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <BottomNav.Screen
        name="Home"
        component={HomeStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              }),
            );
          },
        })}
      />
      <BottomNav.Screen
        name="Favorites"
        component={FavStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Favorites' }],
              }),
            );
          },
        })}
      />
      <BottomNav.Screen
        name="Cart"
        component={CartStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Cart' }],
              }),
            );
          },
        })}
      />
      <BottomNav.Screen
        name="Profile"
        component={Profile}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Profile' }],
              }),
            );
          },
        })}
      />
    </BottomNav.Navigator>
  );
};

export default BottomTabs;
