import { View, Text } from 'react-native';
import { useGetShifts } from '../../shared/hooks/useGetShifts';
import { FC } from 'react';

interface ShiftsProps {
  latitude: string
  longitude: string
}

export const Shifts: FC<ShiftsProps> = ({ latitude, longitude }) => {

  console.log('Shifts latitude, longitude', latitude, longitude)

  const { data, error, loading } = useGetShifts({
    latitude: latitude,
    longitude: longitude,
  });

  if (error) {
    return (
      <View>
        <Text style={{ color: 'red', marginTop: 20 }}>Ошибка: {error}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View>
        <Text>isLoading</Text>
      </View>
    );
  }


  return (<View>
    <Text>{data.length}</Text>
  </View>)

}
