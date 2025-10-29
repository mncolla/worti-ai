import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, YStack, XStack, Separator } from 'tamagui';

// Datos fake de chats
const FAKE_CHATS = [
  { id: '1', title: 'Chat sobre React Native', lastMessage: 'Hola, necesito ayuda con...' },
  { id: '2', title: 'Consulta de TypeScript', lastMessage: 'Tengo problemas con tipos...' },
  { id: '3', title: 'Ayuda con Expo Router', lastMessage: 'Como implementar navegación...' },
  { id: '4', title: 'Preguntas de UI/UX', lastMessage: 'Qué opinás sobre este diseño...' },
  { id: '5', title: 'Debugging de aplicación', lastMessage: 'Mi app se crashea cuando...' },
];

export function ChatList(props: DrawerContentComponentProps) {
  const handleChatPress = (chatId: string) => {
    router.push(`/${chatId}`);
    props.navigation.closeDrawer();
  };

  const handleNewChat = () => {
    router.push('/');
    props.navigation.closeDrawer();
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

        <YStack flex={1} gap="$2">
          {FAKE_CHATS.map((chat) => (
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
                  {chat.lastMessage}
                </Text>
                <Text fontSize="$2" color="$gray10" marginTop="$2">
                  ID: {chat.id}
                </Text>
              </YStack>
            </TouchableOpacity>
          ))}
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}