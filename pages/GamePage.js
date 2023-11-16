import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors, Containers, Typography } from "../styles"
import sampleQuiz from "../sampleQuiz.json";
import ChoiceDisplay from './GamePageChildren/ChoiceDisplay';
import Header from './GamePageChildren/Header.js'
import QuestionDisplay from "./GamePageChildren/QuestionDisplay.js";

// GamePage is the container for questions and answer buttons. Handles game and points

export default function GamePage ( { navigation }) {

  const [countdown, setCountdown] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(0); // int represents index 
  const [question, setQuestion] = useState(sampleQuiz); // sampleQuiz is an array of objects
  const [score, setScore] = useState(0);
  const [choices, setChoices] = useState([]); 
  const [userRecord, setUserRecord] = useState([]);  // TODO: Change the data structure to object? {0: "correct", 1: "incorrect", etc.}
  const [inProgress, setInProgress] = useState(true);
  const [choiceStates, setChoiceStates] = useState(["Idle", "Idle", "Idle"]); // Each element in choiceStates corresponds to a choice button.
  const [exitButtonActive, setExitButtonActive] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  
  useEffect(() => {
    setQuestion(sampleQuiz[currentQuestion]);
    setChoices([...sampleQuiz[currentQuestion].choices]);
  }, [currentQuestion]);

  // See isCorrect and handlePressOut; this is for determining if item is correct or incorrect
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  },[timeoutId])

  // == start: REDIRECT TO SCOREPAGE ==
  const handleTimeOut = () => {
      setInProgress(false);
      navigation.navigate("ScorePage", {score: score, record: userRecord, time: 0})
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
    handleScore(newChoiceState === "Correct" ? score + 1 : score);


    setChoiceStates((previousChoiceStates) => { 
      return previousChoiceStates.map((previousChoiceStates, i) => i === index ? newChoiceState : "Disabled" ); 
    });

  };

  const getNextQuestion = () => {  
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < sampleQuiz.length) {
      setCurrentQuestion(nextQuestion);
      resetChoices();
    } else { 
      navigation.navigate("ScorePage", {score: score, record: userRecord, time: countdown});
    }; 
  }

  const resetChoices = () => {
    setChoices([...sampleQuiz[currentQuestion].choices]);
    setChoiceStates((previousStates) => {
      return previousStates.map(() =>  "Idle")
    });
  };

  // == end: HELPER FUNCTIONS FOR handlePressOut ==



  const handlePressOut = (choice) => { // Need to introduce a delay so that user can see if answer is correct/incorrect before getNextQuestion 
    isCorrect(choice);

    const newTimeoutId = setTimeout(() => {
      getNextQuestion();
    }, 500);
    setTimeout(newTimeoutId);
  };

  if (!question) {  
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.screen}>


      <Header 
        initialCountdown={60} 
        onTimeOut={handleTimeOut} 
          
        />

      <View style={styles.container1}>
         <QuestionDisplay 
            currentQuestion={sampleQuiz[currentQuestion].question} // TODO: Make sampleQuiz dynamic
          />

        {/* Write unique id for json  */}
        <View style={styles.answerContainer}> 
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
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.divider} />
        <Text style={styles.footText1}>QUIZZY.NEWS</Text>
        <Text style={styles.footText2}>
          Ⓒ 2022 EMISQWE
        </Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    ...Containers.screenCenter
  },
  answerContainer: {
    width: "100%",
    display: "flex",
    paddingBottom: 10,
    
  },

  footer: {
    marginTop: "auto",
  },

  footText1: {
    ...Typography.subH1,
    ...Colors.fontColors.gray2,
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 5,
  },
  footText2: {
    ...Typography.subH2,
    ...Colors.fontColors.gray2,
    fontSize: 12,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  container1: {
    ...Colors.backgroundColors.lightPurple,
    ...Containers.contentContainerBetween
  },
});