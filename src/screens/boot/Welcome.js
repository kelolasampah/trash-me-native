import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Logo} from '../../assets';
import {COLOR_PRIMARY_10, COLOR_PRIMARY_60} from '../../utils/constant';

const Welcome = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      {/* <ImageBackground source={SplashBackground} style={styles.background}> */}
      <StatusBar backgroundColor={COLOR_PRIMARY_60} barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="fadeInUpBig"
          duraton="1500"
          source={Logo}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig">
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}>
          Tetap terhubung dengan kami!
        </Text>
        <Text style={styles.text}>Masuk dengan akun, atau daftar segera!</Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('Login');
            }}>
            <LinearGradient
              colors={[COLOR_PRIMARY_60, COLOR_PRIMARY_10]}
              style={styles.signIn}>
              <Text style={styles.textSign}>Memulai</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
      {/* </ImageBackground> */}
    </View>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_PRIMARY_60,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo * 1.4,
    height: height_logo * 0.7,
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    marginTop: 10,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
