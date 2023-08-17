import { useEffect } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { View, Text, StyleSheet } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function CountDownPage({ navigation }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate("GamePage");
    }, 3000);

    // Clean up the timeout when the component is unmounted or the effect is re-run
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledView className="flex-1 items-center justify-center bg-[#ded1e4]">
      <StyledView className="w-[263px] h-[263px] rounded-full border-8 border-white"></StyledView>
    </StyledView>
  );
}

// const styles = StyleSheet.create({
//   timer: {
//     backgroundColor: '#DED1E4',
//     display: 'flex',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',

//   },
// });
