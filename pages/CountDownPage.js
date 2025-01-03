import { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { styled } from 'nativewind';
import { Colors, Containers, Typography } from "../styles"
// import { getDaily } from "../qz-service/get";
import { testFb, getDailyQuiz, getDailyPixieQuiz } from "../firebase/firebaseConfig.js"

const StyledView = styled(View);

export default function CountDownPage({ navigation, route }) {
  const [countdown, setCountdown] = useState(3);
  const [loaded, setLoaded] = useState(true);
  const [quiz, setQuiz] = useState(route.params.quiz);
  const doOnce = true;

  // // [Start] Load Pixie Quiz
  // //////////////////////////
  // // useEffect(() => {
  // //   const load = async () => {
  // //     //const quiz = await testFb();

  // //     const fbRes = await getDailyPixieQuiz();
  // //     const quiz = fbRes.quiz;
  // //     // for (let i = 0; i < quiz.length; i++) { 
  // //     //   console.log(quiz[i])
  // //     // }
  // //     console.log(quiz);
  // //     setQuiz(quiz);
  // //     setLoaded(true);
  // //   }
  // //   load();
  // // }, [doOnce])
  // ///////////////////////////
  // // [End] Load Pixie Quiz

  // // // [Start] Load Gemini Quiz
  // // //////////////////////////////
  // useEffect(() => {
  //   const load = async () => {
      
  //     const fbRes = await getDailyQuiz();
  //     const quiz = fbRes.quiz.slice(0,5);
  //     console.log(quiz);
  //     setQuiz(quiz);
  //     setLoaded(true);
  //   }
  //   load();
  // }, [doOnce])
  // // ////////////////////////////////
  // // // [End] Load Gemini Quiz


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
  }, [countdown, navigation]);

  return (
    <>
    <StyledView className={`flex-1 flex-col items-center justify-center bg-light-purple`}>
      
        <View style={styles.circle}>
          <Text style={styles.circleText}>
            {countdown}
          </Text>
        </View>
      

    </StyledView>
    </>
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
