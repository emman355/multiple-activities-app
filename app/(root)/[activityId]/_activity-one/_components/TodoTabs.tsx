'use client'

import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Todo } from './TodoItem'   // assuming you already have Todo type in TodoItem.tsx
import TodoItem from './TodoItem'
import Typography from '@/components/ui/typography'

interface TodoTabsProps {
  todos: Todo[]
  activeTodos: Todo[]
  completedTodos: Todo[]
  onToggle: (id: number, done: boolean) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, newTitle: string) => void
}

export default function TodoTabs({
  todos,
  activeTodos,
  completedTodos,
  onToggle,
  onDelete,
  onUpdate,
}: TodoTabsProps) {
  const renderList = (list: Todo[], type?: string) =>
    list.length !== 0 ? list.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={onToggle}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    )) : (
      <Typography variant='body1'>You have no {type?.toLowerCase()} Todo...</Typography>
    )


  return (
    <Tabs defaultValue="all" className="space-y-4">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="flex flex-col gap-6">
        <Separator className='bg-gray-600' />
        {renderList(todos)}
      </TabsContent>

      <TabsContent value="active" className="flex flex-col gap-6">
        <Separator className='bg-gray-600' />
        {renderList(activeTodos, "active")}
      </TabsContent>

      <TabsContent value="completed" className="flex flex-col gap-6">
        <Separator className='bg-gray-600' />
        {renderList(completedTodos, "completed")}
      </TabsContent>
    </Tabs>
  )
}
