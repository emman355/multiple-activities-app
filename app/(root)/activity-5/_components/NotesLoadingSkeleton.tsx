import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function NotesLoadingSkeleton() {
  return (
    <div className='space-y-4'>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-25 rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {[...Array(6)].map((_, index) => (
          <Card
            key={index}
            className="flex flex-col justify-between rounded-lg shadow-sm border p-4 space-y-6"
          >
            <div className='space-y-4'>
              {/* Header: Title + Tag */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>

              {/* Timestamp */}
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Footer: View Details button */}
            <Skeleton className="h-8 w-full rounded-md" />
          </Card>
        ))}
      </div>
    </div>

  );
}
