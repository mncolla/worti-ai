import { useAppTheme } from '@/contexts/ThemeContext';
import { generateAPIUrl } from '@/utils/utils';
import { useChat } from '@ai-sdk/react';
import { Moon, SendHorizontal, StopCircle, Sun } from '@tamagui/lucide-icons';
import { DefaultChatTransport } from 'ai';
import { fetch as expoFetch } from 'expo/fetch';
import { useState } from 'react';
import Markdown from 'react-native-markdown-display';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Input, ScrollView, Text, XStack, YStack, useTheme } from 'tamagui';

export default function App() {
  const [input, setInput] = useState('');
  const { actualTheme, toggleTheme } = useAppTheme();
  const theme = useTheme();
  const { messages, error, sendMessage, stop, status } = useChat({
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: generateAPIUrl('/api/chat'),
    }),
    onError: error => console.error(error, 'ERROR'),
  });

  const isLoading = status === "streaming"

  if (error) return <Text color="$color">{error.message}</Text>;

  const handleSend = () => {
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'top']}>
      <YStack flex={1} backgroundColor="$background" gap="$3">
        {/* Header */}
        <XStack
          backgroundColor="$background"
          padding="$4"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderBottomColor="$borderColor"
        >
          <Text fontSize="$6" fontWeight="600" color="$color">
            Chat AI
          </Text>
          <Button
            size="$3"
            circular
            icon={actualTheme === 'dark' ? Sun : Moon}
            onPress={toggleTheme}
            backgroundColor="$blue10"
            color="white"
          />
        </XStack>

        {/* Chat messages */}
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <YStack gap="$3" padding="$4">
            {messages.map(m => (
              m.role === 'user' ? (
                // User message
                <XStack key={m.id} justifyContent="flex-end" paddingHorizontal="$3">
                  <Card
                    padding="$3"
                    backgroundColor="$blue9"
                    borderRadius="$4"
                    maxWidth="80%"
                  >
                    {m.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text':
                          return (
                            <Text
                              key={`${m.id}-${i}`}
                              fontSize="$4"
                              color="white"
                            >
                              {part.text}
                            </Text>
                          );
                      }
                    })}
                  </Card>
                </XStack>
              ) : (
                // AI response
                <XStack key={m.id} justifyContent="flex-start" paddingHorizontal="$3">
                  <Card
                    padding="$3"
                    backgroundColor="$gray2"
                    borderRadius="$4"
                    maxWidth="80%"
                  >
                    {m.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text':
                          return (
                            <Markdown
                              key={`${m.id}-${i}`}
                              style={{
                                body: {
                                  fontSize: 15,
                                  lineHeight: 20,
                                  color: theme.color?.get(),
                                },
                                heading1: {
                                  fontSize: 18,
                                  fontWeight: 'bold',
                                  marginVertical: 8,
                                  color: theme.color?.get(),
                                },
                                heading2: {
                                  fontSize: 16,
                                  fontWeight: 'bold',
                                  marginVertical: 6,
                                  color: theme.color?.get(),
                                },
                                paragraph: {
                                  marginVertical: 4,
                                  fontSize: 15,
                                  lineHeight: 20,
                                  color: theme.color?.get(),
                                },
                                strong: {
                                  fontWeight: 'bold',
                                  color: theme.color?.get(),
                                },
                                em: {
                                  fontStyle: 'italic',
                                  color: theme.color?.get(),
                                },
                                code_inline: {
                                  backgroundColor: theme.gray3?.get(),
                                  color: theme.blue10?.get(),
                                  paddingHorizontal: 4,
                                  paddingVertical: 2,
                                  borderRadius: 4,
                                  fontSize: 13,
                                  fontFamily: 'monospace',
                                },
                                code_block: {
                                  backgroundColor: theme.gray3?.get(),
                                  color: theme.color?.get(),
                                  padding: 12,
                                  borderRadius: 8,
                                  marginVertical: 8,
                                  borderWidth: 1,
                                  borderColor: theme.borderColor?.get(),
                                },
                                fence: {
                                  backgroundColor: theme.gray3?.get(),
                                  color: theme.color?.get(),
                                  padding: 12,
                                  borderRadius: 8,
                                  marginVertical: 8,
                                  borderWidth: 1,
                                  borderColor: theme.borderColor?.get(),
                                },
                                list_item: {
                                  marginVertical: 2,
                                  color: theme.color?.get(),
                                },
                                bullet_list: {
                                  marginVertical: 4,
                                },
                                ordered_list: {
                                  marginVertical: 4,
                                },
                                blockquote: {
                                  backgroundColor: theme.background?.get(),
                                  borderLeftWidth: 4,
                                  borderLeftColor: theme.blue9?.get(),
                                  paddingLeft: 12,
                                  paddingVertical: 8,
                                  marginVertical: 8,
                                  fontStyle: 'italic',
                                },
                              }}
                            >
                              {part.text}
                            </Markdown>
                          );
                      }
                    })}
                  </Card>
                </XStack>
              )
            ))}
          </YStack>
        </ScrollView>

        {/* Input area */}
        <XStack
          gap="$3"
          alignItems="center"
          padding="$4"
          backgroundColor="$background"
          borderTopWidth={1}
          borderTopColor="$borderColor"
        >
          <Input
            flex={1}
            placeholder="Message Chat AI..."
            placeholderTextColor="$gray10"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            autoFocus={true}
            size="$4"
            backgroundColor="$gray2"
            borderColor="$borderColor"
            borderRadius="$4"
            color="$color"
          />
          {!isLoading ? (
            <Button
              size="$4"
              circular
              icon={SendHorizontal}
              onPress={handleSend}
              disabled={!input.trim()}
              backgroundColor="$blue10"
              color="white"
              opacity={!input.trim() ? 0.5 : 1}
            />
          ) : (
            <Button
              size="$4"
              circular
              icon={StopCircle}
              onPress={stop}
              backgroundColor="$red10"
              color="white"
            />
          )}
        </XStack>
      </YStack>
    </SafeAreaView>
  );
}