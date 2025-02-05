import React from "react";

import { Text } from "react-native";



// QuestionDisplay is a container for the question text.

export default function QuestionDisplay ({currentQuestion}) {
    return (
        <Text className="text-grey-4 font-lexend-bold text-[22px] leading-6">
            {currentQuestion}
        </Text>
    );

};