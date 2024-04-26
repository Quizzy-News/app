import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { styled } from 'nativewind';
import sampleQuiz from "../sampleQuiz.json";
import ChoiceDisplay from './GamePageChildren/ChoiceDisplay';
import Header from './GamePageChildren/Header.js'
import QuestionDisplay from "./GamePageChildren/QuestionDisplay.js";
import Footer from "./GamePageChildren/Footer.js";

const StyledView = styled(View);

export default function GamePage ( { navigation, route }) {

  const [countdown, setCountdown] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(0); // int represents index 
  const [question, setQuestion] = useState(route.params.quiz); // sampleQuiz is an array of objects
  const [score, setScore] = useState(0);
  const [choices, setChoices] = useState([]); 
  const [userRecord, setUserRecord] = useState([]);  // TODO: Change the data structure to object? {0: "correct", 1: "incorrect", etc.}
  const [inProgress, setInProgress] = useState(true);
  const [choiceStates, setChoiceStates] = useState(["Idle", "Idle", "Idle"]); // Each element in choiceStates corresponds to a choice button.

  const [timeoutId, setTimeoutId] = useState(null);
  const [page, setPage] = useState(1);

  const [quiz, setQuiz] = useState(route.params.quiz);


  
  useEffect(() => {
    console.log(quiz[currentQuestion]["question"]);
    setQuestion(quiz[currentQuestion]);
    setChoices([...quiz[currentQuestion].choices]);
  }, [currentQuestion]);

  // See isCorrect and handlePressOut; this is for determining if item is correct or incorrect
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  },[timeoutId])


  // Ensure that state variables are sync'd before navigating away from the gamepage
  useEffect(() => {
    if(!inProgress){
      navigation.navigate("ScorePage", {
        score, record: userRecord, time: countdown, quiz: quiz
      })
    }
  }, [inProgress, navigation, score, userRecord, countdown, quiz])

  // == start: REDIRECT TO SCOREPAGE ==
  const handleTimeOut = () => {
      setInProgress(false);
      navigation.navigate("ScorePage", {score: score, record: userRecord, time: 0, quiz: quiz})
  }

  // == end: REDIRECT TO SCOREPAGE ==

  const handlePressIn = (choice) => {
    let index = choices.indexOf(choice);

    setChoiceStates((previousStates) => { 
      return previousStates.map((previousState, i) => i === index ? "Active" : "Disabled" ) 
    });

    };
  // == start: HELPER FUNCTIONS FOR handlePressOut ==

  const handleRecord = (record) => {
    setUserRecord([...userRecord, record]);
  }

  const handleScore = (newScore) => {
    setScore(newScore);
  }

  const isCorrect = (choice) => {
    let index = choices.indexOf(choice);

    const newChoiceState = choice === question.answer ? "Correct" : "Incorrect";

    handleRecord(newChoiceState === "Correct" ? "correct" : "incorrect");
    handleScore(newChoiceState === "Correct" ? score + 50 : score);


    setChoiceStates((previousChoiceStates) => { 
      return previousChoiceStates.map((previousChoiceStates, i) => i === index ? newChoiceState : "Disabled" ); 
    });

  };

  const getNextQuestion = () => {  
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < quiz.length) {
      setCurrentQuestion(nextQuestion);
      resetChoices();
    } else { 
      setInProgress(false);
    }; 
  }

  const resetChoices = () => {
    setChoices([...quiz[currentQuestion].choices]);
    setChoiceStates((previousStates) => {
      return previousStates.map(() =>  "Idle")
    });
  };

  const incrementPage = () => {
    if (page < 5) {
        setPage(page + 1);
    }
}
  // == end: HELPER FUNCTIONS FOR handlePressOut ==

  const handlePressOut = (choice) => { 
    isCorrect(choice);

    const newTimeoutId = setTimeout(() => {
      getNextQuestion();
    }, 500);
    setTimeout(newTimeoutId);
    incrementPage();
  };

  if (!question) {  
    return <Text>Loading...</Text>;
  }

  return (
    <StyledView className="flex-1 flex-col justify-center bg-light-purple">
      <Header 
        onTimeOut={handleTimeOut}
        onPressOut={() => handlePressOut(choice)}
        score={score} 
        navigation={navigation}
        page={page}
        />

      <StyledView className="flex-1 items-center justify-between bg-light-purple m-10 p-10 rounded-lg">
        <QuestionDisplay currentQuestion={quiz[currentQuestion].question} /> 

        <StyledView className="w-full flex pb-10"> 
            {choices.map((choice, i) => {
              return <ChoiceDisplay
                key= {i} // Used by React under the hood.
                choice={choice}
                onPressIn={() => handlePressIn(choice)}
                onPressOut={() => handlePressOut(choice)}
                choiceState={choiceStates[i]}
              />
              }
            )}
        </StyledView>

        </StyledView>
      {/* <Footer /> */}
    </StyledView>
  );
};
