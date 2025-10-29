import { useAppTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from '@tamagui/lucide-icons';
import { Button } from 'tamagui';

export function HeaderRight() {
  const { actualTheme, toggleTheme } = useAppTheme();

  return (
    <Button
      size="$3"
      circular
      icon={actualTheme === 'dark' ? Sun : Moon}
      onPress={toggleTheme}
      backgroundColor="transparent"
      borderWidth={0}
      color={actualTheme === 'dark' ? '$gray12' : '$gray12'}
      hoverStyle={{
        backgroundColor: '$gray4',
      }}
      pressStyle={{
        backgroundColor: '$gray5',
      }}
    />
  );
}