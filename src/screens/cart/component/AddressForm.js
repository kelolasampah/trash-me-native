import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {HelperText, TextInput} from 'react-native-paper';

import ModalSelector from 'react-native-modal-selector';
import ModalSelectorSearch from 'react-native-modal-selector-searchable';
// import baseURL from '../../../assets/common/baseURL';
import axios from 'axios';
import {COLOR_PRIMARY_10} from '../../../utils/constant';

import '../../../assets/common/global'

const AddressForm = props => {
  //const {submit} = props.item;

  //let order = {
  //    village, true villages
  //    district, true districs
  //    regency, true regencies
  //    province, true provinces
  //    country, true
  //    dateOrdered: Date.now(),
  //    orderItems,
  //    phone, true
  //    shippingAddress1: address, true (street2, vilage, district)
  //    shippingAddress2: address2, opt ('')
  //    status: "3", true
  //    user, user
  //    totalPrice,
  //    zip, true
  //}

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
    shippingAddress2: '',
    user: '',
    orderItems: '',
    status: '3',
    totalPrice: '',
    dateOrdered: Date.now(),
  });

  useEffect(() => {
    getProvinces();
    setRegencyList([{id: 0, nama: ''}]);
    setDistrictList([{id: 0, nama: ''}]);
    setVillageList([{id: 0, nama: ''}]);
    return () => {
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
      const strAscending = [...resp.data].sort((a, b) =>
        a.name > b.name ? 1 : -1,
      );
      setProvinceList(strAscending);
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
      const strAscending = [...resp.data].sort((a, b) =>
        a.nama > b.nama ? 1 : -1,
      );
      setRegencyList(strAscending);
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
      const strAscending = [...resp.data].sort((a, b) =>
        a.nama > b.nama ? 1 : -1,
      );
      setDistrictList(strAscending);
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
      const strAscending = [...resp.data].sort((a, b) =>
        a.nama > b.nama ? 1 : -1,
      );
      setVillageList(strAscending);
      setDisabled(prev => ({...prev, village: false}));
      setAddress(prev => ({...prev, village: ''}));
    } catch (error) {
      console.error(error);
    }
  };

  const capitalizeStr = (text) =>  {
    //text.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())
    return text.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  if (!provinceList) return null;

  return (
    <View style={styles.container}>
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
          setAddress(prev => ({...prev, province: capitalizeStr(option.nama)}));
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
          right={<TextInput.Icon name="menu-down" style={{marginTop: 10}} />}
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
          setAddress(prev => ({...prev, regency: capitalizeStr(option.nama)}));
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
          right={<TextInput.Icon name="menu-down" style={{marginTop: 10}} />}
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
          setAddress(prev => ({...prev, district: capitalizeStr(option.nama)}));
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
          right={<TextInput.Icon name="menu-down" style={{marginTop: 10}} />}
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
          setAddress(prev => ({...prev, village: capitalizeStr(option.nama)}));
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
          right={<TextInput.Icon name="menu-down" style={{marginTop: 10}} />}
        />
      </ModalSelector>

      {/* STREET */}
      <TextInput
        style={styles.textInput}
        theme={{roundness: 10}}
        activeOutlineColor={COLOR_PRIMARY_10}
        label="Jalan"
        mode="outlined"
        value={address?.shippingAddress1 || ''}
        onChangeText={text =>
          setAddress(prev => ({...prev, shippingAddress1: text}))
        }
      />

      {/* STREET 2 */}
      <TextInput
        style={styles.textInput}
        theme={{roundness: 10}}
        activeOutlineColor={COLOR_PRIMARY_10}
        label="Keterangan"
        mode="outlined"
        value={address?.shippingAddress2 || ''}
        onChangeText={text =>
          setAddress(prev => ({...prev, shippingAddress2: text}))
        }
      />

      {/* ZIP */}
      <TextInput
        style={styles.textInput}
        theme={{roundness: 10}}
        activeOutlineColor={COLOR_PRIMARY_10}
        label="Kode Pos"
        mode="outlined"
        value={address?.zip || ''}
        onChangeText={text => setAddress(prev => ({...prev, zip: text}))}
      />

      {/* PHONE */}
      <TextInput
        style={styles.textInput}
        theme={{roundness: 10}}
        activeOutlineColor={COLOR_PRIMARY_10}
        label="No. Ponsel"
        mode="outlined"
        value={address?.phone || ''}
        onChangeText={text => setAddress(prev => ({...prev, phone: text}))}
      />
    </View>
  );
};

export default AddressForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    marginVertical: 20,
  },
  textInput: {
    width: '100%',
    height: 40,
    marginTop: 15,
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
  },
});
