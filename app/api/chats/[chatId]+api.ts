import { db } from '@/db';
import { chatsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(req: Request, { chatId }: { chatId: string }) {
  try {
    if (!chatId || chatId === 'undefined') {
      return Response.json({ error: 'Chat ID is required' }, { status: 400 });
    }

    const deletedRows = await db.delete(chatsTable)
      .where(eq(chatsTable.id, chatId));

    if (deletedRows.rowCount === 0) {
      return Response.json({ error: 'Chat not found' }, { status: 404 });
    }

    return Response.json({ success: true, message: 'Chat deleted successfully' });
  } catch (error) {
    console.error('Error deleting chat:', error);
    return Response.json({ error: 'Failed to delete chat' }, { status: 500 });
  }
}