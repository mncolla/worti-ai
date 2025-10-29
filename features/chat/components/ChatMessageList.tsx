import { ScrollView, YStack } from 'tamagui';
import { UIMessage } from 'ai';
import { ChatMessage } from './ChatMessage';

interface ChatMessageListProps {
  messages: UIMessage[];
}

export function ChatMessageList({ messages }: ChatMessageListProps) {
  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <YStack gap="$3" padding="$4">
        {messages.map((message, index) => (
          <ChatMessage key={`${message.id}-${index}`} message={message} />
        ))}
      </YStack>
    </ScrollView>
  );
}