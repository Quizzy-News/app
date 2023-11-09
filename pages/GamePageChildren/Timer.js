import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { Colors, Containers, Typography } from "../styles"


// This component encapsulates timer/countdown logic.

export default function Timer({ initialCountdown, onTimeOut }) {
    const [countdown, setCountdown] = useState(initialCountdown); 
    const timerFramesImport = require.context('../assets/timer-frames', true);
    const timerFrames = timerFramesImport.keys().map(image => timerFramesImport(image));
  

    useEffect(() => {

        if (countdown === 0) {
            onTimeOut(); // See GamePage.js
            return;
          }
      
        // Decrement countdown to 0 with a 1 sec delay; setInterval() is a built-in JS function.
          const intervalId = setInterval(() => {
            setCountdown((currentCountdown) => currentCountdown - 1);
          }, 1000);
      
        // Cleanup
          return () => clearInterval(intervalId);

    }, [countdown, onTimeOut])

    return (
        <Image source={timerFrames[countdown]} style={styles.timer}/>
    )

}

// TODO: Is StyleSheet handled in here or in GamePage?
const styles = StyleSheet.create({
   
    timer: {
      height: 60,
      width: 60,
  
    },
    
  });