import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
    <View style={styles.container}>
      <Text style={{ fontFamily: 'KGHappy', fontSize: 46, marginTop: 40 }}>QUIZZY.NEWS</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
