import { Pressable, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors, Buttons, Typography } from "../styles"

export default function Home({ navigation }) {

  const [ buttonActive, setButtonActive ] = useState(false);

  const pressInHandler = () => {
    setButtonActive(true);
  };

  const pressOutHandler = () => {
    setButtonActive(false);
    navigation.navigate("CountDownPage");
  };


  return (
    <View style={styles.screen}>
      <View style={styles.container1}>
        <Text style={styles.title}>Quizzy.News</Text>
        <Text style={styles.subH1}>
          a daily quiz game on current events{"\n"}
          from stories published very recently
        </Text>
      </View>
      <View style={styles.container2}>
        <Text style={styles.h2}>
          Ready?
        </Text>
        <Pressable
          onPressIn={pressInHandler}
          onPressOut={pressOutHandler}
          style={buttonActive ? styles.buttonActive : styles.button}
        >
          <Text style={styles.buttonText}>Play</Text>
        </Pressable>
      </View>
      <View style={styles.container3}>
        <View style={styles.divider} />
        <Text
          onPress={() => navigation.navigate('AboutModal')}
          style={styles.subH2}
        >ABOUT</Text>
        <Text style={styles.subH2}>QUIZZY.NEWS</Text>
        <Text style={styles.footer}>
          Ⓒ 2022 EMISQWE
        </Text>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  title: {
    ...Typography.title,
    ...Colors.fontColors.gray4,
    paddingTop: 20,
  },
  subH1: {
    ...Typography.subH1,
    ...Colors.fontColors.gray4
  },
  h2: {
    ...Typography.h2,
    ...Colors.fontColors.gray4
  },
  button: {
    ...Colors.backgroundColors.lightBlue,
    ...Colors.shadowColors.darkBlue,
    ...Buttons.button,
  },
  buttonActive: {
    ...Colors.backgroundColors.lightBlue,
    ...Buttons.buttonActive,
  },
  divider: {
    ...Colors.backgroundColors.gray2,
    height: 1,
    marginBottom: 10
  },
  subH2: {
    ...Typography.subH1,
    ...Colors.fontColors.gray2,
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 5,
  },
  footer: {
    ...Typography.subH2,
    ...Colors.fontColors.gray2,
    fontSize: 12,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 15,
  },
  buttonText: {
    ...Typography.buttonText,
    color: "white",
  },
  screen: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  container1: {
    padding: 10
  },
  container2: {
    padding: 10,
  },
  container3: {
  },
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