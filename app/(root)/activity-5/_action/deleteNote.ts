// app/activity-5/_action/deleteNote.ts
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { getAuthSession } from '@/lib/auth/session';

export async function deleteNote(noteId: string) {
  try {
    const session = await getAuthSession();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete note');
    }

    // Revalidate caches
    revalidateTag('notes', 'max');
    revalidateTag(`note-${noteId}`, 'max');
    revalidatePath('/activity-5');

    return { success: true };
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
}
