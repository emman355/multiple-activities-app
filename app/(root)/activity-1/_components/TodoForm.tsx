'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { addTodo } from '../_actions/todos/addTodo';

const schema = yup.object({
  title: yup
    .string()
    .trim()
    .required('Todo title is required')
    .min(3, 'Title must be at least 3 characters'),
});

export interface TodoFormValues {
  title: string;
}

interface TodoFormProps {
  onSubmit?: (values: TodoFormValues) => void;
  initialValue?: string;
  submitLabel?: string;
  setIsEditing?: (edit: boolean) => void;
  disabled?: boolean;
}

export default function TodoForm({
  onSubmit,
  initialValue = '',
  submitLabel = 'Add Todo',
  setIsEditing,
  disabled = false,
}: TodoFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TodoFormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: { title: initialValue },
  });

  const handleFormSubmit = (data: TodoFormValues) => {
    startTransition(async () => {
      if (onSubmit) {
        onSubmit(data);
      } else {
        await addTodo(data);
        reset({ title: '' });
      }
    });
  };

  const isLoading = isPending || disabled;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col w-full gap-2">
      {errors.title && (
        <Typography variant="small" className="text-destructive">
          {errors.title.message}
        </Typography>
      )}
      <div className="flex w-full gap-3 flex-col lg:flex-row">
        <Input
          className="h-10"
          type="text"
          placeholder="Enter todo title"
          disabled={isLoading}
          {...register('title')}
        />
        <Button type="submit" size="lg" disabled={isLoading || !isValid}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full" />
              {onSubmit ? 'Saving...' : 'Adding...'}
            </span>
          ) : (
            submitLabel
          )}
        </Button>
        {setIsEditing && (
          <Button
            type="button"
            size="lg"
            variant="outline"
            onClick={() => setIsEditing(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
