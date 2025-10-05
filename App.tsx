/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { GeoLocation } from './src/components/GeoLocation/GeoLocation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    console.log('App rendered')
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <GeoLocation />
      </View>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
