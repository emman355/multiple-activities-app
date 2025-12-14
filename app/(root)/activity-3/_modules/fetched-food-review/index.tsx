import { getFoodreviews } from "../../_action/getFoodreviews";
import FoodListWithControls from "../food-reviews-with-controls";

export default async function FetchFoodList() {
 const fetchedFoodReview = await getFoodreviews();
  return <FoodListWithControls foodList={fetchedFoodReview} />;
}
