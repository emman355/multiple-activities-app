"use server";

import { getAuthSession } from "@/lib/auth/session";

export async function getDrivePhotos() {
  try {
    const session = await getAuthSession();

    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/drive-lite/photos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 30,
        tags: ["driveLitePhotos"], // optional: tag for manual invalidation
      },
    });

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(body.error || `Failed to fetch photos: ${backendRes.statusText}`);
    }

    const result = await backendRes.json();

    // Normalize response
    return Array.isArray(result.photos) ? result.photos : [];
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Unknown error occurred while fetching photos");
    }
  }
}
