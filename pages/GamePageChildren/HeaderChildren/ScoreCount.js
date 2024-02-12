import React from "react";
import { Text, StyleSheet } from "react-native";
import { Typography } from "../../../styles";

export default function ScoreCount({ score }) {
    return (
        <Text style={styles.headerScore}>{score}</Text>
    )
}

const styles = StyleSheet.create({
    headerScore: {
        ...Typography.subH1,
        color: "white",
      },
});
