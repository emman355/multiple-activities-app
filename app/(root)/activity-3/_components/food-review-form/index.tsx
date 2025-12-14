// components/food-review-form.tsx
"use client"

import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ACCEPTED_REGEX } from "@/lib/schema/constants"
import Ratings from "../../../_components/ratings"
import Review from "../../../_components/review"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import UploadPhoto from "@/app/(root)/_components/upload-photo"

const schema = yup.object({
  food: yup.string()
    .required('Food name is required')
    .min(2, 'Food must be at least 2 characters')
    .matches(ACCEPTED_REGEX, "Only letters, numbers, and basic punctuation are allowed"),
  restourant: yup.string()
    .min(2, 'Restourant must be at least 2 characters')
    .required('Restaurant is required')
    .matches(ACCEPTED_REGEX, "Only letters, numbers, and basic punctuation are allowed"),
  photo: yup.mixed<File>()
    .nullable()
    .required('Photo is required')
    .when('$isEdit', {
      is: true,
      then: (s) => s.optional(), // optional
      otherwise: (s) => s.required('Photo is required'),
    }),
  rating: yup.number()
    .required('Rating is required')
    .min(1, 'Minimum rating is 1')
    .max(5, 'Maximum rating is 5'),
  review: yup.string()
    .required('Review is required')
    .min(10, 'Review must be at least 10 characters')
    .matches(ACCEPTED_REGEX, "Only letters, numbers, and basic punctuation are allowed"),
}).required()

export type FoodReviewFormValues = yup.InferType<typeof schema>

type Props = {
  defaultValues?: Partial<FoodReviewFormValues>
  onSubmit: (values: FoodReviewFormValues) => Promise<void>
  submitLabel?: string
  isPending?: boolean
  existingUrl?: string
}

export default function FoodReviewForm({ defaultValues, onSubmit, submitLabel = "Save", isPending, existingUrl }: Props) {

  const { control, setError, clearErrors, handleSubmit, formState: { errors, isDirty } } = useForm<FoodReviewFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
    context: { isEdit: !!existingUrl },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      {/* Photo */}
      <div className="flex flex-col gap-2">
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <UploadPhoto
              value={field.value}
              onChange={field.onChange}
              setError={setError}
              clearErrors={clearErrors}
              existingUrl={existingUrl}
            />
          )}
        />
        {errors.photo && <span className="text-red-500">{errors.photo.message}</span>}
      </div>

      {/* Food + Restaurant */}
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <Label>Food/Dish Name</Label>
          <Controller name="food" control={control} render={({ field }) => <Input {...field} placeholder="e.g. Chicken Adobo" />} />
          {errors.food && <span className="text-red-500">{errors.food.message}</span>}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <Label>Restaurant/Location</Label>
          <Controller name="restourant" control={control} render={({ field }) => <Input {...field} placeholder="e.g. Lola's Kitchen, Makati" />} />
          {errors.restourant && <span className="text-red-500">{errors.restourant.message}</span>}
        </div>
      </div>

      {/* Rating */}
      <div className="flex flex-col gap-2">
        <Controller name="rating" control={control} render={({ field }) => <Ratings value={field.value} onChange={field.onChange} />} />
        {errors.rating && <span className="text-red-500">{errors.rating.message}</span>}
      </div>

      {/* Review */}
      <div className="flex flex-col gap-2">
        <Controller name="review" control={control} render={({ field }) => <Review value={field.value} onChange={field.onChange} />} />
        {errors.review && <span className="text-red-500">{errors.review.message}</span>}
      </div>

      <DialogFooter className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-2">
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={!isDirty || isPending}>
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full" />
              {submitLabel}...
            </span>
          ) : submitLabel}
        </Button>
      </DialogFooter>
    </form>
  )
}
