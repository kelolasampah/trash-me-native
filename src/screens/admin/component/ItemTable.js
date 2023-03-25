import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';
import {COLOR_GRAY, COLOR_PRIMARY_10} from '../../../utils/constant';

const optionsPerPage = [2, 3, 4];

const ItemTable = props => {
  const {product} = props;
  //console.log(JSON.stringify(product));
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  //         <Text style={styles.item}>{props.brand}</Text>
  //   <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
  //   {props.name}
  // </Text>
  // <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
  //   {props.category.name}
  // </Text>
  // <Text style={styles.item}>Rp {props.price}</Text>
  return (
    <DataTable style={styles.container}>
      <View style={{backgroundColor: COLOR_PRIMARY_10, alignItems: 'center'}}>
        <Text style={{fontWeight: '600', padding: 10}}>JASA DAN PERALATAN</Text>
      </View>
      <DataTable.Header style={{backgroundColor: 'honeydew'}}>
        <DataTable.Title></DataTable.Title>
        <DataTable.Title sortDirection="desscending">Nama</DataTable.Title>
        <DataTable.Title sortDirection="desscending">Kategori</DataTable.Title>
        <DataTable.Title sortDirection="desscending">Harga</DataTable.Title>
      </DataTable.Header>
      {product.map((item, index) => {
        return (
          <DataTable.Row
            key={item.id}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 5,
              backgroundColor: index % 2 == 0 ? 'white' : 'honeydew',
            }}>
            <View style={styles.itemView}>
              <Image
                source={{
                  uri: item.image
                    ? item.image
                    : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                }}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <View style={styles.itemView}>
              <Text style={styles.item}>{item.brand}</Text>
            </View>
            <View style={styles.itemView}>
              <Text style={styles.item} numberOfLines={3} ellipsizeMode="tail">
                {item.category.name}
              </Text>
            </View>
            <View style={styles.itemView}>
              <Text style={styles.item}>
                Rp {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </Text>
            </View>
          </DataTable.Row>
        );
      })}

      <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={page => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
      <View
        style={{
          height: 20,
          borderTopColor: COLOR_GRAY,
          borderTopWidth: 1,
        }}></View>
    </DataTable>
  );
};

export default ItemTable;
var {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  image: {
    borderRadius: 50,
    width: width / 7,
    height: width / 7,
    margin: 5,
  },
  itemView: {
    width: '25%',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    flexWrap: 'wrap',
    marginHorizontal: 5,
    textAlignVertical: 'center',
    fontSize: 12,
    fontWeight: '400',
  },
});
