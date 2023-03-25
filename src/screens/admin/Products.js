import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import ListItem from './component/ListItem';

import axios from 'axios';
// import baseURL from '../../assets/common/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AdminHeader, WrapButton} from '../../components';
import ItemTable from './component/ItemTable';
import {initiateSocket} from '../../services/SocketIO';
import {ScrollView} from 'react-native-gesture-handler';
import {COLOR_PRIMARY_10} from '../../utils/constant';


import '../../assets/common/global'

import { showNotification } from '../../helpers/NotificationHelper';
import { Button } from 'react-native-paper';

var {height, width} = Dimensions.get('window');

const ListHeader = param => {
  return (
    <>
      <View style={{backgroundColor: COLOR_PRIMARY_10, alignItems: 'center'}}>
        <Text style={{fontWeight: '600', padding: 10}}>
          {param ? 'PRODUK TERKAIT' : 'SEMUA PRODUK'}
        </Text>
      </View>
      <View elevation={1} style={styles.listHeader}>
        <View style={styles.headerItem}></View>
        <View style={styles.headerItem}>
          <Text style={{fontWeight: '600'}}>Merek</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={{fontWeight: '600'}}>Nama</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={{fontWeight: '600'}}>Kategori</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={{fontWeight: '600'}}>Harga</Text>
        </View>
      </View>
    </>
  );
};

const Products = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  const [productHasil, setProductHasil] = useState();
  const [productJasa, setProductJasa] = useState();

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem('jwt')
        .then(res => {
          setToken(res);
        })
        .catch(error => console.log(error));

      axios.get(`${global.baseurl}/products`).then(res => {
        setProductList(res.data);
        setProductFilter(res.data);
        setProductHasil(
          res.data.filter(i => i.category.type.toLowerCase().includes('hasil')),
        );
        setProductJasa(
          res.data.filter(
            i => !i.category.type.toLowerCase().includes('hasil'),
          ),
        );
        // setProductCheckout(
        //   temp
        //     .map(item => ({
        //       ...item,
        //       product: item.product.filter(pro => pro.isChecked),
        //     }))
        //     .filter(item => item.product.length > 0),
        // );

        setLoading(false);
      });

      return () => {
        setProductList();
        setProductFilter();
        setProductHasil();
        setProductJasa();
        setLoading(true);
      };
    }, []),
  );

  useEffect(() => {
    let queryTimeout;
    if (searchQuery?.length > 0) {
      queryTimeout = setTimeout(() => {
        searchProduct(searchQuery);
      }, 500);
    } else {
      setProductFilter(productList);
    }
    //initiateSocket('admin','tokoalus')

    return () => {
      clearTimeout(queryTimeout);
    };
  }, [searchQuery]);

  const searchProduct = text => {
    // if (text == '') {
    //   setProductFilter(productList);
    // }
    setProductFilter(
      productList.filter(i =>
        i.name.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  const deleteProduct = id => {
    axios
      .delete(`${global.baseurl}/products/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        const products = productFilter.filter(item => item.id !== id);
        setProductFilter(products);
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.buttonContainer}> */}
      {/* <Button onPress={() => {
        axios.get(`${global.baseurl}/users/profile/637f7e42a836666d6e31c8fe`).then(res => {console.log(res.data)})
      }}>GO</Button> */}
      <AdminHeader
        hint={'Cari produk anda'}
        change={text => setSearchQuery(text)}
        one={() => props.navigation.navigate('Orders')}
        two={() => props.navigation.navigate('ProductForm')}
        three={() => props.navigation.navigate('Categories')}
      />
      <>
        {/* <WrapButton
                secondary
                medium
                onPress={() => props.navigation.navigate("Orders")}
            >
                <Icon name="shopping-bag" size={18} color="white" />
                <Text style={styles.buttonText}>Orders</Text>
            </WrapButton>
            <WrapButton
                secondary
                medium
                onPress={() => props.navigation.navigate("ProductForm")}
            >
                <Icon name="plus" size={18} color="white" />
                <Text style={styles.buttonText}>Products</Text>
            </WrapButton>
            <WrapButton
                secondary
                medium
                onPress={() => props.navigation.navigate("Categories")}
            >
                <Icon name="plus" size={18} color="white" />
                <Text style={styles.buttonText}>Categories</Text>
            </WrapButton> */}
        {/* </View> */}
        {/* <View>
          <View searchBar rounded>
              <View style={{ padding: 5 }}>
                  <Icon name="search" />
                  <TextInput 
                    placeholder="Search"
                    onChangeText={(text) => searchProduct(text)}
                  />
              </View>
          </View>
      </View> */}
      </>
      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <>
          <FlatList
            nestedScrollEnabled={true}
            data={productFilter}
            ListHeaderComponent={ListHeader(searchQuery)}
            ListFooterComponent={() =>
              searchQuery ? null : <ItemTable product={productJasa} />
            }
            renderItem={({item, index}) => (
              <ListItem
                item={item}
                navigation={props.navigation}
                index={index}
                delete={deleteProduct}
              />
            )}
            keyExtractor={item => item.id}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'honeydew',
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    //paddingBottom: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    margin: 20,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    marginLeft: 4,
    color: 'white',
  },
});

export default Products;
