import { generateAPIUrl } from '@/utils/utils';
import { useChat as useAIChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { fetch as expoFetch } from 'expo/fetch';
import { ChatState, ChatActions } from '../types';

export function useChat(): ChatState & ChatActions {
  const { messages, error, sendMessage, stop, status } = useAIChat({
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

  const stopGeneration = () => {
    stop();
  };

  const clearChat = () => {
    // Para implementar clear, podrías usar el id de conversación
    // o reiniciar el hook según como funcione useAIChat
    console.log('Clear chat - to implement');
  };

  return {
    messages,
    isLoading,
    error: error?.message,
    sendMessage: handleSendMessage,
    stopGeneration,
    clearChat,
  };
}