import { Pressable, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Buttons, Colors, Containers, Typography } from "../styles"

export default function Home({ navigation }) {

  const [ buttonActive, setButtonActive ] = useState(false);


  return (
    <View style={styles.screen}>
      <View style={styles.container1}>
        <Text style={styles.title}>Quizzy.News</Text>
        <Text style={styles.subH1}>
          a daily quiz game on current events{"\n"}
          from stories published very recently
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
            navigation.navigate("CountDownPage");
          }}
          style={buttonActive ? styles.buttonActive : styles.button}
        >
          <Text style={styles.buttonText}>Play</Text>
        </Pressable>
      </View>
      <View style={styles.container3}>
        <View style={styles.divider} />
        <Text
          onPress={() => navigation.navigate('AboutModal')}
          style={styles.subH2}
        >ABOUT</Text>
        <Text style={styles.subH2}>QUIZZY.NEWS</Text>
        <Text style={styles.footer}>
          Ⓒ 2022 EMISQWE
        </Text>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  title: {
    ...Typography.title,
    ...Colors.fontColors.gray4,
    paddingTop: 20,
  },
  subH1: {
    ...Typography.subH1,
    ...Colors.fontColors.gray4
  },
  h2: {
    ...Typography.h2,
    ...Colors.fontColors.gray4
  },
  button: {
    ...Colors.backgroundColors.lightBlue,
    ...Colors.shadowColors.darkBlue,
    ...Buttons.button,
    height: 50,
    marginTop: 20,
  },
  buttonActive: {
    ...Colors.backgroundColors.lightBlue,
    ...Buttons.buttonActive,
    height: 50,
    marginTop: 20,
  },
  divider: {
    ...Colors.backgroundColors.gray2,
    height: 1,
    marginBottom: 10
  },
  subH2: {
    ...Typography.subH1,
    ...Colors.fontColors.gray2,
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 5,
  },
  footer: {
    ...Typography.subH2,
    ...Colors.fontColors.gray2,
    fontSize: 12,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 15,
  },
  buttonText: {
    ...Typography.buttonText,
    color: "white",
  },
  screen: {
    ...Containers.screenBetween
  },
  container1: {
    padding: 10
  },
  container2: {
    padding: 10,
  },
  container3: {
  },
});