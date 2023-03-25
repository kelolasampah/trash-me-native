import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import {FONT_ARegular, COLOR_PRIMARY_10} from '../../utils/constant';


const AdsBanner = ({content, durasi}) => {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        loop={true}
        autoplay={true}
        autoplayTimeout={durasi}
        showsButtons={false}
        height={120}
        dot={<View style={styles.swiperDot} />}
        activeDot={<View style={styles.swiperActiveDot} />}
        paginationStyle={styles.swiperPagination}>
        {content.map((item) => {
          return (
            <View
              key={item.key}
              style={styles.slide}
              title={
                <Text numberOfLines={1} style={styles.text}>
                  {item.text}
                </Text>
              }>
              <Image
                key={item.key}
                resizeMode='cover'
                style={styles.image}
                source={{uri: item.image
                  ? item.image
                  : `https://picsum.photos/id/${Math.floor(Math.random() * 100) + 1}/800/300` //'https://picsum.photos/600'
                }}
              />
            </View>
          );
        })}
      </Swiper>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default AdsBanner;

// dotted solid double dashed
// dotted solid double
// dotted solid
// dotted

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
    //borderStyle: 'dotted',
    borderColor: 'lightgrey',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingBottom: 30,
    height: 140,
    elevation: 2,
  },
  text: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONT_ARegular,
    textAlign: 'left',
    textAlignVertical: 'center',
    color: 'darkslategrey' ,
    bottom: 0, //-59, 
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width: windowWidth,
    flex: 1,
  },
  // SWIPER
  wrapper: {
    height: windowHeight * 0.15,
    paddingBottom: 10,
  },
  swiperDot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 5,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  swiperActiveDot: {
    backgroundColor: COLOR_PRIMARY_10,
    width: 20,
    height: 7,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  swiperPagination: {
    bottom: -23,
    left: null,
    right: 10,
  },
});
