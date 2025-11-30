import { Skeleton } from "@/components/ui/skeleton";

export default function FoodReviewSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="w-full flex flex-col rounded-2xl border border-gray-800 overflow-hidden shadow-md animate-pulse"
        >
          {/* Image placeholder */}
          <Skeleton className="h-70 bg-gray-700" />

          {/* Info section */}
          <div className="p-4 flex flex-col gap-2">
            <Skeleton className="h-5 w-2/3 bg-gray-700 rounded" />
            <Skeleton className="h-4 w-1/2 bg-gray-700 rounded" />
            <Skeleton className="h-3 w-1/3 bg-gray-700 rounded" />
            <Skeleton className="h-4 w-full bg-gray-700 rounded mt-2" />
            <Skeleton className="h-4 w-full bg-gray-700 rounded" />
            <Skeleton className="h-4 w-5/6 bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}
