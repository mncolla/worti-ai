import { vertex } from '@ai-sdk/google-vertex';
import { convertToModelMessages, streamText, UIMessage } from 'ai';

const loadChat = async (id: string) => [];

export async function POST(req: Request) {

    const { message, id }: { message: UIMessage, id: string } = await req.json();

    const previousMessages = await loadChat(id);

    const messages = [...previousMessages, message];

    const result = streamText({
        model: vertex('gemini-2.5-flash-lite'),
        messages: convertToModelMessages(messages),
        onFinish: ({ response }) => {
            console.log(response.messages)
        },
    })

    return result.toUIMessageStreamResponse({
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Encoding': 'none'
        }
    })
}