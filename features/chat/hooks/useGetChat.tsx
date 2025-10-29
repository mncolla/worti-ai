import { generateAPIUrl } from '@/utils/utils';
import { useState, useEffect } from 'react';
import { UIMessage } from 'ai';

interface Chat {
  id: number;
  userId: string;
  title: string;
  messages: UIMessage[];
  createdAt: string;
  updatedAt: string;
}

interface UseGetChatResult {
  chat: Chat | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGetChat(chatId?: string): UseGetChatResult {
  const [chat, setChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChat = async () => {
    if (!chatId) {
      setChat(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(generateAPIUrl(`/api/chat/${chatId}`));
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Chat no encontrado');
        } else {
          setError('Error al cargar el chat');
        }
        return;
      }

      const chatData = await response.json();
      setChat(chatData);
    } catch (err) {
      setError('Error de conexión');
      console.error('Error fetching chat:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [chatId]);

  return {
    chat,
    loading,
    error,
    refetch: fetchChat,
  };
}