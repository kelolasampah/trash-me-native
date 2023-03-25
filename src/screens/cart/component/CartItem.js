import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

import CheckBox from '@react-native-community/checkbox';
import InputSpinner from 'react-native-input-spinner';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  COLOR_GRAY,
  COLOR_PRIMARY_01,
  COLOR_PRIMARY_10,
} from '../../../utils/constant';

const CartItem = props => {
  const {item, list} = props;

  const [notes, setNotes] = useState([]);
  const noteRef = useRef([]);

  useEffect(() => {
    if (list) {
      setNotes(
        list.reduce((acc, obj) => {
          return [...acc, {id: obj.id, data: '', visible: false}];
        }, []),
      );
    }

    return () => {
      setNotes([]);
    };
  }, []);

  const assignNotes = param => {
    const index = notes.findIndex(item => item.id === param.id);
    if (index > -1) {
      setNotes(current =>
        current.map(item => {
          if (item.id === param.id) {
            return {
              ...item,
              visible: param.visible || !item.visible,
              data: param.data || item.data,
            };
          }
          return item;
        }),
      );
    }
  };

  const _renderSectionNotes = param => {
    const index = notes.findIndex(item => item.id === param);
    let tempNote = index > -1 ? notes[index].data : '';
    let tempVisible = index > -1 ? notes[index].visible : false;

    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'green'}}>
            {tempNote?.length > 0 ? 'Edit' : 'Tulis catatan'}
          </Text>
          <Text style={{color: 'gray'}}> {tempNote}</Text>
        </View>
        {tempVisible ? (
          <View style={{marginBottom: 10}}>
            <TextInput
              autoFocus={true}
              maxLength={35}
              style={{
                width: '100%',
                fontSize: 14,
                height: 28,
                justifyContent: 'center',
              }}
              theme={{roundness: 5}}
              activeOutlineColor={COLOR_PRIMARY_10}
              onChangeText={val =>
                assignNotes({id: param, data: val, visible: true})
              }
              onEndEditing={() => {
                assignNotes({id: param, data: '', visible: false});
              }}
              //onSubmitEditing={() => {assignNotes({id: param, data: '', visible: false})}}
              mode="outlined"
              value={tempNote}
            />
            <HelperText type="info" padding="none" style={{fontSize: 13}}>
              {tempNote.length}/35
            </HelperText>
          </View>
        ) : null}
      </View>
    );
  };

  const _renderSectionContent = content => {
    return (
      <View style={styles.bodyWrapper}>
        {content.map((product, index) => {
          return (
            <View style={{flex: 1}} key={product.id}>
              <View style={styles.body}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <CheckBox
                    disabled={false}
                    style={{
                      transform: [{scaleX: 1.2}, {scaleY: 1.2}],
                    }}
                    tintColors={{true: COLOR_PRIMARY_10}}
                    value={product.isChecked}
                    onValueChange={() => {
                      props.check(product.id);
                    }}
                  />
                </View>

                <View style={{flex: 1}}>
                  <Image
                    style={styles.avatarImage}
                    source={{
                      uri: product.image
                        ? product.image
                        : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                    }}
                  />
                </View>

                <View
                  style={{flex: 4, flexDirection: 'column', marginLeft: 40}}>
                  <Text style={{fontWeight: '500'}}>{product.name}</Text>
                  <Text>
                    Rp{' '}
                    {product.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </Text>
                </View>
              </View>

              <View style={styles.bodyExt}>
                <Pressable
                  style={{alignSelf: 'center', flex: 1}}
                  onPress={() => {
                    assignNotes({id: product.id, data: '', visible: true});
                  }}>
                  <>{_renderSectionNotes(product.id, index)}</>
                </Pressable>
              </View>

              <View style={styles.footer}>
                <View style={{flex: 6}}></View>
                <View style={{alignSelf: 'flex-end', flex: 4}}>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="trash"
                      color={'gray'}
                      size={20}
                      style={{marginRight: 20}}
                      onPress={() => {
                        props.remove(product.id);
                      }}
                    />
                    <InputSpinner
                      max={product.countInStock}
                      min={1}
                      step={1}
                      style={{minWidth: 80, width: 100, height: 22}}
                      inputStyle={{
                        height: 26,
                        padding: 0,
                        fontSize: 14,
                        borderColor: COLOR_PRIMARY_10,
                        borderWidth: 1,
                      }}
                      buttonStyle={{
                        height: 22,
                        width: 24,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 4,
                      }}
                      skin="modern"
                      color={COLOR_PRIMARY_10}
                      height={22}
                      //colorMax={"#f04048"}
                      //colorMin={"#40c5f4"}
                      value={product.quantity}
                      onChange={num => {
                        //props.addItemToCart(product.id) //re-render all list are gross
                        props.spin(product.id, num);
                      }}
                    />
                  </View>
                </View>
              </View>
              {index !== content.length - 1 ? (
                <View
                  style={{
                    borderBottomColor: COLOR_GRAY,
                    borderBottomWidth: 1,
                    paddingBottom: 12,
                    //marginTop: 12,
                  }}></View>
              ) : null}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container} key={item.id}>
      <CheckBox
        disabled={false}
        style={{
          transform: [{scaleX: 1.2}, {scaleY: 1.2}],
          zIndex: 1,
          position: 'absolute',
          top: 10,
          left: 10,
        }}
        tintColors={{true: COLOR_PRIMARY_10}}
        value={item.isChecked}
        onValueChange={() => {
          props.block(item.id);
        }}
      />
      <View style={styles.header}>
        <View style={{width: 32}} />
        <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 5}}>
          {item.name}
        </Text>
      </View>
      {_renderSectionContent(item.product)}
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 10,
    //marginBottom: 5,
    paddingBottom: 10,
    //height: 195,
    elevation: 5,
  },
  header: {
    flex: 1,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLOR_PRIMARY_10, //'gray',
    borderBottomWidth: 1,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 15,
  },
  body: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    marginTop: 15,
    paddingBottom: 5,
  },
  bodyWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    //marginTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 20,
  },
  bodyExt: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
    paddingBottom: 0,
  },
  footer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    //marginTop: 5,
    paddingBottom: 10,
  },
  avatarImage: {
    backgroundColor: 'gainsboro',
    width: 65,
    height: 65,
    borderRadius: 5,
  },
});
