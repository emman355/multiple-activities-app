'use server';

import { revalidateTag, revalidatePath } from 'next/cache';
import { getAuthSession } from '@/lib/auth/session';

export async function updatePokemonReview(
  reviewId: string,
  values: { rating?: number; content?: string; pokemonName: string }
) {
  try {
    const session = await getAuthSession();

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pokemon-review/${reviewId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: values.rating,
          content: values.content,
        }),
      }
    );

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(body.error || `Failed to update review: ${backendRes.statusText}`);
    }

    const updatedReview = await backendRes.json();

    // ✅ Revalidate cache
    revalidateTag('pokemonReview', 'max'); // revalidate any fetches tagged with "pokemonReview"
    revalidatePath(`/activity-4/${values.pokemonName}`); // revalidate the specific page

    return updatedReview;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error('Unknown error occurred while updating Pokémon review');
    }
  }
}
