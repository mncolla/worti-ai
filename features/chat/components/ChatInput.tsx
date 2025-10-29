import { SendHorizontal, StopCircle } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { Button, Input, XStack } from 'tamagui';
import { useHaptics } from '@/hooks/useHaptics';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onStopGeneration: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function ChatInput({
  onSendMessage,
  onStopGeneration,
  isLoading,
  disabled = false
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const haptics = useHaptics();

  const handleSend = () => {
    if (input.trim()) {
      haptics.medium('Mensaje enviado'); // Medium impact for sending message
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = () => {
    handleSend();
  };

  return (
    <XStack
      gap="$3"
      alignItems="center"
      padding="$4"
      backgroundColor="$background"
      borderTopWidth={1}
      borderTopColor="$borderColor"
    >
      <Input
        flex={1}
        placeholder="Message Chat AI..."
        placeholderTextColor="$gray10"
        value={input}
        onChangeText={setInput}
        onSubmitEditing={handleKeyPress}
        autoFocus={true}
        size="$4"
        backgroundColor="$gray2"
        borderColor="$borderColor"
        borderRadius="$4"
        color="$color"
        disabled={disabled}
      />
      {!isLoading ? (
        <Button
          size="$4"
          circular
          icon={SendHorizontal}
          onPress={handleSend}
          disabled={!input.trim() || disabled}
          backgroundColor="$blue10"
          color="white"
          opacity={(!input.trim() || disabled) ? 0.5 : 1}
        />
      ) : (
        <Button
          size="$4"
          circular
          icon={StopCircle}
          onPress={() => {
            haptics.heavy('Generación detenida'); // Heavy impact for stopping generation
            onStopGeneration();
          }}
          backgroundColor="$red10"
          color="white"
        />
      )}
    </XStack>
  );
}