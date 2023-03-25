import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {COLOR_GRAY, COLOR_PRIMARY_10} from '../../utils/constant';

const Item = ({title, event}) => (
  <View elevation={5} style={styles.item}>
    <TouchableOpacity onPress={event} activeOpacity={0.7} style={styles.box}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  </View>
);

const ListMenu = ({content}) => {
  const renderItem = ({item}) => (
    <Item title={item.title} event={() => console.log("List Item:", item.title)} />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={content}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ListMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'transparent',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  box: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_GRAY,

    borderWidth: 2,
    borderRadius: 18,
    borderColor: COLOR_PRIMARY_10,

    // drop shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR_PRIMARY_10,
    backgroundColor: 'transparent',
  },
});
