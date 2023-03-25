import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  IconConventional,
  IconDiscussion,
  IconEquipment,
  IconLocation,
  IconResult,
  IconSmart,
  IconTaking,
} from '../../assets';
import {
  COLOR_PRIMARY_10,
  COLOR_PRIMARY_60,
  COLOR_SECONDARY,
  FONT_ALight,
  FONT_ARegular,
} from '../../utils/constant';

const ButtonIcon = ({text, type, event}) => {
  const Icon = () => {
    if (text === 'Get Lokasi') return <IconLocation width={30} height={30} />;

    if (text === 'Pengambilan Sampah')
      return <IconTaking width={50} height={50} />;
    if (text === 'Peralatan Sampah')
      return <IconEquipment width={50} height={50} />;
    if (text === 'Hasil Olah Sampah')
      return <IconResult width={50} height={50} />;
    if (text === 'Kelola Sampah Konvensional')
      return <IconConventional width={50} height={50} />;
    if (text === 'Kelola Sampah Smart')
      return <IconSmart width={50} height={50} />;
    if (text === 'Forum Diskusi')
      return <IconDiscussion width={50} height={50} />;

    return <IconLocation width={30} height={30} />;
  };
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={styles.container(type)}
      onPress={event}>
      {type === 'service' ? (
        <LinearGradient
          colors={[COLOR_PRIMARY_60 + 'a0', COLOR_PRIMARY_10]}
          style={styles.button(type)}>
          <Icon />
        </LinearGradient>
      ) : (
        <View
          colors={[COLOR_PRIMARY_60, COLOR_PRIMARY_10]}
          style={styles.button(type)}>
          <Icon />
        </View>
      )}

      <Text style={styles.text(type)}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonIcon;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: type => ({
    marginBottom: 12,
    marginHorizontal: type === 'service' ? 15 : 0,
    maxWidth: type === 'service' ? 90 : 50,
    minWidth: type === 'service' ? 90 : 50,
    alignItems: 'center',
  }),
  button: type => ({
    backgroundColor: COLOR_SECONDARY,
    padding: type === 'service' ? 12 : 7,
    borderRadius: type === 'service' ? 20 : 10,
  }),
  text: type => ({
    fontSize: type === 'service' ? 12 : 10,
    fontFamily: type === 'service' ? FONT_ALight : FONT_ARegular,
    textAlign: 'center',
  }),
});
