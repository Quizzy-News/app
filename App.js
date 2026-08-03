import "react-native-gesture-handler";
import * as React from "react";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./routes/MyStack";
import { useFonts } from "expo-font";
import "./nativewind-output";

/**
 * How long to wait for custom fonts before giving up and rendering anyway.
 * Fonts are decoration; the quiz is the product.
 */
const FONT_TIMEOUT_MS = 3000;

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    KGHappy: require("./public/fonts/KGHAPPY.ttf"),
    LexendRegular: require("./public/fonts/Lexend-Regular.ttf"),
    LexendBold: require("./public/fonts/Lexend-Bold.ttf"),
    LexendBlack: require("./public/fonts/Lexend-Black.ttf"),
    Jost: require("./public/fonts/Jost-Regular.ttf"),
    FuturaMedium: require("./public/fonts/Futura-Medium.otf"),
    FuturaBold: require("./public/fonts/Futura-Bold.otf"),
  });

  // Previously this component did `if (!loaded) return null`, which renders a
  // completely blank white page. If font loading ever stalled — which it does
  // on the web build, where useFonts can hang without ever resolving or
  // erroring — the ENTIRE site showed nothing at all, with no error, forever.
  //
  // A missing decorative font must never be able to take the whole app down.
  // We wait briefly, then render regardless and let the system fonts stand in.
  const [waitedLongEnough, setWaitedLongEnough] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setWaitedLongEnough(true), FONT_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, []);

  if (fontError) {
    console.warn("Custom fonts failed to load; using system fonts.", fontError);
  }

  const ready = fontsLoaded || !!fontError || waitedLongEnough;

  if (!ready) {
    // Deliberately blank for at most FONT_TIMEOUT_MS, matching the splash colour
    // so the wait reads as loading rather than as a broken page.
    return null;
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
