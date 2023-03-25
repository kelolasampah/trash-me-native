import React from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';
import { Card } from 'react-native-paper';
import {ListMenu} from '../../components';

const menuData = [
  {
    id: '1',
    title: 'Open Dumpping (Timbun)',
  },
  {
    id: '2',
    title: 'Layanan Bakar',
  },
  {
    id: '3',
    title: 'Bank Sampah',
  },
  {
    id: '4',
    title: 'Layanan Incinerator (non IoT)',
  },
  {
    id: '5',
    title: 'Konsultasi',
  },
];

const Conventional = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ListMenu content={menuData} />
    </SafeAreaView>
  );
};

export default Conventional;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
