import {StyleSheet, Pressable, View, TextInput} from 'react-native';
import React from 'react';
import {Searchbar} from 'react-native-paper';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const AdminHeader = ({hint, change, one, two, three}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <Searchbar
          style={styles.search}
          inputStyle={styles.input}
          iconColor={'gainsboro'}
          placeholder={hint}
          onChangeText={change}
        />
      </View>

      <View style={styles.menuWrapper}>
        <FIcon
          style={styles.icon}
          name="shopping-bag"
          color={'gray'}
          size={28}
          onPress={one}
        />
        <MIcon
          style={styles.icon}
          name="plus-box-multiple"
          color={'gray'}
          size={28}
          onPress={two}
        />
        <MIcon
          style={styles.icon}
          name="book-plus-multiple"
          color={'gray'}
          size={28}
          onPress={three}
        />
      </View>
    </View>
  );
};

export default AdminHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  searchWrapper: {
    flex: 1,
    marginLeft: 10,
    marginRight: 5,
  },
  menuWrapper: {
    flexDirection: 'row',
    marginRight: 10,
  },
  search: {
    width: '100%',
    height: 36,
    borderRadius: 10,
    elevation: 2,
  },
  input: {
    fontSize: 13,
    textAlignVertical: 'center',
    textAlign: 'left',
    paddingLeft: 0,
    paddingBottom: 10
  },
  icon: {
    marginLeft: 15,
  },
});
