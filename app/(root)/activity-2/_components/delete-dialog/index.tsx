import React from 'react';
import Image from 'next/image';
import Typography from '@/components/ui/typography';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CustomDialog } from '@/app/(root)/_components/custom-dialog';
import { Photo } from '../../types';

type DeleteDialogProps = {
  openDelete: boolean;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
  photo: Photo;
  handleDeletePhoto: () => Promise<void> | void;
  isPendingDelete: boolean;
};

export default function DeleteDialog({
  openDelete,
  setOpenDelete,
  photo,
  handleDeletePhoto,
  isPendingDelete,
}: DeleteDialogProps) {
  return (
    <CustomDialog open={openDelete} setOpen={setOpenDelete} title="Delete Photo" className="gap-10">
      <div className="flex flex-col gap-8">
        {/* Preview of the item */}
        <div className="flex items-end gap-3">
          <Image
            src={photo.photoUrl}
            alt={photo.photoName}
            width={100}
            height={100}
            className="rounded-md object-cover border border-border"
          />
          <div className="flex flex-col">
            <Typography variant="subtitle" className="font-semibold">
              {photo.title}
            </Typography>
            <Typography variant="caption" className="text-muted-foreground">
              {photo.description}
            </Typography>
          </div>
        </div>

        {/* Warning message */}
        <div className="bg-destructive/10 border border-destructive/30 rounded-md p-3">
          <Typography variant="small" className="text-destructive font-medium">
            This action cannot be undone.
          </Typography>{' '}
          <Typography variant="small" className="text-destructive">
            Are you sure you want to permanently delete this photo?
          </Typography>
        </div>
      </div>

      <DialogFooter className="gap-4 lg:gap-2">
        <DialogClose asChild>
          <Button size="lg" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button
          onClick={handleDeletePhoto}
          disabled={isPendingDelete}
          size="lg"
          variant="destructive"
        >
          {isPendingDelete ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full" />
              Deleting...
            </span>
          ) : (
            'Delete'
          )}
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
}
