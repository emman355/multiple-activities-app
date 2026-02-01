import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonCard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-5 rounded-lg border border-border bg-card"
          >
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-3 w-16 rounded-md" />
              <Skeleton className="h-7 w-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Separator Skeleton */}
      <Skeleton className="h-px w-full" />

      {/* Todo Items Skeleton */}
      <div className="flex flex-col gap-5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-5 md:flex-row items-center justify-between border border-border rounded-md p-5"
          >
            <div className="flex flex-3 gap-5 items-center w-full">
              <Skeleton className="h-5 w-5 rounded-md" />
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
            </div>
            <div className="flex flex-1 flex-col lg:flex-row gap-3 w-full justify-end">
              <Skeleton className="h-10 w-full lg:w-20 rounded-md" />
              <Skeleton className="h-10 w-full lg:w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
