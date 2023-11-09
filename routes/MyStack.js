import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import CountDownPage from '../pages/CountDownPage';
import GamePage from '../pages/GamePage';
import ScorePage from '../pages/ScorePage';
import AboutModal from '../modals/About';
import ClickBackMidGame from '../modals/ClickBackMidGame';
import Timer from '../pages/GamePageChildren/Timer';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Group>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CountDownPage" component={CountDownPage} />
        <Stack.Screen name="GamePage" component={GamePage} />
        <Stack.Screen name="ScorePage" component={ScorePage} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="Timer" component={Timer}/>
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="AboutModal" component={AboutModal} />
        <Stack.Screen name="ClickBackMidGame" component={ClickBackMidGame} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default MyStack;