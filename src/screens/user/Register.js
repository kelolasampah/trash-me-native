import React, {useEffect, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  ScrollView,
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
  Platform,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

//import auth from '@react-native-firebase/auth';
import axios from 'axios';

import {
  FONT_ABold,
  FONT_ARegular,
  FONT_ASemi,
  COLOR_PRIMARY_60,
  COLOR_PRIMARY_10,
} from '../../utils/constant';
import {Logo} from '../../assets';
// import baseURL from '../../assets/common/baseURL';
import Toast from 'react-native-toast-message';

import '../../assets/common/global'

const Register = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  //const {colors} = useTheme();
  const [data, setData] = React.useState({
    name: '',
    username: '',
    password: '',
    confirm_password: '',
    checkedName: false,
    checkedUserName: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidName: true,
    isValidUser: true,
    isValidPassword: true,
    isConfirmedPassword: true,
  });
  const [footerSize, setFooterSize] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  const onLayout = event => {
    const {x, y, height, width} = event.nativeEvent.layout;
    setFooterSize({...footerSize, x: x, y: y, height: height, width: width});
  };

  const fetchData = (name, username, password) => {
    Keyboard.dismiss();
    if (
      name.length == 0 ||
      username.length < 6 ||
      password.length < 8 ||
      password !== data.confirm_password
    ) {
      Alert.alert(
        'Kesalahan!',
        name.length === 0
          ? 'Nama tidak boleh kosong.'
          : username.length === 0
          ? 'Email/nomor ponsel tidak boleh kosong.'
          : username.length < 6
          ? 'Email/nomor ponsel terlalu pendek.'
          : password.length === 0
          ? 'Kata sandi tidak boleh kosong.'
          : password.length < 8
          ? 'Kata sandi terlalu pendek.'
          : 'Kata sandi tidak sama.',
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
        Alert.alert('Maaf!', 'Daftar dengan nomor ponsel belum tersedia.', [
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
      handleSignUp(name, username, password);
    }, 2500);
  };

  const handleSignUp = (name, username, password) => {
    // FIREBASE
    // auth()
    //   .createUserWithEmailAndPassword(username, password)
    //   .then(userCredentials => {
    //     const user = userCredentials.user;
    //     console.log('Registered with:', user.email);
    //     user
    //       .updateProfile({
    //         displayName: name,
    //       })
    //       .then(() => {
    //         setIsLoading(false);
    //         console.log('Updated displayname with:', name);
    //         navigation.replace('HomeScreen');
    //       })
    //       .catch(error => {
    //         setIsLoading(false);
    //         Alert.alert(
    //           'Kesalahan!',
    //           error.message.replace('auth/', '').replace('-', ' '),
    //           [{text: 'Ok'}],
    //         );
    //       });
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
    let user = {
      name: name,
      email: username,
      phone: '085722395259',
      password: password,
      isAdmin: false,
    };

    axios
      .post(`${global.baseurl}/users/register`, user)
      .then(res => {
        if (res.status == 201) {
          Toast.show({
            setTimeout: 2000,
            topOffset: 60,
            type: 'success',
            text1: 'Pendaftaran sedang diproses',
            text2: 'Silahkan masuk dengan akun anda!',
          });
          setTimeout(() => {
            setIsLoading(false);
            navigation.replace('Login');
          }, 2500);
        }
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: error.response.data,
          text2: 'Silahkan coba lagi!',
        });
      });
  };

  const nameInputChange = val => {
    if (val.trim().length !== 0) {
      setData({
        ...data,
        name: val,
        checkedName: true,
        isValidName: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        checkedName: false,
        isValidName: false,
      });
    }
  };

  const usernameInputChange = val => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        username: val,
        checkedUserName: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        checkedUserName: false,
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

  const handleConfirmPasswordChange = val => {
    if (val === data.password) {
      setData({
        ...data,
        confirm_password: val,
        isConfirmedPassword: true,
      });
    } else {
      setData({
        ...data,
        confirm_password: val,
        isConfirmedPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
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
            Daftar Sekarang!
          </Text>
        </Animatable.View>
        <Animatable.View
          onLayout={onLayout}
          animation="fadeInUpBig"
          style={[styles.footer, {top: 162}]}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <Text style={styles.textFooter}>Nama Pengguna</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Nama Pengguna"
                placeholderTextColor="#666666"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val => nameInputChange(val)}
              />
              {data.checkedName ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
            {data.isValidName ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  {data.name.length === 0
                    ? 'Nama pengguna tidak boleh kosong.'
                    : 'Nama pengguna terlalu pendek.'}
                </Text>
              </Animatable.View>
            )}

            <Text style={[styles.textFooter, {marginTop: 15}]}>
              Email/Nomor Ponsel
            </Text>
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
              {data.checkedUserName ? (
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
                  Kata sandi berisi setidaknya 8 karakter.
                </Text>
              </Animatable.View>
            )}
            {/* {footerSize.y} */}
            <Text style={[styles.textFooter, {marginTop: 15}]}>
              Konfirmasi Kata Sandi
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Konfirmasi Kata Sandi"
                secureTextEntry={data.confirm_secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val => handleConfirmPasswordChange(val)}
              />
              <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                {data.confirm_secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {data.isConfirmedPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Kata sandi tidak sama.</Text>
              </Animatable.View>
            )}

            <View style={styles.textPrivate}>
              <Text style={styles.color_textPrivate}>
                Dengan mendaftar, anda setuju dengan
              </Text>
              <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                {''}
                Persyaratan Layanan
              </Text>
              <Text style={styles.color_textPrivate}> dan</Text>
              <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                {' '}
                Kebijakan Privasi kami.
              </Text>
            </View>

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                  fetchData(data.name, data.username, data.password);
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
                        Daftar
                      </Text>
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Login')} //navigation.goBack()}
                style={[
                  styles.signIn,
                  {
                    borderColor: COLOR_PRIMARY_10, //'#009387',
                    borderWidth: 1,
                    marginTop: 15,
                    marginBottom: 10,
                  },
                ]}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: COLOR_PRIMARY_10, //'#009387',
                    },
                  ]}>
                  Masuk
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const {height} = Dimensions.get('window'); // window=app, screen=all
const height_logo = height * 0.18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_PRIMARY_60, //'#009387',
  },
  header: {
    //flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 0,
    overflow: 'hidden',
  },
  footer: {
    //flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 25,
    paddingBottom: 50,

    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
  },
  logoHeader: {
    alignItems: 'center',
    width: height_logo * 1.2,
    height: height_logo * 0.6,
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
