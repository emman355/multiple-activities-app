"use server";

import { createClient } from "@/lib/supabase/server";

export async function getFoodreviews() {
  try {
    const supabase = await createClient();
    const { data: { session }, error: authError } = await supabase.auth.getSession();

    if (authError) {
      throw new Error(`Auth error: ${authError.message}`);
    }

    if (!session) {
      throw new Error("User not authenticated");
    }

    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/food-review/reviews`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["foodReview"], // optional: tag for manual invalidation
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
      throw new Error("Unknown error occurred while fetching reviews");
    }
  }
}
