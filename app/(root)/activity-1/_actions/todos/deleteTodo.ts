'use server';

import { getAuthSession } from '@/lib/auth/session';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function deleteTodo(id: number) {
  try {
    const session = await getAuthSession();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      // Try to parse error message from backend
      const errorBody = await res.json().catch(() => null);
      const message = errorBody?.error || res.statusText || 'Unknown error';
      throw new Error(message);
    }

    revalidateTag('todos', 'max');
    revalidatePath('/activity-1');

    return { success: true };
  } catch (err) {
    // Return error so client can display it
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}
