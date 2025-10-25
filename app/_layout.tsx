import { ThemeProvider as AppThemeProvider, useAppTheme } from "@/contexts/ThemeContext";
import config from "@/tamagui.config";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { Suspense } from "react";
import { TamaguiProvider, Text, Theme } from "tamagui";
import '../utils/polyfills';

function RootNavigator() {
  const { actualTheme } = useAppTheme();

  return (
    <Theme name={actualTheme}>
      <ThemeProvider value={actualTheme === "light" ? DefaultTheme : DarkTheme}>
        <Stack screenOptions={{
          headerShown: false
        }}/>
      </ThemeProvider>
    </Theme>
  );
}

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <AppThemeProvider>
        <Suspense fallback={<Text>Loading...</Text>}>
          <RootNavigator />
        </Suspense>
      </AppThemeProvider>
    </TamaguiProvider>
  );
}
