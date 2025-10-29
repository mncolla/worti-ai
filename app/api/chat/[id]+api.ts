import { db } from '@/db';
import { chatsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(_req: Request, { id }: { id: string }) {
    try {
        const chat = await db.select()
            .from(chatsTable)
            .where(eq(chatsTable.id, id))
            .limit(1);

        if (chat.length === 0) {
            return Response.json({ error: 'Chat not found' }, { status: 404 });
        }

        return Response.json(chat[0]);
    } catch (error) {
        console.error('Error fetching chat:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}