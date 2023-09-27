import { Pressable, Text, View } from "react-native";
import { useFonts } from "expo-font";

export default function Home({ navigation }) {
  const [loaded] = useFonts({
    KGHappy: require("../assets/fonts/KGHAPPY.ttf"),
    Lexend: require("../assets/fonts/Lexend-VariableFont_wght.ttf"),
    Jost: require("../assets/fonts/Jost-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const pressHandler = () => {
    navigation.navigate("CountDownPage");
  };

  return (
    <View className="h-screen flex items-center bg-white">
      <View className="mt-10 p-3 w-screen">
        <Text className="text-4xl font-kghappy font-bold">QUIZZY.NEWS</Text>
        <Text className="font-bold font-lexend">a daily quiz game on current events</Text>
        <Text className="font-bold font-lexend">from stories published very recently</Text>
      </View>
      <View className="mt-36 p-3 w-screen">
        <Text className="text-xl font-lexend">Ready?</Text>
        <Pressable onPress={pressHandler} className="p-3 mt-6 bg-[#80C9FA] w-full flex items-center rounded-lg">
          <Text
            className="text-white text-4xl font-bold"
          >
            PLAY
          </Text>
        </Pressable>
      </View>
      <View className="p-3 w-screen mt-auto">
        <Text className="text-[#909090] font-bold">ABOUT</Text>
        <Text className="text-[#909090] font-bold">QUIZZY.NEWS</Text>
        <Text className="text-[#909090]">
          Ⓒ 2022 EMISQWE
        </Text>
      </View>
    </View>
  );
}
