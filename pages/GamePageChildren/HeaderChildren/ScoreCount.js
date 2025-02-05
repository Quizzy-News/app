import React, {useEffect, useState} from "react";
import { Text } from "react-native";



export default function ScoreCount({ score }) {
    
    
    

    const formattedScore = score.toString().padStart(3 ,'0')
    return (

        <Text className={`leading-6 font-lexend-bold text-xl text-white m-3 p-1 `}>{formattedScore}</Text>

    )
}