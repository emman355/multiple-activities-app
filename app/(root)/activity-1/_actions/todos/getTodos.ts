'use server';

import { getAuthSession } from '@/lib/auth/session';

export async function getTodos() {
  try {
    const session = await getAuthSession();

    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos`, {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 30,
        tags: ['todos'],
      },
    });

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(body.error || `Failed to fetch todos: ${backendRes.statusText}`);
    }

    const todos = await backendRes.json();
    return todos;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error('Unknown error occurred while fetching todos');
    }
  }
}
