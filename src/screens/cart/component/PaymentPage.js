import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActionButton} from '../../../components';
import {
  COLOR_GRAY,
  COLOR_PAY_AKULAKU,
  COLOR_PAY_BCA,
  COLOR_PAY_BNI,
  COLOR_PAY_BRI,
  COLOR_PAY_DANA,
  COLOR_PAY_EASY,
  COLOR_PAY_GOPAY,
  COLOR_PAY_KREDIVO,
  COLOR_PAY_LINK,
  COLOR_PAY_MRI,
  COLOR_PAY_OVO,
  COLOR_PRIMARY_10,
} from '../../../utils/constant';

import {Avatar, RadioButton, TouchableRipple} from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const dataPayment = [
  {
    title: 'Bank Transfer',
    content: [
      {
        id: 10,
        name: 'Bank BCA',
        method: 'Bank Transfer',
        icon: 'BCA',
        color: COLOR_PAY_BCA,
      },
      {
        id: 11,
        name: 'Bank BNI',
        method: 'Bank Transfer',
        icon: 'BNI',
        color: COLOR_PAY_BNI,
      },
      {
        id: 12,
        name: 'Bank BRI',
        method: 'Bank Transfer',
        icon: 'BRI',
        color: COLOR_PAY_BRI,
      },
      {
        id: 13,
        name: 'Bank Mandiri',
        method: 'Bank Transfer',
        icon: 'MRI',
        color: COLOR_PAY_MRI,
      },
    ],
  },
  {
    title: 'Virtual Account',
    content: [
      {
        id: 20,
        name: 'BCA Virtual Account',
        method: 'Virtual Account',
        icon: 'BCA',
        color: COLOR_PAY_BCA,
      },
      {
        id: 21,
        name: 'BNI Virtual Account',
        method: 'Virtual Account',
        icon: 'BNI',
        color: COLOR_PAY_BNI,
      },
      {
        id: 22,
        name: 'BRI Virtual Account',
        method: 'Virtual Account',
        icon: 'BRI',
        color: COLOR_PAY_BRI,
      },
      {
        id: 23,
        name: 'Mandiri Virtual Account',
        method: 'Virtual Account',
        icon: 'MRI',
        color: COLOR_PAY_MRI,
      },
    ],
  },
  {
    title: 'Dompet Digital',
    content: [
      {
        id: 30,
        name: 'OVO',
        method: 'Dompet Digital',
        icon: 'OVO',
        color: COLOR_PAY_OVO,
      },
      {
        id: 31,
        name: 'GoPay',
        method: 'Dompet Digital',
        icon: 'GP',
        color: COLOR_PAY_GOPAY,
      },
      {
        id: 32,
        name: 'Dana',
        method: 'Dompet Digital',
        icon: 'DA',
        color: COLOR_PAY_DANA,
      },
      {
        id: 33,
        name: 'LinkAja',
        method: 'Dompet Digital',
        icon: 'LA',
        color: COLOR_PAY_LINK,
      },
    ],
  },
  {
    title: 'Cicilan',
    content: [
      {
        id: 40,
        name: 'Kredivo',
        method: 'Cicilan',
        icon: 'KV',
        color: COLOR_PAY_KREDIVO,
      },
      {
        id: 41,
        name: 'EasyCash',
        method: 'Cicilan',
        icon: 'EC',
        color: COLOR_PAY_EASY,
      },
      {
        id: 42,
        name: 'Akulaku',
        method: 'Cicilan',
        icon: 'AL',
        color: COLOR_PAY_AKULAKU,
      },
    ],
  },
];

const PaymentPage = props => {
  const {item} = props;

  const [payment, setPayment] = useState();
  const [activeSections, setActiveSections] = useState([]);

  const setSections = sections => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  useEffect(() => {
    if (payment) {
      props.submit({name: 'payment', data: payment});
    }
  }, [payment]);

  const submitForm = () => {
    if (payment) {
      //props.submit({name: 'payment', data: payment});
      props.pages(3);
    }
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
      <View style={styles.content}>
        <View style={{padding: 5, elevation: 5, backgroundColor: 'white'}}>
          <RadioButton.Group
            onValueChange={pay => setPayment(pay)}
            value={payment}>
            {content.content.map(item => {
              return (
                <TouchableRipple onPress={() => setPayment(item)} key={item.id}>
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
        <View style={styles.cardPayContent}>
          <View style={styles.cardPayHeader}>
            <Text style={styles.cardPayHeaderText}>
              Pilih metode pembayaran
            </Text>
          </View>
          <View style={styles.cardPayBody}>
            {payment ? (
              <View style={styles.cardPayBodyWrapper}>
                <Avatar.Text
                  size={34}
                  label={payment.icon}
                  labelStyle={{fontSize: 14, fontWeight: 'bold'}}
                  backgroundColor={payment.color}
                />
                <View>
                  <Text style={[styles.cardPayBodyText, {marginLeft: 15}]}>
                    {payment.method}
                  </Text>
                  <Text style={[styles.cardPayBodyText, {marginLeft: 15}]}>
                    {payment.name}
                  </Text>
                </View>
                <Icon
                  style={{
                    position: 'absolute',
                    right: 10,
                    color: COLOR_PRIMARY_10,
                  }}
                  name={'credit-card-check'}
                  size={22}
                />
              </View>
            ) : (
              <Text style={[styles.cardPayBodyText, {textAlign: 'center'}]}>
                Metode pembayaran belum ditentukan
              </Text>
            )}
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}>
          <Accordion
            sections={dataPayment}
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
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.info}>Sudah lengkap!</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginRight: 10}}>
            <ActionButton
              text={'Lanjut Konfirmasi'}
              color={'white'}
              event={() => submitForm()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentPage;

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
  body: {
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
  cardPayContent: {
    margin: 20,
    borderRadius: 5,

    elevation: 5,
    backgroundColor: 'white',
  },
  cardPayHeader: {
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPayBody: {
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  cardPayBodyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardPayHeaderText: {
    fontSize: 14,
    fontWeight: '500',
  },
  cardPayBodyText: {
    fontSize: 14,
    fontWeight: '400',
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  info: {
    fontSize: 18,
    margin: 20,
    color: 'white',
  },
});
