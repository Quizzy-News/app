import { useEffect } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { styled } from "nativewind";
import { Colors, Containers, Typography } from "../styles";

import { useQuiz } from "./hooks/useQuiz";

const StyledView = styled(View);

export default function LoadingPage({ navigation }) {
  const { quiz, loaded, error, quizDate, isArchive, reviewed, retry } = useQuiz();

  useEffect(() => {
    if (!loaded || error) {
      return;
    }

    if (quiz.length > 0) {
      const timeoutId = setTimeout(
        () =>
          navigation.navigate("CountDownPage", {
            quiz,
            quizDate,
            isArchive,
            reviewed,
          }),
        1000
      );
      return () => clearTimeout(timeoutId);
    }
  }, [loaded, error, quiz, quizDate, isArchive, reviewed, navigation]);

  // No quiz available, or the fetch failed. Tell the truth instead of
  // pushing placeholder data into the game.
  if (loaded && (error || quiz.length === 0)) {
    return (
      <StyledView className="flex-1 flex-col items-center justify-center bg-light-purple px-6">
        <Text style={styles.errorHeading}>No quiz today</Text>
        <Text style={styles.errorBody}>
          We couldn't load a quiz right now. This usually means today's
          questions haven't been published yet.
        </Text>

        <Pressable style={styles.button} onPress={retry}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Home")}>
          <Text style={styles.secondaryLink}>Back to home</Text>
        </Pressable>

        {!!error?.message && (
          <Text style={styles.errorDetail}>{error.message}</Text>
        )}
      </StyledView>
    );
  }

  return (
    <StyledView className="flex-1 flex-col items-center justify-center bg-light-purple">
      <View style={styles.circle}>
        <Text style={styles.circleText}>GET READY!</Text>
      </View>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  container1: {
    ...Colors.backgroundColors.lightPurple,
    ...Containers.contentContainer,
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
    ...Typography.getReadyText,
    color: "white",
    position: "absolute",
    textAlign: "center",
  },
  errorHeading: {
    fontFamily: "LexendBold",
    fontSize: 28,
    color: "white",
    marginBottom: 12,
    textAlign: "center",
  },
  errorBody: {
    fontFamily: "LexendRegular",
    fontSize: 16,
    color: "white",
    textAlign: "center",
    maxWidth: 340,
    lineHeight: 24,
    marginBottom: 28,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginBottom: 16,
  },
  buttonText: {
    fontFamily: "LexendBold",
    fontSize: 16,
    color: "#6C63FF",
  },
  secondaryLink: {
    fontFamily: "LexendRegular",
    fontSize: 14,
    color: "white",
    textDecorationLine: "underline",
  },
  errorDetail: {
    fontFamily: "LexendRegular",
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
    textAlign: "center",
    marginTop: 28,
    maxWidth: 320,
  },
});
