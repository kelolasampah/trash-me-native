import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Text,
  FlatList,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import CartItem from './component/CartItem';

import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';

import {connect} from 'react-redux';
import * as actions from '../../redux/actions/cartActions';
import AuthGlobal from '../../contexts/store/AuthGlobal';
import axios from 'axios';
// import baseURL from '../../assets/common/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import '../../assets/common/global'

var {height, width} = Dimensions.get('window');

//const jsonData = require('../../assets/data/products.json');
import {Checkbox} from 'react-native-paper';
import {COLOR_PRIMARY_01, COLOR_PRIMARY_06} from '../../utils/constant';
import {ActionButton} from '../../components';
import Toast from 'react-native-toast-message';

const Cart = props => {
  const context = useContext(AuthGlobal);

  const [productUpdate, setProductUpdate] = useState();
  const [productCheckout, setProductCheckout] = useState();
  const [productGroup, setProductGroup] = useState();
  const [totalPrice, setTotalPrice] = useState(); //total amount
  const [invoiceAmount, setInvoiceAmount] = useState(); //invoice per merchant

  useEffect(() => {
    getProducts();

    //getProductsAppend();

    return () => {
      setProductUpdate();
      setProductCheckout();
      setProductGroup();
      setTotalPrice();
      setInvoiceAmount();
    };
  }, [props]);

  //fetch data from server and transform into layout
  const getProducts = async () => {
    var products = [];
    await Promise.all(
      props.cartItems.map(async cart => {
        try {
          const resp = await axios.get(`${global.baseurl}/products/${cart.product}`);
          resp.data.quantity = cart.quantity;
          resp.data.isChecked = cart.isChecked;

          products.push(resp.data);
          setProductUpdate(products);
        } catch (error) {
          console.error(error);
        }
      }),
    );

    if (products) {
      setProductGroup(
        Object.values(
          products.reduce((acc, obj) => {
            if (!acc[obj.merchant.merchant])
              acc[obj.merchant.merchant] = {
                id: obj.merchant.id,
                name: obj.merchant.merchant,
                isChecked: false,
                product: [],
              };
            acc[obj.merchant.merchant].product.push(obj);
            return acc;
          }, {}),
        ),
      );
    }
  };

  //count total price and invoice data
  useEffect(() => {
    if (productCheckout) {
      const temp = productCheckout.map(po => ({
        merchant: po.name,
        amount: po.product.reduce((acc, object) => {
          return acc + object.price * object.quantity;
        }, 0),
      }));
      setInvoiceAmount(temp);
      setTotalPrice(
        temp.reduce((acc, object) => {
          return acc + object.amount;
        }, 0),
      );
    }

    return () => {
      setInvoiceAmount();
      setTotalPrice();
    };
  }, [productCheckout]);

  //handle checkbox individual product
  const handleCheck = pid => {
    const temp = productGroup?.map(item => {
      const product = item.product.map(pro =>
        pro.id === pid ? {...pro, isChecked: !pro.isChecked} : pro,
      );
      return {...item, product};
    });

    setProductGroup(temp);
    setProductCheckout(
      temp
        .map(item => ({
          ...item,
          product: item.product.filter(pro => pro.isChecked),
        }))
        .filter(item => item.product.length > 0),
    );
  };

  // handle block group merchant
  const handleBlock = mid => {
    const temp = productGroup?.map(item =>
      mid === item.id
        ? {
            ...item,
            isChecked: !item.isChecked,
            product: item.product.map(pro => {
              return {...pro, isChecked: !item.isChecked};
            }),
          }
        : item,
    );

    setProductGroup(temp);
    setProductCheckout(
      temp
        .map(item => ({
          ...item,
          product: item.product.filter(pro => pro.isChecked),
        }))
        .filter(item => item.product.length > 0),
    );
  };

  //handle spinner input
  const handleSpin = (pid, value) => {
    const temp = productGroup?.map(item => {
      const product = item.product.map(pro =>
        pro.id === pid ? {...pro, quantity: value} : pro,
      );
      return {...item, product};
    });

    setProductGroup(temp);
    setProductCheckout(
      temp
        .map(item => ({
          ...item,
          product: item.product.filter(pro => pro.isChecked),
        }))
        .filter(item => item.product.length > 0),
    );
  };

  //handle remove item from chart individualy
  const handleRemove = pid => {
    props.removeFromCart(pid);
  };

  //handle remove group merchant
  const removeGroup = mid => {
    let index, group;
    index = productGroup.findIndex(x => x.id === mid);
    if (index !== -1) {
      group = productGroup[index].product.reduce((acc, current) => {
        acc.push(current.id);
        return acc;
      }, []);
    }
    group?.forEach(pid => props.removeFromCart(pid));
  };

  return (
    <>
      {productGroup ? (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <SwipeListView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{marginVertical: 10}}
            data={productGroup}
            renderItem={data => (
              <CartItem
                item={data.item}
                list={productUpdate}
                check={handleCheck}
                block={handleBlock}
                spin={handleSpin}
                remove={handleRemove}
              />
            )}
            renderHiddenItem={data => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => removeGroup(data.item.id)}>
                  <Icon name="trash" color={'white'} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <View>
              <Text style={styles.price}>
                Rp{' '}
                {totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') ||
                  '-'}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: 10}}>
                <ActionButton
                  text={'Kosongkan'}
                  color={'white'}
                  event={() => props.clearCart()}
                />
              </View>
              <View style={{marginRight: 10}}>
                <ActionButton
                  color={'white'}
                  text={context.stateUser.isAuthenticated ? 'Beli' : 'Masuk'}
                  event={
                    context.stateUser.isAuthenticated
                      ? () => {
                          if (productCheckout)
                            props.navigation.navigate('Checkout', {
                              product: productCheckout,
                              invoice: invoiceAmount,
                              total: totalPrice,
                            });
                          else
                            Toast.show({
                              visibilityTime: 3000,
                              autoHide: true,
                              bottomOffset: 80,
                              position: 'bottom',
                              type: 'error',
                              text1: 'Barang belum dipilih',
                              text2: 'Pilih barang sebelum lanjut pembelian',
                            });
                        }
                      : () =>
                          props.navigation.navigate('RootNav', {
                            screen: 'Login',
                          })
                  }
                />
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginVertical: 5}}>
            Sepertinya keranjang kamu kosong
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginVertical: 5}}>
            Tambahkan produk ke keranjang kamu yuk!
          </Text>
        </View>
      )}
    </>
  );
};

const mapStateToProps = state => {
  const {cartItems} = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: item => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
  button: {
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  hiddenContainer: {
    flex: 1,
    //marginTop: 1,
    //marginBottom: 1,
    paddingVertical: 2,

    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    elevation: 2,
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    width: '100%', //width / 1.2,
  },

  card: {
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
