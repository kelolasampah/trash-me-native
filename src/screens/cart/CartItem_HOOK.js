// import React, {useState} from 'react';
// import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
// import {List, Checkbox, Avatar} from 'react-native-paper';
// import CheckBox from '@react-native-community/checkbox';
// import InputSpinner from 'react-native-input-spinner';
// import {COLOR_PRIMARY_01, COLOR_PRIMARY_10} from '../../utils/constant';

// const CartItem = props => {
//   const {item} = props.item;
//   //console.log('==> ' + JSON.stringify(props));
//   return (
//     <View style={styles.container} key={item.key}>
//       <CheckBox
//         disabled={false}
//         style={{
//           transform: [{scaleX: 1.2}, {scaleY: 1.2}],
//           zIndex: 1,
//           position: 'absolute',
//           top: 10,
//           left: 10,       
//         }}
//         tintColors={{ true: COLOR_PRIMARY_10 }}
//         value={item.isChecked}
//         onValueChange={() => {
//           props.event(props.item.index);
//         }}
//       />
//       <View style={styles.header}>
//         <View style={{width: 32}} />
//         {/* <CheckBox
//           disabled={false}
//           style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
//           value={item.isChecked}
//           onValueChange={() => {
//             props.event(props.item.index);
//           }}
//         /> */}
//         <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.name}</Text>
//       </View>

//       <View style={styles.body}>
//         <View style={{flex: 1}}>
//           <Image
//             style={styles.avatarImage}
//             source={{
//               uri: item.image
//                 ? item.image
//                 : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
//             }}
//           />
//         </View>

//         <View style={{flex: 5, flexDirection: 'column', marginLeft: 40}}>
//           <Text style={{fontWeight: '500'}}>{item.name}</Text>
//           <Text>Rp {item.price}</Text>
//         </View>
//       </View>

//       <View style={styles.bodyExt}>
//         <Pressable style={{alignSelf: 'center', flex: 4}} onPress={() => {}}>
//           <Text style={{color: 'green'}}>Tulis catatan</Text>
//         </Pressable>
//       </View>

//       <View style={styles.footer}>
//         <View style={{flex: 4}}></View>
//         <View style={{alignSelf: 'flex-end', flex: 2}}>
//           <InputSpinner
//             max={item.countInStock}
//             min={1}
//             step={1}
//             style={{minWidth: 100, width: 120, height: 28}}
//             inputStyle={{height: 32, padding: 0, fontSize: 14}}
//             buttonStyle={{height: 28, padding: 0}}
//             skin="modern"
//             color={COLOR_PRIMARY_10}
//             height={28}
//             //colorMax={"#f04048"}
//             //colorMin={"#40c5f4"}
//             value={props.quantity}
//             onChange={num => {
//               //props.quantity = quantity;
//             }}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     marginTop: 10,
//     marginBottom: 5,
//     paddingBottom: 10,
//     height: 195,
//     elevation: 4,
//   },
//   header: {
//     flex: 1,
//     width: '95%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomColor: COLOR_PRIMARY_10, //'gray',
//     borderBottomWidth: 1,
//     marginTop: 10,
//     paddingTop: 5,
//     paddingBottom: 15,
//   },
//   body: {
//     flex: 3,
//     width: '85%',
//     flexDirection: 'row',
//     marginTop: 15,
//     paddingBottom: 5,
//   },
//   bodyExt: {
//     flex: 1,
//     width: '85%',
//     flexDirection: 'row',
//     marginTop: 5,
//     paddingBottom: 5,
//   },
//   footer: {
//     flex: 1,
//     width: '85%',
//     flexDirection: 'row',
//     //marginTop: 5,
//     paddingBottom: 5,
//   },
//   avatarImage: {
//     backgroundColor: 'gainsboro',
//     width: 65,
//     height: 65,
//     borderRadius: 5,
//   },
// });

// export default CartItem;
