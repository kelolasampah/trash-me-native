// import React, { useEffect, useState, useContext} from 'react'
// import { Text, View, Button } from 'react-native'
// import { Item, Picker, Toast } from 'native-base'
// import Icon from 'react-native-vector-icons/FontAwesome'
// import FormContainer from '../../../Shared/Form/FormContainer'
// import Input from '../../../Shared/Form/Input'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import AuthGlobal from "../../../contexts/store/AuthGlobal"

// import { connect } from 'react-redux'
// import { TextInput } from 'react-native-paper'

// const countries = require("../../../assets/countries.json");

// const Checkout = (props) => {
//     const context = useContext(AuthGlobal)

//     const [ orderItems, setOrderItems ] = useState();
//     const [ address, setAddress ] = useState();
//     const [ address2, setAddress2 ] = useState();
//     const [ city, setCity ] = useState();
//     const [ zip, setZip ] = useState();
//     const [ country, setCountry ] = useState();
//     const [ phone, setPhone ] = useState();
//     const [ user, setUser ] = useState();

//     useEffect(() => {
//         setOrderItems(props.cartItems)

//         if(context.stateUser.isAuthenticated) {
//             setUser(context.stateUser.user.sub)
//         } else {
//             props.navigation.navigate("Cart");
//             Toast.show({
//                 topOffset: 60,
//                 type: "error",
//                 text1: "Please Login to Checkout",
//                 text2: ""
//             });
//         }

//         return () => {
//             setOrderItems();
//         }
//     }, [])

//     const checkOut = () => {
//         console.log("orders", orderItems)
//         let order = {
//             city,
//             country,
//             dateOrdered: Date.now(),
//             orderItems,
//             phone,
//             shippingAddress1: address,
//             shippingAddress2: address2,
//             status: "3",
//             user,
//             zip,
//         }

//         props.navigation.navigate("Payment", {order: order })
//     }

//     return (
//         <KeyboardAwareScrollView
//             viewIsInsideTabBar={true}
//             extraHeight={200}
//             enableOnAndroid={true}
//         >
//             <FormContainer title={"Shipping Address"}>
//                 <TextInput
//                     placeholder={"Phone"}
//                     name={"phone"}
//                     value={phone}
//                     keyboardType={"numeric"}
//                     onChangeText={(text) => setPhone(text)}
//                 />
//                    <TextInput
//                     placeholder={"Shipping Address 1"}
//                     name={"ShippingAddress1"}
//                     value={address}
//                     onChangeText={(text) => setAddress(text)}
//                 />
//                    <TextInput
//                     placeholder={"Shipping Address 2"}
//                     name={"ShippingAddress2"}
//                     value={address2}
//                     onChangeText={(text) => setAddress2(text)}
//                 />
//                    <TextInput
//                     placeholder={"City"}
//                     name={"city"}
//                     value={city}
//                     onChangeText={(text) => setCity(text)}
//                 />
//                    <TextInput
//                     placeholder={"Zip Code"}
//                     name={"zip"}
//                     value={zip}
//                     keyboardType={"numeric"}
//                     onChangeText={(text) => setZip(text)}
//                 />
//                 <Item picker>
//                     <Picker
//                         mode="dropdown"
//                         iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
//                         style={{ width: undefined }}
//                         selectedValue={country}
//                         placeholder="Select your country"
//                         placeholderStyle={{ color: '#007aff' }}
//                         placeholderIconColor="#007aff"
//                         onValueChange={(e) => setCountry(e)}
//                     >
//                         {countries.map((c) => {
//                             return <Picker.Item
//                                     key={c.code}
//                                     label={c.name}
//                                     value={c.name}
//                                     />
//                         })}
//                     </Picker>
//                 </Item>
//                 <View style={{ width: '80%', alignItems: "center" }}>
//                     <Button title="Confirm" onPress={() => checkOut()}/>
//                 </View>
//             </FormContainer>
//         </KeyboardAwareScrollView>
//     )
// }

// const mapStateToProps = (state) => {
//     const { cartItems } = state;
//     return {
//         cartItems: cartItems,
//     }
// }

// export default connect(mapStateToProps)(Checkout)

import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import Swiper from 'react-native-swiper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR_PRIMARY_10} from '../../utils/constant';
import AddressPage from './component/AddressPage';
import ConfirmPage from './component/ConfirmPage';
import PaymentPage from './component/PaymentPage';
import ShipmentPage from './component/ShipmentPage';

const PAGES = [
  {key: 0, name: 'Alamat'},
  {key: 1, name: 'Pengiriman'},
  {key: 2, name: 'Pembayaran'},
  {key: 3, name: 'Konfirmasi'},
];

const IndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: COLOR_PRIMARY_10, //'#fe7013',
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: COLOR_PRIMARY_10, //'#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: COLOR_PRIMARY_10, //'#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: COLOR_PRIMARY_10, //'#fe7013',
  stepIndicatorUnFinishedColor: '#fff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: COLOR_PRIMARY_10, //'#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: COLOR_PRIMARY_10, //'#fe7013',
};

