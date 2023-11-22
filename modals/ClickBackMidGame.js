import { Pressable, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors, Buttons, Typography } from "../styles";

// TODO: Styling - add dark purple shadow / dark purple container? 

const ClickBackMidGame = ( { navigation }) => {
    
    const [ yesButtonActive, setYesButtonActive ] = useState(false);
    const [ noButtonActive, setNoButtonActive ] = useState(false);

    return (
        <View style={styles.screen}>
            <Text style={styles.text}>
                Are you sure you want to go back?
                {"\n"}
                Your game for the day will reset.
            </Text>

            <Pressable 
                style={yesButtonActive ? styles.buttonActive : styles.button}
                
                onPressIn= {() => {
                    setYesButtonActive(true);

                    
                }}
                onPressOut= {() => {
                    setNoButtonActive(false);
                    navigation.navigate("Home");
                }}
            >

                <Text style={styles.text}>Yes, go back.</Text>
            </Pressable>
            
            <Pressable 
                style={noButtonActive ? styles.buttonActive : styles.button}
                
                onPressIn= {() => {
                    setNoButtonActive(true);
                }}
                onPressOut= {() => {
                    setNoButtonActive(false);
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
        ...Buttons.button,
        margin: 10,
    },
    
    buttonActive: {
        ...Colors.backgroundColors.white,
        ...Buttons.buttonActive,
        margin: 10,
    }
});