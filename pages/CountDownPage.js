import { useEffect,useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { View, Text, StyleSheet } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

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
    <StyledView className="flex-1 items-center justify-center bg-[#ded1e4]">
      <StyledView className="w-[363px] h-[363px] rounded-full border-[40px] border-white flex items-center justify-center">
        <StyledText className="text-center text-white text-[200px] font-bold leading-normal">
          {countdown}
        </StyledText>
      </StyledView>
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
