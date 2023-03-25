import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {TransitionSpecs} from '@react-navigation/stack';
import {Conventional, Equipment, Forum, Smart, Taking, OrderService} from '../screens';
import {COLOR_PRIMARY_10} from '../utils/constant';

const Stack = createNativeStackNavigator();

const ServiceNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={
        {
          //animation: 'slide_from_left',
          //cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
        }
      }>
      <Stack.Screen
        name="Taking"
        component={Taking}
        options={{
          headerShown: true,
          presentation: 'modal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
          //  transitionSpec: {
          //    open: TransitionSpecs.RevealFromBottomAndroidSpec,
          //    close: TransitionSpecs.TransitionIOSSpec,
          //  },
          headerBackButtonMenuEnabled: true,
          headerStyle: {backgroundColor: COLOR_PRIMARY_10},
          headerShadowVisible: true,
          headerTitle: 'Pengambilan Sampah',
          headerTintColor: '#555',
        }}
      />
      <Stack.Screen
        name="Equipment"
        component={Equipment}
        options={{
          headerShown: true,
          animation: 'flip',
          headerBackButtonMenuEnabled: true,
          headerStyle: {backgroundColor: COLOR_PRIMARY_10},
          headerShadowVisible: true,
          headerTitle: 'Peralatan Sampah',
          headerTintColor: '#555',
        }}
      />
      <Stack.Screen
        name="Conventional"
        component={Conventional}
        options={{
          headerShown: true,
          animation: 'simple_push',
          headerBackButtonMenuEnabled: true,
          headerStyle: {backgroundColor: COLOR_PRIMARY_10},
          headerShadowVisible: true,
          headerTitle: 'Sampah Konvensional',
          headerTintColor: '#555',
        }}
      />
      <Stack.Screen
        name="Smart"
        component={Smart}
        options={{
          headerShown: true,
          animation: 'slide_from_left',
          headerBackButtonMenuEnabled: true,
          headerStyle: {backgroundColor: COLOR_PRIMARY_10},
          headerShadowVisible: true,
          headerTitle: 'Sampah Smart',
          headerTintColor: '#555',
        }}
      />
      <Stack.Screen
        name="Forum"
        component={Forum}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerBackButtonMenuEnabled: true,
          headerStyle: {backgroundColor: COLOR_PRIMARY_10},
          headerShadowVisible: true,
          headerTitle: 'Forum Diskusi',
          headerTintColor: '#555',
        }}
      />
      <Stack.Screen
        name="OrderService"
        component={OrderService}
        options={{
          headerShown: false,
          animation: 'fade_from_bottom',
          //headerBackButtonMenuEnabled: true,
          //headerStyle: {backgroundColor: COLOR_PRIMARY_10},
          //headerShadowVisible: true,
          //headerTitle: 'Order Service',
          //headerTintColor: '#555',
        }}
      />
    </Stack.Navigator>
  );
};

export default ServiceNavigator;
