import { useHaptics } from '@/hooks/useHaptics';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Trash2 } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Separator, Text, XStack, YStack } from 'tamagui';
import { useDeleteChatMutation } from '../mutations/useDeleteChatMutation';
import { useChatsQuery } from '../queries';
import { AnimatedChatItem } from './AnimatedChatItem';
import { DeleteChatModal } from './DeleteChatModal';

export function ChatList(props: DrawerContentComponentProps) {
  const { data: chats = [], isLoading: loading, error } = useChatsQuery();
  const deleteChatMutation = useDeleteChatMutation();
  const haptics = useHaptics();
  const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; chatId: string | null }>({
    isOpen: false,
    chatId: null,
  });
  const [deletingChatIds, setDeletingChatIds] = useState<Set<string>>(new Set());

  const handleChatPress = (chatId: string) => {
    haptics.light(); // Light impact for chat selection
    router.push(`/${chatId}`);
    props.navigation.closeDrawer();
  };

  const handleNewChat = () => {
    haptics.medium(); // Medium impact for creating new chat
    router.push('/');
    props.navigation.closeDrawer();
  };

  const handleDeletePress = (chatId: string, event: any) => {
    event.stopPropagation();
    haptics.warning();
    setDeleteModalState({ isOpen: true, chatId });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModalState.chatId) return;
    
    const chatIdToDelete = deleteModalState.chatId;
    
    setDeletingChatIds(prev => new Set(prev).add(chatIdToDelete));
    setDeleteModalState({ isOpen: false, chatId: null });
    
    try {
      setTimeout(async () => {
        await deleteChatMutation.mutateAsync(chatIdToDelete);
        haptics.success('Chat eliminado');
      }, 100);
    } catch (error) {
      haptics.error('Error al eliminar');
      console.error('Error deleting chat:', error);
      setDeletingChatIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(chatIdToDelete);
        return newSet;
      });
    }
  };

  const handleDeleteAnimationComplete = (chatId: string) => {
    setDeletingChatIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(chatId);
      return newSet;
    });
  };

  const handleDeleteCancel = () => {
    setDeleteModalState({ isOpen: false, chatId: null });
  };

  const getLastMessage = (messages: any[]) => {
    if (!messages || messages.length === 0) return 'Nuevo chat';
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage?.parts?.[0]?.text) {
      return lastMessage.parts[0].text;
    }
    
    return lastMessage?.content || lastMessage?.text || 'Sin mensaje';
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <YStack flex={1} backgroundColor="$background" padding="$4">
        <Text fontSize="$6" fontWeight="bold" marginBottom="$4" color="$color">
          Chats
        </Text>
        
        <TouchableOpacity onPress={handleNewChat}>
          <XStack
            backgroundColor="$blue9"
            padding="$3"
            borderRadius="$4"
            marginBottom="$4"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white" fontWeight="600">
              + Nuevo Chat
            </Text>
          </XStack>
        </TouchableOpacity>

        <Separator marginBottom="$4" />

        {loading && (
          <Text color="$gray11" textAlign="center">
            Cargando chats...
          </Text>
        )}

        {error && (
          <Text color="$red10" textAlign="center">
            {error.message || 'Error al cargar los chats'}
          </Text>
        )}

        <YStack flex={1} gap="$2">
          {chats.map((chat) => (
            <AnimatedChatItem
              key={chat.id}
              isDeleting={deletingChatIds.has(chat.id)}
              onDeleteComplete={() => handleDeleteAnimationComplete(chat.id)}
            >
              <TouchableOpacity onPress={() => handleChatPress(chat.id)}>
                <XStack
                  backgroundColor="$transparent"
                  padding="$3"
                  borderRadius="$3"
                  alignItems="center"
                  justifyContent="space-between"
                  hoverStyle={{
                    backgroundColor: "$gray4",
                  }}
                >
                  <YStack flex={1} marginRight="$2">
                    <Text fontSize="$4" fontWeight="600" color="$color" numberOfLines={1}>
                      {chat.title}
                    </Text>
                  </YStack>
                  <Button
                    size="$2"
                    circular
                    icon={Trash2}
                    backgroundColor="transparent"
                    borderWidth={0}
                    color="$red10"
                    onPress={(event) => handleDeletePress(chat.id, event)}
                    hoverStyle={{
                      backgroundColor: "$red4",
                    }}
                    pressStyle={{
                      backgroundColor: "$red5",
                    }}
                  />
                </XStack>
              </TouchableOpacity>
            </AnimatedChatItem>
          ))}
          
          {!loading && !error && chats.length === 0 && (
            <Text color="$gray11" textAlign="center" marginTop="$4">
              No hay chats aún. ¡Crea tu primer chat!
            </Text>
          )}
        </YStack>
      </YStack>

      <DeleteChatModal
        isOpen={deleteModalState.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteChatMutation.isPending}
      />
    </SafeAreaView>
  );
}