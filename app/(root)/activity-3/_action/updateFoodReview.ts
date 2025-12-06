"use server";

import { getAuthSession } from "@/lib/auth/session";
import { revalidatePath, revalidateTag } from "next/cache";

export async function updateFoodReview({
  id,
  photoName,
  file, // optional
  location,
  rating,
  review,
}: {
  id: string;
  photoName: string;
  file?: File; // 👈 optional
  location: string;
  rating: number;
  review: string;
}) {
  try {
    const session = await getAuthSession();

    const formData = new FormData();
    formData.append("photoName", photoName);
    formData.append("location", location);
    formData.append("rating", String(rating));
    formData.append("review", review);

    // only append file if provided
    if (file) {
      formData.append("file", file);
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/food-review/reviews/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      }
    );

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(body.error || `Failed to update review: ${backendRes.statusText}`);
    }

    const updated = await backendRes.json();

    // ✅ revalidate both path and tag
    revalidateTag("foodReview", "max");
    revalidatePath("/activity-3");

    return updated;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Unknown error occurred while updating review");
    }
  }
}
