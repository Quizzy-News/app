import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Colors, Typography } from "../../styles"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Timer from './Timer.js';

export default function Header({initialCountdown, onTimeOut}) {
    return (
        <View style={styles.header}>
            <View style={styles.exit}>
                <Pressable
                    onPressIn={() => {
                        setExitButtonActive(true);
                    }}
                    onPressOut={() => {
                        setExitButtonActive(false);
                        navigation.navigate("ClickBackMidGame");
                    }}
                    style={exitButtonActive ? styles.buttonActive : styles.button}
                    >
                    <MaterialCommunityIcons name="exit-to-app" size={36} color="white" />
                </Pressable>
            </View>
            <View style={styles.scoreHeader}>
                <Text style={styles.headerIndex}>1/5</Text> {/*TODO: Make this dynamic.*/}
                <Timer initialCountdown={initialCountdown} onTimeOut={onTimeOut}/>
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
      headerIndex: {
        ...Typography.subH2,
        color: "white",
      },
      headerScore: {
        ...Typography.subH1,
        color: "white",
      },
      exit: {
        paddingRight: 10
      },
      button: {
        ...Colors.backgroundColors.lightBlue,
        ...Colors.shadowColors.darkBlue,
        ...Buttons.smallButton,
        top: -5,
      },
      buttonActive: {
        ...Colors.backgroundColors.lightBlue,
        ...Buttons.smallButtonActive,
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