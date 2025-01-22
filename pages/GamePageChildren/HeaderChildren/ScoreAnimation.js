import React, { useEffect } from 'react';
import { Animated, Text } from 'react-native';

export default function ScoreAnimation({ points }) {
    const translateY = new Animated.Value(0);
    const opacity = new Animated.Value(1);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -30,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            })
        ]).start();
    }, [points]);

    return (
        <Animated.Text 
            style={{
                position: 'absolute',
                transform: [{ translateY }],
                right: 0,
                opacity,
                color: points > 0 ? '#4CAF50' : '#F44336',
                fontWeight: 'bold'
            }}
        >
            {points > 0 ? '+50' : '+0'}
        </Animated.Text>
    );
}