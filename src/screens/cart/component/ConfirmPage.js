import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';

import AuthGlobal from '../../../contexts/store/AuthGlobal';

import {connect} from 'react-redux';
import * as actions from '../../../redux/actions/cartActions';

import {ActionButton} from '../../../components';
import {COLOR_GRAY, COLOR_PRIMARY_10} from '../../../utils/constant';
import axios from 'axios';
import Toast from 'react-native-toast-message';
// import baseURL from '../../../assets/common/baseURL';
import {useNavigation, useTheme} from '@react-navigation/native';

import '../../../assets/common/global'

const ConfirmPage = props => {
  const {item, detail, product, invoice, total, address, shipment, payment} =
    props;

  const context = useContext(AuthGlobal);
  const navigation = useNavigation();
  const [grandTotal, setGrandTotal] = useState(0);
  const [userOrder, setUserOrder] = useState();

  useEffect(() => {
    setUserOrder(context.stateUser.userProfile);
    return () => {
      setUserOrder();
    };
  }, []);

  useEffect(() => {
    if (shipment) {
      let temp = 0;
      shipment.map(item => {
        temp += item.data.fee;
      });
      setGrandTotal(total + temp);
    }
    return () => {
      //setGrandTotal(0);
    };
  }, [shipment]);

  const submitForm = () => {
    // Promise.all(product.map((item) => axios.get(endpoint))).then(
    //   axios.spread((...allData) => {
    //     console.log({ allData });
    //   })
    // );

    Promise.all(
      product.map(item => {
        let invItems = item.product.reduce((acc, obj) => {
          return [...acc, {product: obj.id, quantity: obj.quantity}];
        }, []);
        let order = {
          shippingAddress1: address.shippingAddress1,
          shippingAddress2: address.shippingAddress2,
          village: address.village,
          district: address.district,
          regency: address.regency,
          province: address.province,
          country: address.country,
          zip: address.zip,
          phone: address.phone,
          dateOrdered: Date.now(),
          orderItems: invItems,
          status: '3',
          user: userOrder?.id,
          totalPrice: 0,
        };
        //console.log(`order-${item.name}: ` + JSON.stringify(order));
        axios
          .post(`${global.baseurl}/orders`, order)
          .then(res => {
            if (res.status == 200 || res.status == 201) {
              Toast.show({
                visibilityTime: 250,
                autoHide: true,
                topOffset: 40,
                type: 'success',
                text1: 'Pesanan berhasil',
                text2: '',
              });
              setTimeout(() => {
                item.product.map(cartProduct =>
                  props.removeFromCart(cartProduct.id),
                );
                navigation.navigate('Cart');
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
              text2: 'Silahkan coba kembali',
            });
          });
      }),
    );
  };

  const _renderShipmentSection = param => {
    const index = shipment.findIndex(arr => arr.name === param);
    let shipMethod = index > -1 ? shipment[index].data.method : '-';
    let shipName = index > -1 ? shipment[index].data.name : '-';
    return (
      <View style={styles.cardWrapper}>
        <Text style={styles.bodyContentText}>{shipMethod}</Text>
        <Text style={styles.bodyContentText}>{shipName}</Text>
      </View>
    );
  };

  const _renderCostSection = param => {
    const indexInv = invoice.findIndex(arr => arr.merchant === param);
    const indexShip = shipment.findIndex(arr => arr.name === param);
    let invAmount = indexInv > -1 ? invoice[indexInv].amount : 0;
    let shipAmount = indexShip > -1 ? shipment[indexShip].data.fee : 0;
    return (
      <View style={styles.cardWrapper}>
        <Text style={styles.bodyContentText}>
          Total Harga: Rp{' '}
          {invAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
        </Text>
        <Text style={styles.bodyContentText}>
          Ongkos Kirim: Rp{' '}
          {shipAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
        </Text>
      </View>
    );
  };

  const _renderBillSection = param => {
    const indexInv = invoice.findIndex(arr => arr.merchant === param);
    const indexShip = shipment.findIndex(arr => arr.name === param);
    let billAmount = 0;
    billAmount += indexInv > -1 ? invoice[indexInv].amount : 0;
    billAmount += indexShip > -1 ? shipment[indexShip].data.fee : 0;
    return (
      <Text style={styles.bodyHeaderText}>
        Rp {billAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
      </Text>
    );
  };

  if (!address || !shipment || !payment)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
    );

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
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}>
          {product.map(merchant => {
            return (
              <View style={styles.cardInvoiceContainer} key={merchant.id}>
                {/* HEADER */}
                <View style={styles.cardInvoiceHeader}>
                  <View>
                    <Text style={styles.bodyHeaderText}>
                      Pesanan {userOrder?.name}
                    </Text>
                    <Text style={styles.bodyHeaderText}>
                      Dari {merchant.name}
                    </Text>
                  </View>

                  <Text
                    style={[styles.bodyHeaderInvText, {alignSelf: 'center'}]}>
                    INV{new Date().getFullYear()}
                    {new Date().getTime()}
                  </Text>
                </View>

                {/* BODY */}
                <View style={styles.cardInvoiceBody}>
                  {/* address */}
                  <View style={styles.cardDivider}>
                    <Text style={styles.bodyHeaderText}>Alamat Pengiriman</Text>
                    <View style={styles.cardWrapper}>
                      <Text style={styles.bodyContentText}>
                        {context.stateUser.userProfile.name} ({address.phone})
                      </Text>
                      <Text style={styles.bodyContentText}>
                        {`${address.shippingAddress1}, ${address.village}, ${address.district}`}
                      </Text>
                      <Text style={styles.bodyContentText}>
                        {`${address.regency}, ${address.province}, ${address.zip}`}
                      </Text>
                    </View>
                  </View>

                  {/* shipment */}
                  <View style={styles.cardDivider}>
                    <Text style={styles.bodyHeaderText}>Pengiriman</Text>
                    {_renderShipmentSection(merchant.name)}
                  </View>

                  {/* payment */}
                  <View style={styles.cardDivider}>
                    <Text style={styles.bodyHeaderText}>Pembayaran</Text>
                    <View style={styles.cardWrapper}>
                      <Text style={styles.bodyContentText}>
                        {payment.method || '-'}
                      </Text>
                      <Text style={styles.bodyContentText}>
                        {payment.name || '-'}
                      </Text>
                    </View>
                  </View>

                  {/* product */}
                  <View style={styles.cardDivider}>
                    <Text style={styles.bodyHeaderText}>Rincian Produk</Text>
                    <View style={styles.cardWrapper}>
                      <View key={item.id} style={styles.bodyProductContainer}>
                        {/* <Text style={{paddingRight: 30, fontSize: 14}}>
                    {item.name}
                  </Text> */}
                        {merchant.product.map(obj => {
                          return (
                            <View
                              key={obj.id}
                              style={[
                                styles.bodyProductContent,
                                {alignItems: 'center', marginVertical: 5},
                              ]}>
                              <Image
                                style={styles.bodyProductImage}
                                source={{
                                  uri: obj.image
                                    ? obj.image
                                    : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                                }}
                              />
                              <View style={styles.bodyProductDetail}>
                                <Text style={{paddingRight: 40, fontSize: 12}}>
                                  {obj.name}
                                </Text>
                                <Text style={{paddingRight: 40, fontSize: 12}}>
                                  @
                                  {obj.price
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                                  x {obj.quantity} = Rp{' '}
                                  {(obj.price * obj.quantity)
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </View>

                  {/* cost */}
                  <View style={styles.cardDivider}>
                    <View>
                      <Text style={styles.bodyHeaderText}>Rincian Biaya</Text>
                      {_renderCostSection(merchant.name)}
                    </View>
                  </View>
                </View>

                {/* FOOTER */}
                <View style={styles.cardInvoiceFooter}>
                  <Text style={styles.bodyHeaderText}>Total Tagihan</Text>
                  {_renderBillSection(merchant.name)}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.info}>
            Rp {grandTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginRight: 10}}>
            <ActionButton
              text={'Bayar Sekarang'}
              color={'white'}
              event={() => submitForm()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: item => dispatch(actions.removeFromCart(item)),
  };
};

export default connect(null, mapDispatchToProps)(ConfirmPage);

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

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 10,
  },
  body: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 10,
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
  },

  cardInvoiceContainer: {
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 5,
  },
  cardInvoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: COLOR_GRAY,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  cardInvoiceBody: {
    borderBottomColor: COLOR_GRAY,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  cardInvoiceFooter: {
    paddingTop: 10,
  },

  cardDivider: {
    marginBottom: 5,
  },
  cardWrapper: {
    marginHorizontal: 5,
  },

  bodyHeaderText: {
    fontSize: 14,
    fontWeight: '700',
  },
  bodyHeaderInvText: {
    fontSize: 13,
    fontWeight: '400',
    fontStyle: 'italic',
    color: 'green',
    opacity: 0.25,
  },
  bodyContentText: {
    fontSize: 12,
    fontWeight: '400',
    paddingRight: 40,
  },

  bodyProductContainer: {
    marginBottom: 5,
  },
  bodyProductContent: {
    //marginLeft: 10,
    flexDirection: 'row',
  },
  bodyProductDetail: {
    marginLeft: 20,
  },
  bodyProductImage: {
    backgroundColor: 'gainsboro',
    width: 40,
    height: 40,
    borderRadius: 5,
  },

  info: {
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
});
