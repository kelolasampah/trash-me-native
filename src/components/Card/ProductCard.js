import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {IconButton, TouchableRipple} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {connect} from 'react-redux';
import * as actions from '../../redux/actions/cartActions';

//https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png
const ProductCard = props => {
  const {id, name, price, image, countInStock, rating} = props;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableRipple
        style={styles.ripple}
        onPress={() => {
          navigation.navigate('SingleProduct', props);
        }}
        borderless={true}>
        <View style={styles.card}>
          {/* COVER */}
          <View style={styles.cover}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{
                uri: image
                  ? image
                  : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
              }}
            />
          </View>

          {/* CONTENT */}
          <View style={styles.content}>
            <Text style={styles.title}>
              {name}
              {/* {name.length > 15 ? name.substring(0, 15 - 3) + '...' : name} */}
            </Text>
            <Text style={styles.price}>
              Rp. {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </Text>
            <Text style={styles.location}>Kota Bandung</Text>
          </View>

          {/* DESCRIPTION */}
          <View style={styles.description}></View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Icon
              name="star"
              color={'orange'}
              size={15}
              style={{marginLeft: 8, marginRight: 5}}></Icon>
            <Text style={styles.info}>{rating.toFixed(1)}</Text>
            <View style={styles.divider}></View>
            <Text style={styles.info}>
              {countInStock > 0 ? `Tersedia ${countInStock}` : 'Stok habis'}
            </Text>
          </View>
        </View>
      </TouchableRipple>

      {/* ACTION */}
      <IconButton
        style={styles.action}
        onPress={() => {
          props.addItemToCart(id),
            Toast.show({
              visibilityTime: 250,
              autoHide: true,
              topOffset: 40,
              type: 'success',
              text1: `${name} added to Cart`,
              text2: 'Go to your cart to complete order',
            });
        }}
        icon="dots-horizontal"
        color={'gray'}
        size={20}
      />
    </View>
  );
};

// const mapStateToProps = state => {
//   const {cartItems} = state;
//   return {
//     cartItems: cartItems,
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: product =>
      dispatch(actions.addToCart({quantity: 1, product, isChecked: false})),
  };
};

//export default ProductCard;
export default connect(null, mapDispatchToProps)(ProductCard);

var {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 15,
    //height: width / 1.7,
    flex: 0,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'flex-start',
    elevation: 3,
    backgroundColor: 'white',
  },
  ripple: {
    flex: 1,
    borderRadius: 5,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    marginBottom: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: 'transparent',
  },
  cover: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  image: {
    width: '100%',
    height: width / 2 - 20 - 30,
    backgroundColor: 'transparent',
  },
  content: {
    paddingTop: 5,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  title: {
    fontSize: 14,
    textAlign: 'left',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    marginTop: 10,
  },
  location: {
    fontSize: 12,
    textAlign: 'left',
  },
  description: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  footer: {
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  info: {
    textAlign: 'left',
    fontSize: 10,
  },
  divider: {
    margin: 5,
    height: '40%',
    width: 1,
    backgroundColor: '#909090',
  },
  action: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    //height: 20,
    //borderRadius: 10,
  },
});
