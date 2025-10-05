import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { Shifts } from '../Shifts/Shifts.tsx';

export const GeoLocation = () => {
  const [location, setLocation] = useState<any>();
  const [errorLocation, setErrorLocation] = useState('');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Разрешение на доступ к геопозиции',
            message: 'Приложению нужен доступ к вашей геопозиции',
            buttonNeutral: 'Спросить позже',
            buttonNegative: 'Отмена',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
        });

        setErrorLocation('');
      },
      error => {
        setErrorLocation(error.message);
        setLocation(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  useEffect(() => {

    const handleGetLocation = async () => {
      const hasPermission = await requestLocationPermission();
      console.log('hasPermission', hasPermission)
      if (hasPermission) {
        getCurrentLocation();
      } else {
        setErrorLocation('Разрешение на доступ к геопозиции не предоставлено');
      }
    };

    handleGetLocation();
  }, [])

  return (
    <View>
      {location && (
        <View style={{ marginTop: 20 }}>
          <Text>Широта: {location.latitude}</Text>
          <Text>Долгота: {location.longitude}</Text>
        </View>
      )}
      {location && <Shifts latitude={location.latitude} longitude={location.longitude} />}
      {errorLocation && (
        <Text style={{ color: 'red', marginTop: 20 }}>Ошибка: {errorLocation}</Text>
      )}
    </View>
  );
};
