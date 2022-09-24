import React from "react";
import { View } from "react-native";
import { useFonts, DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts([
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  ]);

  if (fontsLoaded) SplashScreen.hideAsync();

  return <View>Ola</View>;
}
