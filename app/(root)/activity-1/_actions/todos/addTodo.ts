'use server';

import { getAuthSession } from '@/lib/auth/session';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function addTodo({ title }: { title: string }) {
  try {
    const session = await getAuthSession();

    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (!backendRes.ok) {
      // Parse backend error JSON if available
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(body.error || `Failed to add todo: ${backendRes.statusText}`);
    }

    revalidateTag('todos', 'max');
    revalidatePath('/activity-1');
  } catch (err) {
    // Rethrow so Next.js error.tsx catches it
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error('Unknown error occurred while adding todo');
    }
  }
}
