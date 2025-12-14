import React, { Suspense } from 'react'
import PhotoDetails from '../_components/photo-details';
import PhotoDetailsSkeleton from '../_components/photo-details/details-skeleton';

type PhotoId = {
  photoId: string
}

export default async function page({ params }: { params: Promise<PhotoId> }) {
  const { photoId } = await params;
  return (
    <Suspense fallback={<PhotoDetailsSkeleton />}>
      <PhotoDetails photoId={photoId} />
    </Suspense>
  )
}
