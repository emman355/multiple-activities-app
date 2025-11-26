'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import TodoForm, { TodoFormValues } from './TodoForm'
import TodoItemContent from './TodoItemContent'
import { deleteTodo } from '../actions/todos/deleteTodo'
import { updateTodo } from '../actions/todos/updateTodo'
import { toggleTodo } from '../actions/todos/toggleTodo'

export interface Todo {
  id: number
  userId: number
  title: string
  done: boolean
  createdAt: string
  updatedAt: string
}

interface TodoItemProps {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [localDone, setLocalDone] = useState(todo.done)
  const [localTitle, setLocalTitle] = useState(todo.title)

  // separate transitions
  const [isSaving, startSaving] = useTransition()
  const [isDeleting, startDeleting] = useTransition()
  const [isToggling, startToggling] = useTransition()

  const handleSave = (data: TodoFormValues) => {
    // optimistic update
    setLocalTitle(data.title)
    startSaving(async () => {
      await updateTodo(todo.id, data.title)
    })
    setIsEditing(isSaving)
  }

  const handleDelete = (id: number) => {
    startDeleting(async () => {
      await deleteTodo(id)
    })
  }

  const handleToggle = (checked: boolean) => {
    // optimistic update
    setLocalDone(checked)

    startToggling(async () => {
      try {
        await toggleTodo({ id: todo.id, done: checked })
      } catch {
        // rollback if backend fails
        setLocalDone(todo.done)
      }
    })
  }

  return (
    <div className='flex flex-col gap-5 md:flex-row items-center justify-between border border-gray-800 rounded-md p-5'>
      <div className='flex flex-3 gap-5 items-center w-full'>
        <Checkbox
          id={`todo-${todo.id}`}
          checked={localDone}
          disabled={isToggling}
          onCheckedChange={(checked) => handleToggle(!!checked)}
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
        />
        <div className="flex w-full">
          {isEditing ? (
            <TodoForm
              setIsEditing={setIsEditing}
              onSubmit={handleSave}
              initialValue={localTitle}
              submitLabel={isSaving ? "saving..." : "save"}
            />
          ) : (
            <TodoItemContent title={localTitle} updatedAt={todo.updatedAt} />
          )}
        </div>
      </div>
      {
        !isEditing && (
          <div className='flex flex-1 flex-col lg:flex-row gap-3 w-full justify-end'>
            <Button size="lg" variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button size="lg" variant="destructive" onClick={() => handleDelete(todo.id)}
              disabled={isDeleting}>
              {isDeleting ?
                (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full" />
                    Deleting...
                  </span>
                )
                : "Delete"}
            </Button>
          </div>
        )
      }
    </div>
  )
}
