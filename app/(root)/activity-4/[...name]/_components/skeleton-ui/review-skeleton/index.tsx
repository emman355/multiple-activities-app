import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function ReviewsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-32" /> {/* "User Reviews" label */}

      {[1, 2].map((i) => (
        <div key={i} className='flex flex-col gap-4 border border-gray-800 rounded-4xl p-6'>
          <div className="flex gap-3">
            <Skeleton className="h-9 w-9 rounded-full" /> {/* avatar */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-16" /> {/* time ago */}
              <div className="flex items-center gap-1">
                {/* rating stars */}
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-2 w-2 rounded" />
                ))}
              </div>
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[70%]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
