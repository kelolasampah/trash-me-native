import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR_PRIMARY_06, COLOR_PRIMARY_01, COLOR_DISABLE_06, COLOR_DISABLE_01} from '../../utils/constant';
import {TouchableRipple} from 'react-native-paper';

const ActionButton = ({text, color, event, disabled}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[disabled ? COLOR_DISABLE_06 : COLOR_PRIMARY_06, disabled ? COLOR_DISABLE_01 : COLOR_PRIMARY_01 ]}
        style={styles.button}>
        <TouchableRipple
          disabled={disabled}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          borderless={true}
          onPress={event}>
          <Text style={{color: color}}>{text}</Text>
        </TouchableRipple>
      </LinearGradient>
    </View>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    //margin: 10,
  },
  button: {
    borderRadius: 6,
    minWidth: 80,
    minHeight: 40,
    //alignItems: 'center',
    //paddingHorizontal: 20,
    //paddingVertical: 10,
  },
});
