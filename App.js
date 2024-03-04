import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./routes/MyStack";
import { useFonts } from "expo-font";
import "./nativewind-output";

export default function App() {

  const [loaded] = useFonts({
    KGHappy: require("./assets/fonts/KGHAPPY.ttf"),
    LexendRegular: require("./assets/fonts/Lexend-Regular.ttf"),
    LexendBold: require("./assets/fonts/Lexend-Bold.ttf"),
    LexendBlack: require("./assets/fonts/Lexend-Black.ttf"),
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
