import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import { COLOR_PRIMARY_10 } from '../../utils/constant';

const Input = props => {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      name={props.name}
      id={props.id}
      value={props.value}
      autoCorrect={props.autoCorrect}
      onChangeText={props.onChangeText}
      onFocus={props.onFocus}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}></TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: COLOR_PRIMARY_10,
  },
});

export default Input;
