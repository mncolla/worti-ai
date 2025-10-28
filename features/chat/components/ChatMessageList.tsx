import { ScrollView, YStack } from 'tamagui';
import { ChatMessage as ChatMessageType } from '../types';
import { ChatMessage } from './ChatMessage';

interface ChatMessageListProps {
  messages: ChatMessageType[];
}

export function ChatMessageList({ messages }: ChatMessageListProps) {
  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <YStack gap="$3" padding="$4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </YStack>
    </ScrollView>
  );
}