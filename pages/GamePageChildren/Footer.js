import React from "react";

import { View, Text } from "react-native";



export default function Footer() {
    return (

        <View className="mt-auto"
            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
            <View className="bg-grey-2 mb-[10px] h-[1px] "/>
            <Text className="font-lexend-bold text-grey-2 text-[12px] pl-[10px] pt-[5px] "
                onPress={() => navigation.navigate('AboutModal')}
                >QUIZZY.NEWS</Text>
            <Text className="font-lexend text-grey-2 pl-[10px] pt-[5px] pb-[5px] ">Ⓒ 2024 EMISQWE</Text>

        </View>
    )
}