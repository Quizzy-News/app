import { Pressable, Text, View, StyleSheet, } from "react-native";
import { useState } from "react";
import { Buttons, Colors, Containers, Typography } from "../styles"

export default function Home({ navigation }) {

  const [ buttonActive, setButtonActive ] = useState(false);


  return (
    <View style={styles.screen}>
      <View style={styles.container1}>
        <Text style={styles.title}>Quizzy.News</Text>
        <Text style={styles.subH1}>
          A daily quiz game{"\n"}
          based on current events
        </Text>
      </View>
      <View style={styles.container2}>
        <Text style={styles.h2}>
          Ready?
        </Text>
        <Pressable
          onPressIn={() => {
            setButtonActive(true);
          }}
          onPressOut={() => {
            setButtonActive(false);
            setTimeout(()=> {
              navigation.navigate("LoadingPage")
              }, 500);
            ;
          }}
          style={buttonActive ? styles.buttonActive : styles.button}
        >
          <View style={buttonActive ? '':styles.shadowLayer} />
          <View style={styles.topLayer} />
          <Text style={styles.buttonText}>Play</Text>
        </Pressable>
      </View>
      <View style={styles.container3}>
        <View style={styles.divider} />
        <Text
          onPress={() => navigation.navigate('AboutModal')}
          style={styles.subH2}
        >About this game</Text>
        <Text style={styles.footer}>
          Ⓒ 2025 EMISQWE
        </Text>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  title: {
    ...Typography.title,
    ...Colors.fontColors.gray4,
    paddingTop: 80,
    paddingBottom: 30,
    textAlign: 'center'
  },
  subH1: {
    ...Typography.subH1,
    ...Colors.fontColors.gray4,
    textAlign: 'center',
  },
  h2: {
    ...Typography.subH2,
    ...Colors.fontColors.gray4,
    textAlign: 'center',
    paddingBottom: 17,
    fontSize: 24,
  },
  button: {
    backgroundColor: '#77C7F4', // Main blue color as a fallback
    height: 70,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Required for absolute positioning of layers
    marginRight: 10,
    marginLeft: 10,
     // transition: 'transform 0.25s linear', Smoothly move the button down when active
    },
  buttonActive: {
    // Active state configuration
    backgroundColor: '#77C7F4',
    height: 70,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
     // transform: [{ translateY: 15 }], Slightly move the button down
  },
  shadowLayer: {
    backgroundColor: '#70A5FE', // Slightly darker for the shadow effect
    position: 'absolute',
    top: 1,
    left: 0,
    right: 0,
    bottom: -15,
    borderRadius: 8,
    // transition: 'all 0.25s linear'
  },
  topLayer: {
    backgroundColor: '#77C7F4', // Main blue color for the button
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
  },
  divider: {
    ...Colors.backgroundColors.homeBlue,
    height: 1,
    marginBottom: 10
  },
  subH2: {
    ...Typography.subH2,
    color: 'black',
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 5,
    textAlign: 'center',
  },
  footer: {
    ...Typography.subH1,
    color: 'black',
    fontSize: 13,
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 30,
    textAlign: 'center',
  },
  buttonText: {
    ...Typography.buttonText,
    color: "white",
  },
  screen: {
    ...Containers.screenBetween,
    ...Colors.backgroundColors.homeBlue
  },
  container1: {
    padding: 10,
    ...Colors.backgroundColors.homeBlue,
  },
  container2: {
    padding: 10,
  },
  container3: {
    ...Colors.backgroundColors.homeBlue,
  },
}); 