import React from "react";

import { Text, Pressable } from "react-native";



// ChoiceDisplay is the container for individual choice elements.
// This component will be mapped in GamePage.

export default function ChoiceDisplay ({choice, onPressIn, onPressOut, choiceState}) {
  let pressed = ((choiceState.includes("Pressed"))) ? true : false

  const getButtonStyle = () => {
    if (choiceState === "Disabled") {

       return "min-h-95px bg-white shadow-choiceDisplayButtonShadow m-[10px] p-[20px] flex row rounded-lg ";
    } else if (choiceState.includes("Correct")){
      return `min-h-95px bg-dark-green transition-all duration-100 ease-linear ${pressed ? ' translate-y-5' : 'shadow-correctChoiceDisplayButtonShadow'} m-[10px] p-[20px] flex row rounded-lg `;
    } else if (choiceState.includes("Incorrect")) {
      return `min-h-95px bg-dark-red transition-all duration-100 ease-linear   ${pressed ? 'translate-y-5' : 'shadow-incorrectChoiceDisplayButtonShadow'}  m-[10px] p-[20px] flex row rounded-lg `;
    } else {
      return "min-h-95px bg-white shadow-choiceDisplayButtonShadow m-[10px] p-[20px] flex row  rounded-lg ";
    }
  }

  const getTextStyle = () => {
    if (choiceState === "Disabled") {
      return "font-futura-medium text-xl text-grey-1 ";
    } else if (choiceState.includes("Correct")) {
      return "font-futura-medium text-xl text-white ";
    } else if (choiceState.includes("Incorrect")) {
      return "font-futura-medium text-xl text-light-red ";
    } else {
      return "font-futura-medium text-xl text-grey-4 ";
    }
  }

  
  
  return (
      <Pressable 
          className={getButtonStyle()}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
      >
          <Text className={`${getTextStyle()} + leading-6 text-left inline-block`}>
              {choice} <Text className="justify-self-end">{`${pressed ? choiceState.includes('Correct') ? '✔' : '✘' : ''}`}</Text>
          </Text>
          
      </Pressable>
  );
};