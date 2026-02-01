'use server';

import { getAuthSession } from '@/lib/auth/session';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function removeFoodReview(id: string) {
  try {
    const session = await getAuthSession();

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/food-review/reviews/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(body.error || `Failed to delete review: ${backendRes.statusText}`);
    }

    // ✅ revalidate both path and tag so UI updates
    revalidatePath('/activity-3');
    revalidateTag('foodReview', 'max');

    return { success: true };
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error('Unknown error occurred while deleting review');
    }
  }
}
