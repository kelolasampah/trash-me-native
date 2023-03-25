import {StyleSheet, Pressable, View, TextInput} from 'react-native';
import React from 'react';
import {Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StaticHeader = ({hint, event, goback}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={goback} style={styles.backWrapper}>
        <Icon
          name="keyboard-backspace" //"arrow-left"
          color={'gray'}
          size={32}
          //onPress={() => console.log('Back')}
        />
      </Pressable>
      <Pressable onPress={event} style={styles.searchWrapper}>
        <Searchbar
          style={styles.search}
          inputStyle={styles.input}
          iconColor={'gainsboro'}
          placeholder={hint}
          editable={false}
        />
      </Pressable>

      <View style={styles.menuWrapper}>
        <Icon
          style={styles.icon}
          name="email-outline"
          color={'gainsboro'}
          size={28}
          onPress={() => console.log('Email')}
        />
        <Icon
          style={styles.icon}
          name="bell-outline"
          color={'lightgray'}
          size={28}
          onPress={() => console.log('Notif')}
        />
        <Icon
          style={styles.icon}
          name="menu"
          color={'gray'}
          size={28}
          onPress={() => console.log('Menu')}
        />
      </View>
    </View>
  );
};

export default StaticHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 10,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  backWrapper: {
    marginLeft: 10,
    width: 30,
  },
  searchWrapper: {
    flex: 1,
    marginLeft: 10,
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
  },
  icon: {
    marginLeft: 10,
  },
});
