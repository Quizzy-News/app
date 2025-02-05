import { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, Image } from "react-native";
import { Colors, Containers, Typography } from "../styles"



import { useQuiz } from "./hooks/useQuiz";




export default function LoadingPage({navigation}){


  const {quiz, loaded, dayString, error} = useQuiz();

  useEffect(() => {
    
    if(!loaded) {
        return // 404/ error loading page
    }
    if (loaded && quiz.length > 0) {
      console.log("loaded quiz: " + dayString);
      const timeoutId = setTimeout(() =>navigation.navigate('CountDownPage', { quiz }), 1000);
      return () => {
        clearTimeout(timeoutId);
      }
    }

  }, [loaded, quiz])




    return (
      <>
      <View className={`flex-1 flex-col items-center justify-center bg-light-purple`}>
       
        
          <View style={styles.circle}>
            <Text style={styles.circleText}>
              GET READY!
            </Text>
          </View>
       
      
        </View>
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