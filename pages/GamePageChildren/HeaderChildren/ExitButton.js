import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Buttons, Colors, Typography } from "../../../styles";
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
      <View style={styles.exit}>
        <Pressable
            onPressIn={exitButtonActive}
            onPressOut={exitButtonInactive}
            style={exitButton ? styles.buttonActive : styles.button}
        >
            <MaterialCommunityIcons name="exit-to-app" size={36} color="white" />
        </Pressable>
      </View>
    )
}

const styles = StyleSheet.create({
    button: {
        ...Colors.backgroundColors.lightBlue,
        ...Colors.shadowColors.darkBlue,
        ...Buttons.smallButton,
        top: -5,
      },
      buttonActive: {
        ...Colors.backgroundColors.lightBlue,
        ...Buttons.smallButtonActive,
      },
      exit: {
        paddingRight: 10
      },
 
});



