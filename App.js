import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./routes/MyStack";

export default function App() {

  return (
    <>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </>
  );
}
