import { Pressable, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors, Buttons, Typography, Containers } from "../styles";

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
                style={styles.button}
                
                onPressIn= {() => {
                    setButtonActive(true);
                    
                }}
                onPressOut= {() => {
                    setButtonActive(false);
                    navigation.navigate("Home");
                }}
          

            >
            <Text style={styles.text}>Yes, go back.</Text>
            </Pressable>
            
            {/* Button: No, continue playing  */}
            <Pressable 
                style={styles.button}
                
                onPressIn= {() => {
                    setButtonActive(true);
                }}
                onPressOut= {() => {
                    setButtonActive(false);
                    navigation.goBack();
                }}
          

            >
            <Text style={styles.text}>No, continue playing!</Text>
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
    text: {
        ...Colors.fontColors.gray4,
        ...Typography.body1,
        padding: 10,
    },
    button: {
        ...Colors.backgroundColors.white,
        ...Colors.shadowColors.gray1,
        ...Buttons.button,
        ...Buttons.buttonActive,
        margin: 10,
    }
});