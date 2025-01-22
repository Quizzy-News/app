import React, { useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { styled } from 'nativewind';

const StyledText = styled(Text);

export default function ScoreAnimation({ points }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, (points > 0 ? 650 : 750));
        return () => clearTimeout(timer);
    }, [points]);

    return (
        <View className={`justify-self-end ${points > 0 ? '-rotate-6' : '' } absolute right-4`}>

        <StyledText 
            className={` font-bold text-lg transition-all 
                
                ${isVisible ? 
                    points > 0 ? 
                    'ease-in-out duration-250 text-green-500 -translate-y-[1.35rem] opacity-100 ' :
                    'ease-linear duration-750  text-red-500 translate-y-[1.20rem] opacity-[45]' :
                    'opacity-0'}`}
                    >
            {points > 0 ? '+50' : '+0'}
        </StyledText>
        </View>
    );
}