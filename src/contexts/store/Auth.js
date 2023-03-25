import React, {useReducer, useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from '../reducers/Auth.reducer';
import {setCurrentUser} from '../actions/Auth.actions';
import AuthGlobal from './AuthGlobal';

const Auth = props => {
  const [stateUser, dispatch] = useReducer(authReducer, {
    isAuthenticated: null,
    user: {},
    userAccount: {},
    userProfile: {},
  });
  const [showChild, setShowChild] = useState(true);

  useEffect(() => {
    setShowChild(true);
    const start = new Date().getTime();
    console.log('=> start: ' + start);
    const getData = async () => {
      try {
        const decoded = await AsyncStorage.getItem('jwt');
        if (decoded !== null) {
          if (showChild) {
            dispatch(setCurrentUser(jwt_decode(decoded)));
          }
        }
        console.log('=> token: ' + decoded);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
    const stop = new Date().getTime();
    console.log('=> stop: ' + stop);
    console.log('=> elapsed: ' + (stop - start) + "ms");

    // if (AsyncStorage.jwt) {
    //   const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : '';
    //   if (setShowChild) {
    //     dispatch(setCurrentUser(jwt_decode(decoded)));
    //   }
    // }
    
    return () => setShowChild(false);
  }, []);

  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider value={{stateUser, dispatch}}>
        {props.children}
      </AuthGlobal.Provider>
    );
  }
};

export default Auth;
