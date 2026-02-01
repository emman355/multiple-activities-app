import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function PokemonDetailsSkeleton() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col gap-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex justify-center h-96 lg:h-auto relative">
            <Skeleton className="w-full" />
          </div>
          <div className="flex flex-col gap-10">
            {/* title */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Skeleton className="h-10 w-full" /> {/* e.g., #001 */}
                <Skeleton className="h-10 w-full" /> {/* Bulbasaur */}
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[70%]" />
              </div>
            </div>
            {/* type */}
            <div className="flex flex-col gap-4">
              <Skeleton className="h-6 w-15" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-[20%] rounded-2xl" />
                <Skeleton className="h-4 w-[20%] rounded-2xl" />
              </div>
            </div>

            {/* abilities */}
            <div className="flex flex-col gap-4">
              <Skeleton className="h-6 w-25" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-[20%] rounded-2xl" />
                <Skeleton className="h-4 w-[15%] rounded-2xl" />
                <Skeleton className="h-4 w-[25%] rounded-2xl" />
              </div>
            </div>

            {/* base stats */}
            <div className="flex flex-col gap-4">
              <Skeleton className="h-6 w-40" />
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-2">
                {['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'].map(
                  (label) => (
                    <div key={label} className="grid grid-cols-2 lg:grid-cols-2 gap-1 items-center">
                      <div className="flex flex-row justify-between mb-1 items-center">
                        <Skeleton className="h-4 w-20" /> {/* stat label */}
                        <Skeleton className="h-4 w-5" /> {/* stat value */}
                      </div>
                      <Skeleton className="h-3 w-full rounded" /> {/* bar */}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        {/* User reviews */}
      </div>
    </div>
  );
}
