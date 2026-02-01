'use server';

import { revalidateTag, revalidatePath } from 'next/cache';
import { getAuthSession } from '@/lib/auth/session';

export async function removePokemonReview(reviewId: string, pokemonName: string) {
  try {
    const session = await getAuthSession();

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pokemon-review/${reviewId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(body.error || `Failed to delete review: ${backendRes.statusText}`);
    }

    const deletedReview = await backendRes.json();

    // ✅ Revalidate cache so UI updates
    revalidateTag('pokemonReview', 'max');
    revalidatePath(`/activity-4/${pokemonName}`);

    return deletedReview;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error('Unknown error occurred while deleting Pokémon review');
    }
  }
}
