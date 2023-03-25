import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Error = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text(props.err)}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    margin: 10,
  },
  text: err => ({
    color: err ? 'red' : 'white',
  }),
});

export default Error;
