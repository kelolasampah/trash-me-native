import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, View, Dimensions, StatusBar, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-spinkit';

//import auth from '@react-native-firebase/auth';
import AuthGlobal from '../../contexts/store/AuthGlobal';
import {initiateSocket} from '../../services/SocketIO';

import {Logo} from '../../assets';
import {COLOR_PRIMARY_60} from '../../utils/constant';

import '../../assets/common/global';

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

const Splash = () => {
  const navigation = useNavigation();
  const context = useContext(AuthGlobal);

  const [state, setState] = useState({
    ready: false,
    loading: true,
    logo: '',
  });

  useEffect(() => {
    fetchTimeout(
      10000,
      fetch(
        'https://raw.githubusercontent.com/kelolasampah/kelolasampah.github.io/main/trashme.json',
      )
        .then(resp => resp.json())
        .then(respjson => {
          global.config = respjson;
          global.baseurl = `http://${respjson.nodes.payload}:11001/api/v1`;
          global.endpoint = `http://${respjson.nodes.payload}:11001`;
          setState({...state, ready: true});
        })
        .catch(err => {
          global.config = null;
          global.baseurl = `http://103.41.204.198:11001/api/v1`;
          global.endpoint = `http://103.41.204.198:11001`;
          setState({...state, ready: true});
          console.log('err: ' + err);
        }),
    );
  }, []);

  useEffect(() => {
    let logoTimeout, authTimeout;
    const loadingTimeout = setTimeout(() => {
      if (state.ready) {
        setState({...state, loading: false, logo: 'show'});
        logoTimeout = setTimeout(() => {
          setState({...state, loading: false, logo: 'hide'});
          authTimeout = setTimeout(() => {
            // FIREBASE
            // const subscriber = auth().onAuthStateChanged(user => {
            //   if (user) {
            //     navigation.replace('HomeScreen');
            //   } else {
            //     navigation.replace('WelcomeScreen');
            //   }
            // });
            // return subscriber;

            console.log('URL:' + global.baseurl);
            console.log('EP:' + global.endpoint);

            initiateSocket(
              context.stateUser.user.isAdmin
                ? 'io_to_admin'
                : 'io_to_user',
              context.stateUser.user,
            );

            // CONTEXT
            if (context.stateUser.isAuthenticated === true) {
              //context.stateUser.user.isAdmin == true ? navigation.replace('AdminNav') : navigation.replace('HomeNav');
              navigation.replace('HomeNav');
            } else {
              navigation.replace('Welcome');
            }
          }, 1000); // navigation delay => waiting auth
        }, 2000); // logo delay
      }
    }, 3000); // loading delay

    return () => {
      //clearTimeout(loadingTimeout);
      //clearTimeout(logoTimeout);
      //clearTimeout(authTimeout);
      // setState({
      //   loading: false,
      //   logo: '',
      // }); // Clean the state in the unmount of the component
    };
  }, [context.stateUser.isAuthenticated, state.ready]);

  const type = [
    'CircleFlip',
    'Bounce', //
    'Wave',
    'WanderingCubes',
    'Pulse', //
    'ChasingDots',
    'ThreeBounce',
    'Circle',
    '9CubeGrid', //
    'WordPress',
    'FadingCircle',
    'FadingCircleAlt',
    'Arc',
    'ArcAlt',
  ];

  return (
    <View style={styles.background}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      {/* <ImageBackground source={SplashBackground} style={styles.background}> */}
      <Spinner
        style={styles.spinner}
        isVisible={state.loading}
        size={spinnerSize}
        type={type[8]}
        color={COLOR_PRIMARY_60}
      />
      <View style={styles.header}>
        {state.logo === 'show' ? (
          <Animatable.Image
            animation="zoomIn"
            duraton="1000"
            source={Logo}
            style={styles.logo}
            resizeMode="stretch"
          />
        ) : state.logo === 'hide' ? (
          <Animatable.Image
            animation="zoomOut"
            duraton="1000"
            source={Logo}
            style={styles.logo}
            resizeMode="stretch"
          />
        ) : null}
      </View>
      <View>
        <Text style={{color: '#aeaeae', paddingBottom: 10}}>
          {global.version}
        </Text>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};

export default Splash;

const {height} = Dimensions.get('window'); // window=app, screen=all
const height_logo = height * 0.28;
const spinnerSize = 80;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: height_logo * 1.4,
    height: height_logo * 0.7,
  },
  spinner: {
    position: 'absolute',
  },
});
