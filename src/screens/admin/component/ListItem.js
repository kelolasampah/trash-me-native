import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighLight,
  TouchableOpacity,
  Dimensions,
  Button,
  Modal,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WrapButton} from '../../../components';
import {COLOR_PRIMARY_06, COLOR_PRIMARY_10} from '../../../utils/constant';

var {width} = Dimensions.get('window');

const ListItem = props => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor="#E8E8E8"
              activeOpacity={0.9}
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 15,
                right: 15,
              }}>
              <Icon color={'red'} name="window-close" size={24} />
            </TouchableOpacity>
            <>
              {/* <WrapButton
              medium
              secondary
              onPress={() => [
                props.navigation.navigate('ProductForm', {item: props}),
                setModalVisible(false),
              ]}>
              <Text style={styles.textStyle}>Ubah</Text>
            </WrapButton> */}
              {/* <WrapButton
              medium
              danger
              onPress={() => [props.delete(props.id), setModalVisible(false)]}>
              <Text style={styles.textStyle}>Hapus</Text>
            </WrapButton> */}
            </>

            <LinearGradient
              colors={[COLOR_PRIMARY_06, COLOR_PRIMARY_10]}
              style={{
                borderRadius: 4,
                width: 120,
                height: 40,
                marginHorizontal: 5,
                marginTop: 15,
                marginBottom: 5,
              }}>
              <TouchableRipple
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
                borderless={true}
                onPress={() => [
                  props.navigation.navigate('ProductForm', {item: props.item}),
                  setModalVisible(false),
                ]}>
                <Text style={styles.textStyle}>Perbarui</Text>
              </TouchableRipple>
            </LinearGradient>
            <LinearGradient
              colors={[`#ff4500`, '#dc143c']}
              style={{borderRadius: 4, width: 120, height: 40, margin: 5}}>
              <TouchableRipple
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
                borderless={true}
                onPress={() => [
                  props.delete(props.item.id),
                  setModalVisible(false),
                ]}>
                <Text style={styles.textStyle}>Hapus</Text>
              </TouchableRipple>
            </LinearGradient>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ProductNav', {
            screen: 'SingleProduct',
            params: {item: props.item.id, enable: false},
          });
        }}
        onLongPress={() => setModalVisible(true)}
        style={[
          styles.container,
          {
            backgroundColor: props.index % 2 == 0 ? 'white' : 'honeydew',
          },
        ]}>
        <Image
          source={{
            uri: props.item.image
              ? props.item.image
              : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
          }}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.item}>{props.item.brand}</Text>
        <Text style={styles.item} numberOfLines={3} ellipsizeMode="tail">
          {props.item.name}
        </Text>
        <Text style={styles.item} numberOfLines={3} ellipsizeMode="tail">
          {props.item.category.name}
        </Text>
        <Text style={styles.item}>
          Rp {props.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 7,
    height: width / 7,
    margin: 5,
  },
  item: {
    flexWrap: 'wrap',
    marginVertical: 3,
    marginHorizontal: 5,
    width: width / 6,
    textAlignVertical: 'center',
    fontSize: 12,
    fontWeight: '400',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ListItem;
