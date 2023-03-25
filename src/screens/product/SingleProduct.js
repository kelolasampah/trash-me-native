// import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
// import React from 'react';

// const productJson = require('../../assets/data/products.json');

// const SingleProduct = props => {
//   const product = productJson.filter(i => i._id === props.route.params)[0];
//   return (
//     <View style={styles.container}>
//       <Image
//         style={styles.image}
//         source={{
//           uri: product.image
//             ? product.image
//             : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
//         }}
//       />
//     </View>
//   );
// };

// export default SingleProduct;

// const {width, height} = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     width: width,
//     height: '100%',
//   },
// });

import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Collapsible from 'react-native-collapsible';

import axios from 'axios';
// import baseURL from '../../assets/common/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {connect} from 'react-redux';
import * as actions from '../../redux/actions/cartActions';
import {ActionButton, RegebeIndicator, WrapButton} from '../../components';
import {Button} from 'react-native-paper';
import {
  COLOR_GRAY,
  COLOR_GRAY_DARK,
  COLOR_PRIMARY_10,
  COLOR_TEXT_01,
} from '../../utils/constant';

import '../../assets/common/global'

const SingleProduct = props => {
  //const product = productJson.filter(i => i._id === props.route.params.item)[0];

  //console.log(JSON.stringify(product))

  const [item, setItem] = useState();
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState('');
  const [isCollapsed, setIsCollapsed] = useState();
  //const [token, setToken] = useState();

  useEffect(() => {
    // Get Token
    // AsyncStorage.getItem('jwt')
    //   .then(res => {
    //     setToken(res);
    //   })
    //   .catch(error => console.log(error));

    axios.get(`${global.baseurl}/products/${props.route.params.item}`).then(res => {
      setItem(res.data);
      //console.log(JSON.stringify(res.data));
      return () => {
        //setToken();
        setItem();
      };
    });
  }, []);

  useEffect(() => {
    if (!item) return;

    if (item?.countInStock == 0) {
      setAvailability(<RegebeIndicator unavailable></RegebeIndicator>);
      setAvailabilityText('Stok kosong');
    } else if (item?.countInStock <= 5) {
      setAvailability(<RegebeIndicator limited></RegebeIndicator>);
      setAvailabilityText('Stok terbatas');
    } else {
      setAvailability(<RegebeIndicator available></RegebeIndicator>);
      setAvailabilityText('Stok tersedia');
    }

    return () => {
      setAvailability(null);
      setAvailabilityText('');
    };
  }, [item]);

  const kFormatter = num => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num);
  };

  const intToString = value => {
    var suffixes = ['', 'k', 'm', 'b', 't'];
    var suffixNum = Math.floor(('' + value).length / 3);
    var shortValue = parseFloat(
      (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(
        2,
      ),
    );
    if (shortValue % 1 != 0) {
      shortValue = shortValue.toFixed(1);
    }
    return shortValue + suffixes[suffixNum];
  };

  const toggleExpanded = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (!item) return null;

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <ScrollView
          style={{marginBottom: 2}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {/* Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: item.image
                  ? item.image
                  : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
              }}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          {/* Header Content */}
          <View style={styles.contentHeader}>
            <Text style={styles.price}>
              Rp {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </Text>
            <Text style={styles.contentHeaderText}>{item.name}</Text>
            <Text style={styles.contentHeaderText}>{item.brand}</Text>
          </View>
          {/* Body */}
          <View style={styles.contentBody}>
            <View style={styles.contentBodyItem}>
              <Text style={styles.tittle}>Detail Produk</Text>
            </View>
            <View
              style={[
                styles.contentBodyItem,
                //styles.contentBodyItemRow,
                styles.contentBodyItemUnderline,
              ]}>
              <View style={styles.contentBodyItemRowSpace}>
                <Text style={styles.subItemText}>Ketersediaan</Text>
                <Text style={styles.subItemTextMedium}>{availabilityText}</Text>
                {/* {availability} */}
              </View>
            </View>
            <View
              style={[styles.contentBodyItem, styles.contentBodyItemUnderline]}>
              <View style={styles.contentBodyItemRowSpace}>
                <Text style={styles.subItemText}>Stok</Text>
                <Text style={styles.subItemTextMedium}>
                  {item.countInStock}
                </Text>
              </View>
            </View>

            <View
              style={[styles.contentBodyItem, styles.contentBodyItemUnderline]}>
              <View style={styles.contentBodyItemRowSpace}>
                <Text style={styles.subItemText}>Kategori</Text>
                <Text style={styles.subItemTextMedium}>
                  {item.category.name}
                </Text>
              </View>
            </View>

            <View
              style={[styles.contentBodyItem, styles.contentBodyItemUnderline]}>
              <View style={styles.contentBodyItemRowSpace}>
                <Text style={styles.subItemText}>Dikirim dari</Text>
                <Text style={styles.subItemTextMedium}>
                  {item.merchant.regency}
                </Text>
              </View>
            </View>

            {/* Keterangan */}
            <View style={{marginTop: 5}}>
              <Text
                numberOfLines={isCollapsed ? null : 3}
                style={styles.subItemTextMedium}>
                {item.description}
              </Text>

              <Pressable
                style={{
                  marginTop: 5,
                  paddingTop: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  borderTopColor: COLOR_GRAY,
                  borderTopWidth: 2,
                }}
                onPress={() => {
                  toggleExpanded();
                }}>
                <Icon
                  name={
                    isCollapsed ? 'arrow-collapse-up' : 'arrow-collapse-down'
                  }
                  size={20}
                  color={COLOR_GRAY_DARK}
                />
              </Pressable>
            </View>
          </View>

          {/* Merchant */}
          <View style={styles.contentBody}>
            <View style={styles.contentBodyItem}>
              <Text style={styles.tittle}>{item.merchant.merchant}</Text>
              <View style={{marginTop: 5}}>
                <Text style={styles.subItemTextMedium}>
                  {item.merchant.regency} - {item.merchant.province}
                </Text>
              </View>

              <View style={[styles.contentBodyItemRow, {marginTop: 5}]}>
                <View style={styles.contentBodyItemRow}>
                  <Text
                    style={[
                      styles.subItemTextSmall,
                      {color: COLOR_PRIMARY_10},
                    ]}>
                    {kFormatter(
                      item.countInStock * Math.floor(Math.random() * 20) + 1,
                    )}
                  </Text>
                  <Text style={styles.subItemTextSmall}> Produk</Text>
                </View>
                <View style={styles.contentBodyItemRow}>
                  <Text
                    style={[
                      styles.subItemTextSmall,
                      {color: COLOR_PRIMARY_10, marginLeft: 10},
                    ]}>
                    {item.rating.toFixed(1)}
                  </Text>
                  <Text style={styles.subItemTextSmall}> Penilaian</Text>
                </View>
                <View style={styles.contentBodyItemRow}>
                  <Text
                    style={[
                      styles.subItemTextSmall,
                      {color: COLOR_PRIMARY_10, marginLeft: 10},
                    ]}>
                    {Math.floor(Math.random() * 100) + 1}%
                  </Text>
                  <Text style={styles.subItemTextSmall}> Respon</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={[styles.contentFooter]}>
        <View>
          <Text style={styles.info}>Rp {item.price}</Text>
        </View>
        <View style={{marginRight: 10}}>
          {props.route.params.enable ? (
            <ActionButton
              text={'Keranjang'}
              color={'white'}
              event={() => {
                props.addItemToCart(item.id),
                  Toast.show({
                    visibilityTime: 250,
                    autoHide: true,
                    topOffset: 60,
                    type: 'success',
                    text1: `${item.name} ditambahkan ke keranjang`,
                    text2: 'Lihat keranjang untuk menyelesaikan pesanan',
                  });
              }}
            />
          ) : (
            <ActionButton text={'Keranjang'} color={'gray'} event={() => {}} />
          )}
        </View>
      </View>
    </View>
  );
};

const mapToDispatchToProps = dispatch => {
  return {
    addItemToCart: product => dispatch(actions.addToCart(product)),
  };
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // inner items will be added vertically
    flexGrow: 1, // all the available vertical space will be occupied by it
    justifyContent: 'space-between', // will create the gutter between body and footer
    backgroundColor: 'honeydew',
  },
  imageContainer: {
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: width, //height / 2 - 80,
    backgroundColor: 'white',
  },
  contentHeader: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    elevation: 2,
    marginBottom: 10,
  },
  contentBody: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    elevation: 2,
    marginBottom: 10,
  },
  contentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 20,
  },
  contentHeaderText: {
    fontSize: 14,
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR_TEXT_01,
  },
  tittle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR_TEXT_01,
  },
  subItemText: {
    width: '45%',
    fontSize: 14,
  },
  subItemTextSmall: {
    fontSize: 12,
  },
  subItemTextMedium: {
    fontSize: 14,
  },
  contentBodyItem: {
    marginVertical: 5,
  },
  contentBodyItemRow: {
    flexDirection: 'row',
  },
  contentBodyItemRowSpace: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  contentBodyItemUnderline: {
    borderBottomColor: COLOR_GRAY,
    borderBottomWidth: 2,
    paddingBottom: 5,
  },

  info: {
    fontSize: 18,
    margin: 20,
    color: 'white',
  },
});

export default connect(null, mapToDispatchToProps)(SingleProduct);
