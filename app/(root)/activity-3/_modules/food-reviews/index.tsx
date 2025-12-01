import Typography from "@/components/ui/typography";
import FoodPhotoCard from "./review-card";
import { getFoodreviews } from "../../_action/getFoodreviews";

export default async function FoodReviews() {
  const foodReview = await getFoodreviews();
  
  return (
    <section className="w-full flex flex-col gap-6">
      <header className="flex flex-col items-start">
        <Typography variant="h4" className="font-semibold">
          Your Food Reviews
        </Typography>
        <Typography variant="body2">
          Share your experiences and see your past uploads
        </Typography>
      </header>

      {foodReview && foodReview.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {foodReview.map((item) => (
            <FoodPhotoCard key={item.id} foodReview={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 border border-gray-800 rounded-lg">
          <Typography variant="subtitle" className="mb-2">
            No Reviews Yet
          </Typography>
          <Typography variant="body2" className="text-muted-foreground mb-4">
            Upload a photo your first food review to get started.
          </Typography>
        </div>
      )}
    </section>
  );
}
