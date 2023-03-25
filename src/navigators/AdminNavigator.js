import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Categories, Orders, ProductForm, Products} from '../screens';
import { COLOR_PRIMARY_10 } from '../utils/constant';

const Stack = createNativeStackNavigator();
const AdminNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={Products}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Categories" component={Categories} options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerBackButtonMenuEnabled: true,
          headerStyle: {backgroundColor: COLOR_PRIMARY_10},
          headerShadowVisible: true,
          headerTitle: 'Tambah Kategori',
          headerTintColor: '#555',
        }} />
      <Stack.Screen name="Orders" component={Orders} options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerBackButtonMenuEnabled: true,
          headerStyle: {backgroundColor: COLOR_PRIMARY_10},
          headerShadowVisible: true,
          headerTitle: 'Pesanan Masuk',
          headerTintColor: '#555',
        }}/>
      <Stack.Screen name="ProductForm" component={ProductForm} options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerBackButtonMenuEnabled: true,
          headerStyle: {backgroundColor: COLOR_PRIMARY_10},
          headerShadowVisible: true,
          headerTitle: 'Tambah Produk',
          headerTintColor: '#555',
        }}/>
    </Stack.Navigator>
  );
};

export default AdminNavigator;
