import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Shift } from '../components/Shift/Shift';

function ShiftScreen() {
  return (
    <View style={styles.container}>
      <Shift />
    </View>
  );
}

export { ShiftScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
  },
});