import { useHaptics } from '@/hooks/useHaptics';
import { generateId } from '@/utils/generateId';
import { generateAPIUrl } from '@/utils/utils';
import { useChat } from '@ai-sdk/react';
import { useQueryClient } from '@tanstack/react-query';
import { DefaultChatTransport } from 'ai';
import { router } from 'expo-router';
import { fetch as expoFetch } from 'expo/fetch';
import { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, YStack } from 'tamagui';
import { chatKeys, useChatQuery } from '../queries';
import { ChatInput } from './ChatInput';
import { ChatMessageList } from './ChatMessageList';

interface ChatScreenProps {
  chatId?: string;
}

export function ChatScreen({ chatId }: ChatScreenProps) {
  
  const { data: chat, isLoading: chatLoading, error: chatError } = useChatQuery(chatId);
  const queryClient = useQueryClient();
  const hasRedirected = useRef(false);
  const generatedIdRef = useRef<string | null>(null);
  const haptics = useHaptics();
  
  if (!chatId && !generatedIdRef.current) {
    generatedIdRef.current = generateId();
  }
  
  const finalChatId = chatId || generatedIdRef.current || undefined;
  
  const { messages, error, sendMessage, stop, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: generateAPIUrl('/api/ask'),
    }),
    onError: (error) => console.error(error, 'CHAT_ERROR'),
    id: finalChatId,
    onData: () => {
      if (!chatId && !hasRedirected.current && generatedIdRef.current) {
        hasRedirected.current = true;
        router.replace(`/${generatedIdRef.current}`);
      }
    },
    onFinish: () => {
      haptics.light();
      if (!chatId && generatedIdRef.current) {
        queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
      }
    }
  });

  useEffect(() => {
    if (chat?.messages && Array.isArray(chat.messages) && chat.messages.length > 0 && messages.length === 0) {
      setMessages(chat.messages);
    }
  }, [chat?.messages, setMessages, messages.length]);

  const isLoading = status === "streaming";

  const handleSendMessage = (text: string) => {
    if (text.trim()) {
      sendMessage({ text });
    }
  };

  if (chatLoading) {
    return <Text color="$color">Cargando chat...</Text>;
  }

  if (chatError) {
    return <Text color="$color">{chatError.message || 'Error al cargar el chat'}</Text>;
  }

  if (error) {
    return <Text color="$color">{error.message || 'Error en el chat'}</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <YStack flex={1} backgroundColor="$background" gap="$3">
        <ChatMessageList messages={messages} isLoading={isLoading} />
        <ChatInput
          onSendMessage={handleSendMessage}
          onStopGeneration={stop}
          isLoading={isLoading}
        />
      </YStack>
    </SafeAreaView>
  );
}