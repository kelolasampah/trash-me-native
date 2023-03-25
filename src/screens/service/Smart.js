import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import {ListMenu} from '../../components';

const menuData = [
  {
    id: '1',
    title: 'Layanan Incinerator Berbasis IoT',
  },
  {
    id: '2',
    title: 'Layanan Monitoring & Kontrol Tong Sampah',
  },
  {
    id: '3',
    title: 'Layanan Jemput Sampah',
  },
  {
    id: '4',
    title: 'Konsultasi',
  },
];

const Smart = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ListMenu content={menuData} />
    </SafeAreaView>
  )
}

export default Smart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
})