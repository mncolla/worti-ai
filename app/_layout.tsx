import tamaguiConfig from '@/tamagui.config';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { TamaguiProvider } from '@tamagui/core';

import { Stack } from "expo-router";
import { useColorScheme } from 'react-native';
import '../utils/polyfills';

export default function RootLayout() {
  const colorScheme = useColorScheme()
  return <TamaguiProvider config={tamaguiConfig}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack />
    </ThemeProvider>
  </TamaguiProvider>;
}
