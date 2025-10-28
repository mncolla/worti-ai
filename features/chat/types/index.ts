export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  parts: MessagePart[];
  createdAt?: Date;
}

export interface MessagePart {
  type: 'text';
  text: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error?: string;
}

export interface ChatActions {
  sendMessage: (text: string) => void;
  stopGeneration: () => void;
  clearChat: () => void;
}