import { Button, Text, View } from "react-native";

export default function AboutModal({ navigation }) {

    return (
        <View className="flex items-center justify-center bg-[#DED1E4]">
            <Text className="font-lexend text-2xl">
                Quizzy.news gives you a quick quiz on the latest top headlines, everyday!
                {"\n"}
                {"\n"}
                You have 60 seconds to answer 5 questions. Be quick and accurate for the highest score.
            </Text>
            <Button onPress={() => navigation.goBack()} title="Dismiss" />
        </View>
    );
}
