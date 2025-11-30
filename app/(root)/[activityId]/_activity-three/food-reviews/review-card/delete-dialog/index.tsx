import React from 'react'
import { CustomDialog } from '../../../_components/custom-dialog'
import Image from 'next/image'
import Typography from '@/components/ui/typography'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { foodReview } from '..'

type DeleteDialogProps = {
  openDelete: boolean
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>
  foodReview: foodReview
  handleDeleteReview: () => Promise<void> | void
  isPendingDelete: boolean
}

export default function DeleteDialog({ openDelete, setOpenDelete, foodReview, handleDeleteReview, isPendingDelete}: DeleteDialogProps) {
  return (
    <CustomDialog open={openDelete} setOpen={setOpenDelete} title="Delete Food Review" className='gap-10'>
      <div className="flex flex-col gap-8">
        {/* Preview of the item */}
        <div className="flex items-end gap-3">
          <Image
            src={foodReview.photoUrl}
            alt={foodReview.photoName}
            width={100}
            height={100}
            className="rounded-md object-cover border border-gray-700"
          />
          <div className="flex flex-col">
            <Typography variant="subtitle" className="font-semibold">
              {foodReview.photoName}
            </Typography>
            <Typography variant="caption" className="text-gray-400">
              {foodReview.location}
            </Typography>
          </div>
        </div>

        {/* Warning message */}
        <div className="bg-red-950/30 border border-red-700 rounded-md p-3">
          <Typography variant="small" className="text-red-400 font-medium">
            This action cannot be undone.
          </Typography>
          {" "}
          <Typography variant="small" className="text-red-300">
            Are you sure you want to permanently delete this review and its photo?
          </Typography>
        </div>
      </div>

      <DialogFooter className="gap-4 lg:gap-2">
        <DialogClose asChild>
          <Button size="lg" variant="outline">Cancel</Button>
        </DialogClose>
        <Button
          onClick={handleDeleteReview}
          disabled={isPendingDelete}
          size="lg"
          variant="destructive" // 👈 style delete button in red
        >
          {isPendingDelete ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full" />
              Deleting...
            </span>
          ) : (
            "Delete"
          )}
        </Button>
      </DialogFooter>
    </CustomDialog>
  )
}
