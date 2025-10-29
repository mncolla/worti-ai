import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatKeys } from '../queries/keys';

const deleteChat = async (chatId: string) => {
  const response = await fetch(`/api/chats/${chatId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete chat');
  }

  return response.json();
};

export const useDeleteChatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteChat,
    onSuccess: (_, deletedChatId) => {
      queryClient.removeQueries({ queryKey: chatKeys.detail(deletedChatId) });
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
    },
  });
};