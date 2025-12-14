"use server";

import { getAuthSession } from "@/lib/auth/session";
import { revalidatePath, revalidateTag } from "next/cache";

export async function updateDrivePhoto({
  id,
  file, // optional
  title,
  description,
}: {
  id: string;
  file?: File; // 👈 optional
  title: string;
  description: string;
}) {
  try {
    const session = await getAuthSession();

    if (!id) {
      throw new Error("Photo ID is required");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    // only append file if provided
    if (file) {
      formData.append("file", file);
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/drive-lite/photos/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          // ⚠️ Do NOT set Content-Type when sending FormData — browser will set it with boundary
        },
        body: formData,
      }
    );

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(
        body.error || `Failed to update photo: ${backendRes.statusText}`
      );
    }
    const result = await backendRes.json();

    // ✅ revalidate both path and tag
    revalidatePath("/activity-2");
    revalidatePath(`/activity-2/${id}`);
    revalidateTag("driveLitePhotos", "max");

    return result.photo ?? null;

  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Unknown error occurred while updating photo");
  }
}
