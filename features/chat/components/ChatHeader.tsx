import { useAppTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from '@tamagui/lucide-icons';
import { Button, Text, XStack } from 'tamagui';

interface ChatHeaderProps {
  title?: string;
  chatId?: string;
}

export function ChatHeader({ title = "Chat AI", chatId }: ChatHeaderProps) {
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
      <XStack flexDirection="column">
        <Text fontSize="$6" fontWeight="600" color="$color">
          {title}
        </Text>
        {chatId && (
          <Text fontSize="$3" color="$gray11">
            ID: {chatId}
          </Text>
        )}
      </XStack>
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