import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Modal from 'react-native-modal';
import axios from 'axios';

import AuthGlobal from '../../contexts/store/AuthGlobal';

import {
  COLOR_PRIMARY_01,
  COLOR_PRIMARY_10,
  FONT_ABold,
  FONT_ARegular,
  FONT_BBold,
  FONT_BRegular,
} from '../../utils/constant';
import HistoryTransaction from './component/HistoryTransaction';

import '../../assets/common/global';

export const OngoingRoute = props => {
  const [orderOngoing, setOrderOngoing] = useState([]);

  useFocusEffect(
    useCallback(() => {
      if (props.user) getOrders();
      return () => {
        //setOrderOngoing();
      };
    }, []),
  );
  // useEffect(() => {
  //   if (props.user) getOrders();
  //   return () => {
  //     //setOrderOngoing();
  //   };
  // },[])

  const getOrders = async () => {
    await axios
      .get(`${global.baseurl}/orders/userid/${props.user}`)
      .then(t => {
        setOrderOngoing(
          t.data.filter(
            u =>
              (u.status === '2' || u.status === '3') && u.orderItems.length > 0,
          ),
        );
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.boxNavigation}
        activeOpacity={1}
        onPress={() => props.trigger(true)}>
        <Text style={styles.textStatus}>Cek status pembayaran</Text>
        <Text style={styles.textIcon}>{'>'}</Text>
      </TouchableOpacity>
      <HistoryTransaction content={orderOngoing} />
    </View>
  );
};

export const HistoryRoute = props => {
  const [orderHistory, setOrderHistory] = useState([]);

  useFocusEffect(
    useCallback(() => {
      if (props.user) getOrders();
      return () => {
        //setOrderHistory();
      };
    }, []),
  );

  const getOrders = async () => {
    await axios
      .get(`${global.baseurl}/orders/userid/${props.user}`)
      .then(t => {
        setOrderHistory(
          t.data.filter(
            u =>
              (u.status === '0' || u.status === '1' || u.status === '4') &&
              u.orderItems.length > 0,
          ),
        );
      })
      .catch(error => console.log(error));
  };
  return (
    <View style={styles.container}>
      <HistoryTransaction content={orderHistory} />
    </View>
  );
};

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'white', height: 2}}
    activeColor={'white'}
    inactiveColor={'gainsboro'}
    style={{backgroundColor: COLOR_PRIMARY_10}}
    pressColor={'transparent'}
  />
);

// const renderScene = SceneMap({
//   first: OngoingRoute,
//   second: HistoryRoute,
// });

const renderScene = ({route}) => {
  switch (route.key) {
    case 'first':
      return <OngoingRoute user={route.user} trigger={route.trigger} />;
    case 'second':
      return <HistoryRoute user={route.user} />;
    default:
      return null;
  }
};

const Transaction = () => {
  const layout = useWindowDimensions();
  const context = useContext(AuthGlobal);

  const [isModalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'first',
      title: 'Berlangsung',
      user: context.stateUser.user.userId,
      trigger: setModalVisible,
    },
    {key: 'second', title: 'Riwayat', user: context.stateUser.user.userId},
  ]);

  return (
    <>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
      <Modal
        style={{margin: 0}}
        isVisible={isModalVisible}
        animationIn="fadeInRightBig"
        animationOut="slideOutLeft"
        animationInTiming={300}
        animationOutTiming={300}
        hasBackdrop={false}
        useNativeDriver={true}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.containerModal}>
          <TouchableOpacity
            style={styles.boxNavigationModal}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.textIconModal}>{'<'}</Text>
            <Text style={styles.textStatusModal}>Status pembayaran</Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.textContentModal}>COMING SOON</Text>
            <Text
              style={[
                styles.textContentModal,
                {fontSize: 12, fontStyle: 'italic'},
              ]}>
              Under Construction
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight * 0.3 || 0,
    marginBottom: StatusBar.currentHeight * 0.1 || 0,
    backgroundColor: 'white',
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'white',
  },
  boxNavigation: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',

    height: 50,
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 10,

    borderWidth: 2,
    borderRadius: 8,
    borderColor: COLOR_PRIMARY_10,

    // // drop shadow
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 0.84,
    elevation: 2,
  },
  boxNavigationModal: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',

    height: 50,
    marginBottom: 10,

    borderBottomWidth: 2,
    borderBottomColor: COLOR_PRIMARY_10,

    // drop shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  textStatus: {
    fontSize: 14,
    fontFamily: FONT_BBold,
    textAlignVertical: 'center',
    marginLeft: 15,
    marginBottom: 3,
  },
  textIcon: {
    fontSize: 24,
    fontFamily: FONT_BRegular,
    textAlignVertical: 'center',
    marginRight: 15,
    marginBottom: 3,
  },
  textStatusModal: {
    fontSize: 14,
    fontFamily: FONT_BBold,
    textAlignVertical: 'center',
    marginLeft: 15,
    marginBottom: 3,
  },
  textIconModal: {
    fontSize: 24,
    fontFamily: FONT_BRegular,
    textAlignVertical: 'center',
    marginLeft: 15,
    marginBottom: 3,
  },
  textContentModal: {
    fontSize: 20,
    fontFamily: FONT_BRegular,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
