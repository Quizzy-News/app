import { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Colors, Buttons, Typography } from "../styles"

export default function CountDownPage({ navigation }) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown === 0) {
      navigation.navigate("GamePage");
      return;
    }

    const timeout = setTimeout(() => {
        setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [countdown, navigation]);

  return (
    <View style={styles.screen}>
      <View style={styles.container1}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>
            {countdown}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  container1: {
    ...Colors.backgroundColors.lightPurple,
    height: "80%",
    margin: 10,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 300,
    borderWidth: 30,
    borderColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    ...Typography.countdownText,
    color: "white",
    position: "absolute"
  }
});
