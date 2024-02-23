import React from "react";
import { Text } from "react-native";
import { styled } from 'nativewind';

const StyledText = styled(Text);

export default function PageCount({ page }) {

    return (
        <StyledText className="font-lexend text-sm text-white m-2 p-1" >
            {page}/5
        </StyledText>
    )
}
