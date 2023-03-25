import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import CollapsibleList from 'react-native-collapsible-list';
import moment from 'moment/moment';
import {
  IconConventional,
  IconEquipment,
  IconResult,
  IconSmart,
  IconTaking,
} from '../../../assets';
import {
  COLOR_GREEN,
  COLOR_ORANGE,
  COLOR_PRIMARY_10,
  COLOR_RED,
  COLOR_YELLOW,
  FONT_ABold,
  FONT_ALight,
  FONT_ARegular,
  FONT_ASemi,
  FONT_BBold,
} from '../../../utils/constant';

const orderStatus = [
  {name: 'Selesai', code: '0'},
  {name: 'Diterima', code: '1'},
  {name: 'Dikirim', code: '2'},
  {name: 'Menunggu', code: '3'},
  {name: 'Dibatalkan', code: '4'},
];

const HistoryTransaction = ({content}) => {
  const Icon = props => {
    if (props.type === 'Pengambilan Sampah')
      return <IconTaking width={20} height={20} />;
    if (props.type === 'Peralatan Sampah')
      return <IconEquipment width={20} height={20} />;
    if (props.type === 'Hasil Olah Sampah')
      return <IconResult width={25} height={25} />;
    if (props.type === 'Kelola Sampah Konvensional')
      return <IconConventional width={20} height={20} />;
    if (props.type === 'Kelola Sampah Smart')
      return <IconSmart width={20} height={20} />;

    return <IconTaking width={20} height={20} />;
  };

  return (
    <ScrollView
      style={styles.scroll}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {content.map((items, _index) => {
        return (
          <CollapsibleList
            key={items.id + _index + 'collabsible'}
            numberOfVisibleItems={0}
            wrapperStyle={styles.wrapperCollapsibleList}
            buttonPosition="top"
            buttonContent={
              <View
                key={items.id + _index + 'container'}
                style={styles.container}>
                {/* HEADER */}
                <View style={styles.boxRowHeader}>
                  <View style={styles.wrapperIcon}>
                    <Icon type={items.orderItems[0].product.category.type} />
                  </View>
                  <View style={styles.wrapperText}>
                    <Text style={styles.title}>
                      {items.orderItems[0].product.category.type}
                    </Text>
                    <Text style={styles.info}>
                      {moment(items.dateOrdered).local().format('DD MMM YYYY')}
                    </Text>
                  </View>

                  <View style={styles.wrapperStatus}>
                    <Text style={styles.status(items.status)}>
                      {orderStatus[items.status].name}
                    </Text>
                  </View>
                </View>
                {/* SPARATOR */}
                <View style={styles.sparator} />
                {/* CONTENT */}
                <View style={styles.boxRowContent}>
                  <View style={styles.wrapperImage}>
                    <Image
                      style={styles.image}
                      //objectFit="contain"
                      resizeMode="contain"
                      source={{
                        uri:
                          items.orderItems[0].product.image !== ''
                            ? items.orderItems[0].product.image
                            : `https://picsum.photos/id/${
                                Math.floor(Math.random() * 100) + 1
                              }/400/600`,
                      }}
                    />
                  </View>
                  <View style={[styles.wrapperText, {marginTop: 10}]}>
                    <Text style={styles.titleContent}>
                      {/* {items[0].product.name} */}
                      {items.id}
                    </Text>
                    <Text style={styles.infoContent}>
                      {items.orderItems.length} barang
                    </Text>
                    <Text style={styles.infoContent}>
                      Rp{' '}
                      {items.totalPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </Text>
                  </View>
                </View>
              </View>
            }>
            {items.orderItems.length > 1
              ? items.orderItems.map((item, __index) => {
                  return __index > -1 ? (
                    <View
                      key={item.id + __index + 'boxRowContent'}
                      style={styles.boxRowContent}>
                      <View style={styles.wrapperImage}>
                        <Image
                          style={styles.image}
                          //objectFit="contain"
                          resizeMode="contain"
                          source={{
                            uri:
                              item.product.image !== ''
                                ? item.product.image
                                : `https://picsum.photos/id/${
                                    Math.floor(Math.random() * 100) + 1
                                  }/400/600`,
                          }}
                        />
                      </View>
                      <View style={[styles.wrapperText, {marginTop: 10}]}>
                        <Text style={styles.titleContent}>
                          {item.product.name}
                        </Text>
                        <Text style={styles.infoContent}>
                          {item.quantity} item
                        </Text>
                        <Text style={styles.infoContent}>
                          @
                          {item.product.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                          x {item.quantity} = Rp{' '}
                          {(item.product.price * item.quantity)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                        </Text>
                      </View>
                    </View>
                  ) : null;
                })
              : null}
            <View style={styles.boxRowFooter}>
              <Text style={styles.collapsibleItemText}>
                {items.orderItems[0].product.merchant.merchant}
              </Text>
              <Text style={styles.collapsibleItemText}>
                {' - '}
                {items.orderItems[0].product.merchant.phone}
                {' - '}
              </Text>
              <Text style={styles.collapsibleItemText}>
                {items.orderItems[0].product.merchant.regency} -{' '}
                {items.orderItems[0].product.merchant.province}
              </Text>
            </View>
          </CollapsibleList>
        );
      })}
    </ScrollView>
  );
};

export default HistoryTransaction;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 8,
    //backgroundColor: 'white',

    borderColor: 'lightgrey',
    borderWidth: 1,

    // drop shadow
    // shadowColor: '#000',
    // shadowOffset: {width: 1, height: 1},
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    // elevation: 2,
  },
  boxRowHeader: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  boxRowContent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  wrapperIcon: {
    paddingHorizontal: 3,
    paddingTop: 5,
    paddingBottom: 3,
  },
  wrapperText: {
    marginLeft: windowWidth * 0.03,
    paddingBottom: 2,
    paddingBottom: 3,
  },
  wrapperStatus: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    paddingHorizontal: 3,
  },
  wrapperImage: {
    paddingHorizontal: 0,
    paddingTop: 6,
    paddingBottom: 3,
  },
  title: {
    fontSize: 12,
    fontFamily: FONT_ASemi,
  },
  info: {
    fontSize: 10,
    fontFamily: FONT_ARegular,
  },
  titleContent: {
    fontSize: 14,
    fontFamily: FONT_ABold,
  },
  infoContent: {
    fontSize: 12,
    fontFamily: FONT_ARegular,
  },
  image: {
    borderRadius: 8,
    borderColor: 'lightgrey', //COLOR_PRIMARY_10,
    borderWidth: 1,
    width: windowWidth * 0.17,
    height: windowWidth * 0.17,
    backgroundColor: 'transparent',
  },
  status: status => ({
    fontSize: 12,
    fontFamily: FONT_ASemi,
    alignSelf: 'flex-start',
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 10,
    color:
      status === '0' || status === '1'
        ? COLOR_GREEN
        : status === '2'
        ? COLOR_ORANGE
        : COLOR_RED,
    backgroundColor:
      status === '0' || status === '1'
        ? COLOR_GREEN + '1f'
        : status === '2'
        ? COLOR_ORANGE + '1f'
        : COLOR_RED + '1f',
  }),
  sparator: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgrey',//COLOR_PRIMARY_10,
    borderBottomColor: 'lightgrey',//COLOR_PRIMARY_10,
    width: '100%',
    marginBottom: 2,
    marginTop: 4,
  },
  wrapperCollapsibleList: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: windowHeight * 0.01,

    // collapsible
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 10,

    // drop shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxRowFooter: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'center',
  },
  collapsibleItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    padding: 15,
  },
  collapsibleItemText: {
    fontFamily: FONT_ASemi,
    fontSize: 13,
    color: '#777',
  },
  scroll: {},
});
