import React from "react";
import { Text } from "react-native";




export default function PageCount({ page }) {

    return (
        <Text className="leading-6 font-lexend-bold text-xl text-white m-3 p-1"> 
            {page}/5
        </Text>
    )
};
