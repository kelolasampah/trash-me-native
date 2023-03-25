import {StyleSheet, View, Dimensions} from 'react-native';
import React, {useRef, useState} from 'react';
import ProductCard from './ProductCard';

const ProductList = props => {
  const {item} = props;
  return (
    <View style={styles.container}>
      <View style={styles.content} onPress={() => {}}>
        <ProductCard {...item} />
      </View>
    </View>
  );
};

export default ProductList;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: '50%',
  },
  content: {
    width: windowWidth / 2,
  },
});
