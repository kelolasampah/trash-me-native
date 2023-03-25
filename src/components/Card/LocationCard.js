import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import axios from 'axios';

import {FONT_ARegular, FONT_ASemi} from '../../utils/constant';
import ButtonIcon from '../Button/ButtonIcon';
//import {ButtonIcon} from '../../components';

const LocationCard = props => {
  const {lokasi, setLokasi} = props;
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [location, setLocation] = useState(null);

  // const [lokasi, setLokasi] = useState({
  //   jalan: null,
  //   kecamatan: null,
  //   kota: null,
  //   pos: null,
  //   provinsi: null,
  //   alamat: null,
  // });

  const fetchBigData = () => {
    if (location === null) return;
    axios
      .get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&localityLanguage=id`,
      )
      .then(function (response) {
        // handle success
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      })
      .finally(function () {
        // always executed
        console.log('Finally called');
      });
  };

  const fetchBigDataAsync = async () => {
    if (location === null) return;
    try {
      const response = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&localityLanguage=id`,
      );
      console.log(JSON.stringify(response.data));
    } catch (error) {
      // handle error
      alert(error.message);
    }
  };

  const fetchGeo = params => {
    //console.log(params);
    const {latitude, longitude} = params.coords; //location.coords;
    if (latitude === null && longitude === null) {
      return;
    }

    Geocoder.geocodePosition({
      lat: latitude || 0,
      lng: longitude || 0,
    })
      .then(res => {
        // res is an Array of geocoding object (see below)
        //console.log(res);
        setLokasi({
          ...lokasi,
          update: true,
          jalan: `${res[0].streetName} No. ${res[0].streetNumber} ${res[0].subLocality}`,
          kecamatan: res[0].locality,
          kota: res[0].subAdminArea,
          pos: res[0].postalCode,
          provinsi: res[0].adminArea,
          alamat: res[0].formattedAddress,
        });
      })
      .catch(err => console.log('err_lc_fg:', err));
  };

  const fetchGeoAsync = async () => {
    if (location === null) return;
    try {
      const res = await Geocoder.geocodePosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      async position => {
        setLocation(position);
        //console.log('loc_gc_ok:', position);
        //getGeoLocationBigData();
        fetchGeo(position);
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log('err_lc_gc:', error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.informasiLokasi}>
        <View style={styles.text}>
          <Text style={styles.labelLokasi}>Lokasi</Text>
          <Text style={styles.valueLokasi}>
            {lokasi?.alamat && lokasi.alamat.length > 50
              ? lokasi.alamat.substring(0, 50 - 3) + '...'
              : '-'}
          </Text>
        </View>
        <View style={styles.text}>
          <Text style={styles.valueLokasi}>{lokasi?.kota || '-'}</Text>
        </View>
      </View>
      <View style={styles.buttonAksi}>
        <ButtonIcon
          title="Get Lokasi"
          event={() => {
            getLocation();
          }}
        />
      </View>
    </View>
  );
};

export default LocationCard;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 10,
    marginHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 3,
    marginTop: 0, //-windowHeight * 0.06,
    flexDirection: 'row',
    height: 75,
  },
  informasiLokasi: {
    width: '80%',
  },
  text: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  labelLokasi: {
    fontSize: 15,
    fontFamily: FONT_ASemi,
  },
  valueLokasi: {
    fontSize: 12,
    fontFamily: FONT_ARegular,
  },
  buttonAksi: {
    flex: 1,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
