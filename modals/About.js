import { Pressable, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors, Buttons, Typography } from "../styles"
//import { AntDesign } from '@expo/vector-icons';

export default function AboutModal({ navigation }) {
    const AntDesign = require('@expo/vector-icons/AntDesign').default;

    return (
        <View style={styles.screen}>
            <View style={styles.x}>
                <AntDesign
                    onPress={() => navigation.goBack()}
                    name="close" size={24} color="#3D3D3D" />
            </View>
            <Text style={styles.text}>
                Quizzy.news gives you a quick quiz on the latest top headlines, everyday!
                {"\n"}
                {"\n"}
                You have 60 seconds to answer 5 questions. Be quick and accurate for the highest score.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        ...Colors.backgroundColors.lightPurple,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    x: {
        position: "absolute",
        top: 100,
        right: 20,
    },
    text: {
        ...Colors.fontColors.gray4,
        ...Typography.body1,
        padding: 10,
    }
});
