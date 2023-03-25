
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import {
  TextInput,
  TouchableRipple,
  Provider,
  Surface,
  Menu,
  Divider,
  Button,
} from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import Swiper from 'react-native-swiper';
import {useForm, useFieldArray, Controller} from 'react-hook-form';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR_PRIMARY_01, COLOR_PRIMARY_10, COLOR_PRIMARY_60} from '../../utils/constant';
import axios from 'axios';

import ModalSelector from 'react-native-modal-selector';
import ModalSelectorSearch from 'react-native-modal-selector-searchable';
import {setUseProxies} from 'immer';

const jsonForm = require('../../assets/data/form.json');

const PAGES = [
  {key: 0, name: 'Alamat'},
  {key: 1, name: 'Pesanan'},
  {key: 2, name: 'Pembayaran'},
  {key: 3, name: 'Konfirmasi'},
];

const IndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: COLOR_PRIMARY_10, //'#fe7013',
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: COLOR_PRIMARY_10, //'#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: COLOR_PRIMARY_10, //'#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: COLOR_PRIMARY_10, //'#fe7013',
  stepIndicatorUnFinishedColor: '#fff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: COLOR_PRIMARY_10, //'#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: COLOR_PRIMARY_10, //'#fe7013',
};

const getStepIndicatorIconConfig = ({position, stepStatus}) => {
  const iconConfig = {
    name: 'package-up', //handshake
    color: stepStatus === 'finished' ? '#ffffff' : COLOR_PRIMARY_10, //'#fe7013',
    size: 15,
  };
  switch (position) {
    case 0: {
      iconConfig.name = 'map-marker';
      break;
    }
    case 1: {
      iconConfig.name = 'chart-box';
      break;
    }
    case 2: {
      iconConfig.name = 'credit-card-outline';
      break;
    }
    case 3: {
      iconConfig.name = 'handshake';
      break;
    }
    default: {
      break;
    }
  }
  return iconConfig;
};

