import React from "react";
import { Text, StyleSheet } from "react-native";
import { Colors, Typography } from "../../styles"


// QuestionDisplay is a container for the question text.

export default function QuestionDisplay ({currentQuestion}) {
    return (
        <Text style={styles.question}>
            {currentQuestion}
        </Text>
    );

};

const styles = StyleSheet.create({
    question: {
        ...Colors.fontColors.gray4,
        ...Typography.body2
    }
});
