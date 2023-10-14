import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./routes/MyStack";
import { useFonts } from "expo-font";

export default function App() {

  const [loaded] = useFonts({
    KGHappy: require("./assets/fonts/KGHAPPY.ttf"),
    LexendMedium: require("./assets/fonts/Lexend-Medium.ttf"),
    LexendBold: require("./assets/fonts/Lexend-Bold.ttf"),
    FuturaMedium: require("./assets/fonts/Futura-Medium.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </>
  );
}
