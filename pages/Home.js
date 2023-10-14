import { Pressable, Text, View, StyleSheet } from "react-native";
import { Colors, Buttons, Typography } from "../styles"

export default function Home({ navigation }) {

  return (
    <View>
      <View>
        <Text style={styles.h1}>QUIZZY.NEWS</Text>
        <Text>
          a daily quiz game on current events{"\n"}
          from stories published very recently
        </Text>
      </View>
      <View>
        <Text>
          Ready?
        </Text>
        <Pressable
          onPress={() => navigation.navigate("CountDownPage")}
          title={"PLAY"}
        >
        </Pressable>
      </View>
      <View>
        <View />
        <Text
          onPress={() => navigation.navigate('AboutModal')}
        >ABOUT</Text>
        <Text>QUIZZY.NEWS</Text>
        <Text>
          Ⓒ 2022 EMISQWE
        </Text>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  h1: {
    ...Typography.h1,
    ...Colors.fontColors.darkBlue
  },
  h2: {
    fontFamily: "LexendBold"
  }

});


// screenContainer: {
//   flex: 1,
//     backgroundColor: "#fff",
//       justifyContent: "flex-start",
//         alignItems: "stretch",
//   },
// topContainer: {
//   flex: 2,
//     backgroundColor: "#fff",
//       justifyContent: "flex-start",
//         alignItems: "center",
//           marginBottom: 50,
//   },
// middleContainer: {
//   flex: 6,
//     backgroundColor: "#fff",
//       justifyContent: "center",
//         alignItems: "center",
//   },
// secondContainer: {
//   marginTop: 30,
//     alignItems: "center",
//       justifyContent: "center",
//   },
// bottomContainer: {
//   marginTop: 20,
//     flex: 1,
//       backgroundColor: "#fff",
//         justifyContent: "flex-end",
//           alignItems: "flex-start",
//   },
// topTextSecondary: {
//   fontFamily: "Lexend",
//     fontSize: 14,
//       marginLeft: -80,
//   },
// middleText: {
//   fontFamily: "Lexend",
//     fontSize: 14,
//       marginLeft: -270,
//         marginTop: -40,
//   },
// playButton: {
//   width: 350,
//     marginTop: 10,
//       backgroundColor: "#80C9FA",
//         alignItems: "center",
//           borderRadius: 6,
//     // shadowColor: '#53ADF0',
//     // shadowOffset: { width: 0, height: 12 }
//   },
// playButtonText: {
//   fontFamily: "Lexend",
//     fontSize: 35,
//       paddingVertical: 3,
//         color: "#fff",
//   },
// bottomText: {
//   fontFamily: "Lexend",
//     fontSize: 12,
//       color: "#909090",
//         marginLeft: 40,
//   },