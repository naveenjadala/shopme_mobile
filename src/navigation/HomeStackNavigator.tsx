import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabView from '../features/Home/screens/HomeTabView';
import ProductDetails from '../features/Products/screens/ProductDetails';
import ProductsList from '../features/Products/screens/ProductsList';

export type HomeStackParamList = {
  HomeScreen: object;
  Products: object;
  ProductDetails: {id: number};
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeScreen" component={HomeTabView} />
      <HomeStack.Screen name="Products" component={ProductsList} />
      <HomeStack.Screen name="ProductDetails" component={ProductDetails} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
