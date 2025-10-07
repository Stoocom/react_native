import { View, Text, FlatList, StyleSheet, TouchableOpacity, ListRenderItem } from 'react-native';
import { useGetShifts } from '../../shared/hooks/useGetShifts';
import { observer } from 'mobx-react';
import shiftsStore from '../../store/shiftsStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Shift } from '../../shared/types/types';

type RootStackParamList = {
  Shifts: undefined;
  Shift: undefined;
};
interface ShiftsProps {
  latitude: string
  longitude: string
}

export const Shifts = observer(({ latitude, longitude }: ShiftsProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = (item: Shift) => {
    shiftsStore.setCurrentShift(item)
    navigation.navigate('Shift');
  };

  const { data, error, loading } = useGetShifts({
    latitude: latitude,
    longitude: longitude,
  });

  const renderItem: ListRenderItem<Shift> = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={styles.item}>
          <Text style={styles.text}>{item.companyName}</Text>
          <Text style={styles.text}>Начало смены: {item.dateStartByCity}</Text>
          <View style={styles.info}>
            <Text style={styles.text}>Требуется: {item.planWorkers}</Text>
            <Text style={styles.text}>Набрано: {item.currentWorkers}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Ошибка: {error}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Загрузка</Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Смены отсутствуют</Text>
      </View>
    );
  }


  return <View>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={7}
      removeClippedSubviews={true}
    />
  </View>

});

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  info: {
    flexDirection: 'row',
    gap: 20
  },
  text: {
    fontSize: 14,
  },
  error: {
    color: 'red',
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

