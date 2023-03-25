import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register, Splash, Update, Welcome} from '../screens';
import { COLOR_PRIMARY_10 } from '../utils/constant';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
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
        name="Update"
        component={Update}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerBackButtonMenuEnabled: true,
          headerStyle: {backgroundColor: COLOR_PRIMARY_10},
          headerShadowVisible: true,
          headerTitle: 'Daftar Mitra',
          headerTintColor: '#555',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
