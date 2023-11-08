import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Buttons, Colors, Containers, Typography } from "../styles"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import sampleQuiz from "../sampleQuiz.json";
import ChoiceDisplay from "./ChoiceDisplay";
import QuestionDisplay from "./QuestionDisplay";

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

  const [firstChoice, setFirstChoice] = useState("Idle");
  const [secondChoice, setSecondChoice] = useState("Idle");
  const [thirdChoice, setThirdChoice] = useState("Idle");

  const [exitButtonActive, setExitButtonActive] = useState(false);

  const timerFramesImport = require.context('../assets/timer-frames', true);
  const timerFrames = timerFramesImport.keys().map(image => timerFramesImport(image));


  // getChoiceState() reads the current state of choices and returns the appropriate state respectively.
  // const getChoiceState = ((index)=>{
  //   switch(index) {
  //     case 0:
  //       return firstChoice;
  //     case 1:
  //       return secondChoice;
  //     case 2:
  //       return thirdChoice;
  //     default:
  //       return "Idle";
  //   };
  // });
  
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
  }, [currentQuestion]);

  useEffect(() => {
    setQuestion(sampleQuiz[currentQuestion]);
    setChoices([...sampleQuiz[currentQuestion].choices]);


    if (countdown === 0) {
      setInProgress(false);
    }

    // TODO: Create Timer component
    const timeout = setTimeout(() => {
      // setCountdown(countdown - 1);
    }, 1000);

    // console.log(userRecord)
    // console.log(score)
    if (!inProgress) {
      clearTimeout(timeout);
      let remainder = countdown;
      navigation.navigate("ScorePage", { score: score, record: userRecord, time: remainder })
    };

    return () => clearTimeout(timeout);
  }, [countdown, navigation, currentQuestion, score, userRecord]);

  const handleRecord = (record) => {
    setUserRecord([...userRecord, record])
    // console.log(userRecord);
  }

  const handlePressIn = (choice, currentQuestion) => {
    let index = choices.indexOf(choice);
    
    switch (index) { // switch statements are to ensure that choices changes colors (blue for chosen, grey for not chosen), for styling only.
      case 0:
        setFirstChoice("Active");
        setSecondChoice("Disabled");
        setThirdChoice("Disabled");
        break;
      case 1:
        setFirstChoice("Disabled");
        setSecondChoice("Active");
        setThirdChoice("Disabled");
        break;
      case 2:
        setFirstChoice("Disabled");
        setSecondChoice("Disabled");
        setThirdChoice("Active");
        break;
      default:
        break;
    };

  };

  // TODO: Separate these into four helper functions. 
  const handlePressOut = (choice, currentQuestion) => {
    console.log('CHOICE:', choice)
    console.log('question #:', currentQuestion)
    console.log(question.answer);
    if (choice === question.answer) {
      handleRecord("correct");
      setScore(score + 1);
    } else {
      handleRecord("incorrect");
    }

    if (currentQuestion + 1 < sampleQuiz.length) {
      setCurrentQuestion(currentQuestion + 1);
      setFirstChoice("Idle");
      setSecondChoice("Idle");
      setThirdChoice("Idle");
    } else {
      // Note: Trigger navigation from useEffect hook to ensure State updates

      setInProgress(false);

    }
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
          <Text style={styles.headerIndex}>1/5</Text>
          <Image source={timerFrames[countdown]} style={styles.timer}/>
          <Text style={styles.headerScore}>{score}</Text>
        </View>
      </View>

      <View style={styles.container1}>
        <Text style={styles.question}> {/* TODO: update this view with QuestionDisplay component */}
          {question.question}
        </Text>

        {/* Write unique id for json  */}
        <View style={styles.answerContainer}> {/* TODO: update this view with ChoiceDisplay component */}
            {/* {choices.map((choice, index) => {
              <ChoiceDisplay
                key= {index} // Used by React under the hood.
                choice={choice}
                onPressIn={handlePressIn(choice, currentQuestion)}
                onPressOut={handlePressOut(choice, currentQuestion)}
                choiceState={getChoiceState(index)}
              />
            })} */}
          <Pressable
            style={styles[`answer${firstChoice}`]}
            onPressIn={() => handlePressIn(choices[0], currentQuestion)}
            onPressOut={() => handlePressOut(choices[0], currentQuestion)}
          >
            <Text style={styles[`answerText${firstChoice}`]}>
              {choices[0]}
            </Text>
          </Pressable>

          <Pressable
            style={styles[`answer${secondChoice}`]}
            onPressIn={() => handlePressIn(choices[1], currentQuestion)}
            onPressOut={() => handlePressOut(choices[1], currentQuestion)}
          >
            <Text style={styles[`answerText${secondChoice}`]}>
              {choices[1]}
            </Text>
          </Pressable>

          <Pressable
            style={styles[`answer${thirdChoice}`]}
            onPressIn={() => handlePressIn(choices[2], currentQuestion)}
            onPressOut={() => handlePressOut(choices[2], currentQuestion)}
          >
            <Text style={styles[`answerText${thirdChoice}`]}>
              {choices[2]}
            </Text>
          </Pressable>
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
  timer: {
    height: 60,
    width: 60,

  },
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