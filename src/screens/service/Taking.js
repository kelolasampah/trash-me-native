import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar, TouchableOpacity} from 'react-native';
import {ListMenu, ListMenuEnhanced} from '../../components';
import {randomImages} from '../../assets/common/randomImages';

const menuData = [
  {
    id: '1',
    title: 'Jasa Pemilahan',
  },
  {
    id: '2',
    title: 'Jasa Pengangkutan',
  },
  {
    id: '3',
    title: 'Jasa Tabungan Sampah',
  },
  {
    id: '4',
    title: 'Konsultasi',
  },
];

const menuDataEnhanced = [
  {
    id: '1',
    name: 'Jasa Pemilahan',
    description: `24 jam siap melayani pemilahan sampah.`,
    image: 'http://117.53.45.140:11001/public/uploads/1_1_pilah_sampah.png',
    price: 'Rp 50.000',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Jasa Pengangkutan',
    description: `24 jam siap angkut sampah.\nInfo lebih lanjut hub 08567777616`,
    image: 'http://117.53.45.140:11001/public/uploads/1_2_angkut_sampah.jpg',
    price: 'Rp 75.000',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Jasa Tabungan Sampah',
    description: 'Coming soon',
    image: 'http://117.53.45.140:11001/public/uploads/1_3_tabungan_sampah.jpg',
    price: 'Rp 0',
    isFeatured: false,
  },
  {
    id: '4',
    name: 'Konsultasi',
    description: 'Untuk info lebih lanjut hubungi admin di 085722395259 ',
    image: 'http://117.53.45.140:11001/public/uploads/1_4_konsultasi.jpg',
    price: 'Rp 5.000',
    isFeatured: true,
  },
];

const Taking = () => {
  // const [imageSource, setImageSource] = useState([]);
  const payload = menuDataEnhanced; //menuData;

  // useEffect(() => {
  //   const imgFetch = async () => {
  //     await randomImages(payload.length).then(data =>
  //       data.map((item, index) => {
  //         console.log(index +"=" + item),
  //         payload[index].image = item
  //       })
  //     );
  //     console.log(payload);
  //   };
  //   imgFetch();
  //   return () => {
  //     //setImageSource([])
  //   };
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <ListMenu content={payload} /> */}
      <ListMenuEnhanced content={payload}/>
    </SafeAreaView>
  );
};

export default Taking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight * 0.3 || 0,
    marginBottom: StatusBar.currentHeight * 0.3 || 0,
  },
});
