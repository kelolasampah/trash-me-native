import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {ScrollView, FlatList} from 'react-native'; //'react-native-gesture-handler'
import React, {useEffect, useState, useCallback, useContext} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import moment from 'moment/moment';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ActionButton,
  AdsBanner,
  ButtonIcon,
  CancelButton,
  InfoCard,
  StaticHeader,
} from '../../components';
import {
  COLOR_DISABLE,
  COLOR_GRAY,
  COLOR_GRAY_LIGHT,
  COLOR_PRIMARY_01,
  COLOR_PRIMARY_03,
  COLOR_PRIMARY_06,
  COLOR_PRIMARY_10,
  COLOR_PRIMARY_30,
  COLOR_PRIMARY_60,
  FONT_ABold,
  FONT_ASemi,
  FONT_BBold,
  FONT_BLight,
  FONT_BRegular,
  FONT_BSemi,
} from '../../utils/constant';
import {ImageHeader, Logo} from '../../assets';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import axios from 'axios';
import AuthGlobal from '../../contexts/store/AuthGlobal';
import {getUserProfile} from '../../contexts/actions/Auth.actions';
// import baseURL from '../../assets/common/baseURL';
import LinearGradient from 'react-native-linear-gradient';
import {initiateSocket} from '../../services/SocketIO';

import {io} from 'socket.io-client';
import {LocationCard} from '../../components';

import '../../assets/common/global';
import {useRef} from 'react';
import {set} from 'react-hook-form';

//const jsonProducts = require('../../assets/data/products.json');
const jsonServices = require('../../assets/data/services.json');
const jsonFeeds = require('../../assets/data/feeds.json');

