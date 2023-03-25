import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';

import Icon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import baseURL from '../../../assets/common/baseURL';
import {ActionButton, RegebeIndicator, WrapButton} from '../../../components';
import {
  COLOR_GRAY,
  COLOR_PRIMARY_10,
  COLOR_TEXT_01,
} from '../../../utils/constant';

import '../../../assets/common/global';

const codes = [
  {name: 'Dibatalkan', code: '4'},
  {name: 'Menunggu', code: '3'},
  {name: 'Dikirim', code: '2'},
  {name: 'Diterima', code: '1'},
  {name: 'Selesai', code: '0'},
];

const OrderCard = props => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.editMode) {
      AsyncStorage.getItem('jwt')
        .then(res => {
          setToken(res);
        })
        .catch(error => console.log(error));
    }

    if (props.status == '3' || props.status == '4') {
      setOrderStatus(<RegebeIndicator unavailable></RegebeIndicator>);
      setStatusText('Menunggu');
      setCardColor('#E74C3C');
    } else if (props.status == '2') {
      setOrderStatus(<RegebeIndicator limited></RegebeIndicator>);
      setStatusText('Dikirim');
      setCardColor('#F1C40F');
    } else {
      setOrderStatus(<RegebeIndicator available></RegebeIndicator>);
      setStatusText('Diterima');
      setCardColor('#2ECC71');
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItems: props.orderItems,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
    };

    axios
      .put(`${global.baseurl}/orders/${props.id}`, order, config)
      .then(res => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            visibilityTime: 250,
            autoHide: true,
            topOffset: 40,
            type: 'success',
            text1: 'Pesanan diperbarui',
            text2: '',
          });
          setTimeout(() => {
            props.navigation.navigate('Products');
          }, 500);
        }
      })
      .catch(error => {
        Toast.show({
          visibilityTime: 250,
          autoHide: true,
          topOffset: 40,
          type: 'error',
          text1: 'Terjadi kesalahan',
          text2: 'Silahkan coba lagi',
        });
      });
  };

  return (
    <View style={[styles.container, {borderColor: cardColor}]}>
      <View
        style={{
          backgroundColor: cardColor + '33',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}>
        <View
          style={{
            marginVertical: 0,
            borderBottomColor: cardColor,
            borderBottomWidth: 2,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '800',
              paddingHorizontal: 20,
              paddingTop: 20,
            }}>
            Nomor Pesanan
          </Text>
          <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '800',
                paddingHorizontal: 20,
                paddingBottom: 20,
                color: 'royalblue',
              }}>
              #{props.id}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={{marginVertical: 5}}>
          <Text style={{fontWeight: '700'}}>Info Pembeli</Text>
          <Text>{props.user.name}</Text>
          <Text>{props.phone}</Text>
        </View>

        <View style={{marginVertical: 5}}>
          <Text style={{fontWeight: '700'}}>Alamat Pengiriman</Text>
          <Text>
            {props.shippingAddress1}, {props.village}, {props.district}
          </Text>
          <Text>
            {props.regency} - {props.country}
          </Text>
        </View>

        <View style={{marginVertical: 5}}>
          <Text style={{fontWeight: '700'}}>Tanggal Pemesanan</Text>
          <Text>{props.dateOrdered.split('T')[0]}</Text>
        </View>

        <View style={{marginVertical: 5}}>
          <Text style={{fontWeight: '700'}}>Total Harga</Text>
          <Text style={styles.price}>
            Rp{' '}
            {props.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <View style={{paddingRight: 20}}>
            <Text style={{fontWeight: '700'}}>Status Pesanan</Text>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 5,
              }}>
              {orderStatus}
              <Text style={{marginLeft: 5}}>{statusText}</Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            {props.editMode ? (
              <View>
                <DropDownPicker
                  items={codes}
                  schema={{
                    label: 'name',
                    value: 'code',
                  }}
                  placeholder={'Perbarui status'}
                  placeholderStyle={{
                    color: 'gray',
                    fontWeight: '400',
                    fontSize: 15,
                  }}
                  open={open}
                  setOpen={setOpen}
                  value={statusChange}
                  setValue={setStatusChange}
                  listMode="SCROLLVIEW"
                  dropDownDirection="BOTTOM"
                  //maxHeight={500}
                  style={{
                    borderColor: COLOR_PRIMARY_10,
                    backgroundColor: 'honeydew',
                    zIndex: 10,
                  }}
                  scrollViewProps={{
                    decelerationRate: 'fast',
                    showsVerticalScrollIndicator: false,
                    showsHorizontalScrollIndicator: false,
                  }}
                  textStyle={{
                    fontSize: 15,
                    fontWeight: '400',
                  }}
                  ArrowDownIconComponent={() => (
                    <Icon
                      size={26}
                      style={{marginHorizontal: 10}}
                      color={COLOR_PRIMARY_10}
                      name="angle-down"
                    />
                  )}
                  ArrowUpIconComponent={() => (
                    <Icon
                      size={26}
                      style={{marginHorizontal: 10}}
                      color={COLOR_PRIMARY_10}
                      name="angle-up"
                    />
                  )}
                  TickIconComponent={() => (
                    <FIcon
                      size={24}
                      style={{marginHorizontal: 5}}
                      color={COLOR_PRIMARY_10}
                      name="check"
                    />
                  )}
                  dropDownContainerStyle={{
                    borderColor: COLOR_PRIMARY_10,
                  }}
                />
              </View>
            ) : null}
          </View>
        </View>

        {props.editMode ? (
          <View>
            <>
              {/* <View
              style={{
                borderRadius: 10,
                borderColor: COLOR_PRIMARY_10,
                borderWidth: 1,
                overflow: 'hidden',
                height: 55,
                padding: 0,
                margin: 0,
                backgroundColor: '#FFF',
              }}>
              <Picker
                mode="dialog"
                iosIcon={<Icon color={'#007aff'} name="chevron-down" />}
                style={{
                  width: undefined,
                }}
                selectedValue={statusChange}
                placeholder="Perbarui status"
                placeholderIconColor={{color: '#007aff'}}
                onValueChange={e => setStatusChange(e)}>
                {codes.map(c => {
                  return (
                    <Picker.Item key={c.code} label={c.name} value={c.code} />
                  );
                })}
              </Picker>
            </View> */}
            </>

            {/* <WrapButton secondary large onPress={() => updateOrder()}>
              <Text style={{color: 'white'}}>Perbarui</Text>
            </WrapButton> */}
            <View style={{marginTop: 15}}>
              <ActionButton
                text={'Perbarui'}
                color={'white'}
                event={() => updateOrder()}
              />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    zIndex: 100,
    position: 'relative',
  },
  content: {
    padding: 20,
    borderRadius: 10,
  },
  statusContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    zIndex: 20,
  },
  price: {
    color: COLOR_TEXT_01,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderCard;
