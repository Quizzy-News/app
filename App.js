// import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';


// 

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Question" component={QuestionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// 

export default function App() {

  const [loaded] = useFonts({
    KGHappy: require('./assets/fonts/KGHAPPY.ttf'),
    Lexend: require('./assets/fonts/Lexend-VariableFont_wght.ttf'),
    Jost: require('./assets/fonts/Jost-VariableFont_wght.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    AppStack()
  );
}

const HomeScreen = ({navigation}) => {
  return (
    <View style={commonStyles.screenContainer}>
      <View style={homeStyles.headerContainer}>
        <Text style={homeStyles.headerTextPrimary}>QUIZZY.NEWS</Text>
        <Text style={homeStyles.headerTextSecondary}>a daily quiz game on current events</Text>
        <Text style={homeStyles.headerTextSecondary}>from stories published very recently</Text>
      </View>
      <View style={homeStyles.mainContainer}>
        <Text style={homeStyles.middleText}>Ready?</Text>
        <Pressable style={homeStyles.playButton} onPress={() => navigation.navigate('Question')}>
          <Text style={homeStyles.playButtonText}>PLAY</Text>
        </Pressable>        
      </View>
      <View style={homeStyles.footerContainer}>
        <Text style={commonStyles.footerText}>QUIZZY.NEWS</Text>
        <Text style={commonStyles.footerText}>ABOUT</Text>
        <Text style={[commonStyles.footerText, {marginBottom: 20}]}>Ⓒ 2022 EMISQWE</Text>
      </View>
    </View>
 );
};

const QuestionScreen = ({navigation, route}) => {
  return (
    <View style={commonStyles.screenContainer}>
      <View style={questionStyles.headerContainer}>
        <Text>Quiz Header</Text>
      </View>
      <View style={questionStyles.mainContainer}>
        <Text>1 + 1 = ?</Text>
      </View>
      <View style={questionStyles.footerContainer}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Text style={commonStyles.footerText}>QUIZZY.NEWS</Text>
        </Pressable>
        <Text style={[commonStyles.footerText, {marginBottom: 20}]}>Ⓒ 2022 EMISQWE</Text>
      </View>
    </View>
  )
};

const commonStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  footerText: {
    fontFamily: 'Lexend',
    fontSize: 12, 
    color: '#909090', 
    marginLeft: 40
  }
});

const homeStyles = StyleSheet.create({
  headerContainer: {
    flex: 2,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  mainContainer: {
    flex: 6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },

  headerTextPrimary: {
    fontFamily: 'KGHappy',
    fontSize: 46, 
    marginTop: 80
  },
  headerTextSecondary: {
    fontFamily: 'Lexend',
    fontSize: 14, 
    marginLeft: -80,
  },
  middleText: {
    fontFamily: 'Lexend',
    fontSize: 14, 
    marginLeft: -270,
    marginTop: -40
  },
  playButton: {
    width: 350,
    marginTop: 10,
    backgroundColor: '#80C9FA',
    alignItems: 'center',
    borderRadius: 6,
    // shadowColor: '#53ADF0',
    // shadowOffset: { width: 0, height: 12 }
  },
  playButtonText: {
    fontFamily: 'Lexend',
    fontSize: 35,
    paddingVertical: 3,
    color: '#fff',
  },
});

const questionStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  headerContainer: {
    flex: 2,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  mainContainer: {
    flex: 6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
});
