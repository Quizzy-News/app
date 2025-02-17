import React from "react";
import { styled } from "nativewind";
import { Text } from "react-native";

const StyledText = styled(Text);

// QuestionDisplay is a container for the question text.

export default function QuestionDisplay ({currentQuestion}) {
    return (
        <StyledText className="text-grey-4 font-lexend text-[22px] leading-6">
            {currentQuestion}
        </StyledText>
    );

};