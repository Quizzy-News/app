import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from '@react-navigation/native'



export default function Home({ navigation }) {
  const [loaded] = useFonts({
    KGHappy: require('../assets/fonts/KGHAPPY.ttf'),
    Lexend: require('../assets/fonts/Lexend-VariableFont_wght.ttf'),
    Jost: require('../assets/fonts/Jost-VariableFont_wght.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const pressHandler = () => {
    navigation.navigate('CountDownPage')
  }
  return (

    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.topTextPrimary}>QUIZZY.NEWS</Text>
      </View>
      <View style={styles.secondContainer}>
        <Text style={styles.topTextSecondary}>a daily quiz game on current events</Text>
        <Text style={styles.topTextSecondary}>from stories published very recently</Text>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.middleText}>Ready?</Text>
        <Pressable style={styles.playButton} onPress={pressHandler}>
          <Text style={styles.playButtonText}>PLAY</Text>
        </Pressable>
      </View>
      <View
        style={{
          borderBottomColor: '#909090',
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginBottom: 15,
        }}
      />
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>QUIZZY.NEWS</Text>
        <Text style={styles.bottomText}>ABOUT</Text>
        <Text style={[styles.bottomText, { marginBottom: 20 }]}>Ⓒ 2022 EMISQWE</Text>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  topContainer: {
    flex: 2,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 50
  },
  middleContainer: {
    flex: 6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  topTextPrimary: {
    fontFamily: 'KGHappy',
    fontSize: 46,
    marginTop: 70
  },
  topTextSecondary: {
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
  bottomText: {
    fontFamily: 'Lexend',
    fontSize: 12,
    color: '#909090',
    marginLeft: 40
  },

});