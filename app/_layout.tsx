import { ThemeProvider as AppThemeProvider, useAppTheme } from "@/contexts/ThemeContext";
import { ChatList } from "@/features/chat/components/ChatList";
import { HeaderRight } from "@/components/HeaderRight";
import config from "@/tamagui.config";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { Suspense } from "react";
import { PortalProvider, TamaguiProvider, Text, Theme } from "tamagui";
import '../utils/polyfills';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function RootNavigator() {
  const { actualTheme } = useAppTheme();

  return (
    <Theme name={actualTheme}>
      <ThemeProvider value={actualTheme === "light" ? DefaultTheme : DarkTheme}>
        <Drawer
          drawerContent={(props) => <ChatList {...props} />}
          screenOptions={{
            headerShown: true,
            headerRight: () => <HeaderRight />,
            drawerStyle: {
              backgroundColor: actualTheme === "light" ? "#ffffff" : "#000000",
            },
          }}
        >
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
              drawerLabel: () => null,
              title: "Chat",
            }}
          />
        </Drawer>
      </ThemeProvider>
    </Theme>
  );
}

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <PortalProvider>
        <QueryClientProvider client={queryClient}>
          <AppThemeProvider>
            <Suspense fallback={<Text>Loading...</Text>}>
              <RootNavigator />
            </Suspense>
          </AppThemeProvider>
        </QueryClientProvider>
      </PortalProvider>
    </TamaguiProvider>
  );
}
