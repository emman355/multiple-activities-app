import React from 'react'
import { CustomDialog } from '@/app/(root)/_components/custom-dialog'
import { PokemonReview } from '@/app/(root)/activity-4/types'
import PokemonReviewForm, { PokemonReviewFormValues } from '../../review-form'
import Image from 'next/image'
import { capitalizeFirst, formatPokemonId } from '@/lib/utils'
import Typography from '@/components/ui/typography'

type EditDialogProps = {
  handleSubmit: (data: PokemonReviewFormValues) => Promise<void>
  openEdit: boolean
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
  pokemonReview: PokemonReview
  isPendingEdit: boolean
  imgUrl: string
}

export default function EditReviewDialog({ handleSubmit, openEdit, setOpenEdit, pokemonReview, isPendingEdit, imgUrl }: EditDialogProps) {
  const { pokemonName, pokemonId } = pokemonReview;
  return (
    <CustomDialog
      open={openEdit}
      setOpen={setOpenEdit}
      titleStyles='text-2xl'
      descriptionStyles='text-lg'
      title={`Edit your review for ${capitalizeFirst(pokemonName)}`}
      description='Edit your thoughts and ratings for this pokemon'
      className='sm:max-w-[800px] gap-10 p-10 font-(family-name:--font-geist-sans)'
    >
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='flex-1 flex-col flex items-center gap-4'>
          <div className="h-70 relative w-full rounded-3xl bg-card">
            <Image
              alt={`${pokemonName}-sprite`}
              src={imgUrl}
              fill
              className="object-contain p-10"
              loading="eager"
              priority
              unoptimized
            />
            <Typography variant='subtitle' className='absolute bottom-1 left-[calc(50%-1.25rem)]'>{`#${formatPokemonId(pokemonId)}`}</Typography>
          </div>
        </div>
        <div className='flex-2'>
          <PokemonReviewForm
            defaultValues={{
              rating: pokemonReview.rating,
              review: pokemonReview.content,
            }}
            onSubmit={handleSubmit}
            submitLabel="Save"
            isPending={isPendingEdit}
          />
        </div>
      </div>
    </CustomDialog>
  )
}
