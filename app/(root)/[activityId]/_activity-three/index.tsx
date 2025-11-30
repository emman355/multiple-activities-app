import Typography from '@/components/ui/typography'
import FoodReviews from './food-reviews'
import UploadFood from './upload-food-review'
import { Suspense } from 'react'
import FoodReviewSkeleton from './_components/food-review-skeleton'

export default function ActivityThree() {

  return (
    <div className='w-full flex flex-col items-center gap-12 p-10'>
      <Typography variant='h2'>Food Review App</Typography>
      <div className='max-w-7xl flex flex-col w-full items-center gap-10'>
        <UploadFood />
        <Suspense fallback={<FoodReviewSkeleton />}>
          <FoodReviews />
        </Suspense>
      </div>
    </div >
  )
}
