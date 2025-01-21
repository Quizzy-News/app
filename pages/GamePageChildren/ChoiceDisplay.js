import React from "react";
import { styled } from "nativewind";
import { Text, Pressable } from "react-native";

const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

// ChoiceDisplay is the container for individual choice elements.
// This component will be mapped in GamePage.

export default function ChoiceDisplay ({choice, onPressIn, onPressOut, choiceState}) {
  const getButtonStyle = () => {
    if (choiceState === "Disabled") {
       return "min-h-10pct bg-white shadow-choiceDisplayButtonShadow m-[10px] p-[20px] flex rounded-lg ";
    } else if (choiceState === "Correct") {
      return "min-h-10pct bg-dark-green shadow-correctChoiceDisplayButtonShadow m-[10px] p-[20px] flex  rounded-lg ";
    } else if (choiceState === "Incorrect") {
      return "min-h-10pct bg-dark-red shadow-incorrectChoiceDisplayButtonShadow  m-[10px] p-[20px] flex rounded-lg ";
    } else {
      return "min-h-10pct bg-white shadow-choiceDisplayButtonShadow m-[10px] p-[20px] flex  rounded-lg ";
    }
  }

  const getTextStyle = () => {
    if (choiceState === "Disabled") {
      return "font-futura-medium text-xl text-grey-1 leading-6 text-left";
    } else if (choiceState === "Correct") {
      return "font-futura-medium text-xl text-light-green leading-6 text-left";
    } else if (choiceState === "Incorrect") {
      return "font-futura-medium text-xl text-light-red leading-6 text-left";
    } else {
      return "font-futura-medium text-xl text-grey-4 leading-6 text-left";
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