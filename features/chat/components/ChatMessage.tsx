import { Card, Text, XStack, useTheme } from 'tamagui';
import Markdown from 'react-native-markdown-display';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const theme = useTheme();
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <XStack justifyContent="flex-end" paddingHorizontal="$3">
        <Card
          padding="$3"
          backgroundColor="$blue9"
          borderRadius="$4"
          maxWidth="80%"
        >
          {message.parts.map((part, i) => (
            <Text
              key={`${message.id}-${i}`}
              fontSize="$4"
              color="white"
            >
              {part.text}
            </Text>
          ))}
        </Card>
      </XStack>
    );
  }

  return (
    <XStack justifyContent="flex-start" paddingHorizontal="$3">
      <Card
        padding="$3"
        backgroundColor="$gray2"
        borderRadius="$4"
        maxWidth="80%"
      >
        {message.parts.map((part, i) => (
          <Markdown
            key={`${message.id}-${i}`}
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
        ))}
      </Card>
    </XStack>
  );
}