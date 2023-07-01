import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as Sharing from 'expo-sharing';
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons';

export default function ScorePage() {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTextPrimary}>QUIZZY.NEWS</Text>
            </View>
            <View>
                <Text style={styles.Analysis}>
                    Hmmmm... Try reading
                </Text>
                <Text style={[styles.Analysis, styles.sep]}>
                    more news?
                </Text>
            </View>
            <View style={styles.score}>
                <Text style={styles.number}>130</Text>
                <Text style={styles.scoreText}>Total Score</Text>
            </View>
            <View style={styles.Review}>
                <Text style={styles.reviewHeader}>Question Review</Text>
                <Text style={styles.reviewHint}>Click on the answers to read the article.</Text>
                <Pressable style={styles.question}>
                    <Text style={styles.answerText}>1.</Text>
                    <Text style={[styles.answerText, styles.under]}>France</Text>
                    <Ionicons style={styles.answerText} name="exit-outline" size={24} />
                </Pressable>
                <Pressable style={styles.question}>
                    <Text style={styles.answerText}>2.</Text>
                    <Text style={[styles.answerText, styles.under]}>China</Text>
                    <Ionicons style={styles.answerText} name="exit-outline" size={24} />
                </Pressable>
                <Pressable style={styles.question}>
                    <Text style={styles.answerText}>3.</Text>
                    <Text style={[styles.answerText, styles.under]}>Taylor Swift</Text>
                    <Ionicons style={styles.answerText} name="exit-outline" size={24} />
                </Pressable>
                <Pressable style={styles.question}>
                    <Text style={styles.answerText}>4.</Text>
                    <Text style={[styles.answerText, styles.under]}>Mauna Loa</Text>
                    <Ionicons style={styles.answerText} name="exit-outline" size={24} />
                </Pressable>
                <Pressable style={styles.question}>
                    <Text style={styles.answerText}>5.</Text>
                    <Text style={[styles.answerText, styles.under]}>Mpox</Text>
                    <Ionicons style={styles.answerText} name="exit-outline" size={24} />
                </Pressable>
                <Text style={styles.space}>
                    Next news quiz <Text style={styles.Time}>12:19:00</Text>
                </Text>
            </View>
            <View style={styles.Icons}>
                <Pressable style={[styles.Button, styles.about]} title="about">
                    <AntDesign name="exclamationcircleo" size={24} color="white" />
                </Pressable>
                <Pressable style={styles.Button} onPress={() => Sharing.shareAsync(something)} title="share">
                    <Feather name="share-2" size={24} color="white" />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: '#DED1E4',
        flex: 1,
        padding: 26,
    },
    headerContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: 20
    },
    headerTextPrimary: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#909090',
    },
    Analysis: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    sep: {
        marginBottom: 20,
    },
    score: {
        flex: 2,
    },
    number: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 40,
    },
    scoreText: {
        textAlign: 'center'
    },
    Review: {
        flex: 6,
        marginBottom: 40
    },
    reviewHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
    },
    reviewHint: {
        textAlign: 'center',
    },
    question: {
        flexDirection: 'row',
        marginTop: 10,
        width: 320,
        height: 40,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#62D451',
        shadowColor: '#20B00A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 6,
        shadowRadius: 1,
        elevation: 12,
    },
    answerText: {
        color: 'white'
    },
    under: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 16,
    },
    space: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16
    },
    Time: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    Icons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Button: {
        width: 50,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 6,
        backgroundColor: '#80C9FA',
        shadowColor: '#53ADF0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 6,
        shadowRadius: 1,
        elevation: 12,
    },
    about: {
        backgroundColor: 'grey',
        shadowColor: '#4C4F4B',
        shadowOpacity: 12,
    }
})