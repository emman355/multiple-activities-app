'use client'

import { useState } from 'react'
import Typography from '@/components/ui/typography'
import { Todo } from './_components/TodoItem'
import TodoTabs from './_components/TodoTabs'
import TodoForm, { TodoFormValues } from './_components/TodoForm'

const initialTodos: Todo[] = [
  { id: 1, user_id: 101, title: "Finish Next.js authentication middleware", done: false, created_at: "2025-11-20T09:00:00Z" },
  { id: 2, user_id: 101, title: "Refactor Supabase client factory", done: true, created_at: "2025-11-19T14:30:00Z" },
  { id: 3, user_id: 101, title: "Fix hydration mismatch in tabbed navigation", done: false, created_at: "2025-11-21T07:45:00Z" },
  { id: 4, user_id: 101, title: "Add semantic Tailwind typography tokens", done: true, created_at: "2025-11-18T11:15:00Z" },
]

export default function ActivityOne() {
  const [todos, setTodos] = useState(initialTodos)

  const activeTodos = todos.filter(todo => !todo.done)
  const completedTodos = todos.filter(todo => todo.done)

  const handleToggle = (id: number, done: boolean) => {
    setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, done } : todo))
  }

  const handleDelete = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const handleUpdate = (id: number, newTitle: string) => {
    setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, title: newTitle } : todo))
  }

  const handleAdd = (data: TodoFormValues) => {
    const newTodo: Todo = {
      id: todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      user_id: 101,
      title: data.title.trim(),
      done: false,
      created_at: new Date().toISOString(),
    }
    setTodos(prev => [...prev, newTodo])
  }

  return (
    <div className='flex flex-col items-center gap-12 p-10'>
      <Typography variant='h2'>Todo List</Typography>
      <div className='flex max-w-4xl flex-col w-full items-center gap-10'>

        {/* ✅ Reusable Form */}
        <TodoForm onSubmit={handleAdd} submitLabel="Add Todo" />

        <div className='flex flex-col gap-5 w-full'>
          <Typography variant='h3'>Your Todos</Typography>
          <TodoTabs
            todos={todos}
            activeTodos={activeTodos}
            completedTodos={completedTodos}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  )
}
