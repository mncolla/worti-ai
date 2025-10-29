import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Separator, Text, XStack, YStack } from 'tamagui';
import { useChatsQuery } from '../queries';

export function ChatList(props: DrawerContentComponentProps) {
  const { data: chats = [], isLoading: loading, error } = useChatsQuery();

  const handleChatPress = (chatId: string) => {
    router.push(`/${chatId}`);
    props.navigation.closeDrawer();
  };

  const handleNewChat = () => {
    router.push('/');
    props.navigation.closeDrawer();
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
            <TouchableOpacity key={chat.id} onPress={() => handleChatPress(chat.id)}>
              <YStack
                backgroundColor="$gray3"
                padding="$3"
                borderRadius="$3"
                borderWidth={1}
                borderColor="$borderColor"
                hoverStyle={{
                  backgroundColor: "$gray4",
                }}
              >
                <Text fontSize="$4" fontWeight="600" color="$color" numberOfLines={1}>
                  {chat.title}
                </Text>
                <Text fontSize="$3" color="$gray11" numberOfLines={2} marginTop="$1">
                  {getLastMessage(chat.messages)}
                </Text>
                <Text fontSize="$2" color="$gray10" marginTop="$2">
                  ID: {chat.id}
                </Text>
              </YStack>
            </TouchableOpacity>
          ))}
          
          {!loading && !error && chats.length === 0 && (
            <Text color="$gray11" textAlign="center" marginTop="$4">
              No hay chats aún. ¡Crea tu primer chat!
            </Text>
          )}
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}