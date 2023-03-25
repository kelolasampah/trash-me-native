import React, {useState, useCallback} from 'react';
import {View, FlatList, Text} from 'react-native';
import axios from 'axios';
// import baseURL from '../../assets/common/baseURL';
import {useFocusEffect} from '@react-navigation/native';
import OrderCard from './component/OrderCard';

import '../../assets/common/global'

const Orders = props => {
  const [orderList, setOrderList] = useState();

  useFocusEffect(
    useCallback(() => {
      getOrders();
      return () => {
        setOrderList();
      };
    }, []),
  );

  const getOrders = () => {
    axios
      .get(`${global.baseurl}/orders`)
      .then(x => {
        setOrderList(x.data);
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <FlatList
        data={orderList}
        renderItem={({item}) => (
          <OrderCard navigation={props.navigation} {...item} editMode={true} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Orders;
