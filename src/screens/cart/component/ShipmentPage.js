import {StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {ActionButton} from '../../../components';
import {
  COLOR_GRAY,
  COLOR_PRIMARY_10,
  COLOR_SHIP_ANTERAJA,
  COLOR_SHIP_GOJEK,
  COLOR_SHIP_GRAB,
  COLOR_SHIP_JNE,
  COLOR_SHIP_JNT,
  COLOR_SHIP_REX,
  COLOR_SHIP_SICEPAT,
  COLOR_SHIP_TIKI,
} from '../../../utils/constant';
import Modal from 'react-native-modal';
import {Avatar, RadioButton, TouchableRipple} from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const dataShipment = [
  {
    title: 'Instant',
    content: [
      {
        id: 10,
        name: 'GrabExpress',
        method: 'Instant',
        fee: 18000,
        icon: 'GE',
        color: COLOR_SHIP_GRAB,
      },
      {
        id: 11,
        name: 'GoSend Bike',
        method: 'Instant',
        fee: 17000,
        icon: 'GS',
        color: COLOR_SHIP_GOJEK,
      },
    ],
  },
  {
    title: 'Regular',
    content: [
      {
        id: 20,
        name: 'SiCepat Reg',
        method: 'Regular',
        fee: 8000,
        icon: 'SC',
        color: COLOR_SHIP_SICEPAT,
      },
      {
        id: 21,
        name: 'JNT Reg',
        method: 'Regular',
        fee: 10000,
        icon: 'JNT',
        color: COLOR_SHIP_JNT,
      },
      {
        id: 22,
        name: 'JNE Reg',
        method: 'Regular',
        fee: 13000,
        icon: 'JNE',
        color: COLOR_SHIP_JNE,
      },
      {
        id: 23,
        name: 'TIKI',
        method: 'Regular',
        fee: 12000,
        icon: 'TK',
        color: COLOR_SHIP_TIKI,
      },
      {
        id: 24,
        name: 'AnterAja Reg',
        method: 'Regular',
        fee: 11000,
        icon: 'AA',
        color: COLOR_SHIP_ANTERAJA,
      },
    ],
  },
  {
    title: 'Cargo',
    content: [
      {
        id: 30,
        name: 'SiCepat Gokil',
        method: 'Cargo',
        fee: 7000,
        icon: 'SC',
        color: COLOR_SHIP_SICEPAT,
      },
      {
        id: 31,
        name: 'REX',
        method: 'Cargo',
        fee: 7000,
        icon: 'REX',
        color: COLOR_SHIP_REX,
      },
      {
        id: 32,
        name: 'AnterAja',
        method: 'Cargo',
        fee: 8000,
        icon: 'AA',
        color: COLOR_SHIP_ANTERAJA,
      },
      {
        id: 33,
        name: 'JNE',
        method: 'Cargo',
        fee: 8000,
        icon: 'JNE',
        color: COLOR_SHIP_JNE,
      },
    ],
  },
];

const ShipmentPage = props => {
  const {item, product} = props;

  const [courier, setCourier] = useState();
  const [shipment, setShipment] = useState([]);
  const [totalShipment, setTotalShipment] = useState();
  const [activeSections, setActiveSections] = useState([]);
  const [activeMerchant, setActiveMerchant] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = param => {
    setModalVisible(true);
    setActiveMerchant(param);
  };

  const closeModal = () => {
    setModalVisible(false);
    setActiveSections([]);
  };

  const onRadioChange = param => {
    setCourier(param);
    if (activeMerchant && param) {
      const index = shipment.findIndex(item => item.name === activeMerchant);
      if (index > -1) {
        setShipment(current =>
          current.map(item => {
            if (item.name === activeMerchant) {
              return {...item, data: param};
            }
            return item;
          }),
        );
      } else
        setShipment(current => [
          ...current,
          {name: activeMerchant, data: param},
        ]);
    }

    setTimeout(() => {
      closeModal();
    }, 10);
  };

  const setSections = sections => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  useEffect(() => {
    if (shipment) {
      setTotalShipment(
        shipment.reduce((acc, object) => {
          return acc + object.data.fee;
        }, 0),
      );
      props.submit({name: 'shipment', data: shipment});
    }
  }, [shipment]);

  const submitForm = () => {
    if (shipment) {
      //props.submit({name: 'shipment', data: shipment});
      props.pages(2);
    }
  };

  const _renderContentSection = param => {
    const index = shipment.findIndex(arr => arr.name === param);
    return index > -1 ? (
      <View style={styles.cardShipBodyWrapper}>
        <Avatar.Text
          size={34}
          label={shipment[index].data.icon}
          labelStyle={{fontSize: 14, fontWeight: 'bold'}}
          backgroundColor={shipment[index].data.color}
        />
        <View>
          <Text style={[styles.cardShipBodyText, {marginLeft: 15}]}>
            {shipment[index].data.method}
          </Text>
          <Text style={[styles.cardShipBodyText, {marginLeft: 15}]}>
            {shipment[index].data.name}
          </Text>
        </View>
        <Icon
          style={{
            position: 'absolute',
            right: 10,
            color: COLOR_PRIMARY_10,
          }}
          name={'truck-check'}
          size={22}
        />
      </View>
    ) : (
      <Text style={[styles.cardShipBodyText, {textAlign: 'center'}]}>
        Metode pengiriman belum ditentukan
      </Text>
    );
  };

  const _renderSectionTitle = (content, index, isActive) => {
    return index === 0 ? null : <View style={{height: 10}} />;
  };

  const _renderHeader = (content, index, isActive, sections) => {
    return (
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>{content.title}</Text>
        <Icon name={isActive ? 'chevron-down' : 'chevron-right'} size={22} />
      </View>
    );
  };

  const _renderContent = (content, index, isActive, sections) => {
    return (
      <View style={styles.contentWrapper}>
        <RadioButton.Group
          onValueChange={val => onRadioChange(val)}
          value={courier}>
          {content.content.map(item => {
            return (
              <TouchableRipple
                onPress={() => onRadioChange(item)}
                key={item.id}>
                <View style={styles.radioContainer}>
                  <Text style={styles.radioText}>{item.name}</Text>
                  <RadioButton
                    value={item}
                    label={item.name}
                    color={COLOR_PRIMARY_10 + '99'}
                  />
                </View>
              </TouchableRipple>
            );
          })}
        </RadioButton.Group>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {item.name}
        </Text>
      </View>

      <View style={styles.body}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}>
          {product.map(item => {
            return (
              <View key={item.id} style={styles.cardShipContent}>
                <TouchableRipple
                  style={styles.cardShipBodyRipple}
                  borderless={true}
                  onPress={() => openModal(item.name)}>
                  <View>
                    <View style={styles.cardShipHeader}>
                      <Text style={styles.cardShipHeaderText}>{item.name}</Text>
                    </View>
                    <View style={styles.cardShipBody}>
                      {_renderContentSection(item.name)}
                    </View>
                  </View>
                </TouchableRipple>
              </View>
            );
          })}
          {/* JUST SPACER */}
          <View style={{height: 40}} />
        </ScrollView>
      </View>

      {/* FOOTER SECTIONS */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.info}>
            Rp{' '}
            {totalShipment?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') ||
              '-'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginRight: 10}}>
            <ActionButton
              text={'Lanjut Pembayaran'}
              color={'white'}
              event={() => submitForm()}
            />
          </View>
        </View>
      </View>

      {/* MODAL SECTIONS */}
      <Modal
        style={styles.modal}
        isVisible={isModalVisible}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={400}
        backdropTransitionOutTiming={400} //{0} => https://github.com/react-native-modal/react-native-modal/issues/268
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        onBackdropPress={closeModal}
        onModalHide={async () => await setCourier()}>
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetContainer}>
            {/* JUST PICK PALLETE */}
            <View style={{height: 30, paddingTop: 10, alignItems: 'center'}}>
              <View
                style={{
                  margin: 1,
                  borderColor: COLOR_PRIMARY_10 + '99',
                  backgroundColor: COLOR_PRIMARY_10,
                  borderWidth: 2,
                  borderRadius: 2,
                  width: 50,
                  height: 4,
                }}
              />
            </View>
            {/* BOTTOM SHEET CONTENT */}
            <Accordion
              sections={dataShipment}
              activeSections={activeSections}
              style={styles.accordionContent}
              underlayColor={'white'}
              //sectionContainerStyle={{borderWidth: 1}} // per sections
              //containerStyle={{borderWidth: 1}} // all container
              renderSectionTitle={_renderSectionTitle}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={setSections}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ShipmentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PRIMARY_10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 10,
  },
  contentWrapper: {
    padding: 10,
    //marginBottom: 10,
    paddingHorizontal: 5,
    paddingTop: 5,
    elevation: 5,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    height: '100%',
  },
  contentBody: {
    flex: 1,
    height: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 10,
  },
  cardShipContent: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,

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
  scrollView: {
    width: '100%',
  },
  scrollViewContent: {
    paddingHorizontal: 0,
    paddingBottom: 5,
  },
  accordionContent: {
    borderWidth: 1,
    borderColor: COLOR_GRAY,
    marginHorizontal: 5,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLOR_PRIMARY_10 + '99',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLOR_GRAY,
    elevation: 5,
    shadowColor: COLOR_PRIMARY_10 + '99',
    shadowOpacity: 0.1,
  },
  headerText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  radioText: {
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
    minHeight: '20%',
    marginTop: 'auto',
    backgroundColor: 'white',
  },
  bottomSheetContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  info: {
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
});
