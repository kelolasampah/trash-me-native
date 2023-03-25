import React, {createRef, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
import Toast from 'react-native-toast-message';

// Redux
import {Provider} from 'react-redux';
import store from './redux/store/store';

// Context API
import Auth from './contexts/store/Auth';

// Navigator
import Main from './navigators/Main';

// LogBox
// LogBox.ignoreAllLogs(true);

const App = () => {
  return (
    <Auth>
      <Provider store={store}>
        {/* <NavigationContainer ref={createRef()}> */}
        <NavigationContainer>
          <Main />

          {/* Toast V2 or above */}
          {/* <Toast /> */}

          {/* Toast V1 and bellow */}
          <Toast ref={ref => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
};

export default App;
