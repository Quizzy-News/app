import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./routes/MyStack";

export default function App() {

  return (
    <>
      <style type="text/css">{`
        @font-face {
          font-family: 'MaterialIcons';
          src: url(${require("react-native-vector-icons/Fonts/MaterialIcons.ttf")}) format('truetype');
        }

        @font-face {
          font-family: 'FontAwesome';
          src: url(${require("react-native-vector-icons/Fonts/FontAwesome.ttf")}) format('truetype');
        }
      `}</style>

      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </>
  );
}
