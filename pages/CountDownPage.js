import { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Colors, Containers, Typography } from "../styles"
import { testFb, getDailyQuiz } from "../firebase/firebaseConfig.js"

export default function CountDownPage({ navigation }) {
  const [countdown, setCountdown] = useState(3);
  const [loaded, setLoaded] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const doOnce = true;

  useEffect(() => {
    const load = async () => {
      //const quiz = await testFb();
      const quiz = await getDailyQuiz();
      // for (let i = 0; i < quiz.length; i++) { 
      //   console.log(quiz[i])
      // }
      console.log(quiz);
      setQuiz(quiz);
      setLoaded(true);
    }
    load();
  }, [doOnce])


  useEffect(() => {
    if (!loaded) {
      return
    }
    if (countdown === 0) {
      navigation.navigate("GamePage", { quiz });;
      return;
    }

    const timeout = setTimeout(() => {
        setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [countdown, navigation, loaded]);

  return (
    <View style={styles.screen}>
      <View style={styles.container1}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>
            {countdown}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  container1: {
    ...Colors.backgroundColors.lightPurple,
    ...Containers.contentContainer
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 300,
    borderWidth: 30,
    borderColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    ...Typography.countdownText,
    color: "white",
    position: "absolute"
  }
});
