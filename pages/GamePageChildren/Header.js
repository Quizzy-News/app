import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Buttons, Colors, Typography } from "../../styles"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Timer from './HeaderChildren/Timer.js';
import ExitButton from './HeaderChildren/ExitButton.js'
import PageCount from './HeaderChildren/PageCount.js'

export default function Header({onTimeOut, score, navigation, onPressOut, page}) {
    return (
        <View style={styles.header}>
            <ExitButton navigation={navigation} />
        
            <View style={styles.scoreHeader}>
                <PageCount onPressOut={onPressOut} page={page}/>
                <Timer initialCountdown={60} onTimeOut={onTimeOut}/>
                <Text style={styles.headerScore}>{score}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: "10%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: 10,
        marginTop: 20,
      },

      headerScore: {
        ...Typography.subH1,
        color: "white",
      },
      exit: {
        paddingRight: 10
      },

      divider: {
        ...Colors.backgroundColors.gray2,
        height: 1,
        marginBottom: 10
      },
      scoreHeader: {
        ...Colors.backgroundColors.gray2,
        height: 40,
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 5,
        padding: 10,
      },
});