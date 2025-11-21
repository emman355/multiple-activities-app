'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Typography from '@/components/ui/typography'
import TodoForm, { TodoFormValues } from './TodoForm'

export interface Todo {
  id: number
  user_id: number
  title: string
  done: boolean
  created_at: string
}

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number, done: boolean) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, newTitle: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const handleSave = (data: TodoFormValues) => {
    onUpdate(todo.id, data.title)
    setIsEditing(false)
  }

  return (
    <div className='flex flex-col gap-5 md:flex-row items-center justify-between border border-gray-800 rounded-md p-5'>
      <div className='flex flex-3 gap-5 items-center w-full'>
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.done}
          onCheckedChange={(checked) => onToggle(todo.id, !!checked)}
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
        />
        <div className="flex w-full">
          {isEditing ? (
            <TodoForm
              setIsEditing={setIsEditing}
              onSubmit={handleSave}
              initialValue={todo.title}
              submitLabel="Save"
            />
          ) : (
            <div className='flex flex-col'>
              <Typography variant="body1" className="leading-none font-medium">
                {todo.title}
              </Typography>
              <Typography variant="small" className="text-muted-foreground">
                Created at: {new Date(todo.created_at).toLocaleString()}
              </Typography>
            </div>
          )}
        </div>
      </div>
      {
        !isEditing && (
          <div className='flex flex-1 flex-col lg:flex-row gap-3 w-full justify-end'>
            <Button size="lg" variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button size="lg" variant="destructive" onClick={() => onDelete(todo.id)}>
              Delete
            </Button>
          </div>
        )
      }
    </div>
  )
}
