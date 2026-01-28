import Typography from '@/components/ui/typography'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Suspense } from 'react';
import NotesLoadingSkeleton from './_components/NotesLoadingSkeleton';
import NotesPage from './_components/NotesPage';

export default async function ActivityFive() {
  return (
    <div className='w-full flex flex-col items-center gap-12 p-10'>
      <Typography variant='h2'>Markdown Notes</Typography>
      <div className='max-w-7xl flex flex-col w-full gap-10'>
        <section>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b">
            <div>
              <Typography variant="h3" className="font-bold text-gray-900">
                📝 My Notes
              </Typography>

            </div>
            <Link href="/activity-5/create-note">
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Create New Note
              </Button>
            </Link>
          </div>
        </section>
        <Suspense fallback={<NotesLoadingSkeleton />}>
          <NotesPage />
        </Suspense>
      </div>
    </div >
  )
}
