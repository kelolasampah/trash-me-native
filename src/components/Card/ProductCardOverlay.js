import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import {Button, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductCardOverlay = props => {
  const {name, price, image, countInStock} = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image
            ? image
            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
        }}
      />
      <TouchableRipple
        style={styles.ripple}
        onPress={() => {}}
        borderless={true}>
        <View>
          <View style={styles.card} />
          <Text style={styles.title}>
            {name.length > 15 ? name.substring(0, 15 - 3) + '...' : name}
          </Text>
          <Text style={styles.price}>Rp. {price}</Text>
          {countInStock > 0 ? (
            <View style={{alignItems: 'center', marginBottom: 60}}>
              <Button title={'Add'} color={'green'}>
                Add
              </Button>
            </View>
          ) : (
            <Text style={{textAlign: 'center', marginVertical: 20}}>
              Stok habis
            </Text>
          )}
        </View>
      </TouchableRipple>
      <TouchableRipple
        style={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          height: 20,
          borderRadius: 10,
        }}
        onPress={() => {}}
        borderless={true}>
        <Icon name="dots-horizontal" color={'red'} size={20} />
      </TouchableRipple>
    </View>
  );
};

export default ProductCardOverlay;

var {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
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
});
