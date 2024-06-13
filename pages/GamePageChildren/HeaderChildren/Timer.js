import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { styled } from 'nativewind';

const StyledImage = styled(Image);
const StyledView = styled(View);

// This component encapsulates timer/countdown logic.

export default function Timer({ initialCountdown, onTimeOut }) {
    const [countdown, setCountdown] = useState(initialCountdown); 
    const timerFramesImport = require.context('../../../public/timer-frames', true);
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
        <StyledImage source={timerFrames[countdown]} className="h-timer-height w-timer-width"/>
    )

}