import { generateAPIUrl } from '@/utils/utils';
import { fetch as expoFetch } from 'expo/fetch';

export interface SendMessageRequest {
  text: string;
  conversationId?: string;
}

export interface SendMessageResponse {
  id: string;
  text: string;
  role: 'assistant';
  conversationId: string;
}

export const chatService = {
  sendMessage: async (request: SendMessageRequest): Promise<SendMessageResponse> => {
    const response = await expoFetch(generateAPIUrl('/api/chat'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Chat service error: ${response.statusText}`);
    }

    return response.json();
  },
};