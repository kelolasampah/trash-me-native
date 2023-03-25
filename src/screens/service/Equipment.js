import React from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';
import {ListMenu, ListMenuEnhanced} from '../../components';
import {randomImages} from '../../assets/common/randomImages';

const menuData = [
  {
    id: '1',
    title: 'Biotech',
  },
  {
    id: '2',
    title: 'MOS',
  },
  {
    id: '3',
    title: 'Mesin Crusher',
  },
  {
    id: '4',
    title: 'Mesin Press Sampah',
  },
  {
    id: '5',
    title: 'Mesin Olah Sampah',
  },
  {
    id: '6',
    title: 'Pembangkit Listrik Tenaga Sampah',
  },
  {
    id: '7',
    title: 'Konsultasi',
  },
];

const menuDataEnhanced = [
  {
    id: '1',
    name: 'Biotech',
    description: `Produk BIOTANK Septic Tank Biotech adalah septictank modern dengan Teknologi yang memanfaatkan Bakteri untuk mengolah limbah agar layak disalurkan ke salurang pembuangan umum /Kota. Kelebihan :
1.	Anti Penuh
2.	Anti Korosi
3.	Tahan Lama
4.	Body Kokoh
5.	Anti Sedot WC
Material :
Body = Fiberglass (FRP)
Media Cell A =Fixed Media PVC Sheet
Media Cell B = BioBall Media HDPE
Manhole Cover = Fiberglass
Pipa = PVC
Spesifikasi :
(Rumah Tinggal, Ruko, Rukan, DLL)
Kapasitas 1000 Liter / 1m3
Daya Urai : 5 orang
Dimensi : D.100xT.135 cm
Pipa Inflow : 4"
Pipa Outflow : 4"
Pipa Ventilasi : 2"
Cleaning Tube : 4"
Pipa Disinfectan : 2"`,
        image: 'http://117.53.45.140:11001/public/uploads/2_1_biotank.jpg',
        price: 'Rp 3.240.000',
    isFeatured: true
  },
  {
    id: '2',
    name: 'MOS',
    description: `Coming soon`,
    image: 'http://117.53.45.140:11001/public/uploads/2_2_soon.png',
    price: 'Rp 0',
    isFeatured: false
  },
  {
    id: '3',
    name: 'Mesin Crusher',
    description: `Plastic Crusher Machine
Ready Tipe:
HP 180
HP 250
HP 300
HP 400
HP 500
HP 700
HP 800
Ukuran lain silahkan cek di etalase kami. Spesifikasi masing2 produk ada di brosur slide foto terakhir. Silahkan tanya stok sebelum order.
MENERIMA PEMBELIAN GROSIR/PARTAI BESAR DAN OPEN RESELLER. SILAHKAN CHAT KAMI`,
   image: 'http://117.53.45.140:11001/public/uploads/2_3_crusher.jpg',
    price: 'Rp 16.200.000',
    isFeatured: true
  },
  {
    id: '4',
    name: 'Press Sampah',
    description: `Specification :
Bale Volume 1000 x 750 x 1000 mm
Motor Power 18.5 Kw
Work Pressure 100 Ton
Cylinder 120 mm x 2 Pcs
Hydraulic Oil 170 Litre
Working Efficiency 1800 Kg/h
Overall Dimension** 1500 x 1350 x 3500 mm
Weight** 5100 Kg
**Berat dan dimensi belum termasuk packing kayu. BISA DATANG KE SHOWROOM UNTUK CEK UNIT & TEST MESIN. 
**GARANSI 1 TAHUN GRATIS JASA SERVICE
HARGA IMPORTIR BUKAN RESELLER
** INCLUDE PPN 11%
*BERAT DAN DIMENSI BELUM TERMASUK PACKING KOLIAN/ PETI KAYU
**Tanya Pelapak Biaya Tambahan u/ Packing Kayu`,
    image: 'http://117.53.45.140:11001/public/uploads/2_4_press.jpg',
    price: 'Rp 25.575.510',
    isFeatured: true
  },
{
    id: '5',
    name: 'Mesin Olah Sampah',
    description: `Komposter BioPhoskko® HRE 500 L (Tipe Hand Rotary Elektrik), berdimensi ( Tinggi = 100 cm, lebar= 67 cm dan panjang = 90 cm) terbuat dari bahan fiber resin murni (fiberglass), bahan resin PL 07 LPE, jenis mat Wr 400 (mat anyam) dan mat Jushi -Kwe 300 (acak) 300 x 104, catalyst Butanox, mirror glase, pigmen HCA dolphin green serta aerosil HDK, dengan ketebalan 3 sd 5 mm,

Tabung pengolahan digerakan dengan motor listrik ( elektro motor) 1/2 HP dilengkapi reducer (Gearbox 1:30) dan lubang aerasi. Kapasitas 500 liter per 5 hari diartikan pada kondisi target sampah 500 liter/ hari, setelah dicacah MPO 500 HD akan memiliki volume 300 sd 500 liter.

Bahan habis pakai dalam pembuatan kompos dengan dosis 1 per mil (1/1000) aktivator GP1 dan 3 % mineral penggembur GP2 diluar harga komposter.`,
    image: 'http://117.53.45.140:11001/public/uploads/2_5_olah.jpg',
    price: 'Rp 13.950.000',
    isFeatured: true
  },
{
    id: '6',
    name: 'Pembangkit Listrik Tenaga Sampah',
    description: 'Segera Hadir',
    image: 'http://117.53.45.140:11001/public/uploads/2_6_plts.jpg',
    price: 'Rp 0',
    isFeatured: false
  },
{
    id: '7',
    name: 'Konsultasi',
    description: 'Untuk info lebih lanjut hubungi admin di 085722395259 ',
    image: 'http://117.53.45.140:11001/public/uploads/2_7_konsultasi.jpg',
    price: 'Rp 5.000',
    isFeatured: true
  },
];

const Equipment = () => {
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
      <ListMenuEnhanced content={payload} />
    </SafeAreaView>
  );
};

export default Equipment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight * 0.3 || 0,
    marginBottom: StatusBar.currentHeight * 0.3 || 0,
  },
});
