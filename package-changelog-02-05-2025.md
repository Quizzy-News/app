Note: Use npx expo install <package> --npm to install packages to ensure compatibility with the expo ecosystem, whenever possible. 
~~yarn.lock~~ has been removed.

## updates
@expo/metro-runtime                         3.1.3 -> 4.0.1
@react-native-masked-view/masked-view       0.3.0 -> 0.3.2
@react-navigation/native                    6.1.7 -> 7.0.14
@react-navigation/stack                     6.3.17 -> 7.1.1

expo                                        51.0.32 -> 52.0.3
expo-asset                                  10.0.10 -> 11.0.3
expo-clipboard                              6.0.3 -> 7.0.1
expo-font                                   11.10.3 -> 13.0.3
expo-splash-screen                          0.26.4 -> 0.29.21
expo-status-bar                             1.11.1 -> 2.0.1

nativewind                                  2.0.11 -> 4.1.23 (brk)

react                                       18.2.0 -> 18.3.1
react-dom                                   18.2.0 -> 18.3.1
react-native                                0.73.6 -> 0.76.6
react-native-gesture-handler                2.14.0 -> 2.20.2
react-native-safe-area-context              4.8.2 -> 4.12.0
react-native-screens                        3.29.0 -> 4.4.0
react-native-svg                            14.1.0 -> 15.8.0
react-native-web                            0.19.6 -> 0.19.13

firebase                                    10.14.1 -> 11.2.0

(dev) tailwindcss                           3.3.2 -> 3.4.17 

## new
@expo/vector-icons                          14.0.2
expo-router                                 4.0.17
react-native-reanimated                     3.16.1
(dev) eslint-plugin-react-native            5.0.0


## removed
~~@rneui/base~~
~~@rneui/themed~~
~~react-native-countdown-circle-timer~~
~~react-native-vector-icons~~
~~tailwind~~

## On the cutting block (these will be removed in favor of expo-router implementation see: https://docs.expo.dev/versions/latest/sdk/router/ )
@react-navigation/native
@react-navigation/stack

firebase (eventually could use fetch when backend routes are robust enough)
