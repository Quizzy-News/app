import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Buttons, Colors, Containers, Typography } from "../styles"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ClickBackMidGame from '../modals/ClickBackMidGame';

import data from "../data.json";

export default function GamePage({ navigation }) {

  const [countdown, setCountdown] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [question, setQuestion] = useState(data);
  const [score, setScore] = useState(0);
  const [choices, setChoices] = useState([]);
  const [userRecord, setUserRecord] = useState([]);
  const [inProgress, setInProgress] = useState(true);

  const [button1State, setButton1State] = useState("Idle");
  const [button2State, setButton2State] = useState("Idle");
  const [button3State, setButton3State] = useState("Idle");

  const [exitButtonActive, setExitButtonActive] = useState(false);

  const timerFramesImport = require.context('../assets/timer-frames', true);
  const timerFrames = timerFramesImport.keys().map(image => timerFramesImport(image));



  useEffect(() => {
    setQuestion(data[currentQuestion]);
    setChoices([...data[currentQuestion].choices]);


    if (countdown === 0) {
      setInProgress(false);
    }

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
    
    switch (index) {
      case 0:
        setButton1State("Active");
        setButton2State("Disabled");
        setButton3State("Disabled");
        break;
      case 1:
        setButton1State("Disabled");
        setButton2State("Active");
        setButton3State("Disabled");
        break;
      case 2:
        setButton1State("Disabled");
        setButton2State("Disabled");
        setButton3State("Active");
        break;
      default:
        break;
    };

  };

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

    if (currentQuestion + 1 < data.length) {
      setCurrentQuestion(currentQuestion + 1);
      setButton1State("Idle");
      setButton2State("Idle");
      setButton3State("Idle");
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
        <Text style={styles.question}>
          {question.question}
        </Text>
        {/* Write unique id for json  */}
        <View style={styles.answerContainer}>
          <Pressable
            style={styles[`answer${button1State}`]}
            onPressIn={() => handlePressIn(choices[0], currentQuestion)}
            onPressOut={() => handlePressOut(choices[0], currentQuestion)}
          >
            <Text style={styles[`answerText${button1State}`]}>
              {choices[0]}
            </Text>
          </Pressable>
          <Pressable
            style={styles[`answer${button2State}`]}
            onPressIn={() => handlePressIn(choices[1], currentQuestion)}
            onPressOut={() => handlePressOut(choices[1], currentQuestion)}
          >
            <Text style={styles[`answerText${button2State}`]}>
              {choices[1]}
            </Text>
          </Pressable>
          <Pressable
            style={styles[`answer${button3State}`]}
            onPressIn={() => handlePressIn(choices[2], currentQuestion)}
            onPressOut={() => handlePressOut(choices[2], currentQuestion)}
          >
            <Text style={styles[`answerText${button3State}`]}>
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