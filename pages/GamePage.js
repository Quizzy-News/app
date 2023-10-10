import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import data from "../data.json";

import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function GamePage({ navigation }) {
  const [countdown, setCountdown] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [question, setQuestion] = useState(data);
  const [score, setScore] = useState(0);
  const [choices, setChoices] = useState([]);
  const [userRecord, setUserRecord] = useState([]);
  const [inProgress, setInProgress] = useState(true);

  useEffect(() => {
    setQuestion(data[currentQuestion]);
    setChoices([...data[currentQuestion].choices]);

    if (countdown === 0) {
      setInProgress(false);
    }

    const timeout = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    // console.log(userRecord)
    // console.log(score)
    if (!inProgress) {
      clearTimeout(timeout);
      let remainder = countdown;
      navigation.navigate("ScorePage", { score: score, record: userRecord, time: remainder })
    }
    return () => clearTimeout(timeout);
  }, [countdown, navigation, currentQuestion, score, userRecord]);

  const handleRecord = (record) => {
    setUserRecord([...userRecord, record])
    // console.log(userRecord);

  }

  const handleAnswer = (choice, currentQuestion) => {
    console.log('question #:' + `${currentQuestion}`)
    console.log(question.answer);
    if (choice === question.answer) {
      handleRecord("correct");
      setScore(score + 1);
    } else {
      handleRecord("incorrect");
    }

    if (currentQuestion + 1 < data.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Note: Trigger navigation from useEffect hook to ensure State updates

      setInProgress(false);

    }
  };



  if (!question) {
    return <Text>Loading...</Text>;
  }

  return (
    <StyledView className="flex-1 items-center justify-center bg-[#ded1e4]">
      <StyledView className="display-flex justify-center items-center">
        <StyledText className="text-3xl font-bold">{countdown}</StyledText>
        <StyledText className="text-3xl font-bold">
          {question.question}
        </StyledText>
        <StyledText>{score}</StyledText>
      </StyledView>
      <StyledView className="space-y-4">
        {/* Write unique id for json  */}

        {choices.map((choice, idx) => {
          return (
            <Pressable
              key={idx}
              className="w-[335px] h-[95px] bg-white hover:bg-[#80C9FA] rounded-[10px] shadow-[0 35px 60px -15px rgba(0,0,0,0.3)]"
              onPress={() => handleAnswer(choice, currentQuestion)}
            >
              <StyledText className="text-center font-bold justify-center items-center content-center">
                {choice}
              </StyledText>
            </Pressable>
          );
        })}
      </StyledView>
    </StyledView>
  );
}
