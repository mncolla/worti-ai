import { vertex } from '@ai-sdk/google-vertex';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
export async function POST(req: Request) {

    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
        model: vertex('gemini-2.5-flash-lite'),
        messages: convertToModelMessages(messages),
    })

    return result.toUIMessageStreamResponse({
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Encoding': 'none'
        }
    })
}