'use client';

import { CameraIcon } from 'lucide-react';
import { PhotoGridProps } from '../../types';
import PhotoCard from './photo-card';
import Typography from '@/components/ui/typography';

export default function PhotoGrid({ fetchPhotos }: PhotoGridProps) {
  if (!fetchPhotos || fetchPhotos.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-60 text-center border border-border rounded-lg">
        <CameraIcon className="w-12 h-12 text-muted-foreground mb-2" />
        <Typography variant="subtitle" className="text-muted-foreground">
          No photos found
        </Typography>
        <Typography variant="small" className="text-muted-foreground mt-1">
          Try to add new or refreshing to see your photos.
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Your Photos</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {fetchPhotos.map((photo) => (
          <PhotoCard photo={photo} key={photo.id} />
        ))}
      </div>
    </div>
  );
}
