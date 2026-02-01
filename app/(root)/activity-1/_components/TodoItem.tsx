'use client';

import { useOptimistic, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import TodoForm, { TodoFormValues } from './TodoForm';
import TodoItemContent from './TodoItemContent';
import { deleteTodo } from '../_actions/todos/deleteTodo';
import { updateTodo } from '../_actions/todos/updateTodo';
import { toggleTodo } from '../_actions/todos/toggleTodo';

export interface Todo {
  id: number;
  userId: number;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TodoItemProps {
  todo: Todo;
}

type OptimisticAction = { type: 'toggle'; done: boolean } | { type: 'update'; title: string };

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [optimisticTodo, setOptimisticTodo] = useOptimistic(
    todo,
    (state, action: OptimisticAction) => {
      switch (action.type) {
        case 'toggle':
          return { ...state, done: action.done };
        case 'update':
          return { ...state, title: action.title };
        default:
          return state;
      }
    }
  );

  const handleSave = (data: TodoFormValues) => {
    startTransition(async () => {
      setOptimisticTodo({ type: 'update', title: data.title });
      await updateTodo(todo.id, data.title);
      setIsEditing(false);
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deleteTodo(id);
    });
  };

  const handleToggle = (checked: boolean) => {
    startTransition(async () => {
      setOptimisticTodo({ type: 'toggle', done: checked });
      await toggleTodo({ id: todo.id, done: checked });
    });
  };

  return (
    <div className="flex flex-col gap-5 md:flex-row items-center justify-between border border-border rounded-md p-5">
      <div className="flex flex-3 gap-5 items-center w-full">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={optimisticTodo.done}
          disabled={isPending}
          onCheckedChange={(checked) => handleToggle(!!checked)}
          className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary"
        />
        <div className="flex w-full">
          {isEditing ? (
            <TodoForm
              setIsEditing={setIsEditing}
              onSubmit={handleSave}
              initialValue={optimisticTodo.title}
              submitLabel={isPending ? 'Saving...' : 'Save'}
              disabled={isPending}
            />
          ) : (
            <TodoItemContent title={optimisticTodo.title} updatedAt={todo.updatedAt} />
          )}
        </div>
      </div>

      {!isEditing && (
        <div className="flex flex-1 flex-col lg:flex-row gap-3 w-full justify-end">
          <Button
            size="lg"
            variant="outline"
            onClick={() => setIsEditing(true)}
            disabled={isPending}
          >
            Edit
          </Button>
          <Button
            size="lg"
            variant="destructive"
            onClick={() => handleDelete(todo.id)}
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full" />
                Deleting...
              </span>
            ) : (
              'Delete'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
