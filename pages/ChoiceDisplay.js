import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Buttons, Colors, Containers, Typography } from "../styles"
import GamePage from "./GamePage";

// ChoiceButton is the container for individual choice buttons.
// This component will be mapped in GamePage.

export default function ChoiceDisplay ({choice, onPressIn, onPressOut, choiceState}) {
    return (
        <Pressable 
            style={styles[`answer${choiceState}`]} // TODO: in GamePage, how do I ensure that choiceState corresponds to firstChoice, secondChoice, or thirdChoice?
            onPressIn={() => {onPressIn(choice, currentQuestion)}} // TODO: in GamePage, how do I ensure that choice corresponds to ^^
            onPressOut={() => {onPressOut(choice, currentQuestion)}}
            choiceState={getChoiceState(index)}
        >
            <Text style={styles[`answer${choiceState}`]}>
                {choice}
            </Text>
        </Pressable>
    );

};

const styles = StyleSheet.create({
    button: {
        ...Colors.backgroundColors.white,
        ...Colors.shadowColors.gray1,
        ...Buttons.button,
        top: -5,
      },
      buttonActive: {
        ...Colors.backgroundColors.lightBlue,
        ...Buttons.button,
      },
});

