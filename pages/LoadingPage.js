import { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, Image } from "react-native";
import { Colors, Containers, Typography } from "../styles"
// import { getDaily } from "../qz-service/get";
import { testFb, getDailyQuiz, getDailyPixieQuiz } from "../firebase/firebaseConfig.js"

// import Spinner from '../public/Spinner.png';

export default function LoadingPage({navigation}){

    const Spinner= require('../public/Spinner.png');
    

    const [quiz, setQuiz] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const doOnce = true;

    // [Start] Load Pixie Quiz
  //////////////////////////
  // useEffect(() => {
  //   const load = async () => {
  //     //const quiz = await testFb();

  //     const fbRes = await getDailyPixieQuiz();
  //     const quiz = fbRes.quiz;
  //     // for (let i = 0; i < quiz.length; i++) { 
  //     //   console.log(quiz[i])
  //     // }
  //     console.log(quiz);
  //     setQuiz(quiz);
  //     setLoaded(true);
  //   }
  //   load();
  // }, [doOnce])
  ///////////////////////////
  // [End] Load Pixie Quiz

  // // [Start] Load Gemini Quiz
  // //////////////////////////////
  useEffect(() => {
    const load = async () => {
      
      const fbRes = await getDailyQuiz();
      const quiz = fbRes.slice(0,5);
      setQuiz(quiz);
      setTimeout(()=> {setLoaded(true)},1250);
      //setLoaded(true);
    }
    load();
  }, [doOnce, loaded])
  // ////////////////////////////////
  // // [End] Load Gemini Quiz

  useEffect(() => {
    if(!loaded) {
        return // 404/ error loading page
    }
    if (loaded) {
        navigation.navigate('CountDownPage', { quiz })
    }
  })

    return (
        <View style={styles.screen}>
        <View style={styles.container1}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>
              GET READY!
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
        ...Typography.getReadyText,
        color: "white",
        position: "absolute",
        textAlign: "center"
      }
  });