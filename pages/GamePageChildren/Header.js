import React from "react";
import { styled } from 'nativewind';
import { View, StyleSheet } from "react-native";
import { Colors } from "../../styles"
import Timer from './HeaderChildren/Timer.js';
import ExitButton from './HeaderChildren/ExitButton.js'
import PageCount from './HeaderChildren/PageCount.js'
import ScoreCount from "./HeaderChildren/ScoreCount.js";

const StyledView = styled(View);

export default function Header({onTimeOut, score, navigation, onPressOut, page}) {
    return (
        <StyledView className="flex-row items-end justify-between p-10 mt-20 h-10pct">
            <ExitButton navigation={navigation} />
        
            <View style={styles.scoreHeader}>
                <PageCount onPressOut={onPressOut} page={page}/>
                <Timer initialCountdown={60} onTimeOut={onTimeOut}/>
                <ScoreCount score={score}/>
            </View>
        </StyledView>
    )
}

const styles = StyleSheet.create({


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
});