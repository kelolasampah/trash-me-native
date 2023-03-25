import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  StyleSheet,
} from 'react-native';
// import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {add} from 'react-native-reanimated';
import {ActionButton, WrapButton} from '../../components';
import Toast from 'react-native-toast-message';
import {COLOR_PRIMARY_10} from '../../utils/constant';

import '../../assets/common/global'

var {width} = Dimensions.get('window');

const Item = props => {
  return (
    <View style={styles.item}>
      <Text>{props.item.name}</Text>
      <ActionButton
        text={'Hapus'}
        color={'white'}
        event={() => props.delete(props.item.id)}
      />
    </View>
  );
};

const Categories = props => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem('jwt')
      .then(res => {
        setToken(res);
      })
      .catch(error => console.log(error));

    axios
      .get(`${global.baseurl}/categories`)
      .then(res => setCategories(res.data))
      .catch(error => alert('Gagal memuat konten'));

    return () => {
      setCategories();
      setToken();
    };
  }, []);

  const addCategory = () => {
    const category = {
      name: categoryName,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${global.baseurl}/categories`, category, config)
      .then(res => setCategories([...categories, res.data]))
      .catch(error => alert('Gagal memuat konten'));

    setCategoryName('');
  };

  const deleteCategory = id => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${global.baseurl}/categories/${id}`, config)
      .then(res => {
        const newCategories = categories.filter(item => item.id !== id);
        setCategories(newCategories);
      })
      .catch(error => alert('Gagal memuat konten'));
  };

  return (
    <View style={{position: 'relative', height: '100%'}}>
      <View style={{marginBottom: 60, marginTop: 5}}>
        <FlatList
          data={categories}
          renderItem={({item, index}) => (
            <Item
              item={item}
              index={index}
              delete={() => {
                Toast.show({
                  visibilityTime: 250,
                  autoHide: true,
                  topOffset: 40,
                  type: 'error',
                  text1: 'Maaf hanya pemilik yg boleh menghapus',
                  text2: '',
                });
              }}
            /> //{deleteCategory} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.bottomBar}>
        <View>
          <Text style={{paddingLeft: 10}}>Tambah Kategori</Text>
        </View>
        <View style={{width: width / 2.5}}>
          <TextInput
            value={categoryName}
            style={styles.input}
            onChangeText={text => setCategoryName(text)}
          />
        </View>
        <View style={{paddingRight: 10}}>
          {/* <WrapButton medium primary onPress={() => addCategory()}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Tambah</Text>
          </WrapButton> */}
          <ActionButton
            text={'Tambah'}
            color={'white'}
            event={() => addCategory()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: 'white',
    width: width,
    height: 60,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  input: {
    height: 40,
    borderColor: COLOR_PRIMARY_10,
    borderRadius: 5,
    borderWidth: 1,
  },
  item: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 10,
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
});

export default Categories;
