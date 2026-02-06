import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TeamSelectionScreen from './screens/TeamSelectionScreen';
import GameScreen from './screens/GameScreen';
import WinnerScreen from './screens/WinnerScreen';

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
        />
        <Stack.Screen 
          name="Game" 
          component={GameScreen}
        />
        <Stack.Screen 
          name="Winner" 
          component={WinnerScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;