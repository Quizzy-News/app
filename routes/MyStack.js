import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import CountDownPage from '../pages/CountDownPage';
import GamePage from '../pages/GamePage';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CountDownPage" component={CountDownPage} />
      <Stack.Screen name="GamePage" component={GamePage} />
    </Stack.Navigator>
  );
}

export default MyStack;