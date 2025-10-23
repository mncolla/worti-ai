import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { Stack } from "expo-router";

import { defaultConfig } from '@tamagui/config/v4';

// you usually export this from a tamagui.config.ts file
const config = createTamagui(defaultConfig)

type Conf = typeof config

// make imports typed
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf { }
}

export default function RootLayout() {
  return <TamaguiProvider config={config}>
    <Stack />
  </TamaguiProvider>;
}
