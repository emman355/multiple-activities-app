import React from 'react'
import { foodReview } from '..'
import { CustomDialog } from '@/app/(root)/activity-3/_components/custom-dialog'
import FoodReviewForm, { FoodReviewFormValues } from '@/app/(root)/activity-3/_components/food-review-form'

type EditDialogProps = {
  handleSubmit: (data: FoodReviewFormValues) => Promise<void>
  openEdit: boolean
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
  foodReview: foodReview
  isPendingEdit: boolean
}

export default function EditDialog({ handleSubmit, openEdit, setOpenEdit, foodReview, isPendingEdit}: EditDialogProps) {
  return (
    <CustomDialog open={openEdit} setOpen={setOpenEdit} title="Edit Food Review">
      <FoodReviewForm
        defaultValues={{
          food: foodReview.photoName,
          restourant: foodReview.location,
          photo: undefined,
          rating: foodReview.rating,
          review: foodReview.review,
        }}
        onSubmit={handleSubmit}
        submitLabel="Update"
        existingUrl={foodReview.photoUrl}
        isPending={isPendingEdit}
      />
    </CustomDialog>
  )
}
