import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Buttons, Colors, Containers, Typography } from "../../styles"
import { button } from "../../styles/buttons";


// ChoiceDisplay is the container for individual choice elements.
// This component will be mapped in GamePage.

export default function ChoiceDisplay ({choice, onPressIn, onPressOut, choiceState}) {
  const getButtonStyle = () => {
    if (choiceState === "Active") {
      return styles.buttonActive;
    } else if (choiceState === "Disabled") {
       return styles.buttonDisabled;
    } else if (choiceState === "Correct") {
      return styles.answerCorrect;
    } else if (choiceState === "Incorrect") {
      return styles.answerIncorrect;
    } else {
      return styles.button;
    }
  }

    const getTextStyle = () => {
      if (choiceState === "Active") {
        return styles.answerTextActive;
      } else if (choiceState === "Disabled") {
        return styles.answerTextDisabled
      } else if (choiceState === "Correct") {
        return styles.answerTextCorrect;
      } else if (choiceState === "Incorrect") {
        return styles.answerTextIncorrect;
      } else {
        return styles.answerTextIdle;
      }


    }
 
    return (
        <Pressable 
            style={getButtonStyle()}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
       
        >
            <Text style={getTextStyle()}>
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
        margin: 10,
        padding: 20,
      },
      buttonDisabled: {
        ...Colors.backgroundColors.gray2,
        ...Colors.shadowColors.gray3,
        ...Buttons.button,
        margin: 10,
        padding: 20,
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

