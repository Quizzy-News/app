import { Pressable, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors, Buttons, Typography } from "../styles";

const ClickBackMidGame = ( { navigation }) => {
    
    const [ buttonActive, setButtonActive ] = useState(false);

    return (
        <View style={styles.screen}>
            {/* Modal Text */}
             <Text style={styles.text}>
                Are you sure you want to go back?
                {"\n"}
                Your game for the day will reset.
             </Text>
            
            {/* Button: Yes, go back  */}
            <Pressable 
                onPressIn= {() => {
                    setButtonActive(true);
                    
                }}
                onPressOut= {() => {
                    setButtonActive(false);
                    navigation.navigate("Home");
                }}
          
                style={buttonActive ? styles.buttonActive : styles.button}
            >
            <Text style={styles.buttonText}>Yes, go back.</Text>
            </Pressable>
            
            {/* Button: No, continue playing  */}
            <Pressable 
                onPressIn= {() => {
                    setButtonActive(true);
                }}
                onPressOut= {() => {
                    setButtonActive(false);
                    navigation.goBack();
                }}
          
                style={buttonActive ? styles.buttonActive : styles.button}
            >
            <Text style={styles.buttonText}>No, continue playing!</Text>
            </Pressable>

        </View>
    );
}

export default ClickBackMidGame;


const styles = StyleSheet.create({
    screen: {
        ...Colors.backgroundColors.lightPurple,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    x: {
        position: "absolute",
        top: 100,
        right: 20,
    },
    text: {
        ...Colors.fontColors.gray4,
        ...Typography.body1,
        padding: 10,
    }
});