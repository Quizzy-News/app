import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';


export default function GamePage() {
  const [georgePressed, setGeorgePressed] = useState(false);
  const [button1Pressed, setButton1Pressed] = useState(false);
  const [button2Pressed, setButton2Pressed] = useState(false);


  const handlePress = (button) => {
    if (button === 'George') {
      setGeorgePressed(true);
      setButton1Pressed(false);
      setButton2Pressed(false);
    } else if (button === 'Button 1') {
      setGeorgePressed(false);
      setButton1Pressed(true);
      setButton2Pressed(false);
    } else if (button === 'Button 2') {
      setGeorgePressed(false);
      setButton1Pressed(false);
      setButton2Pressed(true);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          Who was the first president of the US
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.answerButton,
            georgePressed && styles.greenButton,
          ]}
          onPress={() => handlePress('George')}
        >
          <Text style={styles.answerText}>George</Text>
        </Pressable>
        <Pressable
          style={[styles.answerButton, button1Pressed && styles.redButton]}
          onPress={() => handlePress('Button 1')}
        >
          <Text style={styles.answerText}>Mountain Dew Elizonda The Third</Text>
        </Pressable>
        <Pressable
          style={[styles.answerButton, button2Pressed && styles.redButton]}
          onPress={() => handlePress('Button 2')}
        >
          <Text style={styles.answerText}>Joe Maldanado</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#DED1E4',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContainer: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  buttonContainer: {
    marginTop: 20,
  },
  answerButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 335,
    height: 95,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  answerText: {
    fontSize: 22,
    fontFamily: 'futura',
    textAlign: 'center',
  },
  questionText: {
    fontSize: 55,
    fontFamily: 'sans-serif',
    marginBottom: 30,
  },
  greenButton: {
    backgroundColor: 'green',
  },
  redButton: {
    backgroundColor: 'red',
  },
});
