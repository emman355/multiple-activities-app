"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { PokemonReviewFormValues } from "../[...name]/_components/review-form";
import { getAuthSession } from "@/lib/auth/session";

export async function createPokemonReview(
  values: PokemonReviewFormValues & { pokemonId: number; pokemonName: string }
) {
  try {
    const session = await getAuthSession();

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pokemon-review`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pokemonId: values.pokemonId,
          pokemonName: values.pokemonName,
          rating: values.rating,
          content: values.review,
        }),
      }
    );

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(body.error || `Failed to create review: ${backendRes.statusText}`);
    }

    const createdReview = await backendRes.json();

    // ✅ Revalidate cache
    revalidateTag("pokemonReview", "max"); // revalidate any fetches tagged with "pokemonReview"
    revalidatePath(`/activity-4/${values.pokemonName}`); // revalidate the specific page

    return createdReview;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Unknown error occurred while creating Pokémon review");
    }
  }
}
