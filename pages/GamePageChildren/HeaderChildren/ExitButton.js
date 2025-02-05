import React, { useState } from "react";

import { View, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';



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
      <View className="pr-10">
        <Pressable
            onPressIn={exitButtonActive}
            onPressOut={exitButtonInactive}
            className= { 
              exitButton ? "bg-light-blue rounded-lg top-2" : " bg-light-blue rounded-lg shadow-exitButtonShadow"
            }
        >
            <MaterialCommunityIcons name="exit-to-app" size="4em" color="white" />
        </Pressable>
      </View>
    )
}



