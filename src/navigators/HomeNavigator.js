import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Account, Home, Transaction} from '../screens';
import {BottomNavigator} from '../components';

import AuthGlobal from "../contexts/store/AuthGlobal";
import Icon from "react-native-vector-icons/FontAwesome";
import AdminNavigator from './AdminNavigator';


const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  const context = useContext(AuthGlobal)
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      {context.stateUser.user.isAdmin == true ? (
        <Tab.Screen
        name="Beranda"
        component={AdminNavigator}
        options={{headerShown: false}}
      />
      ): <Tab.Screen
      name="Beranda"
      component={Home}
      options={{headerShown: false}}
    /> }
      <Tab.Screen
        name="Transaksi"
        component={Transaction}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Akun"
        component={Account}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
