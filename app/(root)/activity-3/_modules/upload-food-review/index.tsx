'use client';

import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import FoodReviewForm, { FoodReviewFormValues } from '../../_components/food-review-form';
import { createFoodReview } from '../../_action/createFoodReview';
import { CustomDialog } from '@/app/(root)/_components/custom-dialog';
import { FaPlusCircle } from 'react-icons/fa';

export default function UploadFoodReview() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (data: FoodReviewFormValues) => {
    if (!data.photo) return;
    startTransition(async () => {
      await createFoodReview({
        file: data.photo!,
        photoName: data.food,
        location: data.restourant,
        rating: data.rating,
        review: data.review,
      });
      setIsOpen(false); // ✅ close dialog after submit
    });
  };

  return (
    <div>
      {/* Trigger Button */}
      <Button
        aria-label="Add new photo"
        className="flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <FaPlusCircle />
        Add New Food Photo
      </Button>

      {/* Dialog */}
      <CustomDialog
        open={isOpen}
        setOpen={setIsOpen}
        className="sm:max-w-[600px] gap-6 p-8 font-(family-name:--font-geist-sans)"
        title="Share Your Food Experience"
        description="Upload a photo and tell us what you think about your latest meal."
      >
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
      </CustomDialog>
    </div>
  );
}
