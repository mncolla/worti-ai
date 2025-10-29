import { generateAPIUrl } from '@/utils/utils';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { fetch as expoFetch } from 'expo/fetch';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, YStack } from 'tamagui';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { ChatMessageList } from './ChatMessageList';

interface ChatScreenProps {
  chatId?: string;
}

export function ChatScreen({ chatId }: ChatScreenProps) {
  
  const { messages, error, sendMessage, stop, status } = useChat({
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: generateAPIUrl('/api/chat'),
    }),
    onError: (error) => console.error(error, 'CHAT_ERROR'),
  });

  const isLoading = status === "streaming";

  const handleSendMessage = (text: string) => {
    if (text.trim()) {
      sendMessage({ text });
    }
  };

  if (error) {
    return <Text color="$color">{error}</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <YStack flex={1} backgroundColor="$background" gap="$3">
        <ChatHeader chatId={chatId} />
        <ChatMessageList messages={messages} />
        <ChatInput
          onSendMessage={handleSendMessage}
          onStopGeneration={stop}
          isLoading={isLoading}
        />
      </YStack>
    </SafeAreaView>
  );
}