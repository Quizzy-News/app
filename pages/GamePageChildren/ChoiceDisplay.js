import React from "react";
import { styled } from "nativewind";
import { Text, StyleSheet, Pressable } from "react-native";
import { Buttons, Colors, Containers, Typography } from "../../styles"

const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

// ChoiceDisplay is the container for individual choice elements.
// This component will be mapped in GamePage.

export default function ChoiceDisplay ({choice, onPressIn, onPressOut, choiceState}) {
  const getButtonStyle = () => {
    if (choiceState === "Active") {
      return "bg-light-blue m-[10px] p-[20px] flex items-center justify-center rounded-lg";
    } else if (choiceState === "Disabled") {
       return "bg-grey-2 shadow-choiceDisplayButtonShadow m-[10px] p-[20px] flex items-center justify-center rounded-lg";
    } else if (choiceState === "Correct") {
      return "bg-dark-green shadow-correctChoiceDisplayButtonShadow m-[10px] p-[20px] flex items-center justify-center rounded-lg";
    } else if (choiceState === "Incorrect") {
      return "bg-dark-red shadow-incorrectChoiceDisplayButtonShadow  m-[10px] p-[20px] flex items-center justify-center rounded-lg";
    } else {
      return "bg-white shadow-choiceDisplayButtonShadow -top-5 m-[10px] p-[20px] flex items-center justify-center rounded-lg";
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
      <StyledPressable 
          className={getButtonStyle()}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
      >
          <StyledText className={getTextStyle()}>
              {choice}
          </StyledText>
      </StyledPressable>
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

