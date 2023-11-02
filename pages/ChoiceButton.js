import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Buttons, Colors, Containers, Typography } from "../styles"

// ChoiceButton is the container for individual choice buttons.
// This component will be mapped in GamePage.

const AnswerButton = ({choice, onPressIn, onPressOut, buttonState}) => {
    return (
        <Pressable 
            style={styles[`answer${buttonState}`]}
            onPressIn={() => {onPressIn(choice)}}
            onPressOut={() => {onPressOut(choice)}}
        >
            <Text style={styles[`answer${buttonState}`]}>
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

export default ChoiceButton;