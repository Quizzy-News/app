import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Buttons, Colors, Containers, Typography } from "../styles"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import sampleQuiz from "../sampleQuiz.json";
import ChoiceDisplay from './GamePageChildren/ChoiceDisplay';
// import QuestionDisplay from './GamePageChildren/QuestionDisplay';
import Timer from './GamePageChildren/Timer.js';

// GamePage is the container for questions and answer buttons. Handles game and points

export default function GamePage ( { navigation }) {

  const [countdown, setCountdown] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(0); // int represents index 
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [question, setQuestion] = useState(sampleQuiz); // sampleQuiz is an array of objects
  const [score, setScore] = useState(0);
  const [choices, setChoices] = useState([]); // TODO: How do I map a single element to each Pressable component without hardcoding the indices?
  const [userRecord, setUserRecord] = useState([]);  // TODO: Change the data structure to object? {0: "correct", 1: "incorrect", etc.}
  const [inProgress, setInProgress] = useState(true);

  const [choiceStates, setChoiceStates] = useState(["Idle", "Idle", "Idle"]); // Each element in choiceStates corresponds to a choice button.


  const [exitButtonActive, setExitButtonActive] = useState(false);
  
  useEffect(() => {
    // Assuming sampleQuiz[currentQuestion] is not undefined
    const newQuestion = sampleQuiz[currentQuestion]; // This is an object {"question": "...", "choices": ["...", "...", "..."], "answer": "..."}
    const newChoices = newQuestion.choices; // This is an array
  
    // Only update if there's a change
    if (question !== newQuestion) {
      setQuestion(newQuestion);
    }
  
    if (choices.join('') !== newChoices.join('')) {
      setChoices(newChoices);
    }
  }, []);

  useEffect(() => {
    setQuestion(sampleQuiz[currentQuestion]);
    setChoices([...sampleQuiz[currentQuestion].choices]);


  }, []);

  // == start: REDIRECT TO SCOREPAGE ==
  const handleTimeOut = () => {
      setInProgress(false);
      navigation.navigate("ScorePage", {score: score, record: userRecord, time: 0})
  }

  // == end: REDIRECT TO SCOREPAGE ==

  const handlePressIn = (choice) => {
    let index = choices.indexOf(choice);

    setChoiceStates((previousStates) => { 
      return previousStates.map((previousState, i) => { i === index ? "Active" : "Disabled" }) 
    });
  
    };
    


  // == start: HELPER FUNCTIONS FOR handlePressOut ==

  const handleRecord = (record) => {
    setUserRecord([...userRecord, record]);

    // console.log(userRecord);
  }

  const isCorrect = (choice) => {
    if ( choice === question.answer ) {
      handleRecord("correct");
      setScore(score + 1);
    } else {
      handleRecord("incorrect");
    }
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
    setChoiceStates((previousStates) => {
      return previousStates.map(() =>  "Idle")
    });
  };

  // == end: HELPER FUNCTIONS FOR handlePressOut ==

  const handlePressOut = (choice) => {    
    isCorrect(choice);
    getNextQuestion();
  };


  if (!question) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.screen}>

      <View style={styles.header}>
        <View style={styles.exit}>
          <Pressable
            onPressIn={() => {
              setExitButtonActive(true);
            }}
            onPressOut={() => {
              setExitButtonActive(false);
              navigation.navigate("ClickBackMidGame");
            }}
            style={exitButtonActive ? styles.buttonActive : styles.button}
          >
            <MaterialCommunityIcons name="exit-to-app" size={36} color="white" />
          </Pressable>
        </View>
        <View style={styles.scoreHeader}>
          <Text style={styles.headerIndex}>1/5</Text> {/*TODO: Make this dynamic.*/}
          <Timer initialCountdown={60} onTimeOut={handleTimeOut}/>
          <Text style={styles.headerScore}>{score}</Text>
        </View>
      </View>

      <View style={styles.container1}>
        <Text style={styles.question}> {/* TODO: update this view with QuestionDisplay component */}
          {question.question}
        </Text>

        {/* Write unique id for json  */}
        <View style={styles.answerContainer}> {/* TODO: update this view with ChoiceDisplay component */}
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
    </View >
  );
};


const styles = StyleSheet.create({
  screen: {
    ...Containers.screenCenter
  },
  header: {
    height: "10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 20,
  },
  exit: {
    paddingRight: 10
  },
  button: {
    ...Colors.backgroundColors.lightBlue,
    ...Colors.shadowColors.darkBlue,
    ...Buttons.smallButton,
    top: -5,
  },
  buttonActive: {
    ...Colors.backgroundColors.lightBlue,
    ...Buttons.smallButtonActive,
  },
  answerContainer: {
    width: "100%",
    display: "flex",
    paddingBottom: 10,
    
  },
  answerIdle: {
    ...Buttons.answerButton,
    ...Colors.backgroundColors.white,
    shadowColor: "#00000015",
  },
  answerTextIdle: {
    ...Typography.body3,
    ...Colors.fontColors.gray4,
  },
  answerActive: {
    ...Buttons.answerButtonActive,
    ...Colors.backgroundColors.darkBlue,
  },
  answerTextActive: {
    ...Typography.body3,
    ...Colors.fontColors.white,
  },
  answerCorrect: {
    ...Buttons.answerButton,
    ...Colors.backgroundColors.darkGreen,
    ...Colors.shadowColors.darkerGreen,
  },
  answerTextCorrect: {
    ...Typography.body3,
    ...Colors.fontColors.lightGreen,
  },
  answerIncorrect: {
    ...Buttons.answerButton,
    ...Colors.backgroundColors.darkRed,
    ...Colors.shadowColors.darkerRed,
  },
  answerTextIncorrect: {
    ...Typography.body3,
    ...Colors.fontColors.lightRed,
  },
  answerDisabled: {
    ...Buttons.answerButton,
    ...Colors.backgroundColors.gray2,
    ...Colors.shadowColors.gray3,
  },
  answerTextDisabled: {
    ...Typography.body3,
    ...Colors.fontColors.gray4,
  },
  scoreHeader: {
    ...Colors.backgroundColors.gray2,
    height: 40,
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    padding: 10,
  },
  headerIndex: {
    ...Typography.subH2,
    color: "white",
  },
  // timer: {
  //   height: 60,
  //   width: 60,

  // },
  headerScore: {
    ...Typography.subH1,
    color: "white",
  },
  question: {
    ...Colors.fontColors.gray4,
    ...Typography.body2
  },
  footer: {
    marginTop: "auto",
  },
  divider: {
    ...Colors.backgroundColors.gray2,
    height: 1,
    marginBottom: 10
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