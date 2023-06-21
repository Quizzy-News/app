import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../pages/Home'
import CountDownPage from '../pages/CountDownPage';
import GamePage from '../pages/GamePage';

const screens = {
    Home: {
        screen: Home
    },
    CountDownPage: {
        screen: CountDownPage
    },
    GamePage: {
        screen: GamePage
    }
}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack);