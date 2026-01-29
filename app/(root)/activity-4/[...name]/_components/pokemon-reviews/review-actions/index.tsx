'use client';

import { PokemonReview } from '@/app/(root)/activity-4/types';
import React, { useState, useTransition } from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import EditReviewDialog from '../edit-review';
import { PokemonReviewFormValues } from '../../review-form';
import { updatePokemonReview } from '@/app/(root)/activity-4/_action/updatePokemonReview';
import DeleteReviewDialog from '../delete-review';
import { removePokemonReview } from '@/app/(root)/activity-4/_action/deletePokemonReview';

export default function ReviewActions({
  review,
  imgUrl,
}: {
  review: PokemonReview;
  imgUrl: string;
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isPendingEdit, startTransitionEdit] = useTransition();
  const [isPendingDelete, startTransitionDelete] = useTransition();

  const handleEditReview = async (data: PokemonReviewFormValues) => {
    startTransitionEdit(async () => {
      try {
        await updatePokemonReview(review.id, {
          rating: data.rating,
          content: data.review,
          pokemonName: review.pokemonName,
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

  const handleDeleteReview = async () => {
    startTransitionDelete(async () => {
      try {
        await removePokemonReview(review.id, review.pokemonName);
        // close only after success
        setOpenDelete(false);
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

  return (
    <div className="flex gap-2">
      <div className="flex gap-4">
        <div onClick={() => setOpenEdit(true)}>
          <MdOutlineModeEditOutline size={18} className="text-muted-foreground" />
        </div>
        <div onClick={() => setOpenDelete(true)}>
          <RiDeleteBin6Line size={18} className="text-destructive" />
        </div>
      </div>

      <EditReviewDialog
        handleSubmit={handleEditReview}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        pokemonReview={review}
        isPendingEdit={isPendingEdit}
        imgUrl={imgUrl}
      />

      <DeleteReviewDialog
        handleDeleteReview={handleDeleteReview}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        pokemonReview={review}
        isPendingDelete={isPendingDelete}
        imgUrl={imgUrl}
      />
    </div>
  );
}
