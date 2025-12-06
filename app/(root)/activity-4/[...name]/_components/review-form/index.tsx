"use client"

import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button } from "@/components/ui/button"
import { ACCEPTED_REGEX } from "@/lib/schema/constants"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import Ratings from "@/app/(root)/_components/ratings"
import Review from "@/app/(root)/_components/review"

const pokemonReviewSchema = yup.object({
  rating: yup.number()
    .required('Rating is required')
    .min(1, 'Minimum rating is 1')
    .max(5, 'Maximum rating is 5'),
  review: yup.string()
    .required('Review is required')
    .min(10, 'Review must be at least 10 characters')
    .matches(ACCEPTED_REGEX, "Only letters, numbers, and basic punctuation are allowed"),
}).required()

export type PokemonReviewFormValues = yup.InferType<typeof pokemonReviewSchema>

type Props = {
  defaultValues?: Partial<PokemonReviewFormValues>
  onSubmit: (values: PokemonReviewFormValues) => Promise<void>
  submitLabel?: string
  isPending?: boolean
}

export default function PokemonReviewForm({ defaultValues, onSubmit, submitLabel = "Save", isPending }: Props) {

  const { control, handleSubmit, formState: { errors, isDirty } } = useForm<PokemonReviewFormValues>({
    resolver: yupResolver(pokemonReviewSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
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
