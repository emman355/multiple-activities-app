"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createFoodReview({
  photoName,
  file,
  location,
  rating = 0,
  review,
}: {
  photoName: string;
  file: File;
  location: string;
  rating: number;
  review: string;
}) {
  try {
    const supabase = await createClient();
    const { data: { session }, error: authError } = await supabase.auth.getSession();

    if (authError) {
      throw new Error(`Auth error: ${authError.message}`);
    }

    if (!session) {
      throw new Error("User not authenticated");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("photoName", photoName);
    formData.append("location", location);
    formData.append("rating", String(rating));
    formData.append("review", review);

    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/food-review/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      body: formData,
    });

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(body.error || `Failed to add review: ${backendRes.statusText}`);
    }

    const created = await backendRes.json();

    // ✅ revalidate both path and tag
    revalidatePath("/activity-3");
    revalidateTag("foodReview", "max");

    return created;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Unknown error occurred while adding review");
    }
  }
}
