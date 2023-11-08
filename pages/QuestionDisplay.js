import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Buttons, Colors, Containers, Typography } from "../styles"
import GamePage from "./GamePage";

export default function QuestionDisplay ({onPressIn, onPressOut, question}) {
    return (

        <Text style={styles[question]}>
            {question}
        </Text>

    );

};

const styles = StyleSheet.create({
    question: {
        ...Colors.fontColors.gray4,
        ...Typography.body2
      }
});
