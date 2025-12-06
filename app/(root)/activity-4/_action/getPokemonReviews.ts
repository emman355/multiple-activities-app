"use server";

import { getAuthSession } from "@/lib/auth/session";

export async function getPokemonReviews() {
  try {
    const session = await getAuthSession();

    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pokemon-review`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["pokemonReview"], // optional: tag for manual invalidation
      },
    });

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(body.error || `Failed to fetch reviews: ${backendRes.statusText}`);
    }

    const reviews = await backendRes.json();
    return Array.isArray(reviews) ? reviews : [];
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Unknown error occurred while fetching Pokémon reviews");
    }
  }
}
