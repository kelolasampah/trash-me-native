import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import ActionButton from '../../components/Button/ActionButton';
import {
  COLOR_GRAY,
  COLOR_PRIMARY_10,
  COLOR_TEXT_01,
} from '../../utils/constant';

const Item = ({item, event}) => (
  <View elevation={5} style={styles.item}>
    {item.name.length > 25 ? (
      <View style={styles.boxCol}>
        <Text style={[styles.textTitle, {marginBottom: 5, marginTop: 2}]}>
          {item.name}
        </Text>
        <View
          style={[
            styles.sparator,
            {marginBottom: 5, marginHorizontal: 0, width: '100%'},
          ]}
        />
        <View style={styles.boxColRow}>
          <Image
            style={[styles.image, {height: width * 0.5}]}
            //objectFit="contain"
            resizeMode="contain"
            source={{
              uri:
                item.image !== ''
                  ? item.image
                  : `https://picsum.photos/id/${
                      Math.floor(Math.random() * 100) + 1
                    }/400/600`,
            }}
          />
          <View style={[styles.boxWrapper, {height: width * 0.5}]}>
            <View
              style={[styles.sparator, {borderWidth: 0, marginVertical: 3}]}
            />
            <View style={styles.boxContent}>
              <ScrollView nestedScrollEnabled={true}>
                <Text style={styles.textContent}>{item.description}</Text>
              </ScrollView>
            </View>
            <View style={styles.boxPrice}>
              <Text style={styles.textHarga}>Harga</Text>
              <Text style={styles.textPrice}>{item.price}</Text>
            </View>
            <View style={styles.boxAction}>
              <ActionButton
                text={item.isFeatured ? 'Pesan' : 'Segera Hadir'}
                color={item.isFeatured ? 'white' : 'gainsboro'}
                event={event}
                disabled={!item.isFeatured}
              />
            </View>
          </View>
        </View>
      </View>
    ) : (
      <View style={styles.boxRow}>
        <Image
          style={styles.image}
          //objectFit="contain"
          resizeMode="contain"
          source={{
            uri:
              item.image !== ''
                ? item.image
                : `https://picsum.photos/id/${
                    Math.floor(Math.random() * 100) + 1
                  }/400/600`,
          }}
        />
        <View style={styles.boxWrapper}>
          <Text style={styles.textTitle}>{item.name}</Text>
          <View style={styles.sparator} />
          <View style={styles.boxContent}>
            <ScrollView nestedScrollEnabled={true}>
              <Text style={styles.textContent}>{item.description}</Text>
            </ScrollView>
          </View>
          <View style={styles.boxPrice}>
            <Text style={styles.textHarga}>Harga</Text>
            <Text style={styles.textPrice}>{item.price}</Text>
          </View>
          <View style={styles.boxAction}>
            <ActionButton
              text={item.isFeatured ? 'Pesan' : 'Segera Hadir'}
              color={item.isFeatured ? 'white' : 'gainsboro'}
              event={event}
              disabled={!item.isFeatured}
            />
          </View>
        </View>
      </View>
    )}
  </View>
);

const ListMenuEnhanced = ({content}) => {
  const navigation = useNavigation();

  const {getItem} = useAsyncStorage('addressList');
  const [addressList, setAddressList] = useState([]);

  //Async storage
  const readItemFromStorage = async () => {
    const item = await getItem();
    item !== null ? setAddressList(JSON.parse(item)) : setAddressList([]);
  };

  const renderItem = ({item}) => (
    <Item
      item={item}
      event={() => {
        navigation.navigate('OrderService', {
          order: item,
          address: addressList,
        });
      }}
    />
  );

  useEffect(() => {
    readItemFromStorage();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={content}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default ListMenuEnhanced;

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'transparent',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  boxCol: {
    flexDirection: 'column',
    padding: 5,
    alignItems: 'center',

    height: width * 0.6 + 5 + 8,
    backgroundColor: COLOR_GRAY,

    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLOR_PRIMARY_10,

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
  boxColRow: {
    flexDirection: 'row',

    height: width * 0.4 + 5 + 8,
    backgroundColor: COLOR_GRAY,
  },
  boxRow: {
    flexDirection: 'row',
    padding: 5,

    height: width * 0.6 + 5 + 8,
    backgroundColor: COLOR_GRAY,

    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLOR_PRIMARY_10,

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
  boxWrapper: {
    flexGrow: 1,
    marginLeft: 5,
    flexDirection: 'column',
    height: width * 0.6,

    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLOR_GRAY,

    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLOR_PRIMARY_10,
  },
  boxContent: {
    flexGrow: 1,

    margin: 5,
    padding: 5,
    height: '35%',
    width: '90%',
    maxWidth: width - (width * 0.3 + 20 + 10 + 8) - 10,

    alignItems: 'center',

    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLOR_PRIMARY_10,
  },
  boxPrice: {
    margin: 0,
    width: '90%',

    //borderWidth: 1,
    //borderRadius: 8,
    //borderColor: COLOR_PRIMARY_10,
  },
  boxAction: {
    margin: 5,
    marginBottom: 10,
    width: '90%',

    //borderWidth: 1,
    //borderRadius: 8,
    //borderColor: COLOR_PRIMARY_10,
  },
  sparator: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLOR_PRIMARY_10,
    borderBottomColor: COLOR_PRIMARY_10,
    width: '90%',
    marginVertical: 2,
  },
  textTitle: {
    fontSize: 18,
    margin: 5,
    fontWeight: 'bold',
    color: COLOR_PRIMARY_10,
    backgroundColor: 'transparent',
  },
  textContent: {
    fontSize: 12,
    fontWeight: 'normal',
    marginVertical: 5,
    marginHorizontal: 5,
    color: COLOR_TEXT_01 + 'a1',
    backgroundColor: 'transparent',
  },
  textHarga: {
    fontSize: 12,
    fontWeight: 'normal',
    marginTop: 0,
    marginHorizontal: 5,
    color: COLOR_TEXT_01 + 'a1',
    backgroundColor: 'transparent',
  },
  textPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
    marginBottom: 4,
    color: COLOR_TEXT_01,
    backgroundColor: 'transparent',
  },
  image: {
    borderRadius: 8,
    borderColor: COLOR_PRIMARY_10,
    borderWidth: 1,
    width: width * 0.3,
    height: width * 0.6,
    backgroundColor: 'transparent',
  },
});
