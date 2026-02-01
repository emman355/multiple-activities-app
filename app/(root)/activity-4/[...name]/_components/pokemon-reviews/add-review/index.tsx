'use client';

import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { FaPlusCircle } from 'react-icons/fa';
import { useState, useTransition } from 'react';
import { CustomDialog } from '@/app/(root)/_components/custom-dialog';
import PokemonReviewForm, { PokemonReviewFormValues } from '../../review-form';
import { capitalizeFirst, formatPokemonId } from '@/lib/utils';
import Image from 'next/image';
import { PokemonDetails } from '@/app/(root)/activity-4/types';
import { createPokemonReview } from '@/app/(root)/activity-4/_action/createPokemonReview';

export default function AddReview({
  pokemonName,
  details,
}: {
  pokemonName: string;
  details: PokemonDetails;
}) {
  const [openAddReview, setopenAddReview] = useState(false);
  const [isPendingAdd, startTransitionAdd] = useTransition();

  const handleSubmit = async (data: PokemonReviewFormValues) => {
    // ✅ Call server action
    startTransitionAdd(async () => {
      await createPokemonReview({
        ...data,
        pokemonId: details.id,
        pokemonName,
      });
      setopenAddReview(false);
    });
  };
  return (
    <div>
      <Button className="bg-primary hover:bg-primary/90" onClick={() => setopenAddReview(true)}>
        <FaPlusCircle />
        Add Pokemon Review
      </Button>
      <CustomDialog
        open={openAddReview}
        setOpen={setopenAddReview}
        titleStyles="text-2xl"
        descriptionStyles="text-lg"
        title={`Write a review for ${capitalizeFirst(pokemonName)}`}
        description="Share your thoughts and ratings for this pokemon"
        className="sm:max-w-[800px] gap-10 p-10 font-(family-name:--font-geist-sans)"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex-col flex items-center gap-4">
            <div className="h-70 relative w-full rounded-3xl bg-card">
              <Image
                alt={`${pokemonName}-sprite`}
                src={details.image_url}
                fill
                className="object-contain p-10"
                loading="eager"
                priority
                unoptimized
              />
              <Typography
                variant="subtitle"
                className="absolute bottom-1 left-[calc(50%-1.25rem)]"
              >{`#${formatPokemonId(details.id)}`}</Typography>
            </div>
          </div>
          <div className="flex-2">
            <PokemonReviewForm
              defaultValues={{
                rating: 0,
                review: '',
              }}
              onSubmit={handleSubmit}
              submitLabel="Submit"
              isPending={isPendingAdd}
            />
          </div>
        </div>
      </CustomDialog>
    </div>
  );
}
