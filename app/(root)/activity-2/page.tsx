import Typography from '@/components/ui/typography'
import React, { Suspense } from 'react'
import PokemonListSkeleton from '../activity-4/_components/skeleton-card'
import FetchedPhotos from './_fetched-photos'
import AddNewPhoto from './_components/add-photo'

export default function ActivityTwo() {
  return (
    <div className='w-full flex flex-col items-center gap-12 p-10'>
      <Typography variant='h2'>Google Drive Lite</Typography>
      <div className='max-w-7xl flex flex-col w-full gap-10'>
        <section>
          <header className="flex flex-col items-start">
            <Typography variant="h3" className="font-semibold">
              Manage Your Photos
            </Typography>
            <Typography variant="body2">
              Upload, update, and remove photos with ease. Search by name and sort by title or date to keep your collection organized.
            </Typography>
          </header>
        </section>

        <section>
          <AddNewPhoto />
        </section>

        <section>
          <Suspense fallback={<PokemonListSkeleton />}>
            <FetchedPhotos />
          </Suspense>
        </section>
      </div>
    </div>
  )
}
