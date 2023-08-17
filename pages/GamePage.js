import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import data from "../data.json";

import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function GamePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [question, setQuestion] = useState(data);
  const [score, setScore] = useState(0);
  // let obj = Object.freeze({ score: 0 });

  useEffect(() => {
    setQuestion(data[currentQuestion]);
  }, []);

  console.log(question);

  const handleAnswer = (choice) => {
    if (choice === question[currentQuestion].answer) {
      setSelectedAnswer("correct");
    } else {
      setSelectedAnswer("incorrect");
    }
  };

  if (!question) {
    return <Text>Loading...</Text>;
  }

  return (
    <StyledView className="flex-1 items-center justify-center bg-[#ded1e4]">
      <StyledView className="display-flex justify-center items-center">
        <StyledText className="text-3xl font-bold">
          Who was the first president of the US?
        </StyledText>
        <StyledText>{score}</StyledText>
      </StyledView>
      <StyledView className="space-y-4">
        <Pressable
          className="w-[335px] h-[95px] bg-white hover:bg-[#80C9FA] rounded-[10px] shadow-[0 35px 60px -15px rgba(0,0,0,0.3)]"
          onPress={() => handlePress("George")}
        >
          <StyledText
            className="text-center font-bold
          justify-center items-center content-center
          
          "
          >
            George
          </StyledText>
        </Pressable>
        <Pressable
          className="w-[335px] h-[95px] bg-white hover:bg-[#80C9FA] rounded-[10px] shadow-[0 35px 60px -15px rgba(0,0,0,0.3)]"
          onPress={() => handlePress("Button 1")}
        >
          <StyledText>Mountain Dew Elizonda The Third</StyledText>
        </Pressable>
        <Pressable
          className="w-[335px] h-[95px] bg-white hover:bg-[#80C9FA] rounded-[10px] shadow-[0 35px 60px -15px rgba(0,0,0,0.3)]"
          onPress={() => handlePress("Button 2")}
        >
          <StyledText>Joe Maldanado</StyledText>
        </Pressable>
      </StyledView>
    </StyledView>
  );
}
