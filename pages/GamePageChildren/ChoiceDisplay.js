import React from "react";
import { styled } from "nativewind";
import { Text, Pressable } from "react-native";

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
      return "font-futura-medium text-xl text-white leading-6";
    } else if (choiceState === "Disabled") {
      return "font-futura-medium text-xl text-grey-3 leading-6";
    } else if (choiceState === "Correct") {
      return "font-futura-medium text-xl text-light-green leading-6";
    } else if (choiceState === "Incorrect") {
      return "font-futura-medium text-xl text-light-red leading-6";
    } else {
      return "font-futura-medium text-xl text-grey-4 leading-6";
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