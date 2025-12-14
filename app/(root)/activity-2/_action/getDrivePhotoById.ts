"use server";

import { getAuthSession } from "@/lib/auth/session";

export async function getDrivePhotoById(photoId: string) {
  try {
    const session = await getAuthSession();

    if (!photoId) {
      throw new Error("Photo ID is required");
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/drive-lite/photos/${photoId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 30,
          tags: [`driveLitePhoto-${photoId}`],
        },
      }
    );

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(
        body.error || `Failed to fetch photo: ${backendRes.statusText}`
      );
    }

    const result = await backendRes.json();

    // Normalize response
    return result.photo ?? null;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Unknown error occurred while fetching photo");
    }
  }
}
