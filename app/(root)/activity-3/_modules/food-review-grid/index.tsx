import Typography from '@/components/ui/typography';
import FoodPhotoCard from './review-card';
import { FoodReviewGridProps } from '../../types';

export default function FoodReviewGrid({ fetchFoodReview }: FoodReviewGridProps) {
  if (!fetchFoodReview || fetchFoodReview.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 border border-border rounded-lg">
        <Typography variant="subtitle" className="mb-2">
          No Reviews Yet
        </Typography>
        <Typography variant="body2" className="text-muted-foreground mb-4">
          Upload a photo your first food review to get started.
        </Typography>
      </div>
    );
  }
  return (
    <section className="w-full flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {fetchFoodReview.map((item) => (
          <FoodPhotoCard key={item.id} foodReview={item} />
        ))}
      </div>
    </section>
  );
}
