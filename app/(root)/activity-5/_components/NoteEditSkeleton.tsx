'use client';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Eye } from 'lucide-react';

export default function NoteEditSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Card Skeleton */}
      <Card className="p-6">
        <div className="flex flex-col gap-4">
          {/* Title and Actions */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1 space-y-4">
              {/* Edit Note Title */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-9 w-32" />
              </div>

              {/* Title Input Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-12 w-full" />
              </div>

              {/* Category Select Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-48" />
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>

          <Separator />

          {/* Metadata Skeleton */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-36" />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
      </Card>

      {/* Content Editor Card Skeleton */}
      <Card className="overflow-hidden">
        <Tabs defaultValue="editor" className="w-full">
          <div className="bg-secondary border-b px-6 py-3">
            <TabsList className="grid w-xs grid-cols-2 bg-accent-foreground/80">
              <TabsTrigger value="editor" disabled>
                <Edit className="h-4 w-4" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="preview" disabled>
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="editor" className="p-6 m-0">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <div className="border rounded-lg p-4 space-y-3">
                {/* Toolbar Skeleton */}
                <div className="flex gap-2 border-b pb-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
                {/* Editor Content Skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Back Button Skeleton */}
      <div className="flex justify-center pt-4">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
