import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Buttons, Colors, Containers, Typography } from "../../styles"


// ChoiceDisplay is the container for individual choice elements.
// This component will be mapped in GamePage.

export default function ChoiceDisplay ({choice, onPressIn, onPressOut, choiceState}) {
    const buttonStyle = choiceState === "Active" ? styles.buttonActive : styles.button;
    const textStyle = choiceState === "Active" ? styles.answerTextActive : styles.answerTextIdle;
    
    return (
        <Pressable 
            style={buttonStyle}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
            <Text style={textStyle}>
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
        margin: 10,
        padding: 20,
      },
      buttonActive: {
        ...Colors.backgroundColors.lightBlue,
        ...Buttons.button,
      },

      answerIdle: {
        ...Buttons.answerButton,
        ...Colors.backgroundColors.white,
        shadowColor: "#00000015",
      },
      answerTextIdle: {
        ...Typography.body3,
        ...Colors.fontColors.gray4,
      },
      answerActive: {
        ...Buttons.answerButtonActive,
        ...Colors.backgroundColors.darkBlue,
      },
      answerTextActive: {
        ...Typography.body3,
        ...Colors.fontColors.white,
      },
      answerCorrect: {
        ...Buttons.answerButton,
        ...Colors.backgroundColors.darkGreen,
        ...Colors.shadowColors.darkerGreen,
      },
      answerTextCorrect: {
        ...Typography.body3,
        ...Colors.fontColors.lightGreen,
      },
      answerIncorrect: {
        ...Buttons.answerButton,
        ...Colors.backgroundColors.darkRed,
        ...Colors.shadowColors.darkerRed,
      },
      answerTextIncorrect: {
        ...Typography.body3,
        ...Colors.fontColors.lightRed,
      },
      answerDisabled: {
        ...Buttons.answerButton,
        ...Colors.backgroundColors.gray2,
        ...Colors.shadowColors.gray3,
      },
      answerTextDisabled: {
        ...Typography.body3,
        ...Colors.fontColors.gray4,
      },

});

