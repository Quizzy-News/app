// import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

  const [fontsLoaded] = useFonts({
    KGHappy: require('./assets/fonts/KGHAPPY.ttf'),
    Lexend_Regular: require('./assets/fonts/Lexend-Regular.ttf'),
    Lexend_SemiBold: require('./assets/fonts/Lexend-SemiBold.ttf'),
    Lexend_Bold: require('./assets/fonts/Lexend-Bold.ttf'),
    Lexend_ExtraBold: require('./assets/fonts/Lexend-ExtraBold.ttf'),
    Jost_Regular: require('./assets/fonts/Jost-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppStack />
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
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Text style={commonStyles.footerText}>ABOUT</Text>
        </Pressable>
        <Text style={commonStyles.footerText}>QUIZZY.NEWS</Text>
        <Text style={[commonStyles.footerCopyrightText, {marginBottom: 20}]}>Ⓒ 2023 EMISQWE</Text>
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
        <Text style={[commonStyles.footerCopyrightText, {marginBottom: 20}]}>Ⓒ 2023 EMISQWE</Text>
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
    fontFamily: 'Lexend_ExtraBold',
    fontSize: 16,
    color: '#909090',
    marginLeft: 40,
    lineHeight: 25
  },
  footerCopyrightText: {
    fontFamily: 'Lexend_Regular',
    fontSize: 12, 
    color: '#909090', 
    marginLeft: 40,
    lineHeight: 25
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
    borderTopColor: 'grey',
    borderTopWidth: StyleSheet.hairlineWidth, 
    paddingTop: 14,
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },

  headerTextPrimary: {
    fontFamily: 'KGHappy',
    fontSize: 46, 
    marginTop: 80
  },
  headerTextSecondary: {
    fontFamily: 'Lexend_SemiBold',
    fontSize: 14, 
    marginLeft: -80,
  },
  middleText: {
    fontFamily: 'Lexend_Bold',
    fontSize: 16, 
    marginLeft: -270,
    marginTop: -40
  },
  playButton: {
    width: 350,
    marginTop: 20,
    backgroundColor: '#80C9FA',
    alignItems: 'center',
    borderRadius: 6,
    // shadowColor: '#53ADF0',
    // shadowOffset: { width: 0, height: 12 }
  },
  playButtonText: {
    fontFamily: 'Lexend_ExtraBold',
    fontSize: 35,
    letterSpacing: 1,
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
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  footerContainer: {
    flex: .8,
    backgroundColor: '#fff',
    borderTopColor: 'grey',
    borderTopWidth: StyleSheet.hairlineWidth, 
    paddingTop: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
});
