import "react-native-gesture-handler";
import {useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./routes/MyStack";
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();


export default function App() {

  const [loaded, error] = useFonts({
    'KGHappy': require("./public/fonts/KGHAPPY.ttf"),
    'LexendRegular': require("./public/fonts/Lexend-Regular.ttf"),
    'LexendBold': require("./public/fonts/Lexend-Bold.ttf"),
    'LexendBlack': require("./public/fonts/Lexend-Black.ttf"),
    'Jost': require("./public/fonts/Jost-Regular.ttf"), 
    'FuturaMedium': require("./public/fonts/Futura-Medium.otf"),
  });
  
  useEffect(() => {
    if (loaded || error) {
      SplashScreen
    }
  }, [loaded, error]);
  
  if (!loaded && !error) {
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
