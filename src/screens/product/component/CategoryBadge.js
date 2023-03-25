import React from 'react';
import {
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {View} from 'react-native-animatable';
import {List, Badge, Text} from 'react-native-paper';
import {COLOR_PRIMARY_01, COLOR_PRIMARY_10} from '../../../utils/constant';

const CategoryBadge = props => {
  return (
    <View style={styles.center}>
      <Pressable
        style={[
          styles.badge,
          props.active == -1 ? styles.active : styles.inactive,
        ]}
        key={1}
        onPress={() => {
          props.categoryFilter('all'), props.setActive(-1);
        }}>
        <Text style={{color: props.active == -1 ? 'white' : COLOR_PRIMARY_01}}>
          Semua
        </Text>
      </Pressable>

      <ScrollView
        bounces={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{backgroundColor: 'white'}}>
        {props.categories.map((item, index) => (
          <Pressable
            style={[
              styles.badge,
              props.active == props.categories.indexOf(item)
                ? styles.active
                : styles.inactive,
            ]}
            key={index}
            onPress={() => {
              props.categoryFilter(item.id),
                props.setActive(props.categories.indexOf(item));
            }}>
            <Text
              style={{
                fontSize: 13,
                color:
                  props.active == props.categories.indexOf(item)
                    ? 'white'
                    : COLOR_PRIMARY_01,
              }}>
              {item.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    //backgroundColor: 'red'
  },
  badge: {
    height: 30,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOR_PRIMARY_01,
    //alignItems: 'center'
    justifyContent: 'center'
  },
  active: {
    backgroundColor: COLOR_PRIMARY_01,
  },
  inactive: {
    backgroundColor: 'white',
  },
});

export default CategoryBadge;
