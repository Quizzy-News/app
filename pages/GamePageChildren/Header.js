import React from "react";
import { styled } from 'nativewind';
import { View } from "react-native";
import Timer from './HeaderChildren/Timer.js';
import ExitButton from './HeaderChildren/ExitButton.js'
import PageCount from './HeaderChildren/PageCount.js'
import ScoreCount from "./HeaderChildren/ScoreCount.js";

const StyledView = styled(View);

export default function Header({onTimeOut, score, navigation, onPressOut, page}) {
    return (
        <StyledView className="flex-row items-end justify-between p-10 mt-20 h-10pct">
            {/* <ExitButton navigation={navigation} /> */}
        
            <StyledView className="bg-grey-2 flex-1 flex-row items-center justify-between rounded-lg">
                <PageCount onPressOut={onPressOut} page={page}/>
                <Timer initialCountdown={60} onTimeOut={onTimeOut}/>
                <ScoreCount score={score}/>
            </StyledView>
        </StyledView>
    )
}