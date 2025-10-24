import { generateAPIUrl } from '@/utils/utils';
import { useChat } from '@ai-sdk/react';
import { SendHorizontal, StopCircle } from '@tamagui/lucide-icons';
import { DefaultChatTransport } from 'ai';
import { fetch as expoFetch } from 'expo/fetch';
import { useState } from 'react';
import Markdown from 'react-native-markdown-display';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Input, ScrollView, Text, XStack, YStack } from 'tamagui';

export default function App() {
  const [input, setInput] = useState('');
  const { messages, error, sendMessage, stop, status } = useChat({
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: generateAPIUrl('/api/chat'),
    }),
    onError: error => console.error(error, 'ERROR'),
  });

  const isLoading = status === "streaming"

  if (error) return <Text color="$red10">{error.message}</Text>;

  const handleSend = () => {
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <YStack flex={1} bg="$background" p="$4" gap="$4">
        {/* Chat messages */}
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <YStack gap="$3" p="$2">
            {messages.map(m => (
              m.role === 'user' ? (
                // User message
                <Card
                  key={m.id}
                  p="$3"
                  bg="$blue2"
                  borderRadius="$5"
                  maxWidth="85%"
                  borderWidth={1}
                  borderColor="$blue4"
                  alignSelf="flex-end"
                >
                  {m.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <Text
                            key={`${m.id}-${i}`}
                            fontSize="$4"
                            color="$blue11"
                            fontWeight="500"
                          >
                            {part.text}
                          </Text>
                        );
                    }
                  })}
                </Card>
              ) : (
                // AI response
                <YStack
                  key={m.id}
                  maxW="85%"
                  gap="$1"
                  self="flex-start"
                >
                  {m.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <Markdown
                            key={`${m.id}-${i}`}
                            style={{
                              body: {
                                fontSize: 14,
                                lineHeight: 22,
                                color: '#374151',
                              },
                              heading1: {
                                fontSize: 16,
                                fontWeight: 'bold',
                                marginVertical: 8,
                                color: '#1f2937',
                              },
                              heading2: {
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginVertical: 6,
                                color: '#1f2937',
                              },
                              paragraph: {
                                marginVertical: 4,
                                fontSize: 14,
                                lineHeight: 22,
                                color: '#374151',
                              },
                              strong: {
                                fontWeight: 'bold',
                                color: '#1f2937',
                              },
                              em: {
                                fontStyle: 'italic',
                              },
                              code_inline: {
                                backgroundColor: '#f3f4f6',
                                paddingHorizontal: 4,
                                paddingVertical: 2,
                                borderRadius: 4,
                                fontSize: 14,
                                fontFamily: 'monospace',
                              },
                              code_block: {
                                backgroundColor: '#f3f4f6',
                                padding: 12,
                                borderRadius: 8,
                                marginVertical: 8,
                              },
                              fence: {
                                backgroundColor: '#f3f4f6',
                                padding: 12,
                                borderRadius: 8,
                                marginVertical: 8,
                              },
                              list_item: {
                                marginVertical: 2,
                              },
                              bullet_list: {
                                marginVertical: 4,
                              },
                              ordered_list: {
                                marginVertical: 4,
                              },
                            }}
                          >
                            {part.text}
                          </Markdown>
                        );
                    }
                  })}
                </YStack>
              )
            ))}
          </YStack>
        </ScrollView>

        {/* Input area */}
        <XStack gap="$2" verticalAlign="center">
          <Input
            flex={1}
            placeholder="Type your message..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            autoFocus={true}
            size="$4"
          />
          {!isLoading ? <Button
            size="$4"
            circular
            icon={SendHorizontal}
            onPress={handleSend}
            disabled={!input.trim()}
            bg="$blue9"
            color="white"
          /> : <Button
            size="$4"
            circular
            icon={StopCircle}
            onPress={stop}
            bg="$red9"
            color="white"
          />}
        </XStack>
      </YStack>
    </SafeAreaView>
  );
}