import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import {TextInput} from 'react-native-paper';

import {Picker} from '@react-native-picker/picker';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';

import AuthGlobal from '../../contexts/store/AuthGlobal';
import {useNavigation, useTheme} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import mime from 'mime';
import {
  WrapButton,
  WrapContainer,
  Input,
  Error,
  ActionButton,
} from '../../components';
import {COLOR_PRIMARY_10, COLOR_TEXT_01} from '../../utils/constant';

import '../../assets/common/global'

const includeExtra = true;

const ProductForm = props => {
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();
  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [countInStock, setCountInStock] = useState('');
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeature] = useState(0);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null);
  const [open, setOpen] = useState(false);

  const [pickerFocused, setPickerFocused] = useState(false);
  const pickerRef = useRef();
  const openPicker = () => {
    pickerRef.current.focus();
  };

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setBrand(props.route.params.item.brand);
      setName(props.route.params.item.name);
      setPrice(props.route.params.item.price.toString());
      setDescription(props.route.params.item.description);
      setMainImage(props.route.params.item.image);
      setImage(props.route.params.item.image);
      setCategory(props.route.params.item.category.id);
      setCountInStock(props.route.params.item.countInStock.toString());
    }

    AsyncStorage.getItem('jwt')
      .then(res => {
        setToken(res);
      })
      .catch(error => console.log(error));

    // Categories
    axios
      .get(`${global.baseurl}/categories`)
      .then(res => setCategories(res.data))
      .catch(error => alert('Gagal memuat konten'));

    // Image Picker
    // (async () => {
    //   if (Platform.OS !== 'web') {
    //     const {status} = await ImagePicker.requestCameraPermissionsAsync();
    //     if (status !== 'granted') {
    //       alert('Sorry, we need camera roll permissions to make this work!');
    //     }
    //   }
    // })();

    return () => {
      setCategories([]);
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibrary({
      maxHeight: 640,
      maxWidth: 480,
      selectionLimit: 1,
      //quality: 1,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    });

    if (result?.assets) {
      setMainImage(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  const captureImage = async () => {
    let result = await ImagePicker.launchCamera({
      maxHeight: 640,
      maxWidth: 480,
      //saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    });

    if (result?.assets) {
      setMainImage(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  const addProduct = () => {
    if (
      name == '' ||
      brand == '' ||
      price == '' ||
      description == '' ||
      category == '' ||
      countInStock == '' ||
      !image
    ) {
      setError('Data belum lengkap');
      Toast.show({
        visibilityTime: 250,
        autoHide: true,
        topOffset: 40,
        type: 'error',
        text1: 'Data belum lengkap',
        text2: 'Silahkan lengkapi terlebih dahulu',
      });
      return;
    }

    let formData = new FormData();

    const newImageUri = image.includes('http://')
      ? image
      : 'file:///' + image.split('file:/').join('');

    formData.append('image', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split('/').pop(),
    });
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('countInStock', countInStock);
    formData.append('richDescription', richDescription);
    formData.append('rating', rating);
    formData.append('numReviews', numReviews);
    formData.append('isFeatured', isFeatured);
    formData.append('merchant', context.stateUser.user.userId);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    if (item !== null) {
      axios
        .put(`${global.baseurl}/products/${item.id}`, formData, config)
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              visibilityTime: 250,
              autoHide: true,
              topOffset: 40,
              type: 'success',
              text1: 'Produk berhasil diperbarui',
              text2: '',
            });
            setTimeout(() => {
              navigation.navigate('Products');
            }, 500);
          }
        })
        .catch(error => {
          console.log('err1: ' + JSON.stringify(error));
          Toast.show({
            visibilityTime: 250,
            autoHide: true,
            topOffset: 40,
            type: 'error',
            text1: 'Terjadi kesalahan',
            text2: 'Silahkan coba kembali',
          });
        });
    } else {
      axios
        .post(`${global.baseurl}/products`, formData, config)
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              visibilityTime: 250,
              autoHide: true,
              topOffset: 40,
              type: 'success',
              text1: 'Produk baru berhasil ditambahkan',
              text2: '',
            });
            setTimeout(() => {
              navigation.navigate('Products');
            }, 500);
          }
        })
        .catch(error => {
          console.log('err2: ' + JSON.stringify(error));
          Toast.show({
            visibilityTime: 250,
            autoHide: true,
            topOffset: 40,
            type: 'error',
            text1: 'Terjadi kesalahan',
            text2: 'Silahkan coba kembali',
          });
        });
    }
  };

  return (
    <KeyboardAwareScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {/* <WrapContainer title={name || 'Produk Baru'} horizontal={false} vertical={false}> */}
      <Pressable style={styles.imageContainer} onPress={pickImage}>
        <Image style={styles.image} source={{uri: mainImage}} />
        <TouchableOpacity
          onPress={captureImage}
          style={styles.imagePicker}
          activeOpacity={0.8}>
          <Icon style={{color: 'white'}} name="camera" size={28} />
        </TouchableOpacity>
      </Pressable>
      {/* <View style={styles.label}>
          <Text style={{textDecorationLine: 'underline'}}>Merek</Text>
        </View>
        <Input
          placeholder="Merek barang"
          name="brand"
          id="brand"
          value={brand}
          onChangeText={text => setBrand(text)}
        /> */}

      <View
        style={{
          width: '80%',
          marginTop: 30,
          marginBottom: 0,
          justifyContent: 'center',
        }}>
        <DropDownPicker
          items={categories}
          schema={{
            label: 'name',
            value: 'id',
          }}
          placeholder={'Pilih kategori barang'}
          placeholderStyle={{color: 'gray', fontWeight: '400', fontSize: 15}}
          open={open}
          setOpen={setOpen}
          value={category}
          setValue={setCategory}
          listMode="SCROLLVIEW"
          dropDownDirection="BOTTOM"
          //maxHeight={500}
          style={{
            borderColor: COLOR_PRIMARY_10,
            backgroundColor: 'honeydew',
          }}
          scrollViewProps={{
            decelerationRate: 'fast',
            showsVerticalScrollIndicator: false,
            showsHorizontalScrollIndicator: false,
          }}
          textStyle={{
            fontSize: 15,
            fontWeight: '400',
          }}
          ArrowDownIconComponent={() => (
            <Icon
              size={26}
              style={{marginHorizontal: 10}}
              color={COLOR_PRIMARY_10}
              name="angle-down"
            />
          )}
          ArrowUpIconComponent={() => (
            <Icon
              size={26}
              style={{marginHorizontal: 10}}
              color={COLOR_PRIMARY_10}
              name="angle-up"
            />
          )}
          TickIconComponent={() => (
            <FIcon
              size={24}
              style={{marginHorizontal: 5}}
              color={COLOR_PRIMARY_10}
              name="check"
            />
          )}
          dropDownContainerStyle={{
            borderColor: COLOR_PRIMARY_10,
          }}
        />
      </View>

      <TextInput
        label="Merek barang"
        mode="outlined"
        theme={{roundness: 10}}
        style={[styles.inputText, {height: 40, marginTop: 10}]}
        activeOutlineColor={COLOR_PRIMARY_10}
        outlineColor={COLOR_PRIMARY_10}
        textAlignVertical="center"
        value={brand}
        maxLength={30}
        onChangeText={text => setBrand(text)}
      />

      <TextInput
        label="Nama barang"
        mode="outlined"
        theme={{roundness: 10}}
        style={[styles.inputText, {height: 40}]}
        activeOutlineColor={COLOR_PRIMARY_10}
        outlineColor={COLOR_PRIMARY_10}
        textAlignVertical="center"
        value={name}
        maxLength={60}
        onChangeText={text => setName(text)}
      />

      <TextInput
        label="Harga barang"
        mode="outlined"
        theme={{roundness: 10}}
        style={[styles.inputText, {height: 40}]}
        activeOutlineColor={COLOR_PRIMARY_10}
        outlineColor={COLOR_PRIMARY_10}
        textAlignVertical="center"
        keyboardType={'numeric'}
        value={price}
        maxLength={10}
        onChangeText={text => setPrice(text.replace(/[^0-9]/g, ''))}
      />
      <TextInput
        label="Stok barang"
        mode="outlined"
        theme={{roundness: 10}}
        style={[styles.inputText, {height: 40}]}
        activeOutlineColor={COLOR_PRIMARY_10}
        outlineColor={COLOR_PRIMARY_10}
        textAlignVertical="center"
        keyboardType={'numeric'}
        value={countInStock}
        maxLength={3}
        onChangeText={text => setCountInStock(text.replace(/[^0-9]/g, ''))}
      />

      <TextInput
        label="Deskripsi barang"
        mode="outlined"
        theme={{roundness: 10}}
        style={styles.inputText}
        activeOutlineColor={COLOR_PRIMARY_10}
        outlineColor={COLOR_PRIMARY_10}
        textAlignVertical="center"
        value={description}
        multiline={true}
        maxLength={500}
        onChangeText={text => setDescription(text)}
      />

      {/* <View style={styles.pickerWrapper}>
        <Picker
          mode="dialog" //"dropdown"
          dropdownIconColor={COLOR_PRIMARY_10}
          selectedValue={pickerValue}
          onValueChange={e => [setPickerValue(e), setCategory(e)]}>
          <Picker.Item value="" label="Pilih kategori produk" enabled={false} />
          {categories.map(c => {
            return <Picker.Item key={c.id} label={c.name} value={c.id} />;
          })}
        </Picker>
      </View> */}

      <View
        style={{
          borderRadius: 10,
          borderColor: COLOR_PRIMARY_10,
          borderWidth: 1,
          overflow: 'hidden',
          height: 55,
          padding: 0,
          //margin: 0,
          backgroundColor: 'honeydew',
          width: '80%',
          marginTop: 15,
        }}>
        <Picker
          mode="dialog"
          //iosIcon={<Icon color={COLOR_PRIMARY_10} name="chevron-down" />}
          dropdownIconColor={COLOR_PRIMARY_10}
          style={{
            width: undefined,
            padding: 0,
            margin: 0,
          }}
          selectedValue={category}
          onFocus={() => setPickerFocused(true)}
          onBlur={() => setPickerFocused(false)}
          onValueChange={e => setCategory(e)}>
          <Picker.Item
            value=""
            label="Pilih kategori produk"
            style={{
              color: pickerFocused ? COLOR_PRIMARY_10 : 'gray',
              backgroundColor: 'honeydew',
            }}
            enabled={!pickerFocused}
          />
          {categories.map(c => {
            return (
              <Picker.Item
                key={c.id}
                label={c.name}
                value={c.id}
                color={
                  pickerFocused
                    ? category !== c.id
                      ? COLOR_TEXT_01
                      : 'gray'
                    : COLOR_TEXT_01
                }
              />
            );
          })}
        </Picker>
      </View>

      {/* <Error message={err} err={err? true:false} />  */}
      <View style={styles.buttonContainer}>
        {/* <WrapButton large primary onPress={() => addProduct()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </WrapButton> */}
        <ActionButton
          text={'Konfirmasi'}
          color={'white'}
          event={() => addProduct()}
        />
      </View>
      {/* </WrapContainer> */}
    </KeyboardAwareScrollView>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    marginTop: 10,
    marginBottom: 100,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    width: '80%',
    marginTop: 10,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 80,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'red',
  },
  inputText: {
    fontSize: 15,
    width: '80%',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: 'honeydew',
  },
  imageContainer: {
    marginTop: 20,
    width: width * 0.55,
    height: width * 0.55,
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 0,
    justifyContent: 'center',
    borderRadius: Math.round(width + height) / 2,
    borderColor: COLOR_PRIMARY_10,
    elevation: 20,
    backgroundColor: 'mintcream',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: Math.round(width + height) / 2,
  },
  imagePicker: {
    position: 'absolute',
    backgroundColor: COLOR_PRIMARY_10,
    right: 10,
    bottom: 10,
    padding: 10,
    borderRadius: Math.round(width + height) / 2,
    elevation: 10,
  },
  pickerWrapper: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    //backgroundColor: 'white',
    //margin: 5,
    //borderRadius: 10,
    //padding: 10,
    //borderWidth: 2,
    //borderColor: COLOR_PRIMARY_10,
  },
});

export default ProductForm;
