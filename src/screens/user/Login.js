import React, {useEffect, useContext, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator,
  StatusBar,
  Keyboard,
  Button,
  Platform,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

//import auth from '@react-native-firebase/auth';
import AuthGlobal from '../../contexts/store/AuthGlobal';
import {loginUser} from '../../contexts/actions/Auth.actions';

import {
  FONT_ABold,
  FONT_ARegular,
  FONT_ASemi,
  COLOR_PRIMARY_60,
  COLOR_PRIMARY_10,
} from '../../utils/constant';
import {Logo} from '../../assets';
import {setEnabled} from 'react-native/Libraries/Performance/Systrace';

const Login = () => {
  const navigation = useNavigation();
  const context = useContext(AuthGlobal);
  const [isLoading, setIsLoading] = useState(false);
  //const {colors} = useTheme();
  const [data, setData] = React.useState({
    username: '',
    password: '',
    checkedUsername: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [footerSize, setFooterSize] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  useEffect(() => {
    // CONTEXT
    if (context.stateUser.isAuthenticated === true) {
      setIsLoading(false);
      //console.log(JSON.stringify(context.stateUser))
      //context.stateUser.user.isAdmin == true ? navigation.replace('AdminNav') : navigation.replace('HomeNav');
      navigation.replace('HomeNav');  
    }
  }, [context.stateUser.isAuthenticated]);

  const onLayout = event => {
    const {x, y, height, width} = event.nativeEvent.layout;
    setFooterSize({...footerSize, x: x, y: y, height: height, width: width});
  };

  const fetchData = (username, password) => {
    Keyboard.dismiss();
    if (username.length < 6 || password.length < 8) {
      Alert.alert(
        'Kesalahan!',
        username.length === 0
          ? 'Email/nomor ponsel tidak boleh kosong.'
          : username.length < 6
          ? 'Email/nomor ponsel terlalu pendek.'
          : password.length === 0
          ? 'Kata sandi tidak boleh kosong.'
          : 'Kata sandi terlalu pendek.',
        [{text: 'Ok'}],
      );
      return;
    } else {
      const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      const regPhone = /^[08]\d*$/;
      if (regPhone.test(username)) {
        if (username.length > 13) {
          Alert.alert('Gagal!', 'Nomor ponsel tidak sah!', [{text: 'Ok'}]);
          return;
        }
        //signInWithPhoneNumber('+62' + username.substring(1));
        //return;
        Alert.alert('Maaf!', 'Masuk dengan nomor ponsel belum tersedia.', [
          {text: 'Ok'},
        ]);
        return;
      } else if (regEmail.test(username) === false) {
        Alert.alert('Gagal!', 'Alamat email tidak sah!', [{text: 'Ok'}]);
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      handleLogin(username, password);
    }, 2500);
  };

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    console.log('phoneNumber: ', phoneNumber);
    //const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    //setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.', error.message);
    }
  }

  const handleLogin = (username, password) => {
    // FIREBASE
    // auth()
    //   .signInWithEmailAndPassword(username, password)
    //   .then(userCredentials => {
    //     setIsLoading(false);
    //     const user = userCredentials.user;
    //     console.log('Logged in with:', user.email);
    //     navigation.replace('HomeApp');
    //   })
    //   .catch(error => {
    //     setIsLoading(false);
    //     Alert.alert(
    //       'Kesalahan!',
    //       error.message.replace('auth/', '').replace('-', ' '),
    //       [{text: 'Ok'}],
    //     );
    //   });

    // CONTEXT
    const user = {
      email: username,
      password,
    };

    const res = loginUser(user, context.dispatch);
    setTimeout(() => {
      if (isLoading) setIsLoading(false);
    }, 2000);

    if (res) setIsLoading(false);
  };

  const usernameInputChange = val => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        username: val,
        checkedUsername: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        checkedUsername: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={COLOR_PRIMARY_60}
          barStyle="light-content"
        />
        <Animatable.View
          animation="fadeInUpBig"
          style={[styles.header, {height: height - footerSize.height}]}>
          <Image source={Logo} style={styles.logoHeader} resizeMode="stretch" />
          <Text style={[styles.textHeader, {marginTop: 10}]}>
            Selamat Datang!
          </Text>
          {/* <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} /> */}
        </Animatable.View>
        <Animatable.View
          onLayout={onLayout}
          animation="fadeInUpBig"
          style={styles.footer}>
          <Text style={styles.textFooter}>Email/Nomor Ponsel</Text>
          <View style={styles.action}>
            <FontAwesome name="envelope-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Email/Nomor Ponsel"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={val => usernameInputChange(val)}
              //onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
            {data.checkedUsername ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                {data.username.length === 0
                  ? 'Email atau nomor ponsel tidak boleh kosong.'
                  : 'Email atau nomor ponsel terlalu pendek.'}
              </Text>
            </Animatable.View>
          )}

          <Text style={[styles.textFooter, {marginTop: 15}]}>Kata Sandi</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Kata Sandi"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Kata sandi setidaknya 8 karakter.
              </Text>
            </Animatable.View>
          )}

          <TouchableOpacity>
            <Text
              style={{
                color: COLOR_PRIMARY_10,
                marginTop: 15,
                fontFamily: FONT_ARegular,
              }}>
              Lupa kata sandi?
            </Text>
          </TouchableOpacity>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                fetchData(data.username, data.password);
              }}>
              <LinearGradient
                colors={[COLOR_PRIMARY_60, COLOR_PRIMARY_10]} //['#08d4c4', '#01ab9d']}
                style={[styles.signIn, {width: '100%'}]}>
                <View style={{flexDirection: 'row'}}>
                  {isLoading ? (
                    <ActivityIndicator size={28} color="#fff" />
                  ) : (
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: '#fff',
                        },
                      ]}>
                      Masuk
                    </Text>
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={[
                styles.signIn,
                {
                  borderColor: COLOR_PRIMARY_10, //'#009387',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: COLOR_PRIMARY_10, //'#009387',
                  },
                ]}>
                Daftar
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const {height} = Dimensions.get('window'); // window=app, screen=all
const height_logo = height * 0.18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_PRIMARY_60, //'#009387',
  },
  header: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    overflow: 'hidden',
  },
  footer: {
    //flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 40,

    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
  },
  logoHeader: {
    alignItems: 'center',
    width: height_logo * 1.4,
    height: height_logo * 0.7,
  },
  textHeader: {
    color: COLOR_PRIMARY_10,
    fontFamily: FONT_ABold,
    fontSize: 24,
  },
  textFooter: {
    color: '#05375a',
    fontFamily: FONT_ASemi,
    fontSize: 15,
    marginVertical: 5,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginVertical: -12,
    fontFamily: FONT_ARegular,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 12,
    fontFamily: FONT_ARegular,
    fontStyle: 'italic',
  },
  button: {
    alignItems: 'center',
    marginTop: 40,
  },
  signIn: {
    width: '70%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
