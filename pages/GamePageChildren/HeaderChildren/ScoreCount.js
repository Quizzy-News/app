import React from "react";
import { Text } from "react-native";
import { styled } from 'nativewind';

const StyledText = styled(Text);

export default function ScoreCount({ score }) {
    return (
        <StyledText className="font-lexend-bold text-xl text-white m-3 p-1">{score}</StyledText>
    )
}

// const styles = StyleSheet.create({
//     headerScore: {
//         ...Typography.subH1,
//         color: "white",
//       },
// });
