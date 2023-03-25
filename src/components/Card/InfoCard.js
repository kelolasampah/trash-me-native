import {StyleSheet, Text, View, Image, Dimensions, Linking} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';

const InfoCard = props => {
  const {item} = props;

  return (
    <View style={styles.container} onPress={() => {}}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{
          uri: item.image
            ? item.image
            : `https://picsum.photos/id/${Math.floor(Math.random() * 100) + 1}/400/600` 
        }}
      />
      <Text style={styles.text}>
        {item.text.length > 50 ? (
          <>
            {''}
            {item.text.substring(0, 50 - 3) + '... '}{' '}
            <Text
              style={styles.textLink}
              onPress={() => Linking.openURL('http://google.com')}>
              selengkapnya
            </Text>{' '}
          </>
        ) : (
          item.text
        )}
      </Text>
    </View>
  );
};

export default InfoCard;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: windowWidth / 2 - 15,
    height: windowWidth / 1.25,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
    //alignItems: 'center',
    elevation: 2,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: windowWidth / 1.25 - 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 14,
    padding: 10,
    textAlign: 'left',
  },
  textLink: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'blue',
  },
});
