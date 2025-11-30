'use client';

import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog'
import { useState, useTransition } from 'react'
import { createFoodReview } from '../action/createFoodReview'
import FoodReviewForm, { FoodReviewFormValues } from '../_components/food-review-form';

export default function UploadFoodReview() {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (data: FoodReviewFormValues) => {
    if (!data.photo) return
    startTransition(async () => {
      await createFoodReview({
        file: data.photo!,
        photoName: data.food,
        location: data.restourant,
        rating: data.rating,
        review: data.review,
      })
      setOpen(false) // ✅ close dialog after submit
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg">Upload Food Review</Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Share Your Food Experience</DialogTitle>
          <DialogDescription>
            Upload a photo and tell us what you think about your latest meal.
          </DialogDescription>
        </DialogHeader>
        <FoodReviewForm
          defaultValues={{
            food: '',
            restourant: '',
            photo: undefined,
            rating: 0,
            review: '',
          }}
          onSubmit={handleSubmit}
          submitLabel={isPending ? 'Uploading...' : 'Upload'}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
