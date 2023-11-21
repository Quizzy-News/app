import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Buttons, Colors, Typography } from "../../../styles"
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ExitButton({exitButtonActive, onPressIn, onPressOut}) {
    return (<View style={styles.exit}>
        <Pressable
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={exitButtonActive ? styles.buttonActive : styles.button}
        >
            <MaterialCommunityIcons name="exit-to-app" size={36} color="white" />
        </Pressable>
    </View>)
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