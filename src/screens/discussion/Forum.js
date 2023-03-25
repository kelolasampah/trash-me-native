import React from 'react';
import {StyleSheet, View, StatusBar, Text} from 'react-native';
import {color} from 'react-native-reanimated';

const Discussion = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>COMING SOON</Text>
      <Text style={{fontSize: 12, fontStyle: 'italic', color: 'gray'}}>
        Under Construction
      </Text>
    </View>
  );
};

export default Discussion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
