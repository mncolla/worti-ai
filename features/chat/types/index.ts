import { UIMessage } from 'ai';

export interface Chat {
  id: string;
  userId: string;
  title: string;
  messages: UIMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
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