"use client"

import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating"
import Typography from "@/components/ui/typography"
import Image from "next/image"
import { useEffect, useState, useTransition } from "react"
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Skeleton } from "@/components/ui/skeleton";
import EditDialog from "./edit-dialog"
import DeleteDialog from "./delete-dialog"
import { FoodReviewFormValues } from "../../../_components/food-review-form"
import { updateFoodReview } from "../../../_action/updateFoodReview"
import { removeFoodReview } from "../../../_action/removeFoodReview"

export interface foodReview {
  id: string,
  userId: string,
  photoName: string,
  photoUrl: string,
  location: string,
  rating: number,
  review: string,
  uploadDate: string,
  updatedAt: string,
}

type FoodReviewProps = {
  foodReview: foodReview
}

export default function ReviewCard({ foodReview }: FoodReviewProps) {
  const [loaded, setLoaded] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false)
  const [isPendingEdit, startTransitionEdit] = useTransition()
  const [isPendingDelete, startTransitionDelete] = useTransition()

  useEffect(() => {
    let mounted = true;
    const id = window.setTimeout(() => {
      if (mounted) setLoaded(false);
    }, 0);

    return () => {
      mounted = false;
      clearTimeout(id);
    };
  }, [foodReview.photoUrl]);

  const handleEditReview = async (data: FoodReviewFormValues) => {
    startTransitionEdit(async () => {
      try {
        await updateFoodReview({
          id: foodReview.id, // 👈 pass the review id
          photoName: data.food,
          file: data.photo ?? undefined, // 👈 optional file
          location: data.restourant,
          rating: data.rating,
          review: data.review,
        })

        setOpenEdit(false) // close edit dialog after submit

      } catch (error) {
        // Rethrow so Next.js error.tsx catches it
        if (error instanceof Error) {
          throw error;
        } else {
          throw new Error(`Failed to edit review: ${error}`);
        }
      }
    })
  }

  const handleDeleteReview = async () => {
    startTransitionDelete(async () => {
      try {
        await removeFoodReview(foodReview.id);
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
    })
  }

  return (
    <div
      className="w-full flex flex-col rounded-2xl border border-gray-800 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      {/* Image container */}
      <div className="relative h-70">
        {!loaded && (
          <Skeleton className="absolute inset-0 bg-gray-800 rounded-xs" />
        )}
        <Image
          key={foodReview.photoUrl}
          alt={foodReview.photoName}
          src={foodReview.photoUrl}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="eager"
          priority
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Info section */}
      <div className="flex flex-col gap-5 p-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <Typography variant="subtitle" className="font-semibold">{foodReview.photoName}</Typography>
            <div className="flex gap-4">
              <div onClick={() => setOpenEdit(true)}>
                <MdOutlineModeEditOutline size={18} className="text-gray-300" />
              </div>
              <div onClick={() => setOpenDelete(true)}>
                <RiDeleteBin6Line size={18} className="text-red-700" />
              </div>
            </div>
          </div>
          <Typography variant="small" className="text-gray-400">{foodReview.location}</Typography>
          <Typography variant="caption" className="text-gray-500">
            Uploaded: {new Date(foodReview.updatedAt).toLocaleDateString()}
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <Typography variant="caption">Ratings:</Typography>
          <Rating value={foodReview.rating} readOnly>
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingButton className="text-amber-600" size={12} key={index} />
            ))}
          </Rating>
        </div>

        <div className="flex items-center gap-2">
          <Typography variant="caption">Review:</Typography>
          <Typography variant="small" className="text-muted">{foodReview.review}</Typography>
        </div>
      </div>

      <EditDialog
        foodReview={foodReview}
        handleSubmit={handleEditReview}
        isPendingEdit={isPendingEdit}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
      />

      <DeleteDialog
        foodReview={foodReview}
        handleDeleteReview={handleDeleteReview}
        isPendingDelete={isPendingDelete}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete} />
    </div>
  )
}



