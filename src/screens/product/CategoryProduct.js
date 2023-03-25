import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import ProductList from './component/ProductList';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';

import {ProductCard} from '../../components';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FAB, Badge, IconButton, Button} from 'react-native-paper';
import CategoryBadge from './component/CategoryBadge';

import {
  COLOR_PRIMARY_01,
  COLOR_PRIMARY_06,
  COLOR_SECONDARY,
} from '../../utils/constant';

const CategoryProduct = props => {
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

  //console.log(new Date().getTime() + '=>' + productsCtg.length);
  //console.log(products.length)

  //const [products, setProducts] = useState({});

  // useEffect(() => {
  //   setProducts(data);

  //   return () => {
  //     setProducts({});
  //   };
  // }, []);

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

        //{/* UPGRADE PERFORMANCE */}

        <FlashList
          horizontal={false}
          numColumns={2}
          data={productsCtg}
          renderItem={({item}) => <ProductList key={item.id} item={item} />}
          keyExtractor={item => item.name}
          estimatedItemSize={300}
        />
      ) : (
        // <FlatList
        //   //nestedScrollEnabled={true}
        //   horizontal={false}
        //   numColumns={2}
        //   data={productsCtg}
        //   renderItem={({item}) => <ProductList key={item.id} item={item} />}
        //   keyExtractor={item => item.name}
        // />
        <View style={[styles.center, {height: height / 2}]}>
          <Text>No products found</Text>
        </View>
      )}

      {/* FAB CART */}
      <Pressable
        style={styles.fabWrapper}
        onPress={() => {
          navigation.navigate('Cart');
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

      {/* <FlatList
  //nestedScrollEnabled={true}
  horizontal={false}
  numColumns={2}
  data={products}
  ListRe
  renderItem={({item}) => <ProductList key={item.id} item={item} />}
  keyExtractor={item => item.name}
  ListHeaderComponent={sectionHeader()}
  //stickyHeaderIndices={[0]}
/> */}
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

export default connect(mapStateToProps)(CategoryProduct);

var {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {flex: 1},
  listContainer: {
    //height: height,
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    //justifyContent: 'center',
    //alignContent: 'center',
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
