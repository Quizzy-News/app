import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Buttons, Colors, Typography } from "../../styles"


export default function Footer() {
    return (
        <View style={styles.footer}>
            <View style={styles.divider} />
            <Text style={styles.footText1}>QUIZZY.NEWS</Text>
            <Text style={styles.footText2}>Ⓒ 2022 EMISQWE</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    divider: {
        ...Colors.backgroundColors.gray2,
        height: 1,
        marginBottom: 10
      },
    footer: {
        marginTop: "auto",
    },
    footText1: {
        ...Typography.subH1,
        ...Colors.fontColors.gray2,
        fontSize: 16,
        paddingLeft: 10,
        paddingTop: 5,
    },
    footText2: {
        ...Typography.subH2,
        ...Colors.fontColors.gray2,
        fontSize: 12,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
});