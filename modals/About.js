import { Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function AboutModal({ navigation }) {

    return (
        <View className="h-screen p-3 flex items-center justify-center bg-[#DED1E4]">
            <View className="top-20 right-5 absolute">
                <AntDesign
                    onPress={() => navigation.goBack()}
                    name="close" size={24} color="black" />
            </View>
            <Text className="font-lexend text-2xl">
                Quizzy.news gives you a quick quiz on the latest top headlines, everyday!
                {"\n"}
                {"\n"}
                You have 60 seconds to answer 5 questions. Be quick and accurate for the highest score.
            </Text>
        </View>
    );
}
