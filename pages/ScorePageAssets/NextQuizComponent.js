import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function NextQuizComponent(props) {

    const [timeLeft, setTimeLeft] = useState({
        hours:  0,
        minutes: 0,
        seconds: 0
    })
    
    

    useEffect(() => {
        const getNextMidnightPST = () => {
            const now = new Date();
            const pstOffset = -8; // PST is UTC-8
            const utcOffset = now.getTimezoneOffset() / 60; // Get the local timezone offset in hours
            const totalOffset = utcOffset + pstOffset;

            const tomorrow = new Date();
            tomorrow.setDate(now.getDate() + 1); // Set the date to tomorrow
            tomorrow.setHours(0, 0, 0, 0); // Set the time to midnight
            tomorrow.setHours(tomorrow.getHours() + totalOffset); // Add the total offset to get PST

            return tomorrow;
        }

        const updateCountdown = () => {
            const now = new Date();
            const midnightPST = getNextMidnightPST();
            const diff = midnightPST.getTime() - now.getTime();

            const totalSeconds = Math.floor(diff / 1000);
            setTimeLeft({
                hours: Math.floor(totalSeconds / 3600),
                minutes: Math.floor((totalSeconds % 3600) / 60),
                seconds: totalSeconds % 60
            });
        }

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);

    }, []);

    //return { hours, minutes, seconds };


    //const timeUntilMidnight = getTimeUntilMidnightPST();
    //console.log(`Time until midnight PST: ${timeUntilMidnight.hours} hours, ${timeUntilMidnight.minutes} minutes, and ${timeUntilMidnight.seconds} seconds`);



    return (
        <Text className="pt-01 text-lg font-lexend flex align-items-center min-w-150">
            Next quiz in 
            <Text className="pl-1 font-bold min-w-100 monospace">
                {String(timeLeft.hours).padStart(2,'0')}:{String(timeLeft.minutes).padStart(2,'0')}:{String(timeLeft.seconds).padStart(2,'0')}
                </Text>
        </Text>
    )
}