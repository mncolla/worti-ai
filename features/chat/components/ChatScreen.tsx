import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, YStack } from 'tamagui';
import { useChat } from '../hooks/useChat';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { ChatMessageList } from './ChatMessageList';

export function ChatScreen() {
  const { messages, isLoading, error, sendMessage, stopGeneration } = useChat();

  if (error) {
    return <Text color="$color">{error}</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <YStack flex={1} backgroundColor="$background" gap="$3">
        <ChatHeader />
        <ChatMessageList messages={messages} />
        <ChatInput
          onSendMessage={sendMessage}
          onStopGeneration={stopGeneration}
          isLoading={isLoading}
        />
      </YStack>
    </SafeAreaView>
  );
}