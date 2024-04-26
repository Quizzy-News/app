import React from "react";
import { Text } from "react-native";
import { styled } from 'nativewind';

const StyledText = styled(Text);


export default function ScoreCount({ score }) {

    const formattedScore = score.toString().padStart(3 ,'0')
    return (

        <StyledText className="leading-6 font-lexend-bold text-xl text-white m-3 p-1">{formattedScore}</StyledText>

    )
}