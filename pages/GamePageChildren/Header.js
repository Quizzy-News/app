import React from "react";

import { View } from "react-native";
import Timer from './HeaderChildren/Timer.js';
import ExitButton from './HeaderChildren/ExitButton.js'
import PageCount from './HeaderChildren/PageCount.js'
import ScoreCount from "./HeaderChildren/ScoreCount.js";
import ScoreAnimation from "./HeaderChildren/ScoreAnimation.js";



export default function Header({onTimeOut, score, navigation, onPressOut, page, countdown, setCountdown, inProgress, lastPoints}) {
    return (
            <View className="bg-medium-purple flex-1 flex-row items-center justify-between rounded-lg">
                <PageCount onPressOut={onPressOut} page={page}/>
                <Timer countdown={countdown} setCountdown = {setCountdown} onTimeOut={onTimeOut} inProgress={inProgress}/>
                <ScoreCount score={score}/>
                {lastPoints !== undefined && <ScoreAnimation points={lastPoints} />}
            </View>
        
    )
}