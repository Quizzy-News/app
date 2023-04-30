import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

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
    <View style={styles.screenContainer}>
      <View style={styles.homeHeaderContainer}>
        <Text style={styles.homeHeaderTextPrimary}>QUIZZY.NEWS</Text>
        <Text style={styles.homeHeaderTextSecondary}>a daily quiz game on current events</Text>
        <Text style={styles.homeHeaderTextSecondary}>from stories published very recently</Text>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.middleText}>Ready?</Text>
        <Pressable style={styles.playButton}>
          <Text style={styles.playButtonText}>PLAY</Text>
        </Pressable>        
      </View>
      <View style={styles.footerContainer}>
        <Text style={ styles.footerText }>QUIZZY.NEWS</Text>
        <Text style={ styles.footerText }>ABOUT</Text>
        <Text style={ [styles.footerText, {marginBottom: 20}] }>Ⓒ 2022 EMISQWE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  homeHeaderContainer: {
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
  
  homeHeaderTextPrimary: {
    fontFamily: 'KGHappy',
    fontSize: 46, 
    marginTop: 80
  },
  homeHeaderTextSecondary: {
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
  footerText: {
    fontFamily: 'Lexend',
    fontSize: 12, 
    color: '#909090', 
    marginLeft: 40
  },
});
