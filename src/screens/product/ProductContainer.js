import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import {StaticHeader} from '../../components';
import CategoryContainer from './component/CategoryContainer';
import axios from 'axios';
// import baseURL from '../../assets/common/baseURL';

import '../../assets/common/global'

//const productJson = require('../../assets/data/products.json');
//const categoryJson = require('../../assets/data/categories.json');

const ProductContainer = props => {
  const navigation = useNavigation();
  const {getItem} = useAsyncStorage('recentSearch');

  const [suggestion, setSuggestion] = useState('');
  const [history, setHistory] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //setHistory([]);
    //setProducts(productJson);
    //setCategories(categoryJson);

    //readItemFromStorage();

    axios
      .get(`${global.baseurl}/products`, {timeout: 1000})
      .then(res => setProducts(res.data))
      .catch(err => alert('Gagal memuat produk'));

    // Categories
    axios
      //.get(`${global.baseurl}/categories/type/Hasil Olah Sampah`, {timeout: 1000})
      .get(`${global.baseurl}/categories/grouptype/3`, {timeout: 1000})
      .then(res => setCategories(res.data))
      .catch(err => alert('Gagal memuat konten'));

    return () => {
      setHistory([]);
      setProducts([]);
      setCategories([]);
    };
  }, []);

  useEffect(() => {
    if (history) {
      setSuggestion(history[Math.floor(Math.random() * history.length)]);
    }
  }, [history]);

  useFocusEffect(
    useCallback(() => {
      setHistory([]);
      readItemFromStorage();

      // return () => {
      //   setSuggestion('');
      // };
    }, [navigation]),
  );

  const readItemFromStorage = async () => {
    const item = await getItem();
    item !== null ? setHistory(JSON.parse(item)) : setHistory([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <StaticHeader
        hint={'Cari ' + (suggestion || '')}
        event={() =>
          navigation.navigate('SearchedProduct', {
            products,
            history,
            suggestion,
          })
        }
        goback={() => navigation.goBack()}
      />

      {/* CONTAINER */}
      <CategoryContainer products={products} categories={categories} />
    </SafeAreaView>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
