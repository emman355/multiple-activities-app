'use server';

import { getAuthSession } from '@/lib/auth/session';
import { DriveLiteAddFormValues } from '@/lib/schema/drive-lite-photo';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function addNewPhoto(values: DriveLiteAddFormValues) {
  try {
    const session = await getAuthSession();

    // Build multipart form data
    const formData = new FormData();
    if (values.photo) {
      formData.append('file', values.photo); // backend expects "file"
    }
    formData.append('title', values.title);
    formData.append('description', values.description);

    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/drive-lite/photos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        // ⚠️ Do NOT set Content-Type manually; fetch will set it for FormData
      },
      body: formData,
    });

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(body.error || `Failed to upload photo: ${backendRes.statusText}`);
    }

    const result = await backendRes.json();
    // ✅ revalidate both path and tag
    revalidatePath('/activity-2');
    revalidateTag('driveLitePhotos', 'max');

    // Normalize response
    return result.photo;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error('Unknown error occurred while uploading photo');
    }
  }
}
