import { useAppTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from '@tamagui/lucide-icons';
import { Button } from 'tamagui';
import { useHaptics } from '@/hooks/useHaptics';

export function HeaderRight() {
  const { actualTheme, toggleTheme } = useAppTheme();
  const haptics = useHaptics();

  const handleThemeToggle = () => {
    haptics.light(); // Light impact for theme toggle
    toggleTheme();
  };

  return (
    <Button
      size="$3"
      circular
      icon={actualTheme === 'dark' ? Sun : Moon}
      onPress={handleThemeToggle}
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