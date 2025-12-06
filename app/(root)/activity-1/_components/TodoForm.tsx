'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Typography from '@/components/ui/typography'
import { addTodo } from '../_actions/todos/addTodo'
import { useTransition } from 'react'

const schema = yup.object({
	title: yup
		.string()
		.trim()
		.required('Todo title is required')
		.min(3, 'Title must be at least 3 characters'),
})

export interface TodoFormValues {
	title: string
}

interface TodoFormProps {
	onSubmit?: (values: TodoFormValues) => void
	initialValue?: string   // ✅ optional default value for editing
	submitLabel?: string    // ✅ customize button label ("Add Todo" / "Save Changes")
	setIsEditing?: (edit: boolean) => void
}

export default function TodoForm({
	onSubmit,
	initialValue = '',
	submitLabel = 'Add Todo',
	setIsEditing,
}: TodoFormProps) {

	const [isPending, startTransition] = useTransition()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TodoFormValues>({
		resolver: yupResolver(schema),
		mode: "onChange", // ✅ validate while typing
		defaultValues: { title: initialValue },
	})

	const handleFormSubmit = async (data: TodoFormValues) => {
		if (onSubmit) {
			onSubmit(data)
		} else {
			startTransition(async () => await addTodo(data))
		}
		reset({ title: '' })

	}

	return (
		<form
			onSubmit={handleSubmit(handleFormSubmit)}
			className="flex flex-col w-full gap-2"
		>
			{errors.title && (
				<Typography variant="small" className="text-red-600">
					{errors.title.message}
				</Typography>
			)}
			<div className='flex  w-full gap-3 flex-col lg:flex-row'>
				<Input
					className='h-10'
					type="text"
					placeholder="Enter todo title"
					{...register('title')}
				/>
				<Button type="submit" variant="outline" size="lg">
					{isPending ? (
						<span className="flex items-center gap-2">
							<span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full" />
							Adding...
						</span>
					) : (
						submitLabel
					)}
				</Button>
				{
					setIsEditing && (
						<Button size="lg" variant="outline" onClick={() => setIsEditing(false)}>
							Cancel
						</Button>
					)
				}
			</div>
		</form>
	)
}
