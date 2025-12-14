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

export interface FoodReviewGridProps {
  fetchFoodReview: foodReview[]
}