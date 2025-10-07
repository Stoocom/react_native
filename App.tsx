import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShiftsScreen } from './src/screens/ShiftsScreen';
import { ShiftScreen } from './src/screens/ShiftScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Shifts">
        <Stack.Screen
          name="Shifts"
          component={ShiftsScreen}
          options={{ title: 'Смены' }}
        />
        <Stack.Screen
          name="Shift"
          component={ShiftScreen}
          options={{ title: 'Смены' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
