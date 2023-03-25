import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  IconAccount,
  IconAccountActive,
  IconHome,
  IconHomeActive,
  IconTransaction,
  IconTransactionActive,
} from '../../assets';

import {COLOR_DISABLE, COLOR_PRIMARY_60} from '../../utils/constant';

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
  const Icon = () => {
    if (label === 'Beranda')
      return isFocused ? (
        <IconHomeActive width={35} height={35} style={{alignSelf: 'center'}}/>
      ) : (
        <IconHome width={35} height={35} style={{alignSelf: 'center'}}/>
      );
    if (label === 'Transaksi')
      return isFocused ? (
        <IconTransactionActive width={35} height={35} style={{alignSelf: 'center'}}/>
      ) : (
        <IconTransaction width={35} height={35} style={{alignSelf: 'center'}}/>
      );
    if (label === 'Akun')
      return isFocused ? (
        <IconAccountActive width={35} height={35} style={{alignSelf: 'center'}}/>
      ) : (
        <IconAccount width={35} height={35} style={{alignSelf: 'center'}}/>
      );

    return <IconHome />;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <View style={styles.button}>
        <Icon style={styles.icon} />
        <Text style={styles.text(isFocused)}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    marginTop: 5,
  },
  icon: {},
  text: isFocused => ({
    fontSize: 10,
    color: isFocused ? COLOR_PRIMARY_60 : COLOR_DISABLE,
    marginTop: 2,
    textAlign: 'center',
  }),
});
