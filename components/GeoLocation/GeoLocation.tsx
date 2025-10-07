import React, { useState, useEffect } from 'react';
import { Button, View, Text, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { apiService } from '../../services/api/api.tsx';

export const GeoLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

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
        const result = apiService.get('https://mobile.handswork.pro/api/shifts/map-list-unauthorized', {
          latitude,
          longitude
        }).then((res) => {
          console.log('result', res)
        });
        setError('');
      },
      error => {
        setError(error.message);
        setLocation(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  const handleGetLocation = async () => {
    const hasPermission = await requestLocationPermission();
    console.log('hasPermission', hasPermission)
    if (hasPermission) {
      getCurrentLocation();
    } else {
      setError('Разрешение на доступ к геопозиции не предоставлено');
    }
  };

  useEffect(() => {
    handleGetLocation();
  }, [])

  return (
    <View>
      <Button title="Получить текущую геопозицию" onPress={handleGetLocation} />
      {location && (
        <View style={{ marginTop: 20 }}>
          <Text>Широта: {location.latitude}</Text>
          <Text>Долгота: {location.longitude}</Text>
          <Text>Точность: {location.accuracy} метров</Text>
          {location.altitude && (
            <Text>Высота: {location.altitude} метров</Text>
          )}
        </View>
      )}
      {error && (
        <Text style={{ color: 'red', marginTop: 20 }}>Ошибка: {error}</Text>
      )}
    </View>
  );
};
