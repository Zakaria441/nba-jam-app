// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa las pantallas
import TeamSelectionScreen from './screens/TeamSelectionScreen';
import GameScreen from './screens/GameScreen';

console.log('TeamSelectionScreen:', typeof TeamSelectionScreen);
console.log('GameScreen:', typeof GameScreen);

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="TeamSelection"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="TeamSelection" 
          component={TeamSelectionScreen}
          options={{ title: 'Selección de Equipos' }}
        />
        <Stack.Screen 
          name="Game" 
          component={GameScreen}
          options={{ title: 'Partido' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;