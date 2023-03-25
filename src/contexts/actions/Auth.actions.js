import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
//import baseURL from '../../assets/common/baseURL';

import '../../assets/common/global'

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_CURRENT_PROFILE = 'SET_CURRENT_PROFILE';

const fetchTimeout = (ms, promise) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('TIMEOUT'));
    }, ms);

    promise
      .then(value => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch(reason => {
        clearTimeout(timer);
        reject(reason);
      });
  });
};

export const loginUser = (user, dispatch) => {
  fetchTimeout(
    10000,
    fetch(`${global.baseurl}/users/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          const token = data.token;
          AsyncStorage.setItem('jwt', token);

          const decoded = jwt_decode(token);
          dispatch(setCurrentUser(decoded, user));
        } else {
          logoutUser(dispatch);
        }
      })
      .catch(err => {
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Terjadi kesalahan',
          text2: 'Silahkan coba kembali nanti',
        });
        logoutUser(dispatch);
      }),
  );

  // force is loading -> false
  return true;
};

export const getUserAccount = (id, user) => {
  fetchTimeout(
    10000,
    fetch(`${global.baseurl}/users/${id}`, {
      method: 'GET',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => console.log("UA_Ok")),//data)),
  );
  return true;
};

export const getUserProfile = (id, dispatch) => {
  fetchTimeout(
    10000,
    fetch(`${global.baseurl}/users/profile/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data) dispatch(setCurrentProfile(data));
      }),
  );
  return true;
};

export const logoutUser = dispatch => {
  AsyncStorage.removeItem('jwt');
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userAccount: user,
  };
};

export const setCurrentProfile = profile => {
  return {
    type: SET_CURRENT_PROFILE,
    userProfile: profile,
  };
};
