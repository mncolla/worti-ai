import { UIMessage } from 'ai';
import { useEffect, useRef } from 'react';
import { ScrollView, YStack } from 'tamagui';
import { ChatMessage } from './ChatMessage';
import { NewMessageAnimation } from './NewMessageAnimation';
import { TypingIndicator } from './TypingIndicator';

interface ChatMessageListProps {
  messages: UIMessage[];
  isLoading?: boolean;
}

export function ChatMessageList({ messages, isLoading }: ChatMessageListProps) {
  const previousMessageCount = useRef(messages.length);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (messages.length > previousMessageCount.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
    previousMessageCount.current = messages.length;
  }, [messages.length]);

  return (
    <ScrollView 
      ref={scrollViewRef}
      flex={1} 
      showsVerticalScrollIndicator={false}
    >
      <YStack gap="$3" padding="$4">
        {messages.map((message, index) => {
          const isNewMessage = index >= previousMessageCount.current - 1;
          
          return (
            <NewMessageAnimation 
              key={`${message.id}-${index}`} 
              message={message} 
              isNewMessage={isNewMessage}
            >
              <ChatMessage message={message} />
            </NewMessageAnimation>
          );
        })}
        <TypingIndicator isVisible={isLoading || false} />
      </YStack>
    </ScrollView>
  );
}