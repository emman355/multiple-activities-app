"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function PokemonListSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header: search + sort
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-md">
          <Skeleton className="h-8 w-full rounded-md" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-8 w-28 rounded-md" />
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>
      </div> */}

      {/* Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-800 p-4 shadow-sm"
          >
            {/* Image / icon */}
            <div className="flex justify-center">
              <Skeleton className="h-20 w-20 rounded-full" />
            </div>

            {/* Name */}
            <div className="mt-4 flex justify-center">
              <Skeleton className="h-5 w-24" />
            </div>

            {/* Number */}
            <div className="mt-2 flex justify-center">
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
