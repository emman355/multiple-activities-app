import Typography from '@/components/ui/typography'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Suspense } from 'react';
import TodoForm from './_components/TodoForm';
import SkeletonCard from '../_components/skeleton-card';
import TodoList from './_components/TodoList';

export default async function ActivityOne() {

  return (
    <div className='flex flex-col items-center gap-12 p-10'>
      <Typography variant='h2'>Todo List</Typography>
      <div className='flex max-w-4xl flex-col w-full items-center gap-10'>

        {/* ✅ Reusable Form */}
        <TodoForm submitLabel="Add Todo" />

        <div className='flex flex-col gap-5 w-full'>
          <Typography variant='h3'>Your Todos</Typography>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <Suspense fallback={<SkeletonCard />}>
              <TodoList />
            </Suspense>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
