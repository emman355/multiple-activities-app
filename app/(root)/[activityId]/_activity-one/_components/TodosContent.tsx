'use client'

import { Separator } from '@/components/ui/separator'
import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import TodoItem, { Todo } from './TodoItem'
import Typography from '@/components/ui/typography';

type TodoTabsProps = {
    todos: Todo[]
}

export default function TodosContent({ todos }: TodoTabsProps) {

    const activeTodos = todos.filter(todo => !todo.done)
    const completedTodos = todos.filter(todo => todo.done)

    const renderList = (list: Todo[], type?: string) =>
        list.length !== 0 ? list.map(todo => (
            <TodoItem
                key={todo.id}
                todo={todo}
            />
        )) : (
            <Typography variant='body1'>You have no {type?.toLowerCase()} Todo...</Typography>
        )
    return (
        <div>
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
        </div>
    )
}
