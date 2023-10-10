import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import CountDownPage from '../pages/CountDownPage';
import GamePage from '../pages/GamePage';
import ScorePage from '../pages/ScorePage';
import AboutModal from '../modals/About';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Group>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CountDownPage" component={CountDownPage} />
        <Stack.Screen name="GamePage" component={GamePage} />
        <Stack.Screen name="ScorePage" component={ScorePage} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="MyModal" component={AboutModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default MyStack;