import Typography from '@/components/ui/typography'
import { Suspense } from 'react'
import UploadFoodReview from './_modules/upload-food-review'
import FoodReviewSkeleton from './_components/food-review-skeleton'
import FetchFoodList from './_modules/fetched-food-review'

export default function ActivityThree() {

  return (
    <div className='w-full flex flex-col items-center gap-12 p-10'>
      <Typography variant='h2'>Food Review App</Typography>
      <div className='max-w-7xl flex flex-col w-full gap-10'>
        <section>
          <header className="flex flex-col items-start">
            <Typography variant="h4" className="font-semibold">
              Your Food Reviews
            </Typography>
            <Typography variant="body2">
              Share your experiences and see your past uploads
            </Typography>
          </header>
        </section>
        <UploadFoodReview />
        <Suspense fallback={<FoodReviewSkeleton />}>
          <FetchFoodList />
        </Suspense>
      </div>
    </div >
  )
}
