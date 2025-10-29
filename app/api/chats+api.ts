import { db } from '@/db';
import { chatsTable } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET() {
    try {
        const userId = '1';
        
        const chats = await db.select()
            .from(chatsTable)
            .where(eq(chatsTable.userId, userId))
            .orderBy(desc(chatsTable.updatedAt));

        return Response.json(chats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}