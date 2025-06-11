import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';
import Checkout from '../features/Checkout/Checkout';
import OrderSuccess from '../features/OrderSuccess/OrderSuccess';
import ProductsList from '../features/Products/screens/ProductsList';
import {useTheme} from '../theme/ThemeContext';
import BottomTabs from './BottomTabs';

export type RootStackParamList = {
  Tabs: undefined;
  Product: undefined;
  Checkout: undefined;
  OrderSuccess: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const {theme} = useTheme();

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background, // sync with your app theme
      primary: theme.colors.primary,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
    },
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Tabs" component={BottomTabs} />
          <Stack.Screen name="Product" component={ProductsList} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigator;
