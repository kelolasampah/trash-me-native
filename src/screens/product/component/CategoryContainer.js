import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {Badge} from 'react-native-paper';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CategoryBadge from './CategoryBadge';

import {
  COLOR_PRIMARY_01,
  COLOR_PRIMARY_06,
  COLOR_SECONDARY,
} from '../../../utils/constant';
import ProductCard from './ProductCard';

const CategoryContainer = props => {
  const {categories, products} = props;
  const navigation = useNavigation();

  const [initialState, setInitialState] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();

  //useFocusEffect(
  useEffect(() => {
    setActive(-1);
    setProductsCtg(products);
    setInitialState(products);

    return () => {
      setActive();
      setProductsCtg([]);
      setInitialState([]);
    };
  }, [props]);
  //);

  // Categories
  const changeCtg = ctg => {
    {
      ctg === 'all'
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter(i => i.category.id === ctg),
              setActive(true),
            ),
          ];
    }
  };

  const sectionHeader = () => {
    return (
      <CategoryBadge
        categories={categories}
        categoryFilter={changeCtg}
        productsCtg={productsCtg}
        active={active}
        setActive={setActive}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* <View > */}

      {sectionHeader()}

      {/* <ScrollView> */}
      {productsCtg.length > 0 ? (
        // <View style={styles.listContainer}>
        //   {productsCtg.map((item, index) => {
        //     return (
        //       <ProductList
        //         //navigation={props.navigation}
        //         key={'pl_' + item.name + index}
        //         item={item}
        //       />
        //     );
        //   })}
        // </View>
        <FlatList
          //nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          numColumns={2}
          data={productsCtg}
          renderItem={({item}) => <ProductCard key={item.id} {...item} />}
          keyExtractor={item => item.name}
          //ListHeaderComponent={sectionHeader()}
          //stickyHeaderIndices={[0]}
        />
      ) : (
        <View style={[styles.center, {height: height / 2}]}>
          <Text>Belum ada produk tersedia</Text>
        </View>
      )}

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

      {/* </ScrollView> */}

      {/* </View> */}
    </View>
  );
};

const mapStateToProps = state => {
  const {cartItems} = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(CategoryContainer);

var {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {flex: 1},
  listContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabWrapper: {
    position: 'absolute',
    borderRadius: 30,
    width: 60,
    height: 60,
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
