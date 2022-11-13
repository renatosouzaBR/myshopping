import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts, DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { ThemeProvider } from "styled-components/native";

import * as SplashScreen from "expo-splash-screen";

import { AuthProvider } from "@/hooks/auth";

import theme from "@/global/styles/theme";
import { Routes } from "@/routes";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
