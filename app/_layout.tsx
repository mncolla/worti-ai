import { ThemeProvider as AppThemeProvider, useAppTheme } from "@/contexts/ThemeContext";
import config from "@/tamagui.config";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { Suspense } from "react";
import { TamaguiProvider, Text, Theme } from "tamagui";
import '../utils/polyfills';

function RootNavigator() {
  const { actualTheme } = useAppTheme();

  return (
    <Theme name={actualTheme}>
      <ThemeProvider value={actualTheme === "light" ? DefaultTheme : DarkTheme}>
        <Drawer>
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Nuevo Chat",
              title: "WortAI",
            }}
          />
          <Drawer.Screen
            name="[chatId]"
            options={{
              drawerLabel: "Chat",
              title: "Chat",
            }}
          />
        </Drawer>
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
