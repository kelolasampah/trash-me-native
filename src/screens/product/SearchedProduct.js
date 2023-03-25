import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Keyboard,
  Pressable,
} from 'react-native';
import {
  Avatar,
  Badge,
  IconButton,
  Searchbar,
  TouchableRipple,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FilteredProduct from './FilteredProduct';
import {
  COLOR_GRAY,
  COLOR_PRIMARY_01,
  COLOR_PRIMARY_06,
  COLOR_SECONDARY,
} from '../../utils/constant';
import CategoryContainer from './component/CategoryContainer';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableHighlight} from 'react-native-gesture-handler';

const SearchedProduct = props => {
  const {products, history, suggestion} = props.route.params;

  const navigation = useNavigation();
  const {setItem} = useAsyncStorage('recentSearch');

  const searchRef = useRef();

  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearch, setRecentSearch] = useState([]);

  const [filter, setFilter] = useState();
  const [productsFiltered, setProductsFiltered] = useState([]);

  useEffect(() => {
    setFilter('');
    setSearchQuery(suggestion);
    setRecentSearch(history);
    setProductsFiltered(products);

    return () => {
      setFilter('');
      setSearchQuery('');
      setRecentSearch([]);

      setProductsFiltered([]);
    };
  }, []);

  useEffect(() => {
    if (searchRef.current) {
      const unsubscribe = navigation.addListener('focus', () => {
        //setTimeout(()=>{
        searchRef.current?.focus();
        // }, 1000)
      });
      return unsubscribe;
    }
  }, [navigation, searchRef.current]);

  useEffect(() => {
    if (filter && filter.length > 0) {
      const unsubscribe = navigation.navigate('FilteredProduct', {
        filter,
        products,
      });
      return unsubscribe;
    }
  }, [filter]);

  useEffect(() => {
    if (recentSearch !== null) {
      writeItemToStorage();
    }
  }, [recentSearch]);

  const writeItemToStorage = async () => {
    await setItem(JSON.stringify(recentSearch));
  };

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('recentSearch')
  //     return jsonValue != null ? JSON.parse(jsonValue) : null ;
  //   } catch(e) {
  //     console.log(e)
  //   }
  //   return null;
  // }

  // const storeData = async (value) => {
  //   try {
  //     const jsonValue = JSON.stringify(value)
  //     await AsyncStorage.setItem('recentSearch', jsonValue)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // const removeData = async () => {
  //   try {
  //     await AsyncStorage.removeItem('recentSearch')
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }

  /// timeout effect for search typing
  useEffect(() => {
    const queryTimeout = setTimeout(() => {
      onAcceptSearch(searchQuery);
    }, 500);

    return () => {
      clearTimeout(queryTimeout);
    };
  }, [searchQuery]);

  const getMultipleRandom = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  };

  /// filter item after timeout
  const onAcceptSearch = query => {
    if (query && query.length > 0) {
      setProductsFiltered(
        products.filter(i =>
          i.name.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    } else {
      setProductsFiltered(getMultipleRandom(products, 3));
    }
  };

  /// set local search obj
  const onSearchQuery = query => {
    setSearchQuery(query);
  };

  /// add recent search to storage
  const onSubmitSearch = query => {
    if (query.length > 0) {
      if (!(recentSearch.filter(e => e === query).length > 0)) {
        if (recentSearch.length >= 5) recentSearch.shift();
        setRecentSearch(recentSearch => [...recentSearch, searchQuery]);
      }

      setFilter(query);
    }
  };

  /// remove item from recent search storage
  const onRemoveSearch = index => {
    /// CONFENTIONAL
    //let itemsCopy = [...recentSearch];
    //itemsCopy.splice(index, 1);
    //setRecentSearch(itemsCopy);

    /// ELEGANT
    setRecentSearch(recentSearch.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      {/* HEADER */}
      <View style={styles.headerBar}>
        <Icon
          style={styles.iconBar}
          name="keyboard-backspace" //"arrow-left"
          color={'#333'}
          size={32}
          onPress={() => navigation.goBack()}
        />
        <Searchbar
          ref={searchRef}
          style={styles.searchBar}
          inputStyle={styles.inputBar}
          //placeholder={suggestion}
          onChangeText={query => setSearchQuery(query)}
          clearIcon={props => (
            <Icon
              name="close"
              onPress={() => {
                onSearchQuery('');
                Keyboard.dismiss();
              }}
              {...props}
            />
          )}
          value={searchQuery}
          onSubmitEditing={() => onSubmitSearch(searchQuery)}
          onIconPress={() => onSubmitSearch(searchQuery)}
        />
      </View>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
        {/* SECTION 1 HISTORY */}
        {recentSearch.length > 0 ? (
          <View style={[styles.section, {paddingTop: 20}]}>
            <Text style={styles.header}>Terakhir dicari</Text>
            {recentSearch.map((item, index) => (
              <TouchableRipple
                onPress={() => onSubmitSearch(item)}
                key={index}
                style={{
                  width: '100%',
                }}>
                <View style={styles.item}>
                  <Icon name="history" color={'gray'} size={20} />
                  <Text style={styles.itemText}>{item}</Text>
                  {/* Remove */}
                  <IconButton
                    icon="close"
                    color={'gray'}
                    size={20}
                    onPress={() => onRemoveSearch(index)}
                    style={{position: 'absolute', right: 8}}
                  />
                </View>
              </TouchableRipple>
            ))}
          </View>
        ) : null}

        {/* SECTION 2 MITRA */}
        <View style={styles.section}>
          <Text style={styles.header}>Mitra</Text>
          {recentSearch.map((item, index) => (
            <View key={index} style={styles.item}>
              <Avatar.Image
                source={{
                  uri: 'https://ui-avatars.com/api/?background=6495ed&color=fff&&name=Trash+Me.png',
                }}
                size={35}
              />
              <Text style={[styles.itemText, styles.itemTextEx]}>
                Toko Mitra {index + 1}
              </Text>
            </View>
          ))}
        </View>

        {/* SECTION 3 PRODUCT */}
        <View style={styles.section}>
          <Text style={styles.header}>Produk</Text>
          {productsFiltered.length > 0 ? (
            productsFiltered.map((item, index) => (
              <TouchableRipple
                key={index}
                style={{width: '100%'}}
                onPress={() =>
                  navigation.navigate(
                    'SingleProduct',
                    (params = {item: item.id, enable: true}),
                  )
                }>
                <View style={styles.item}>
                  <Avatar.Image
                    source={{
                      uri: item.image
                        ? item.image
                        : 'https://picsum.photos/700',
                    }}
                    size={35}
                  />
                  <Text style={[styles.itemText, styles.itemTextEx]}>
                    {item.name}
                  </Text>
                </View>
              </TouchableRipple>
            ))
          ) : (
            <Text style={{paddingHorizontal: 15}}>Tidak ada hasil terkait</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchedProduct;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingTop: 15,
  },
  iconBar: {
    marginLeft: 5,
  },
  searchBar: {
    width: '85%',
    height: 36,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: 'ghostwhite',
  },
  inputBar: {
    textAlignVertical: 'center',
    fontSize: 14,
    paddingLeft: 0,
  },
  section: {
    marginVertical: 15,
    width: '100%',
  },
  header: {
    paddingHorizontal: 15,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  item: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: '100%',
    marginVertical: 5,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 15,
    marginLeft: 8,
    marginBottom: 3,
  },
  itemTextEx: {
    fontWeight: '500',
    color: '#555',
  },
});
