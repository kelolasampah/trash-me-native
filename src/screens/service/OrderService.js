import React, {useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {
  COLOR_PRIMARY_10,
  COLOR_TEXT_01,
  COLOR_GRAY,
  FONT_BBold,
  FONT_BRegular,
} from '../../utils/constant';

const OrderService = props => {
  const {order, address} = props.route.params;
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);

  return order?.name?.length > 0 ? (
    <View style={styles.containerModal}>
      <TouchableOpacity
        style={styles.boxNavigationModal}
        activeOpacity={1}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.textIconModal}>{'<'}</Text>
        <Text style={styles.textStatusModal}>Pemesanan</Text>
      </TouchableOpacity>
      <View style={{margin: 10}}>
        {/* <View style={{borderWidth: 2, borderColor: 'red', borderRadius: 10}}>
          <Text>Pilih alamat</Text>
        </View> */}
        <View style={styles.cardShipContent}>
          <TouchableRipple
            style={styles.cardShipBodyRipple}
            borderless={true}
            onPress={() => {setModalVisible(true)}}>
            <View>
              <View style={styles.cardShipHeader}>
                <Text style={styles.cardShipHeaderText}>Alamat pengiriman</Text>
              </View>
              <View style={styles.cardShipBody}>
                {/* {_renderContentSection(item.name)} */}
              </View>
            </View>
          </TouchableRipple>
        </View>
      </View>

      {order?.name?.length > 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.textContentModal}>{order.name}</Text>
          <Text
            style={[
              styles.textContentModal,
              {fontSize: 12, fontStyle: 'italic'},
            ]}>
            Rp {order.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </Text>

          {/*
          {address.map(item => {
            return <Text key={item.name}>{item.name}</Text>;
          })} 
          */}
        </View>
      ) : null}
      <Modal
        style={styles.modal}
        isVisible={isModalVisible}
        animationIn='slideInUp'
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        hasBackdrop={true}
        useNativeDriver={true}
        onBackdropPress={() => {
          setModalVisible(false);
        }}>
        <View style={styles.bottomSheet}>
          <TouchableOpacity
            style={styles.boxNavigationModal}
            activeOpacity={1}
            onPress={() => {
              setModalVisible(false);
            }}>
            {/* <Text style={styles.textIconModal}>{'<'}</Text> */}
            <Text style={styles.textStatusModal}>Alamat</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  ) : null;
};

export default OrderService;

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'transparent',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  boxCol: {
    flexDirection: 'column',
    padding: 5,
    alignItems: 'center',

    height: width * 0.6 + 5 + 8,
    backgroundColor: COLOR_GRAY,

    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLOR_PRIMARY_10,

    // drop shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  boxColRow: {
    flexDirection: 'row',

    height: width * 0.4 + 5 + 8,
    backgroundColor: COLOR_GRAY,
  },
  boxRow: {
    flexDirection: 'row',
    padding: 5,

    height: width * 0.6 + 5 + 8,
    backgroundColor: COLOR_GRAY,

    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLOR_PRIMARY_10,

    // drop shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  boxWrapper: {
    flexGrow: 1,
    marginLeft: 5,
    flexDirection: 'column',
    height: width * 0.6,

    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLOR_GRAY,

    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLOR_PRIMARY_10,
  },
  boxContent: {
    flexGrow: 1,

    margin: 5,
    padding: 5,
    height: '35%',
    width: '90%',
    maxWidth: width - (width * 0.3 + 20 + 10 + 8) - 10,

    alignItems: 'center',

    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLOR_PRIMARY_10,
  },
  boxPrice: {
    margin: 0,
    width: '90%',

    //borderWidth: 1,
    //borderRadius: 8,
    //borderColor: COLOR_PRIMARY_10,
  },
  boxAction: {
    margin: 5,
    marginBottom: 10,
    width: '90%',

    //borderWidth: 1,
    //borderRadius: 8,
    //borderColor: COLOR_PRIMARY_10,
  },
  sparator: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLOR_PRIMARY_10,
    borderBottomColor: COLOR_PRIMARY_10,
    width: '90%',
    marginVertical: 2,
  },
  textTitle: {
    fontSize: 18,
    margin: 5,
    fontWeight: 'bold',
    color: COLOR_PRIMARY_10,
    backgroundColor: 'transparent',
  },
  textContent: {
    fontSize: 12,
    fontWeight: 'normal',
    marginVertical: 5,
    marginHorizontal: 5,
    color: COLOR_TEXT_01 + 'a1',
    backgroundColor: 'transparent',
  },
  textHarga: {
    fontSize: 12,
    fontWeight: 'normal',
    marginTop: 0,
    marginHorizontal: 5,
    color: COLOR_TEXT_01 + 'a1',
    backgroundColor: 'transparent',
  },
  textPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
    marginBottom: 4,
    color: COLOR_TEXT_01,
    backgroundColor: 'transparent',
  },
  image: {
    borderRadius: 8,
    borderColor: COLOR_PRIMARY_10,
    borderWidth: 1,
    width: width * 0.3,
    height: width * 0.6,
    backgroundColor: 'transparent',
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'white',
  },
  boxNavigationModal: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',

    height: 50,
    marginBottom: 10,

    borderBottomWidth: 2,
    borderBottomColor: COLOR_PRIMARY_10,

    // drop shadow
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    //elevation: 2,
  },
  textStatusModal: {
    fontSize: 14,
    fontFamily: FONT_BBold,
    textAlignVertical: 'center',
    marginLeft: 15,
    marginBottom: 3,
  },
  textIconModal: {
    fontSize: 24,
    fontFamily: FONT_BRegular,
    textAlignVertical: 'center',
    marginLeft: 15,
    marginBottom: 3,
  },
  textContentModal: {
    fontSize: 20,
    fontFamily: FONT_BRegular,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  cardShipContent: {
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 8,

    elevation: 5,
    backgroundColor: 'white',
  },
  cardShipHeader: {
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_GRAY,
    alignItems: 'center',
    justifyContent: 'center',

    //borderBottomColor: COLOR_GRAY,
    //borderBottomWidth: 1,
  },
  cardShipBody: {
    marginHorizontal: 20,
    marginVertical: 5,
    paddingVertical: 10,
  },
  cardShipBodyRipple: {
    borderRadius: 10,
  },
  cardShipBodyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardShipHeaderText: {
    fontSize: 14,
    fontWeight: '500',
  },
  cardShipBodyText: {
    fontSize: 14,
    fontWeight: '400',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomSheet: {
    //if use RN Modal
    //height: '50%',
    minHeight: '50%',
    marginTop: 'auto',
    backgroundColor: 'white',
  },
  bottomSheetContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
