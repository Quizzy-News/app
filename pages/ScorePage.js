import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
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

    const formattedScore = (score != 0) ? score.toString().padStart(3, '0'): score.toString();

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
                if (item.answer.length > 30) {
                    item.answer = item.answer.slice(0, 25) + "...";
                }
            return {
                id: index + 1,
                answer: item.answer,
                link: item.source.url
            }
            }
        )
    ]
    
    return (
        <View className="h-screen p-5 flex justify-center items-center bg-white ">
            
            <View className="pt-10 flex justify-center relative">
                {console.log(score)}
                <Svg width="146" className="absolute z-1 left-[-35%]" height="146" viewBox="0 0 132 132" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <Path d="M53.1155 6.18913C60.178 -1.04364 71.8103 -1.04365 78.8728 6.18912L81.8401 9.22805C85.2793 12.7501 90.0108 14.71 94.9332 14.6514L99.1803 14.6008C109.289 14.4804 117.514 22.7056 117.393 32.8139L117.343 37.061C117.284 41.9833 119.244 46.7149 122.766 50.154L125.805 53.1214C133.038 60.1839 133.038 71.8161 125.805 78.8786L122.766 81.846C119.244 85.2851 117.284 90.0167 117.343 94.939L117.393 99.1861C117.514 109.294 109.289 117.52 99.1803 117.399L94.9332 117.349C90.0108 117.29 85.2793 119.25 81.8401 122.772L78.8728 125.811C71.8103 133.044 60.178 133.044 53.1155 125.811L50.1481 122.772C46.709 119.25 41.9774 117.29 37.0551 117.349L32.808 117.399C22.6997 117.52 14.4745 109.294 14.5949 99.1861L14.6455 94.939C14.7041 90.0167 12.7443 85.2851 9.22219 81.846L6.18327 78.8786C-1.0495 71.8161 -1.04951 60.1839 6.18326 53.1214L9.22219 50.154C12.7442 46.7149 14.7041 41.9833 14.6455 37.061L14.5949 32.8139C14.4745 22.7056 22.6997 14.4804 32.808 14.6008L37.0551 14.6514C41.9774 14.71 46.709 12.7501 50.1481 9.22805L53.1155 6.18913Z" fill="#B67DD0"/>
                </Svg>
                <View className="relative z-10 inset-0 flex items-center justify-center">
                <Text className="text-5xl font-lexend font-bold m-auto text-white z-10">{formattedScore}</Text>
                <Text className="text-small font-lexend text-white z-10">Total Score</Text>
                </View>
            </View>
            <View className="w-full pt-12 flex items-center width-full items-center">
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