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
  const [choices,setChoices] = useState([])
  // let obj = Object.freeze({ score: 0 });


  useEffect(() => {
    setQuestion(data[currentQuestion]);
    setChoices([...data[currentQuestion].choices])
  }, [currentQuestion]);
  
  console.log(question);

  const handleAnswer = (choice) => {
    console.log(question.answer)
    if (choice === question.answer) {
      setSelectedAnswer("correct");
      setScore(score + 1)
    } else {
      setSelectedAnswer("incorrect");
    }
    if (currentQuestion + 1 < data.length) {setCurrentQuestion(currentQuestion + 1)}
    else { console.log('score page')}
  };

  if (!question) {
    return <Text>Loading...</Text>;
  }

  return (
    <StyledView className="flex-1 items-center justify-center bg-[#ded1e4]">
      <StyledView className="display-flex justify-center items-center">
        <StyledText className="text-3xl font-bold">
         {question.question}
        </StyledText>
        <StyledText>{score}</StyledText>
      </StyledView>
      <StyledView className="space-y-4">
        {/* Write unique id for json  */}
        
        {choices.map((choice, idx)=>{
          return(
            <Pressable
              key = {idx}
              className="w-[335px] h-[95px] bg-white hover:bg-[#80C9FA] rounded-[10px] shadow-[0 35px 60px -15px rgba(0,0,0,0.3)]"
              onPress={() => handleAnswer(choice)}>
              <StyledText
                className="text-center font-bold justify-center items-center content-center">
                 {choice}
                </StyledText>

            </Pressable>
          )
        })}
      </StyledView>
    </StyledView>
  );
}

