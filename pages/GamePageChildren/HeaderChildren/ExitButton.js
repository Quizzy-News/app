import React, { useState } from "react";
import { styled } from 'nativewind';
import { View, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledPressable = styled(Pressable);

export default function ExitButton({ navigation }) {
  const [exitButton, setExitButton] = useState(false);
  
  const exitButtonActive  = () => {
    setExitButton(true);
  }
  const exitButtonInactive = () => {
      setExitButton(false);
      navigation.navigate("ClickBackMidGame");
  }
  
    return (
      <StyledView className="pr-10">
        <StyledPressable
            onPressIn={exitButtonActive}
            onPressOut={exitButtonInactive}
            className= { 
              exitButton ? "bg-light-blue rounded-lg top-2" : " bg-light-blue rounded-lg shadow-exitButtonShadow"
            }
        >
            <MaterialCommunityIcons name="exit-to-app" size="4em" color="white" />
        </StyledPressable>
      </StyledView>
    )
}



