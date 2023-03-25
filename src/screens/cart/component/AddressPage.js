import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState, useContext} from 'react';
import {HelperText, TextInput, TouchableRipple} from 'react-native-paper';

import ModalSelector from 'react-native-modal-selector';
import ModalSelectorSearch from 'react-native-modal-selector-searchable';
// import baseURL from '../../../assets/common/baseURL';
import axios from 'axios';
import {COLOR_GRAY_LIGHT, COLOR_PRIMARY_10} from '../../../utils/constant';
import {ActionButton} from '../../../components';
import AuthGlobal from '../../../contexts/store/AuthGlobal';

import '../../../assets/common/global';

const AddressPage = props => {
  const context = useContext(AuthGlobal);
  const {item} = props;

  const [userProfile, setUserProfile] = useState();
  const [provinceList, setProvinceList] = useState();
  const [regencyList, setRegencyList] = useState();
  const [districtList, setDistrictList] = useState();
  const [villageList, setVillageList] = useState();
  const [disabled, setDisabled] = useState({
    province: false,
    regency: true,
    district: true,
    village: true,
  });
  const [address, setAddress] = useState({
    village: '',
    district: '',
    regency: '',
    province: '',
    country: 'Indonesia',
    zip: '',
    phone: '',
    shippingAddress1: '',
    shippingAddress2: '-',
  });

  useEffect(() => {
    setUserProfile(context.stateUser.userProfile);
    getProvinces();
    setRegencyList([{id: 0, nama: ''}]);
    setDistrictList([{id: 0, nama: ''}]);
    setVillageList([{id: 0, nama: ''}]);
    return () => {
      setUserProfile();
      setProvinceList();
      setRegencyList();
      setDistrictList();
      setVillageList();
    };
  }, []);

  const getProvinces = async () => {
    try {
      const resp = await axios.get(`${global.baseurl}/regions/provinces`, {
        timeout: 5000,
      });
      setProvinceList(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRegencies = async provinceId => {
    try {
      const resp = await axios.get(
        `${global.baseurl}/regions/regencies/${provinceId}`,
        {timeout: 5000},
      );
      setRegencyList(resp.data);
      setDistrictList([{id: 0, nama: ''}]);
      setVillageList([{id: 0, nama: ''}]);
      setDisabled(prev => ({
        ...prev,
        regency: false,
        district: true,
        village: true,
      }));
      setAddress(prev => ({...prev, regency: '', district: '', village: ''}));
    } catch (error) {
      console.error(error);
    }
  };

  const getDistrics = async regencyId => {
    try {
      const resp = await axios.get(
        `${global.baseurl}/regions/districts/${regencyId}`,
        {timeout: 5000},
      );
      setDistrictList(resp.data);
      setVillageList([{id: 0, nama: ''}]);
      setDisabled(prev => ({...prev, district: false, village: true}));
      setAddress(prev => ({...prev, district: '', village: ''}));
    } catch (error) {
      console.error(error);
    }
  };

  const getVillages = async districtId => {
    try {
      const resp = await axios.get(
        `${global.baseurl}/regions/villages/${districtId}`,
        {timeout: 5000},
      );
      setVillageList(resp.data);
      setDisabled(prev => ({...prev, village: false}));
      setAddress(prev => ({...prev, village: ''}));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (address) {
      const isComplete = Object.values(address).every(x => !!x);
      if (isComplete) {
        props.submit({name: 'address', data: address});
      }
    }
  }, [address]);

  const submitForm = () => {
    const isComplete = Object.values(address).every(x => !!x);
    if (isComplete) {
      //props.submit({name: 'address', data: address});
      props.pages(1);
    }
  };

  if (!provinceList) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {item.name}
        </Text>
      </View>

      <View style={styles.body}>
        {/* Default shippment */}
        {userProfile.shippingAddress1 ? (
          <View
            style={{
              borderRadius: 3,
              borderColor: 'red',
              borderWidth: 1,
              padding: 2,
            }}>
            <Text>Alamat pengiriman</Text>
            <Text>{userProfile.name}</Text>
            <Text>{userProfile.village}</Text>
          </View>
        ) : null}

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollVIew}
          contentContainerStyle={styles.scrollVIewContent}>
          {/* <View style={styles.container}> */}
          {/* PROVINSI */}
          <ModalSelector
            data={provinceList}
            disabled={disabled.province}
            initValue="Pilih provinsi"
            cancelText="Batal"
            supportedOrientations={['landscape']}
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={option => {
              setAddress(prev => ({...prev, province: option.nama}));
              getRegencies(option.kode);
            }}
            keyExtractor={item => item.id}
            labelExtractor={item => item.nama}
            overlayStyle={{
              flex: 1,
              padding: '5%',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            animationType="slide"
            cancelStyle={{
              backgroundColor: COLOR_PRIMARY_10,
              borderColor: COLOR_PRIMARY_10,
              borderWidth: 1,
              borderRadius: 4,
            }}
            cancelTextStyle={{color: 'white'}}
            optionTextStyle={{color: '#333'}}
            optionStyle={{borderBottomColor: COLOR_PRIMARY_10}}
            optionContainerStyle={{
              backgroundColor: 'white',
              borderWidth: 2,
              borderColor: COLOR_PRIMARY_10,
              borderRadius: 8,
            }}>
            <TextInput
              style={{width: '100%', height: 40, justifyContent: 'center'}}
              theme={{roundness: 10}}
              activeOutlineColor={COLOR_PRIMARY_10}
              label="Provinsi"
              mode="outlined"
              value={address?.province || ''}
              right={
                <TextInput.Icon name="menu-down" style={{marginTop: 10}} />
              }
            />
          </ModalSelector>

          {/* KABUPATEN/KOTA */}
          <ModalSelector
            data={regencyList}
            disabled={disabled.regency}
            initValue="Pilih Kabupaten/Kota"
            cancelText="Batal"
            supportedOrientations={['landscape']}
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={option => {
              setAddress(prev => ({...prev, regency: option.nama}));
              getDistrics(option.kode);
            }}
            keyExtractor={item => item.id}
            labelExtractor={item => item.nama}
            overlayStyle={{
              flex: 1,
              padding: '5%',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            animationType="slide"
            cancelStyle={{
              backgroundColor: COLOR_PRIMARY_10,
              borderColor: COLOR_PRIMARY_10,
              borderWidth: 1,
              borderRadius: 4,
            }}
            cancelTextStyle={{color: 'white'}}
            optionTextStyle={{color: '#333'}}
            optionStyle={{borderBottomColor: COLOR_PRIMARY_10}}
            optionContainerStyle={{
              backgroundColor: 'white',
              borderWidth: 2,
              borderColor: COLOR_PRIMARY_10,
              borderRadius: 8,
            }}>
            <TextInput
              style={styles.textInput}
              theme={{roundness: 10}}
              activeOutlineColor={COLOR_PRIMARY_10}
              label="Kabupaten/Kota"
              mode="outlined"
              value={address?.regency || ''}
              right={
                <TextInput.Icon name="menu-down" style={{marginTop: 10}} />
              }
            />
          </ModalSelector>

          {/* KECAMATAN */}
          <ModalSelector
            data={districtList}
            disabled={disabled.district}
            initValue="Pilih kecamatan"
            cancelText="Batal"
            supportedOrientations={['landscape']}
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={option => {
              setAddress(prev => ({...prev, district: option.nama}));
              getVillages(option.kode);
            }}
            keyExtractor={item => item.id}
            labelExtractor={item => item.nama}
            overlayStyle={{
              flex: 1,
              padding: '5%',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            animationType="slide"
            cancelStyle={{
              backgroundColor: COLOR_PRIMARY_10,
              borderColor: COLOR_PRIMARY_10,
              borderWidth: 1,
              borderRadius: 4,
            }}
            cancelTextStyle={{color: 'white'}}
            optionTextStyle={{color: '#333'}}
            optionStyle={{borderBottomColor: COLOR_PRIMARY_10}}
            optionContainerStyle={{
              backgroundColor: 'white',
              borderWidth: 2,
              borderColor: COLOR_PRIMARY_10,
              borderRadius: 8,
            }}>
            <TextInput
              style={styles.textInput}
              theme={{roundness: 10}}
              activeOutlineColor={COLOR_PRIMARY_10}
              label="Kecamatan"
              mode="outlined"
              value={address?.district || ''}
              right={
                <TextInput.Icon name="menu-down" style={{marginTop: 10}} />
              }
            />
          </ModalSelector>

          {/* KELURAHAN */}
          <ModalSelector
            data={villageList}
            disabled={disabled.village}
            initValue="Pilih kelurahan"
            cancelText="Batal"
            supportedOrientations={['landscape']}
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={option => {
              setAddress(prev => ({...prev, village: option.nama}));
            }}
            keyExtractor={item => item.id}
            labelExtractor={item => item.nama}
            overlayStyle={{
              flex: 1,
              padding: '5%',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            animationType="slide"
            cancelStyle={{
              backgroundColor: COLOR_PRIMARY_10,
              borderColor: COLOR_PRIMARY_10,
              borderWidth: 1,
              borderRadius: 4,
            }}
            cancelTextStyle={{color: 'white'}}
            optionTextStyle={{color: '#333'}}
            optionStyle={{borderBottomColor: COLOR_PRIMARY_10}}
            optionContainerStyle={{
              backgroundColor: 'white',
              borderWidth: 2,
              borderColor: COLOR_PRIMARY_10,
              borderRadius: 8,
            }}>
            <TextInput
              style={styles.textInput}
              theme={{roundness: 10}}
              activeOutlineColor={COLOR_PRIMARY_10}
              label="Kelurahan"
              mode="outlined"
              value={address?.village || ''}
              right={
                <TextInput.Icon name="menu-down" style={{marginTop: 10}} />
              }
            />
          </ModalSelector>

          {/* STREET */}
          <TextInput
            style={styles.textInput} //{styles.textInputMulti}
            theme={{roundness: 10}}
            activeOutlineColor={COLOR_PRIMARY_10}
            label="Jalan"
            mode="outlined"
            maxLength={100}
            //multiline={true}
            //textAlignVertical="auto"
            value={address?.shippingAddress1 || ''}
            onChangeText={text =>
              setAddress(prev => ({...prev, shippingAddress1: text}))
            }
          />

          {/* ZIP */}
          <TextInput
            style={styles.textInput}
            theme={{roundness: 10}}
            activeOutlineColor={COLOR_PRIMARY_10}
            label="Kode Pos"
            mode="outlined"
            keyboardType={'numeric'}
            maxLength={5}
            value={address?.zip || ''}
            onChangeText={text =>
              setAddress(prev => ({...prev, zip: text.replace(/[^0-9]/g, '')}))
            }
          />

          {/* PHONE */}
          <TextInput
            style={styles.textInput}
            theme={{roundness: 10}}
            activeOutlineColor={COLOR_PRIMARY_10}
            label="No. Ponsel"
            mode="outlined"
            keyboardType={'phone-pad'}
            maxLength={15}
            value={address?.phone || ''}
            onChangeText={text =>
              setAddress(prev => ({
                ...prev,
                phone: text.replace(/[^0-9+]/g, ''),
              }))
            }
          />

          {/* STREET 2 (AS WE NEED) */}
          <TextInput
            style={styles.textInput}
            theme={{roundness: 10}}
            activeOutlineColor={COLOR_PRIMARY_10}
            label="Keterangan"
            mode="outlined"
            maxLength={40}
            value={address?.shippingAddress2 || ''}
            onChangeText={text =>
              setAddress(prev => ({...prev, shippingAddress2: text}))
            }
          />
          {/* </View> */}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.info}>Sudah lengkap!</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginRight: 10}}>
            <ActionButton
              text={'Lanjut Pengiriman'}
              color={'white'}
              event={() => submitForm()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddressPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PRIMARY_10,
    //elevation: 3

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  body: {
    //width: '100%',
    flex: 1,
  },
  footer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-end',
    // backgroundColor: 'white',
    // elevation: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 20,
  },
  scrollVIew: {
    width: '100%',
  },
  scrollVIewContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 40,
    marginTop: 15,
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
  },
  textInputMulti: {
    width: '100%',
    minHeight: 40,
    marginTop: 15,
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
  },
  info: {
    fontSize: 18,
    margin: 20,
    color: 'white',
  },
});
