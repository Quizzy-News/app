import React from "react";
import { styled } from "nativewind";
import { View, Text } from "react-native";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Footer() {
    return (
        <StyledView className="mt-auto">
            <StyledView className="bg-grey-2 mb-[10px] h-[1px]"/>
            <StyledText className="font-lexend-bold text-grey-2 text-[12px] pl-[10px] pt-[5px]">QUIZZY.NEWS</StyledText>
            <StyledText className="font-lexend text-grey-2 pl-[10px] pt-[5px] pb-[5px]">Ⓒ 2022 EMISQWE</StyledText>
        </StyledView>
    )
}