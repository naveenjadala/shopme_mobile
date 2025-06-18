import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../features/Profile/Profile';
import CartStackNavigator from './CartStackNavigator';
import FavStackNavigator from './FavStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';

export type BottomTabParamList = {
  Home: object;
  Favorites: object;
  Cart: object;
  Profile: object;
};

const BottomNav = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {
  return (
    <BottomNav.Navigator
      screenOptions={({route, theme}) => ({
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => {
          let iconName: string = 'home';

          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Favorites') iconName = 'heart-outline';
          else if (route.name === 'Cart') iconName = 'cart-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={20} color={color} />;
        },

        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
      })}>
      <BottomNav.Screen
        name="Home"
        component={HomeStackNavigator}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Home'}],
              }),
            );
          },
        })}
      />
      <BottomNav.Screen
        name="Favorites"
        component={FavStackNavigator}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Favorites'}],
              }),
            );
          },
        })}
      />
      <BottomNav.Screen
        name="Cart"
        component={CartStackNavigator}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Cart'}],
              }),
            );
          },
        })}
      />
      <BottomNav.Screen
        name="Profile"
        component={Profile}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Profile'}],
              }),
            );
          },
        })}
      />
    </BottomNav.Navigator>
  );
};

export default BottomTabs;
