import { Pressable, Text, View, Button } from "react-native";

export default function Home({ navigation }) {

  const pressHandler = () => {
    navigation.navigate("CountDownPage");
  };

  return (
    <View className="h-screen flex items-center bg-white">
      <View className="mt-6 p-3 w-auto flex items-center">
        <Text className="text-[44px] font-kghappy color-[#3D3D3D]">QUIZZY.NEWS</Text>
        <Text className="pl-3 font-lexend font-bold self-start text-[#3D3D3D]">
          a daily quiz game on current events{"\n"}
          from stories published very recently
        </Text>
      </View>
      <View className="mt-36 p-3 w-screen">
        <Text className="pl-3 text-xl font-bold font-lexend text-[#3D3D3D]">
          Ready?
        </Text>
        <Pressable onPress={pressHandler} className="h-12 mt-6 w-full flex items-center justify-center rounded-lg">
          <View className="h-12 bg-[#53ADF0] w-full rounded-lg absolute top-3" />
          <View className="h-12 bg-[#80C9FA] w-full rounded-lg absolute" />
          <Text className="text-white text-4xl font-lexend font-bold">
            PLAY
          </Text>
        </Pressable>
      </View>
      <View className="w-screen mt-auto">
        <View className="h-[1px] w-screen bg-[#909090]" />
        <Text
          className="pl-3 pt-4 text-[#909090] font-bold"
          onPress={() => navigation.navigate('AboutModal')}
        >ABOUT</Text>
        <Text className="pl-3 pt-2 text-[#909090] font-bold">QUIZZY.NEWS</Text>
        <Text className="pl-3 pt-2 pb-5 text-[#909090]">
          Ⓒ 2022 EMISQWE
        </Text>
      </View>
    </View>
  );
}
