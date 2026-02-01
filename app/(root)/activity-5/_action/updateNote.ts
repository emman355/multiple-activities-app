'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { type JSONContent } from '@tiptap/react';
import { getAuthSession } from '@/lib/auth/session';

export async function updateNote(
  noteId: string,
  data: {
    title: string;
    content: JSONContent;
    category: string;
  }
) {
  try {
    const session = await getAuthSession();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        content: data.content,
        category: data.category,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update note');
    }

    const updatedNote = await response.json();

    // Revalidate caches
    revalidateTag('notes', 'max');
    revalidateTag(`note-${noteId}`, 'max');
    revalidatePath('/activity-5');
    revalidatePath(`/activity-5/${noteId}`);
    revalidatePath(`/activity-5/${noteId}/edit`);

    return updatedNote;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Unknown error occurred while updating note');
    }
  }
}
