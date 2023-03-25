import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register, Splash, Welcome} from '../screens';
import Main from './Main';
import FilteredProduct from '../screens/product/FilteredProduct';
import SearchedProduct from '../screens/product/SearchedProduct';
import ProductContainer from '../screens/product/ProductContainer';
import { COLOR_GRAY_DARK, COLOR_PRIMARY_01, COLOR_PRIMARY_10, COLOR_SAFE } from '../utils/constant';
import Cart from '../screens/cart/Cart';
import SingleProduct from '../screens/product/SingleProduct';
import Checkout from '../screens/cart/checkout/Checkout';

const Stack = createNativeStackNavigator();
const BootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductContainer"
        component={ProductContainer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchedProduct"
        component={SearchedProduct}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FilteredProduct"
        component={FilteredProduct}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerBackButtonMenuEnabled: true,
          headerStyle: {backgroundColor: COLOR_PRIMARY_10},
          headerShadowVisible: true,
          headerTitle: 'Hasih pencarian',
          headerTintColor: '#555',
        }}
      />
       <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerBackButtonMenuEnabled: true,
          headerStyle: {backgroundColor: COLOR_PRIMARY_10},
          headerShadowVisible: true,
          headerTitle: 'Keranjang',
          headerTintColor: '#555',
        }}
      />
       <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerBackButtonMenuEnabled: true,
          headerStyle: {backgroundColor: COLOR_PRIMARY_10},
          headerShadowVisible: true,
          headerTitle: 'Pembelian',
          headerTintColor: '#555',
        }}
      />
      <Stack.Screen
        name="SingleProduct"
        component={SingleProduct}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerBackButtonMenuEnabled: true,
          headerStyle: {backgroundColor: COLOR_PRIMARY_10},
          headerShadowVisible: true,
          headerTitle: 'Detail',
          headerTintColor: '#555',
        }}
      />
    </Stack.Navigator>
  );
};

export default BootNavigator;
