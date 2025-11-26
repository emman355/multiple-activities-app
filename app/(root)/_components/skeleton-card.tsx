import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className='flex gap-4'>
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-[100px] rounded-md" />
        </div>
        <Skeleton className="h-6 w-[200px] rounded-md" />
      </div>
      <div className="flex flex-col gap-4">
        <div className='flex gap-4'>
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-[100px] rounded-md" />
        </div>
        <Skeleton className="h-6 w-[200px] rounded-md" />
      </div>
       <div className="flex flex-col gap-4">
        <div className='flex gap-4'>
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-[100px] rounded-md" />
        </div>
        <Skeleton className="h-6 w-[200px] rounded-md" />
      </div>
    </div>
  )
}
