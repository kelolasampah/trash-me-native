import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Cart, Checkout, Confirm} from '../screens';

import {COLOR_PRIMARY_10} from '../utils/constant';

const Stack = createNativeStackNavigator();

const CartNavigator = () => {
  return (
    <Stack.Navigator>
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
        name="Confirm"
        component={Confirm}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerBackButtonMenuEnabled: true,
          headerStyle: {backgroundColor: COLOR_PRIMARY_10},
          headerShadowVisible: true,
          headerTitle: 'Konfirmasi',
          headerTintColor: '#555',
        }}
      />
    </Stack.Navigator>
  );
};

export default CartNavigator;
