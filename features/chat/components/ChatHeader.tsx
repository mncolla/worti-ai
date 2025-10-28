import { useAppTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from '@tamagui/lucide-icons';
import { Button, Text, XStack } from 'tamagui';

interface ChatHeaderProps {
  title?: string;
}

export function ChatHeader({ title = "Chat AI" }: ChatHeaderProps) {
  const { actualTheme, toggleTheme } = useAppTheme();

  return (
    <XStack
      backgroundColor="$background"
      padding="$4"
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
    >
      <Text fontSize="$6" fontWeight="600" color="$color">
        {title}
      </Text>
      <Button
        size="$3"
        circular
        icon={actualTheme === 'dark' ? Sun : Moon}
        onPress={toggleTheme}
        backgroundColor="$blue10"
        color="white"
      />
    </XStack>
  );
}