const Home = () => {
  const navigation = useNavigation();
  const [addressSave, setAddressSave] = useState('');
  const {getItem, setItem} = useAsyncStorage('addressList');

  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [lokasi, setLokasi] = useState({
    update: false,
    jalan: null,
    kecamatan: null,
    kota: null,
    pos: null,
    provinsi: null,
    alamat: null,
  });

  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [feeds, setFeeds] = useState([]);

  //Async storage
  const readItemFromStorage = async () => {
    const item = await getItem();
    item !== null ? setAddressList(JSON.parse(item)) : setAddressList([]);
  };

  const writeItemToStorage = async () => {
    await setItem(JSON.stringify(addressList));
  };

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        navigation.navigate('Login');
      } else {
        getUserProfile(context.stateUser.user.userId, context.dispatch);
        readItemFromStorage();
        // AsyncStorage.getItem('jwt')
        //   .then(res => {
        //     axios
        //       .get(`${global.baseurl}/users/profile/${context.stateUser.user.userId}`, {
        //         headers: {Authorization: `Bearer ${res}`},
        //         timeout: 5000,
        //       })
        //       .then(user => setUserProfile(user.data))
        //       .catch(error => console.log(error));
        //   })
        //   .catch(error => console.log(error));
      }

      return () => {
        setUserProfile();
      };
    }, [context.stateUser.isAuthenticated]),
  );

  useEffect(() => {
    if (lokasi.update) {
      setModalVisible(true);
      setLokasi({
        ...lokasi,
        update: false,
        updateAt: moment(new Date()).local().format('DD-MM-YYYY HH:mm:ss.SSS'),
      });
    }
  }, [lokasi]);

  useEffect(() => {
    if (addressList !== null) {
      writeItemToStorage();
    }
  }, [addressList]);

  useEffect(() => {
    //setProducts(jsonProducts);
    axios
      .get(`${global.baseurl}/products`, {timeout: 10000})
      .then(res => setProducts(res.data))
      .catch(err => alert('Gagal memuat produk'));

    setServices(jsonServices);
    setFeeds(jsonFeeds);
    //setModalVisible(false);
    //initiateSocket('','')

    return () => {
      setProducts([]);
      setServices([]);
      setFeeds([]);
    };
  }, []);

  // useEffect(() => {
  //   //start socket connections
  //   var socket = io(`http://10.0.2.2:11001`, {
  //     path: '/sio/v1',
  //     query: {topic: 'order'},
  //     auth: {
  //       id: context.stateUser.user.userId,
  //       isAdmin: context.stateUser.user.isAdmin,
  //     },
  //   });
  //   socket.connect();
  //   socket.on('order', () => {
  //     console.log('called');
  //   });

  //   return () => {};
  // }, []);

  const onAddressSave = () => {
    const saveName = addressSave !== '' ? addressSave : 'Alamat rumah';

    if (addressList.filter(e => e.name === saveName).length > 0) {
      const newAddressList = [...addressList];
      newAddressList[saveName] = {name: saveName, lokasi};
      setAddressList(newAddressList);
    } else {
      if (addressList.length >= 5) addressList.shift();
      setAddressList(prev => [...prev, {name: saveName, lokasi}]);
    }
  };

  const sectionMenu = () => {
    return (
      <View style={styles.layanan}>
        <Text style={styles.label}>{services.title}</Text>
        <View style={styles.iconLayanan}>
          {services.data &&
            services.data.map(item => {
              return (
                <ButtonIcon
                  key={item.key}
                  text={item.text}
                  type={item.type}
                  event={() =>
                    item && item.navigation !== '' && item.screen !== ''
                      ? navigation.push(item.navigation, {screen: item.screen})
                      : {}
                  }
                />
              );
            })}
        </View>
      </View>
    );
  };

  const sectionFeeds = () => {
    return (
      <View style={styles.feeds}>
        {feeds &&
          feeds.map(item => {
            return item.type === 'ads' ? (
              <View style={styles.iklan} key={item.key}>
                <Text style={styles.label}>{item.title}</Text>
                <AdsBanner content={item.data} durasi={5} />
              </View>
            ) : (
              <View style={styles.informasi} key={item.key}>
                <Text style={styles.label}>{item.title}</Text>
                <FlatList
                  //nestedScrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={item.data}
                  renderItem={({item}) => (
                    <InfoCard key={item.id} item={item} />
                  )}
                  keyExtractor={item => item.key}
                />
              </View>
            );
          })}
      </View>
    );
  };

  const sectionModals = () => {
    //aliceblue
    //azure
    //honeydew
    //paleturquoise
    //powderblue
    return (
      <Modal
        style={{margin: 0}}
        isVisible={isModalVisible}
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={360}
        animationOutTiming={300}
        useNativeDriver={true}>
        <View
          style={{
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor: 'honeydew',
            opacity: 0.98,
            marginHorizontal: 30,
          }}>
          <View
            style={{
              paddingHorizontal: 10,
              marginVertical: 15,
              alignItems: 'center',
              width: '100%',
            }}>
            <Text style={styles.textModalTitle}>Simpan lokasi saat ini?</Text>
            <View style={styles.sparator} />
            <Text style={styles.textModalContent}>{lokasi.alamat}</Text>
            <Text
              style={[
                styles.textModalContent,
                {
                  textAlign: 'left',
                },
              ]}>
              Simpan sebagai:
            </Text>
            <TextInput
              value={addressSave}
              style={styles.textInputModal}
              placeholder="Alamat rumah"
              onSubmitEditing={onAddressSave}
              onChangeText={setAddressSave}
            />
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
                <ActionButton
                  text={'Simpan'}
                  color={'white'}
                  event={() => {
                    setModalVisible(false);
                    onAddressSave();
                  }}
                />
              </View>
              <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
                <CancelButton
                  text={'Batal'}
                  color={COLOR_PRIMARY_01}
                  event={() => {
                    setAddressSave('');
                    setModalVisible(false);
                    setAddressList([]);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  //const STYLES = ['default', 'dark-content', 'light-content'];
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          backgroundColor={COLOR_PRIMARY_10}
          barStyle={'light-content'}
        />

        {/* BOX OVERLAY */}
        <LinearGradient
          colors={[COLOR_PRIMARY_60, COLOR_PRIMARY_01]}
          start={{x: 0, y: 0}}
          end={{x: 0.5, y: 2}}
          style={[StyleSheet.absoluteFill, styles.boxOverlay]}
        />

        {/* CIRCLE OVERLAY */}
        <LinearGradient
          style={styles.circleOverlay}
          colors={[COLOR_PRIMARY_60 + '0f', COLOR_PRIMARY_10]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 2}}
        />

        {/* HEADER OVERLAY */}
        <View style={styles.headerOverlay}>
          <View style={styles.hello}>
            <Text style={styles.selamat}>Selamat Datang, </Text>
            <Text style={styles.username}>
              {context.stateUser.userProfile?.name || 'userGuest'}
            </Text>
            {/* <Text style={styles.username}>
              {userProfile ? userProfile.name : 'userGuest'}
            </Text> */}
          </View>
          <Image source={Logo} style={styles.logo} />
        </View>

        {/* LOCATION TAG */}
        <View style={styles.boxLocation}>
          <LocationCard lokasi={lokasi} setLokasi={setLokasi} />
        </View>

        {/* HEADER SPACER */}
        <View style={styles.header} />

        {/* DINAMIC VIEW */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {/* SECTIN MENU */}
          {sectionMenu()}

          {/* SECTION FEEDS */}
          {sectionFeeds()}

          {/* SECTION MODALS */}
          {sectionModals()}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  boxOverlay: {
    width: windowWidth,
    height: 145,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,

    zIndex: 1,
  },
  circleOverlay: {
    width: 220,
    height: 220,
    borderRadius: 220 / 2,

    position: 'absolute',
    top: -95,
    left: -35,
    zIndex: 1,
  },
  headerOverlay: {
    flexDirection: 'row',
    marginTop: windowHeight * 0.02,
    width: '100%',
    height: 60,
    paddingHorizontal: 15,
    alignItems: 'center',

    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  boxLocation: {
    backgroundColor: 'transparent',
    zIndex: 2,
    marginTop: 0,
    position: 'absolute',
    width: '100%',
    top: 100,
    left: 0,
  },
  hello: {
    width: '65%',
  },
  selamat: {
    width: 160,
    fontSize: 18,
    fontFamily: FONT_ASemi,
    paddingHorizontal: 2,
    color: 'limegreen',
  },
  username: {
    width: 160,
    fontSize: 18,
    fontFamily: FONT_ABold,
    paddingHorizontal: 2,
    color: '#777',
  },
  logo: {
    width: windowWidth * 0.32,
    //height: windowHeight * 0.06,
    aspectRatio: 16 / 9,
  },
  header: {
    width: windowWidth,
    height: 120,
    paddingHorizontal: 20,
    paddingTop: 10,

    backgroundColor: 'transparent',
  },
  layanan: {
    flex: 1,
    paddingTop: 25 + 50,
    paddingBottom: 5,
    paddingHorizontal: 10,

    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: COLOR_GRAY,
  },
  label: {
    fontSize: 18,
    fontFamily: FONT_ABold,
    marginBottom: 10,
  },
  text: {
    fontSize: 24,
    fontFamily: FONT_ABold,
  },
  iconLayanan: {
    // height: 250,
    // marginTop: 10,
    // flexDirection: 'column',
    // alignContent: 'center',
    // alignItems: 'center',
    // flexWrap: 'wrap',

    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  feeds: {
    flex: 1,
    //borderTopLeftRadius: 40,
    //borderTopRightRadius: 40,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  iklan: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  informasi: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  sparator: {
    borderWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLOR_PRIMARY_01,
    borderBottomColor: COLOR_PRIMARY_01,
    width: '95%',
    marginBottom: 8,
    marginTop: 4,
  },
  textModalTitle: {
    fontFamily: FONT_BBold,
    fontSize: 16,
    marginBottom: 10,
  },
  textModalContent: {
    marginBottom: 10,
    fontSize: 12,
    fontFamily: FONT_BRegular,
    width: '85%',
  },
  textInputModal: {
    borderWidth: 1,
    fontFamily: FONT_BLight,
    fontStyle: 'italic',
    textAlignVertical: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
    fontSize: 12,
    borderRadius: 8,
    height: 28,
    width: '85%',
    borderColor: COLOR_PRIMARY_01,
  },
});
