import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeNavigator from './HomeNavigator';
import RootNavigator from './RootNavigator';
//import AdminNavigator from './AdminNavigator';
import ProductNavigator from './ProductNavigator';
//import DiscussionNavigator from './DiscussionNavigator';
import ServiceNavigator from './ServiceNavigator';
import CartNavigator from './CartNavigator';

const Stack = createNativeStackNavigator();
const Main = () => {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name="RootNav"
        component={RootNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeNav"
        component={HomeNavigator}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="AdminNav"
        component={AdminNavigator}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="ProductNav"
        component={ProductNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ServiceNav"
        component={ServiceNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CartNav"
        component={CartNavigator}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="DiscusNav"
        component={DiscussionNavigator}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default Main;
