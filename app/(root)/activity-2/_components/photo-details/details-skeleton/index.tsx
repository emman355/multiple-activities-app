import { Skeleton } from "@/components/ui/skeleton";

export default function PhotoDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Skeleton */}
        <div className="relative w-full h-[400px] rounded-lg border border-border overflow-hidden bg-muted">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Metadata Skeleton */}
        <div className="flex flex-col gap-5">
          {/* Title + Actions */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-2/3 rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>

          {/* Metadata fields */}
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full rounded" />
            ))}
          </div>

          {/* Description */}
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
