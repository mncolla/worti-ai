import { ChatScreen } from '@/features/chat';
import { useLocalSearchParams } from 'expo-router';

export default function Chat() {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  
  return <ChatScreen chatId={chatId} />;
}