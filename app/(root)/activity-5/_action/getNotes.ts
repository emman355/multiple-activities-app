'use server';

import { getAuthSession } from '@/lib/auth/session';
import { type JSONContent } from '@tiptap/react';

export type Note = {
  id: number;
  userId: number;
  title: string;
  content: JSONContent;
  category?: string;
  createdAt: string;
  updatedAt: string;
};

export async function getNotes() {
  //!for future use
  //? Set cache lifetime to 5 minutes
  // "use cache";
  // cacheTag("notes");
  // cacheLife({
  //   stale: 300,      // Stale after 5 minutes
  //   revalidate: 600, // Revalidate after 10 minutes
  //   expire: 3600,    // Expire after 1 hour
  // });

  try {
    const session = await getAuthSession();
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 30,
        tags: ['notes'],
      },
    });

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(body.error || `Failed to fetch notes: ${backendRes.statusText}`);
    }

    const notes: Note[] = await backendRes.json();

    return notes;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error('Unknown error occurred while fetching notes');
    }
  }
}
