import React, {useEffect, useState, useCallback, useContext} from 'react';
import {
  useNavigation,
  useFocusEffect,
  useTheme,
} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

//import auth from '@react-native-firebase/auth';
import AuthGlobal from '../../contexts/store/AuthGlobal';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  COLOR_GRAY,
  COLOR_GRAY_DARK,
  COLOR_GRAY_LIGHT,
  COLOR_PRIMARY_10,
  COLOR_PRIMARY_60,
} from '../../utils/constant';
// import baseURL from '../../assets/common/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {logoutUser} from '../../contexts/actions/Auth.actions';

import '../../assets/common/global';

const Account = () => {
  const navigation = useNavigation();
  //const user = auth().currentUser;

  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        navigation.navigate('RootNav', {screen: 'Login'});
      } else {
        AsyncStorage.getItem('jwt')
          .then(res => {
            axios
              .get(
                `${global.baseurl}/users/profile/${context.stateUser.user.userId}`,
                {
                  headers: {Authorization: `Bearer ${res}`},
                  timeout: 5000,
                },
              )
              .then(user => setUserProfile(user.data))
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));

        // axios
        //   .get(`${global.baseurl}/orders`)
        //   .then(x => {
        //     const data = x.data;
        //     //console.log(data);
        //     const userOrders = data.filter(
        //       order => order.user.id === context.stateUser.user.userId,
        //     );
        //     setOrders(userOrders);
        //   })
        //   .catch(error => console.log(error));
      }

      return () => {
        setUserProfile();
        setOrders();
      };
    }, [context.stateUser.isAuthenticated]),
  );

  const handleSignOut = () => {
    // FIREBASE
    // auth()
    //   .signOut()
    //   .then(() => {
    //     navigation.replace('WelcomeApp');
    //   })
    //   .catch(error => alert(error.message));

    // CONTEXT
    AsyncStorage.removeItem('jwt');
    logoutUser(context.dispatch);
  };

  return (
    <SafeAreaView style={styles.page}>
      {/* header */}
      <View style={styles.header}>
        {/* nama dan akun */}
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image
              source={{
                uri:
                  'https://ui-avatars.com/api/?background=6495ed&color=fff&&name=' +
                  (userProfile ? userProfile.name.replace(' ', '+') : 'User') +
                  '.png',
              }}
              size={80}></Avatar.Image>
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {marginTop: 15, marginBottom: 5}]}>
                {userProfile ? userProfile.name : 'User'}
              </Title>
              <Caption style={styles.caption}>
                {userProfile
                  ? `@${userProfile.name.replace(' ', '_').toLocaleLowerCase()}`
                  : '@user'}
              </Caption>
            </View>
          </View>
        </View>

        {/* lokasi, phone dan email */}
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color={COLOR_GRAY_LIGHT} size={20} />
            <Text style={{color: COLOR_GRAY_LIGHT, marginLeft: 20}}>
              {userProfile
                ? `${userProfile.regency}, ${userProfile.province}`
                : 'Kota Bandung, Jawa Barat'}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color={COLOR_GRAY_LIGHT} size={20} />
            <Text style={{color: COLOR_GRAY_LIGHT, marginLeft: 20}}>
              {userProfile ? userProfile.phone : '-'}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color={COLOR_GRAY_LIGHT} size={20} />
            <Text style={{color: COLOR_GRAY_LIGHT, marginLeft: 20}}>
              {userProfile ? userProfile.email : '-'}
            </Text>
          </View>
        </View>
      </View>

      {/* saldo dan order */}
      <View style={styles.infoBoxContainer}>
        <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {borderRightColor: COLOR_GRAY_DARK, borderRightWidth: 1},
            ]}>
            <Title style={styles.infoBoxTitle}>Rp. 500.000</Title>
            <Caption style={styles.infoBoxCaption}>Dompet</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title style={styles.infoBoxTitle}>18</Title>
            <Caption style={styles.infoBoxCaption}>Transaksi</Caption>
          </View>
        </View>
      </View>

      {/* menu */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={[styles.menuWrepper, {paddingTop: 20}]}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="heart-outline" color="cadetblue" size={25} />
              <Text style={styles.menuItemText}>Kesukaan</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="credit-card" color="cadetblue" size={25} />
              <Text style={styles.menuItemText}>Pembayaran</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="share-outline" color="cadetblue" size={25} />
              <Text style={styles.menuItemText}>Ajak Teman</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="account-check-outline" color="cadetblue" size={25} />
              <Text style={styles.menuItemText}>Bantuan</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => navigation.navigate('RootNav', {screen: 'Update'})}>
            <View style={styles.menuItem}>
              <Icon name="cog-outline" color="cadetblue" size={25} />
              <Text style={styles.menuItemText}>Pengaturan</Text>
            </View>
          </TouchableRipple>
        </View>

        <View
          style={[
            styles.menuWrepper,
            styles.menuWrepperExt,
            {paddingBottom: 50},
          ]}>
          <TouchableRipple onPress={handleSignOut}>
            <View style={styles.menuItem}>
              <Icon name="logout" color="lightcoral" size={25} />
              <Text style={styles.menuItemText}>Keluar</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: COLOR_PRIMARY_10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingBottom: 40,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    color: '#777',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoBoxContainer: {
    backgroundColor: 'white',
    paddingVertical: 20,
    marginHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: -windowHeight * 0.05,
  },
  infoBoxWrapper: {
    //borderBottomColor: '#DDDDDD',
    //borderBottomWidth: 1,
    //borderTopColor: '#DDDDDD',
    //borderTopWidth: 1,
    flexDirection: 'row',
    height: 40,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBoxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  infoBoxCaption: {
    fontSize: 14,
  },
  menuWrepper: {
    marginTop: 10,
  },
  menuWrepperExt: {
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 2,
    borderTopColor: COLOR_GRAY,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 26,
  },
});
