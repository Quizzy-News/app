import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { styled } from 'nativewind';
import sampleQuiz from "../sampleQuiz.json";
import ChoiceDisplay from './GamePageChildren/ChoiceDisplay';
import Header from './GamePageChildren/Header.js'
import QuestionDisplay from "./GamePageChildren/QuestionDisplay.js";
import Footer from "./GamePageChildren/Footer.js";

const StyledView = styled(View);

// Shown when the quiz being played is not today's, so users aren't misled
// into thinking archived questions are current news.
function formatQuizDate(dateString) {
  const [y, m, d] = String(dateString).split("-").map(Number);
  if (!y || !m || !d) return dateString;
  const months = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];
  return `${months[m - 1]} ${d}, ${y}`;
}

const archiveStyles = StyleSheet.create({
  badge: {
    fontFamily: "LexendRegular",
    fontSize: 11,
    color: "#5B5B5B",
    textAlign: "center",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});

export default function GamePage ( { navigation, route }) {

  const [countdown, setCountdown] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0); // int represents index 
  const [question, setQuestion] = useState(route.params.quiz); // sampleQuiz is an array of objects
  const [score, setScore] = useState(0);
  const [choices, setChoices] = useState([]); 
  const [userRecord, setUserRecord] = useState([]);  // TODO: Change the data structure to object? {0: "correct", 1: "incorrect", etc.}
  const [inProgress, setInProgress] = useState(true);
  const [choiceStates, setChoiceStates] = useState(["Idle", "Idle", "Idle"]); // Each element in choiceStates corresponds to a choice button.

  const [desaturated, setDesaturated] = useState(false);

  const [timeoutId, setTimeoutId] = useState(null);
  const [page, setPage] = useState(1);

  // const [quiz, setQuiz] = useState(route.params.quiz);
  const [questionStartTime, setQuestionStartTime] = useState(0);

  const [lastPoints, setLastPoints] = useState(undefined);

  // Defensive: only ever hold questions the game can actually render.
  // Previously this trusted route.params.quiz blindly, so the [0,0,0,0,0,0]
  // placeholder that useQuiz used to emit reached the spread below and threw
  // "undefined is not iterable".
  const quiz = useRef(
    (Array.isArray(route.params?.quiz) ? route.params.quiz : []).filter(
      (q) => q && typeof q === "object" && Array.isArray(q.choices) && q.question
    )
  );
  const record = useRef()
  const isArchive = route.params?.isArchive ?? false;
  const quizDate = route.params?.quizDate ?? null;

  const qRecord = {
    correctness: 0,
    timeElapsed: 0,
    id: question.id,
    index: page,
  }


  // Loading question
  useEffect(() => {
    const current = quiz.current[currentQuestion];
    if (!current) {
      // Ran off the end of a short or empty quiz — end the round cleanly
      // rather than crashing.
      setInProgress(false);
      return;
    }
    setQuestion(current);
    setChoices([...current.choices]);
    setQuestionStartTime(countdown)
    setLastPoints(undefined);
  }, [currentQuestion]);


 
  // See isCorrect and handlePressOut; this is for determining if item is correct or incorrect
  // useEffect(() => {
  //   return () => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //   }
  // },[timeoutId])


  // Ensure that state variables are sync'd before navigating away from the gamepage
  useEffect(() => {
    if(!inProgress){
      setDesaturated(true);
      // clear intervals
      let navWithDelay = setTimeout(()=> {
        navigation.navigate("ScorePage", {
          score, record: userRecord, time: countdown, quiz: quiz.current
        });
      }, 1000); 
      return () => {
        clearTimeout(navWithDelay);
      }

    }
  }, [inProgress, navigation, score, userRecord, countdown])

  // == start: REDIRECT TO SCOREPAGE ==
  const handleTimeOut = () => {
      setInProgress(false);
      // navigation.navigate("ScorePage", {score: score, record: userRecord, time: 0, quiz: quiz})
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
    // riddled with side-effects
    let index = choices.indexOf(choice);
    const correctness = choice === question.answer;
    return {correctness, index };
  }

  const getNextQuestion = () => {  
    const nextQuestion = currentQuestion + 1;
    const timeElapsed = countdown - questionStartTime ;
    // console.log('time elapsed: ', timeElapsed);

    if (nextQuestion < quiz.current.length) {
      incrementPage();
      setCurrentQuestion(nextQuestion);
      setQuestionStartTime(countdown);
      resetChoices();
    } else { 
      setInProgress(false);
    }; 
  }

  const resetChoices = () => {
    setChoices([...(quiz.current[currentQuestion]?.choices ?? [])]);
    setChoiceStates((previousStates) => {
      return previousStates.map(() =>  "Idle")
    });
  };

  const incrementPage = () => {
    if (page < 5 && inProgress) {
        setPage(page + 1);
    }
}
  // == end: HELPER FUNCTIONS FOR handlePressOut ==

  const handlePressOut = (choice) => { 
    
    const {correctness, index} = isCorrect(choice);
    const points = correctness ? 50 : 0;

    setLastPoints(points);
    const newChoiceState = correctness ? "Pressed Correct" : "Pressed Incorrect";

    handleRecord(correctness ? "correct" : "incorrect");
    


    setChoiceStates((previousChoiceStates) => { 
      return previousChoiceStates.map((previousChoiceStates, i) => i === index ? newChoiceState : "Disabled" ); 
    });


   setTimeout(() => {
    handleScore(correctness ? score + points : score);
    getNextQuestion();
    }, 750);
   
    //setTimeout(newTimeoutId);
    //incrementPage();
  };

  if (!question) {  
    return <Text>Loading...</Text>;
  }
  
  /* onPressOut={() => handlePressOut(choice)} was in header */
  return (

    
    <StyledView className={`h-screen flex-1 flex-col bg-light-purple ${desaturated ? 'grayscale' : ''} `}>
      <StyledView className="h-125">

      </StyledView>
      <StyledView className="flex-row items-end justify-between mx-125 pb-3 h-10pct ">

      <Header 
        onTimeOut={handleTimeOut}
        score={score} 
        navigation={navigation}
        page={page}
        countdown={countdown}
        setCountdown={setCountdown}
        inProgress = {inProgress}
        lastPoints={lastPoints}
        />
      </StyledView>

      <StyledView className={`flex-1 items-center justify-between bg-light-purple mx-37 rounded-lg `} >
        <StyledView className="h1/3 justify-center w-full px-2">
        {isArchive && !!quizDate && (
          <Text style={archiveStyles.badge}>
            {`Quiz from ${formatQuizDate(quizDate)}`}
          </Text>
        )}
        <QuestionDisplay currentQuestion={quiz.current[currentQuestion]?.question ?? ""} />
        </StyledView>

        <StyledView className="h-2/3 pb-10pct w-full justify-center px-125"> 

            {choices.map((choice, i) => {
              return <ChoiceDisplay
                key= {i} // Used by React under the hood.
                choice={choice}
                onPressIn={() => (inProgress) ? handlePressIn(choice) : ''}
                onPressOut={() => (inProgress) ? handlePressOut(choice) : ''}
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
