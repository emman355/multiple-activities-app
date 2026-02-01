'use server';

import { getAuthSession } from '@/lib/auth/session';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function removeDrivePhoto(photoId: string) {
  try {
    const session = await getAuthSession();

    if (!photoId) {
      throw new Error('Photo ID is required');
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/drive-lite/photos/${photoId}`,
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
      throw new Error(body.error || `Failed to delete photo: ${backendRes.statusText}`);
    }

    const result = await backendRes.json();

    revalidatePath('/activity-2');
    revalidateTag('driveLitePhotos', 'max');
    return result.photoId ?? photoId;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error('Unknown error occurred while deleting photo');
  }
}
