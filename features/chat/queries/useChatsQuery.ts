import { generateAPIUrl } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { Chat } from '../types';
import { chatKeys } from './keys';

const fetchChats = async (): Promise<Chat[]> => {
  const response = await fetch(generateAPIUrl('/api/chats'));
  
  if (!response.ok) {
    throw new Error('Failed to fetch chats');
  }
  
  return response.json();
};

export const useChatsQuery = () => {
  return useQuery({
    queryKey: chatKeys.lists(),
    queryFn: fetchChats,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};