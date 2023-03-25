import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  FilteredProduct,
  ProductContainer,
  SearchedProduct,
  SingleProduct,
} from '../screens';
import { COLOR_PRIMARY_10 } from '../utils/constant';

const Stack = createNativeStackNavigator();

const ProductNavigator = () => {
  return (
    <Stack.Navigator>
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

export default ProductNavigator;
