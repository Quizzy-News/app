import React from "react";
import { Text, StyleSheet } from "react-native";
import { Typography } from "../../../styles";

export default function PageCount({}) {
    return (
        <Text style={styles.headerIndex} >
            {

            }
        </Text>
    )
}

const styles = StyleSheet.create({
    headerIndex: {
        ...Typography.subH2,
        color: "white",
      },
 
});