import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
// import { useFonts } from 'expo-font';
// import * as Sharing from 'expo-sharing';

//import { Feather, AntDesign, Ionicons } from '@expo/vector-icons';
//import { Feather, AntDesign } from '@expo/vector-icons';
import { getDailyQuiz } from '../firebase/firebaseConfig';
// import { scoreAnalysis } from '../utilities/scoreAnalysis'

export default function ScorePage({ route, navigation }) {

    const Ionicons = require('@expo/vector-icons/Ionicons').default;
    const Feather = require('@expo/vector-icons/Feather').default;
    const AntDesign = require('@expo/vector-icons/AntDesign').default;
    // const [finalScore, setFinalScore] = useState(score)
    const [score, setScore] = useState(route.params.score);
    const [record, setRecord] = useState(route.params.record);
    const [time, setTime] = useState(route.params.time);
    const [quiz, setQuiz] = useState(route.params.quiz);

    

    useEffect(() => {
        setQuiz(route.params.quiz);
        setScore(route.params.score);
        setRecord(route.params.record);
        setTime(route.params.time);

        console.log(score);
        // console.log(record);
        console.log(time);
        console.log(record);
        console.log(quiz);
    }, [route.params.score,  route.params.time, route.params.record, route.params.quiz])

    const formattedScore = score.toString().padStart(3, '0');

    const scoreComment = (score) => {
        if (score >= 250) {
            return "Perfect"
        } else if (score >= 200) {
            return "Magnificent"
        } else if (score >= 150) {
            return "Impressive"
        } else if (score >= 100) {
            return "Splendid"
        } else if (score >= 50) {
            return "Great"
        }
          else {
            return "Phew"
          }
        }


    const results = [
        ...quiz.map(
            (item, index) => {
            return {
                id: index + 1,
                answer: item.answer,
                link: item.source.url
            }
            }
        )
    ]
    
    return (
        <View className="h-screen p-5 flex items-center bg-white">
            <Text className="pt-5 self-start font-lexend font-bold text-[#909090] uppercase">
                QUIZZY.NEWS
            </Text>
            <Text className="pt-5 text-xl font-lexend font-bold uppercase">
                {`${scoreComment(score)}`}
            </Text>
            <View className="pt-5 flex items-center">
                {console.log(score)}
                <Text className="text-4xl font-lexend font-bold">{formattedScore}</Text>
                <Text>Total Score</Text>
            </View>
            <View className="w-full pt-12 flex items-center ">
                <Text className="text-xl font-lexend font-bold">Question Review</Text>
                <Text className="pb-3 text-sm font-lexend">Click on the answers to read more about each story.</Text>
                {results.map((result,idx) => {
                    return (
                        <Pressable className="w-full h-9 mb-[10px] flex flex-row justify-between items-center" 
                            onPress={()=> window.open(result.link)}
                        key={result.id}>
                            <View className="h-full bg-[#E3E3E3] w-[103%] rounded-md absolute top-2 right-[-5]" />
                            <View className={`${record[idx] === 'correct' ?
                                "h-full bg-[#6BA530] w-full rounded-md absolute top-1" :
                                "h-full bg-darker-red w-full rounded-md absolute top-1"}`} />
                            {/* <View className="h-full bg-[#6BA530] w-full rounded-md absolute top-1" /> */}
                            <View className={`${record[idx] === 'correct' ?
                             "h-full bg-[#78C93C] w-full rounded-md absolute" :
                             "h-full bg-dark-red w-full rounded-md absolute"}`} />
                            {/* <View className="h-full bg-[#78C93C] w-full rounded-md absolute" /> */}
                            <Text className="pl-2 text-sm font-lexend font-bold text-white">{result.id}</Text>
                            <Text className="text-lg font-lexend font-bold text-white underline grow-3 text-left">{result.answer}</Text>
                            <View className="pr-2">
                                <Ionicons name="exit-outline" size={24} color="white" />
                            </View>
                        </Pressable>
                    )
                })}
                <Text className="pt-2 text-lg font-lexend">
                    Next news quiz in <Text className="font-bold">12:19:00</Text>
                </Text>
            </View>
            <View
                className="w-full mt-auto flex flex-row justify-between"
            >
                <Pressable className="flex flex-col items-center" onPress={() => navigation.navigate('AboutModal')}>
                    <View className="w-16 h-9 flex flex-col items-center justify-center">
                        <View className="h-full bg-[#646464] w-full rounded-md absolute top-1" />
                        <View className="h-full bg-[#909090] w-full rounded-md absolute" />
                        <AntDesign name="exclamationcircleo" size={26} color="white" />
                    </View>
                    <Text className="pt-1 text-lg font-lexend font-bold text-[#909090] uppercase">About</Text>
                </Pressable>
                <Pressable className="flex flex-col items-center">
                    <View className="w-16 h-9 flex flex-col items-center justify-center">
                        <View className="h-full bg-[#53ADF0] w-full rounded-md absolute top-1" />
                        <View className="h-full bg-[#80C9FA] w-full rounded-md absolute" />
                        <Feather name="share-2" size={26} color="white" />
                    </View>
                    <Text className="pt-1 text-lg font-lexend font-bold text-[#80C9FA] uppercase">Share</Text>
                </Pressable>
            </View>
        </View>
    )
}