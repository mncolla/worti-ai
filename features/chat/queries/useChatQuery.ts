import { generateAPIUrl } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { Chat } from '../types';
import { chatKeys } from './keys';

const fetchChat = async (id: string): Promise<Chat> => {
  const response = await fetch(generateAPIUrl(`/api/chat/${id}`));
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Chat not found');
    }
    throw new Error('Failed to fetch chat');
  }
  
  return response.json();
};

export const useChatQuery = (id?: string) => {
  return useQuery({
    queryKey: chatKeys.detail(id!),
    queryFn: () => fetchChat(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: (failureCount, error) => {
      if (error.message === 'Chat not found') {
        return false;
      }
      return failureCount < 3;
    },
  });
};