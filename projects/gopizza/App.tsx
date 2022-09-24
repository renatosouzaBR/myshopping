import React from "react";
import { useFonts, DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { ThemeProvider } from "styled-components/native";

import * as SplashScreen from "expo-splash-screen";

import theme from "@/global/styles/theme";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts([
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  ]);

  if (fontsLoaded) SplashScreen.hideAsync();

  return <ThemeProvider theme={theme}></ThemeProvider>;
}
