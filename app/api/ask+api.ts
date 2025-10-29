import { db } from '@/db';
import { chatsTable } from '@/db/schema';
import { vertex } from '@ai-sdk/google-vertex';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {

    const { messages, id }: { messages: UIMessage[], id: string } = await req.json();

    let existingChat = null;
    let allMessages = messages;

    if (id && id !== 'undefined') {
        const existingChats = await db.select().from(chatsTable).where(eq(chatsTable.id, id));
        if (existingChats.length > 0) {
            existingChat = existingChats[0];
        }
    }

    const result = streamText({
        model: vertex('gemini-2.5-flash-lite'),
        messages: convertToModelMessages(allMessages),
        onFinish: async ({ text }) => {
            const aiMessage: UIMessage = {
                id: `ai-${Date.now()}`,
                role: 'assistant',
                parts: [{ type: 'text', text: text }]
            };

            const finalMessages = [...allMessages, aiMessage];
            
            const lastUserMessage = allMessages.filter(msg => msg.role === 'user').pop();
            const messageText = lastUserMessage?.parts?.[0]?.type === 'text' 
                ? lastUserMessage.parts[0].text 
                : 'Nuevo chat';
            const title = messageText.substring(0, 50) || `Chat ${id}`;

            if (existingChat) {
                await db.update(chatsTable)
                    .set({ 
                        messages: finalMessages,
                        title: title,
                        updatedAt: new Date()
                    })
                    .where(eq(chatsTable.id, id));
            } else {
                await db.insert(chatsTable).values({
                    id,
                    title: title,
                    userId: '1',
                    messages: finalMessages
                });
            }
        },
    })

    return result.toUIMessageStreamResponse({
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Encoding': 'none'
        }
    })
}