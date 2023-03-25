import React from 'react';
import {ScrollView, Dimensions, StyleSheet, Text, View} from 'react-native';

var {width} = Dimensions.get('window');

const WrapContainer = props => {
  return (
    <View>
    <ScrollView
      //showsHorizontalScrollIndicator={props.horizontal}
      //showsVerticalScrollIndicator={props.vertical}
      //persistentScrollbar={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>{props.title}</Text>
      {props.children}
    </ScrollView>
    </View>

  );
};

export default WrapContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  contentContainer: {
    marginTop: 30,
    marginBottom: 120,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
  },
});
