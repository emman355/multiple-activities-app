'use client';

import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { formatFileSize } from '@/lib/utils';
import Image from 'next/image';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Photo } from '../../../types';
import { useEffect, useState, useTransition } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import EditDialog from '../../edit-dialog';
import DeleteDialog from '../../delete-dialog';
import { removeDrivePhoto } from '../../../_action/removeDrivePhoto';
import { updateDrivePhoto } from '../../../_action/updateDrivePhoto';
import { DriveLiteAddFormValues } from '@/lib/schema/drive-lite-photo';
import { useRouter } from 'next/navigation';

type DetailsItemProps = {
  photo: Photo;
};

export default function DetailsItem({ photo }: DetailsItemProps) {
  const [openEdit, setOpenEdit] = useState(false);
  const [isPendingEdit, startTransitionEdit] = useTransition();
  const [openDelete, setOpenDelete] = useState(false);
  const [isPendingDelete, startTransitionDelete] = useTransition();
  const [loaded, setLoaded] = useState(false);

  const router = useRouter(); // 👈 initialize router

  const handleDeletePhoto = async () => {
    startTransitionDelete(async () => {
      try {
        await removeDrivePhoto(photo.id);
        // close only after success
        setOpenDelete(false);
        router.push('/activity-2'); // 👈 redirect after success
      } catch (error) {
        // Rethrow so Next.js error.tsx catches it
        if (error instanceof Error) {
          throw error;
        } else {
          throw new Error(`Failed to delete review: ${error}`);
        }
      }
    });
  };

  const handleEditPhotoDetails = async (data: DriveLiteAddFormValues) => {
    startTransitionEdit(async () => {
      try {
        await updateDrivePhoto({
          id: photo.id, // 👈 pass the photo id
          file: data.photo ?? undefined, // 👈 optional file
          title: data.title,
          description: data.description,
        });

        setOpenEdit(false); // close edit dialog after submit
      } catch (error) {
        // Rethrow so Next.js error.tsx catches it
        if (error instanceof Error) {
          throw error;
        } else {
          throw new Error(`Failed to edit review: ${error}`);
        }
      }
    });
  };

  useEffect(() => {
    let mounted = true;
    const id = window.setTimeout(() => {
      if (mounted) setLoaded(false);
    }, 0);

    return () => {
      mounted = false;
      clearTimeout(id);
    };
  }, [photo.photoUrl]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative w-full h-75 md:h-90 lg:h-full rounded-lg border border-border overflow-hidden shadow-md">
          {!loaded && <Skeleton className="absolute inset-0 bg-muted rounded-xs" />}
          <Image
            alt={photo.photoName}
            src={photo.photoUrl}
            fill
            className="object-contain md:object-cover"
            loading="eager"
            priority
            unoptimized
            key={photo.photoUrl}
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* Metadata */}
        <div className="flex flex-col gap-8">
          {/* Title */}
          <Typography variant="h2" className="font-bold text-foreground">
            {photo.title}
          </Typography>

          {/* Section Header */}
          <Typography variant="h4" className="font-semibold text-foreground">
            Photo Information
          </Typography>

          {/* Metadata fields */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Typography variant="subtitle" className="font-medium text-foreground">
                File Name
              </Typography>
              <Typography variant="body1" className="text-muted-foreground">
                {photo.photoName}
              </Typography>
              <Typography variant="small" className="text-xs text-muted-foreground">
                Unique identifier for this photo
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle" className="font-medium text-foreground">
                Created
              </Typography>
              <Typography variant="body1" className="text-muted-foreground">
                {new Date(photo.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="small" className="text-xs text-muted-foreground">
                Original upload date
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle" className="font-medium text-foreground">
                Modified
              </Typography>
              <Typography variant="body1" className="text-muted-foreground">
                {new Date(photo.updatedAt).toLocaleDateString()}
              </Typography>
              <Typography variant="small" className="text-xs text-muted-foreground">
                Last updated
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle" className="font-medium text-foreground">
                File Size
              </Typography>
              <Typography variant="body1" className="text-muted-foreground">
                {formatFileSize(photo.fileSize)}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle" className="font-medium text-foreground">
                Type
              </Typography>
              <Typography variant="body1" className="text-muted-foreground">
                {photo.fileType}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle" className="font-medium text-foreground">
                Dimensions
              </Typography>
              <Typography
                variant="body1"
                className="text-muted-foreground"
              >{`${photo.height} x ${photo.width}`}</Typography>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <Typography variant="h4" className="font-semibold text-foreground mb-2">
              Description
            </Typography>
            <div className="bg-background/40 p-4 rounded-md">
              <Typography variant="body1" className="text-muted-foreground leading-relaxed">
                {photo.description || 'No description provided for this photo.'}
              </Typography>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8">
            <Typography variant="h4" className="font-semibold text-foreground mb-4">
              Actions
            </Typography>
            <div className="flex gap-4 flex-col md:flex-row">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                aria-label="Edit photo details"
                onClick={() => setOpenEdit(true)}
              >
                <MdOutlineModeEditOutline className="mr-2 h-4 w-4" />
                Edit Details
              </Button>
              <Button
                variant="destructive"
                size="lg"
                className="w-full"
                aria-label="Delete photo"
                onClick={() => setOpenDelete(true)}
              >
                <RiDeleteBin6Line className="mr-2 h-4 w-4" />
                Delete Photo
              </Button>
            </div>
          </div>
        </div>
      </div>
      <EditDialog
        photo={photo}
        handleSubmit={handleEditPhotoDetails}
        isPendingEdit={isPendingEdit}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
      />

      <DeleteDialog
        photo={photo}
        handleDeletePhoto={handleDeletePhoto}
        isPendingDelete={isPendingDelete}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
      />
    </div>
  );
}
