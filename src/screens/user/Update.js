import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import axios from 'axios';
import ModalSelector from 'react-native-modal-selector';
import ModalSelectorSearch from 'react-native-modal-selector-searchable';

// import baseURL from '../../assets/common/baseURL';
import {COLOR_PRIMARY_10} from '../../utils/constant';

import '../../assets/common/global'

const Update = () => {
  const [provinceList, setProvinceList] = useState([]);
  const [regencyList, setRegencyList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [villageList, setVillageList] = useState([]);
  const [address, setAddress] = useState({
    village: '',
    district: '',
    regency: '',
    province: '',
    country: 'Indonesia',
    zip: '',
    phone: '',
    dateOrdered: '',
  });

  useEffect(() => {
    getProvinces();
    return () => {
      setProvinceList();
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
      setDistrictList([]);
      setVillageList([]);
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
      setVillageList([]);
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
      setAddress(prev => ({...prev, village: ''}));
    } catch (error) {
      console.error(error);
    }
  };

  if (!provinceList) return null;

  return (
    <View style={styles.container}>
      {/* PROVINSI */}
      <ModalSelector
        data={provinceList}
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
          style={styles.textInput}
          activeOutlineColor={COLOR_PRIMARY_10}
          theme={{roundness: 10}}
          label="Provinsi"
          mode="outlined"
          value={address?.province || ''}
          right={<TextInput.Icon name="menu-down" style={{marginTop: 10}} />}
        />
      </ModalSelector>

      {/* KABUPATEN/KOTA */}
      {regencyList.length > 0 ? (
        <ModalSelector
          data={regencyList}
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
            activeOutlineColor={COLOR_PRIMARY_10}
            theme={{roundness: 10}}
            label="Kabupaten/Kota"
            mode="outlined"
            value={address?.regency || ''}
            right={<TextInput.Icon name="menu-down" style={{marginTop: 10}} />}
          />
        </ModalSelector>
      ) : null}

      {/* KECAMATAN */}
      {districtList.length > 0 ? (
        <ModalSelector
          data={districtList}
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
            activeOutlineColor={COLOR_PRIMARY_10}
            theme={{roundness: 10}}
            label="Kecamatan"
            mode="outlined"
            value={address?.district || ''}
            right={<TextInput.Icon name="menu-down" style={{marginTop: 10}} />}
          />
        </ModalSelector>
      ) : null}

      {/* KELURAHAN */}
      {villageList.length > 0 ? (
        <ModalSelector
          data={villageList}
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
            activeOutlineColor={COLOR_PRIMARY_10}
            theme={{roundness: 10}}
            label="Kelurahan"
            mode="outlined"
            value={address?.village || ''}
            right={<TextInput.Icon name="menu-down" style={{marginTop: 10}} />}
          />
        </ModalSelector>
      ) : null}
    </View>
  );
};

export default Update;

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
