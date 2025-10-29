import { generateAPIUrl } from '@/utils/utils';
import { UIMessage } from 'ai';
import { useEffect, useState } from 'react';

interface Chat {
  id: number;
  userId: string;
  title: string;
  messages: UIMessage[];
  createdAt: string;
  updatedAt: string;
}

interface UseGetChatsResult {
  chats: Chat[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGetChats(): UseGetChatsResult {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChats = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = generateAPIUrl('/api/chats');
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        setError(`Error al cargar los chats: ${response.status}`);
        return;
      }

      const chatsData = await response.json();
      setChats(chatsData);
    } catch (err) {
      setError('Error de conexión');
      console.error('Error fetching chats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return {
    chats,
    loading,
    error,
    refetch: fetchChats,
  };
}