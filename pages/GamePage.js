import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Buttons, Colors, Containers, Typography } from "../styles"
import { Feather, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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

  const [button1State, setButton1State] = useState("Active");
  const [button2State, setButton2State] = useState("Idle");
  const [button3State, setButton3State] = useState("Idle");

  const [exitButtonActive, setExitButtonActive] = useState(false);


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

    if (currentQuestion === 0) {
      setButton1State("active");
      setButton2State("disabled");
      setButton3State("disabled");
    } else if (currentQuestion === 1) {
      setButton1State("disabled");
      setButton2State("active");
      setButton3State("disabled");
    } else if (currentQuestion === 2) {
      setButton1State("disabled");
      setButton2State("disabled");
      setButton3State("active");
    }

  };

  const handlePressOut = (choice, currentQuestion) => {
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
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.exit}>
          <Pressable
            onPressIn={() => {
              setExitButtonActive(true);
            }}
            onPressOut={() => {
              setExitButtonActive(false);
              // navigation.navigate("Home");
            }}
            style={exitButtonActive ? styles.buttonActive : styles.button}
          >
            <MaterialCommunityIcons name="exit-to-app" size={36} color="white" />
          </Pressable>
        </View>
        <View style={styles.scoreHeader}>
          <Text style={styles.headerIndex}>1/5</Text>
          <Text >{countdown}</Text>
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
            <Text style={styles.answerText}>
              {choices[0]}
            </Text>
          </Pressable>
          <Pressable
            style={styles.answerIdle}
            onPressIn={() => handlePressIn(choices[1], currentQuestion)}
            onPressOut={() => handlePressOut(choices[1], currentQuestion)}
          >
            <Text style={styles.answerText}>
              {choices[1]}
            </Text>
          </Pressable>
          <Pressable
            style={styles.answerIdle}
            onPressIn={() => handlePressIn(choices[2], currentQuestion)}
            onPressOut={() => handlePressOut(choices[2], currentQuestion)}
          >
            <Text style={styles.answerText}>
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
    backgroundColor: "white",
    shadowColor: "#00000015",
    width: "100%",
    height: 80,
    marginTop: 15,
  },
  answerActive: {
    ...Buttons.answerButton,
    width: "100%",
    height: 80,
    marginTop: 15,
  },
  answerText: {
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