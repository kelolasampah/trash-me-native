import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Forum} from '../screens';
import {COLOR_PRIMARY_10} from '../utils/constant';

const Stack = createNativeStackNavigator();

const DiscussionNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Forum"
        component={Forum}
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
    </Stack.Navigator>
  );
};

export default DiscussionNavigator;
