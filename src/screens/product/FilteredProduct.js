import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {connect} from 'react-redux';
import {FAB, Badge, IconButton, TouchableRipple} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import ProductCard from './component/ProductCard';
import {
  COLOR_PRIMARY_01,
  COLOR_PRIMARY_03,
  COLOR_PRIMARY_06,
  COLOR_PRIMARY_10,
  COLOR_PRIMARY_60,
  COLOR_SECONDARY,
} from '../../utils/constant';

const FilteredProduct = props => {
  const {filter, products} = props.route.params;
  const navigation = useNavigation();

  const [initialState, setInitialState] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);

  useEffect(() => {
    setInitialState(products);
    setFilteredProduct(
      products.filter(i => i.name.toLowerCase().includes(filter.toLowerCase())),
    );

    return () => {
      setInitialState([]);
      setFilteredProduct([]);
    };
  }, [props]);

  return (
    <View style={styles.container}>
      {/* CONTENT */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {filteredProduct.length > 0 ? (
          <View style={styles.content}>
            <View>
              {filteredProduct
                .filter((_, i) => i % 2 === 0)
                .map(item => (
                  <ProductCard key={`card_left_${item.id}`} {...item} />
                ))}
            </View>
            <View>
              {filteredProduct
                .filter((_, i) => i % 2 !== 0)
                .map(item => (
                  <ProductCard key={`card_right_${item.id}`} {...item} />
                ))}
            </View>
          </View>
        ) : (
          <View>
            <Text>Tidak ada produk</Text>
          </View>
        )}
      </ScrollView>

      {/* FAB CART */}
      <Pressable
        style={styles.fabWrapper}
        onPress={() => {
          navigation.navigate('CartNav', {screen: 'Cart'});
        }}>
        <LinearGradient
          colors={[COLOR_PRIMARY_06, COLOR_PRIMARY_01]}
          style={styles.fab}>
          <Icon style={styles.iconFab} name="cart" color={'#111'} size={30} />
        </LinearGradient>

        <Badge
          visible={props.cartItems.length > 0}
          color={'#F44336'}
          style={styles.badge}
          size={22}>
          {props.cartItems.length}
        </Badge>
      </Pressable>
    </View>
  );
};

const mapStateToProps = state => {
  const {cartItems} = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(FilteredProduct);

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: width - 10,
    paddingVertical: 10,
    //backgroundColor: 'red'
  },
  containerEx: {
    width: width / 2 - 20,
    height: width / 1.7,
    //padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 8,
    backgroundColor: 'white',
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -45,
  },
  ripple: {
    flex: 1,
    borderRadius: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  card: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 90,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    textAlign: 'center',
    color: 'orange',
    marginTop: 10,
  },
  fabWrapper: {
    position: 'absolute',
    borderRadius: 30,
    width: 60,
    height: 60,
    //alignItems: 'center',
    //justifyContent: 'center',
    right: 20,
    bottom: 20,
  },
  fab: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconFab: {
    color: COLOR_SECONDARY,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
});
