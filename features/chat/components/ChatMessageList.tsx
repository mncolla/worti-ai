import { ScrollView, YStack } from 'tamagui';
import { UIMessage } from 'ai';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';

interface ChatMessageListProps {
  messages: UIMessage[];
  isLoading?: boolean;
}

export function ChatMessageList({ messages, isLoading }: ChatMessageListProps) {
  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <YStack gap="$3" padding="$4">
        {messages.map((message, index) => (
          <ChatMessage key={`${message.id}-${index}`} message={message} />
        ))}
        <TypingIndicator isVisible={isLoading || false} />
      </YStack>
    </ScrollView>
  );
}