import { View, Text, StyleSheet, Image } from 'react-native';
import { observer } from 'mobx-react';
import { FC } from 'react';
import shiftsStore from '../../store/shiftsStore';

export const Shift: FC = observer(() => {

  if (!shiftsStore.currentShift) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Смена не выбрана</Text>
      </View>
    );
  }

  const { companyName, dateStartByCity, planWorkers, currentWorkers, customerRating, logo } = shiftsStore.currentShift;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Детали смены</Text>
      {logo && <Image source={{ uri: logo }} style={styles.logo} />}
      <Text style={styles.companyName}>
        {companyName}
      </Text>
      <Text style={styles.detailText}>
        Начало смены: {dateStartByCity}
      </Text>
      {customerRating && (
        <Text style={styles.detailText}>
          Рейтинг: {customerRating}
        </Text>
      )}
      <View style={styles.workersContainer}>
        <Text style={styles.workersText}>
          Требуется: {planWorkers}
        </Text>
        <Text style={styles.workersText}>
          Набрано: {currentWorkers}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  logo: {
    marginTop: 20,
    width: 100,
    height: 100
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
    marginTop: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#34495e',
    lineHeight: 20,
  },
  workersContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  workersText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2980b9',
  },
  noShiftText: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