const getStepIndicatorIconConfig = ({position, stepStatus}) => {
  const iconConfig = {
    name: 'package-up', //handshake
    color: stepStatus === 'finished' ? '#ffffff' : COLOR_PRIMARY_10, //'#fe7013',
    size: 15,
  };
  switch (position) {
    case 0: {
      iconConfig.name = 'map-marker';
      break;
    }
    case 1: {
      iconConfig.name = 'truck';
      break;
    }
    case 2: {
      iconConfig.name = 'credit-card';
      break;
    }
    case 3: {
      iconConfig.name = 'handshake';
      break;
    }
    default: {
      break;
    }
  }
  return iconConfig;
};

const Checkout = props => {
  const {product, invoice, total} = props.route.params;

  const [currentPage, setCurrentPage] = useState(0);
  const [detail, setDetail] = useState([]);
  const [address, setAddress] = useState();
  const [shipment, setShipment] = useState();
  const [payment, setPayment] = useState();

  const [stepEnabled, setStepEnabled] = useState([true, false, false, false]);

  // useEffect(() => {
  //   if (detail) console.log('Detail: ' + JSON.stringify(detail));
  //   return () => {};
  // }, [detail]);

  const onSubmitPage = param => {
    const index = detail.findIndex(item => item.name === param.name);
    if (index > -1) {
      setDetail(current =>
        current.map(item => {
          if (item.name === param.name) {
            return {...item, data: param.data};
          }
          return item;
        }),
      );
    } else
      setDetail(current => [...current, {name: param.name, data: param.data}]);

    switch (param.name) {
      case 'address':
        setAddress(param.data);
        break;
      case 'shipment':
        setShipment(param.data);
        break;
      case 'payment':
        setPayment(param.data);
        break;
      default:
        break;
    }
  };

  const onChangeStep = position => {
    if (stepEnabled[position]) setCurrentPage(position);
  };

  const onChangePage = position => {
    let temp = [...stepEnabled];
    temp[position] = true;
    setStepEnabled(temp);
    setCurrentPage(position);
  };

  // const getProvinces = async () => {
  //   try {
  //     const resp = await axios.get(
  //       `https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json`,
  //     );
  //     const strAscending = [...resp.data].sort((a, b) =>
  //       a.name > b.name ? 1 : -1,
  //     );
  //     setListProvinces(strAscending);
  //     console.log('=> provinces');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const getRegencies = async provinceId => {
  //   try {
  //     const resp = await axios.get(
  //       `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`,
  //     );
  //     setListRegencies(resp.data);
  //     console.log('=> regencies');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const getDistrics = async regencyId => {
  //   try {
  //     const resp = await axios.get(
  //       `https://emsifa.github.io/api-wilayah-indonesia/api/districts/${regencyId}.json`,
  //     );
  //     setListDistricts(resp.data);
  //     console.log('=> districts');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const getVillages = async districtId => {
  //   try {
  //     const resp = await axios.get(
  //       `https://emsifa.github.io/api-wilayah-indonesia/api/villages/${districtId}.json`,
  //     );
  //     setListVillages(resp.data);
  //     console.log('=> villages');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  //if (!listProvinces) return null;
  //console.log('prov: ' + JSON.stringify(listProvinces));

  const renderViewPagerPage = data => {
    switch (data.key) {
      case 0:
        return (
          <AddressPage
            key={data.key}
            submit={onSubmitPage}
            pages={onChangePage}
            item={data}
          />
        );
        //break;
      case 1:
        return (
          <ShipmentPage
            key={data.key}
            submit={onSubmitPage}
            pages={onChangePage}
            item={data}
            product={product}
          />
        );
        //break;
      case 2:
        return (
          <PaymentPage
            key={data.key}
            submit={onSubmitPage}
            pages={onChangePage}
            item={data}
          />
        );
        //break;
      case 3:
        return (
          <ConfirmPage
            key={data.key}
            submit={onSubmitPage}
            pages={onChangePage}
            item={data}
            detail={detail}
            product={product}
            invoice={invoice}
            total={total}
            address={address}
            shipment={shipment}
            payment={payment}
          />
        );
        //break;
      default:
        break;
    }

    if (data.key === 0);
  };

  const renderStepIndicator = params => (
    <MaterialIcon {...getStepIndicatorIconConfig(params)} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          stepCount={4}
          customStyles={IndicatorStyles}
          currentPosition={currentPage}
          onPress={onChangeStep}
          renderStepIndicator={renderStepIndicator}
          labels={[
            'Alamat Pengiriman',
            'Metode Pengiriman',
            'Metode Pembayaran',
            'Konfirmasi Pesanan',
          ]}
        />
      </View>
      {/* <View style={{height: 0, backgroundColor: 'gainsboro'}}/> */}
      <View style={styles.page}>
        <Swiper
          style={{flexGrow: 1}}
          scrollEnabled={false}
          loop={false}
          index={currentPage}
          autoplay={false}
          showsButtons={false}
          showsPagination={false}
          onIndexChanged={page => {
            setCurrentPage(page);
          }}>
          {PAGES.map(page => renderViewPagerPage(page))}
        </Swiper>
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  stepIndicator: {
    marginVertical: 10,
    paddingVertical: 20,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //elevation: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999',
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f',
  },
});
