import { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, Image } from "react-native";
import { styled } from 'nativewind';
import { Colors, Containers, Typography } from "../styles"
// import { getDaily } from "../qz-service/get";
import { getDailyQuiz, getDailyPixieQuiz, todayFormatted } from "../firebase/firebaseConfig.js"

// import Spinner from '../public/Spinner.png';
const StyledView = styled(View);


export default function LoadingPage({navigation}){

    // const Spinner= require('../public/Spinner.png');
    

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
      
      console.log("Date: ", todayFormatted)
      const fbRes = await getDailyQuiz();

      console.log("Res: ", fbRes)
      const quiz = fbRes.slice(0, 5);
      console.log("Quiz: ", quiz);

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
      <>
      <StyledView className={`flex-1 flex-col items-center justify-center bg-light-purple`}>
       
        
          <View style={styles.circle}>
            <Text style={styles.circleText}>
              GET READY!
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
        ...Typography.getReadyText,
        color: "white",
        position: "absolute",
        textAlign: "center"
      }
  });