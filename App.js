import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import CountDownPage from './pages/CountDownPage';
import Home from './pages/Home';
import Navigator from './routes/homeStack';
import List from './pages/List';
import HomeStack from './routes/homeStack'
import ScorePage from './pages/ScorePage';
// import CountDownCircleTimer from 'react-native-countdown-circle-timer';

export default function App() {

  return (
    //   <View>
    //  <HomePage />
    //  <View><CountDownPage/></View>
    //   </View>
    // <Navigator />
    // <List />
    <ScorePage />
    // <HomeStack />
  );
}

const styles = StyleSheet.create({


});