const Checkout_HOOKS = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [order, setOrder] = useState();
  const [listProvinces, setListProvinces] = useState();
  const [listRegencies, setListRegencies] = useState();
  const [listDistricts, setListDistricts] = useState();
  const [listVillages, setListVillages] = useState();

  //let order = {
  //    city, true regencie
  //    province, true province
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

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      provinces: '',
      regencies: '',
      districts: '',
      villages: '',
      streets: '',
      phone: '',
      zip: '',
    },
  });
  const onSubmit = data => console.log(data);

  useEffect(() => {
    //const index = jsonForm.findIndex(x => x.type === 'address');
    //setFormAddress(jsonForm[index].data);
    getProvinces();
    return () => {
      setUseProxies();
      //setFormAddress();
    };
  }, []);

  const onStepPress = position => {
    setCurrentPage(position);
  };

  const getProvinces = async () => {
    try {
      const resp = await axios.get(
        `https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json`,
      );
      const strAscending = [...resp.data].sort((a, b) =>
        a.name > b.name ? 1 : -1,
      );
      setListProvinces(strAscending);
      console.log('=> provinces');
    } catch (error) {
      console.error(error);
    }
  };
  const getRegencies = async provinceId => {
    try {
      const resp = await axios.get(
        `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`,
      );
      setListRegencies(resp.data);
      console.log('=> regencies');
    } catch (error) {
      console.error(error);
    }
  };
  const getDistrics = async regencyId => {
    try {
      const resp = await axios.get(
        `https://emsifa.github.io/api-wilayah-indonesia/api/districts/${regencyId}.json`,
      );
      setListDistricts(resp.data);
      console.log('=> districts');
    } catch (error) {
      console.error(error);
    }
  };

  const getVillages = async districtId => {
    try {
      const resp = await axios.get(
        `https://emsifa.github.io/api-wilayah-indonesia/api/villages/${districtId}.json`,
      );
      setListVillages(resp.data);
      console.log('=> villages');
    } catch (error) {
      console.error(error);
    }
  };

  if (!listProvinces) return null;
  console.log('prov: '); //+ JSON.stringify(listProvinces));

  const renderAlamat = data => {
    return (
      <View style={styles.page}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            paddingVertical: 5,
            marginTop: 5,
          }}>
          {data.name}
        </Text>
        <ScrollView style={{width: '100%'}}>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: '* Please enter your username *',
              },
              // minLength: {
              //   value: 5,
              //   message: '* Account should be 5-20 characters in length! *',
              // },
              // maxLength: {
              //   value: 20,
              //   message: '* Account should be 5-20 characters in length! *',
              // },
              // pattern: {
              //   value: new RegExp(/^[a-zA-Z0-9_-]*$/),
              //   message: '* Invalid character *',
              // },
            }}
            render={({field: {onChange, value}}) => (
              <View style={{flex: 1, paddingHorizontal: 20}}>
                <ModalSelector
                  data={listProvinces}
                  initValue="Pilih provinsi"
                  cancelText="Batal"
                  supportedOrientations={['landscape']}
                  accessible={true}
                  scrollViewAccessibilityLabel={'Scrollable options'}
                  cancelButtonAccessibilityLabel={'Cancel Button'}
                  onChange={option => {
                    setValue('provinces', option.name);
                    getRegencies(option.id)
                  }}
                  keyExtractor={item => item.id}
                  labelExtractor={item => item.name}
                  overlayStyle={{
                    flex: 1,
                    padding: '5%',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                  }}
                  animationType="slide"
                  cancelStyle={{backgroundColor: COLOR_PRIMARY_10, borderColor:COLOR_PRIMARY_10, borderWidth: 1, borderRadius: 4 }}
                  cancelTextStyle={{color: 'white'}}
                  optionTextStyle={{color: '#333'}}
                  //childrenContainerStyle={{backgroundColor: COLOR_PRIMARY_10}}
                  //touchableActiveOpacity={0.5}
                  optionStyle={{borderBottomColor: COLOR_PRIMARY_10}}
                  optionContainerStyle={{backgroundColor: 'white', borderWidth: 2, borderColor: COLOR_PRIMARY_10, borderRadius: 8}}
                  >
                  <TextInput
                    style={{width: '100%', height: 40, justifyContent: 'center'}}
                    //borderRadius={8}
                    activeOutlineColor={COLOR_PRIMARY_10}
                    label="Provinsi"
                    mode="outlined"
                    value={value}
                    right={<TextInput.Icon name="menu-down" style={{marginTop: 10}}/>}
                    //onFocus={() => {}}
                    //onChangeText={onChange}
                  />
                </ModalSelector>
              </View>
            )}
            name="provinces"
          />
          {errors.provinces && <Text>This is required.</Text>}

          <View style={{flex: 1, paddingHorizontal: 20}}>
                <ModalSelector
                  data={listRegencies}
                  initValue="Pilih provinsi"
                  cancelText="Batal"
                  supportedOrientations={['landscape']}
                  accessible={true}
                  scrollViewAccessibilityLabel={'Scrollable options'}
                  cancelButtonAccessibilityLabel={'Cancel Button'}
                  onChange={option => {
                    setValue('regencies', option.name);
                  }}
                  keyExtractor={item => item.id}
                  labelExtractor={item => item.name}
                  overlayStyle={{
                    flex: 1,
                    padding: '5%',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                  }}
                  animationType="slide"
                  cancelStyle={{backgroundColor: COLOR_PRIMARY_10, borderColor:COLOR_PRIMARY_10, borderWidth: 1, borderRadius: 4 }}
                  cancelTextStyle={{color: 'white'}}
                  optionTextStyle={{color: '#333'}}
                  //childrenContainerStyle={{backgroundColor: COLOR_PRIMARY_10}}
                  //touchableActiveOpacity={0.5}
                  optionStyle={{borderBottomColor: COLOR_PRIMARY_10}}
                  optionContainerStyle={{backgroundColor: 'white', borderWidth: 2, borderColor: COLOR_PRIMARY_10, borderRadius: 8}}
                  >
                  <TextInput
                    style={{width: '100%', height: 40, justifyContent: 'center'}}
                    //borderRadius={8}
                    activeOutlineColor={COLOR_PRIMARY_10}
                    label="Kota/Kab"
                    mode="outlined"
                    //value={field.regencies}
                    right={<TextInput.Icon name="menu-down" style={{marginTop: 10}}/>}
                    //onFocus={() => {}}
                    //onChangeText={onChange}
                  />
                </ModalSelector>
              </View>

        </ScrollView>
        <TouchableRipple
          style={{width: '100%', height: 60}}
          onPress={handleSubmit(onSubmit)}>
          <Text>SUBMIT</Text>
        </TouchableRipple>
      </View>
    );
  };

  const renderViewPagerPage = data => {
    if (data.key === 0) return renderAlamat(data);
  };

  const renderStepIndicator = params => (
    <MaterialIcon {...getStepIndicatorIconConfig(params)} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          stepCount={4}
          customStyles={IndicatorStyles}
          currentPosition={currentPage}
          onPress={onStepPress}
          renderStepIndicator={renderStepIndicator}
          labels={[
            'Alamat Pengiriman',
            'Rincian Pemesanan',
            'Metode Pembayaran',
            'Konfirmasi Pesanan',
          ]}
        />
      </View>
      <Swiper
        style={{flexGrow: 1}}
        loop={false}
        index={currentPage}
        autoplay={false}
        showsButtons={false}
        showsPagination={false}
        onIndexChanged={page => {
          setCurrentPage(page);
        }}>
        {PAGES.map(page => renderViewPagerPage(page))}
      </Swiper>
    </View>
  );
};

export default Checkout_HOOKS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    marginVertical: 10,
    paddingVertical: 20,
    //borderWidth: 1,
    //borderColor: 'gray',
    elevation: 1,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    //borderColor: 'gray',
    elevation: 1,
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999',
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f',
  },
});
