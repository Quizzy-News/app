import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./routes/MyStack";
import { useFonts } from "expo-font";
import "./nativewind-output";

export default function App() {

  const [loaded] = useFonts({
    KGHappy: require("./public/fonts/KGHAPPY.ttf"),
    LexendRegular: require("./public/fonts/Lexend-Regular.ttf"),
    LexendBold: require("./public/fonts/Lexend-Bold.ttf"),
    LexendBlack: require("./public/fonts/Lexend-Black.ttf"),
    Jost: require("./public/fonts/Jost-Regular.ttf"), 
    FuturaMedium: require("./public/fonts/Futura-Medium.otf"),
  });
  

  if (!loaded) {
    console.log("Fonts did not load")
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
