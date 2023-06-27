import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as Sharing from 'expo-sharing';
import { Feather } from '@expo/vector-icons';

export default function ScorePage() {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.header}>
                <Text style={styles.headerTextPrimary}>QUIZZY.NEWS</Text>
            </View>
            <View>
                <Text>
                    Hmmmm... Try reading more news?
                </Text>
            </View>
            <View style={styles.score}>
                <Text style={styles.number}>130</Text>
                <Text style={styles.scoreText}>Total Score</Text>
            </View>
            <View style={styles.Review}>
                <Text style={styles.reviewHeader}>Question Review</Text>
                <Text style={styles.reviewHint}>Click on the answers to read the article.</Text>
            </View>
            <View>
                <Pressable style={styles.ShareButton} onPress={() => Sharing.shareAsync(something)} title="share">
                    <Feather name="share-2" size={24} color="black" />
                </Pressable>
                <Pressable style={styles.ShareButton} onPress={() => Sharing.shareAsync(something)} title="share">
                    <Feather name="share-2" size={24} color="black" />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: '#DED1E4',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        display: 'flex',
        alignItems: 'flex-start',
        // justifyContent: 'flex-start',
    },
    headerTextPrimary: {
        fontFamily: 'Lexend',
        fontSize: 12,
        color: '#909090',
    },
    ShareButton: {
        width: 50,
        marginTop: 10,
        backgroundColor: '#80C9FA',
        alignItems: 'center',
        borderRadius: 8,
        shadowColor: '#53ADF0',
        shadowOffset: { width: 12, height: 12 }
    },
})