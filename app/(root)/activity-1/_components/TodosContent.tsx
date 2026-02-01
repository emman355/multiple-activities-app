'use client';

import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@/components/ui/tabs';
import React from 'react';
import TodoItem, { Todo } from './TodoItem';
import Typography from '@/components/ui/typography';
import { Circle, CheckCircle2, ListTodo } from 'lucide-react';

type TodoTabsProps = {
  todos: Todo[];
};

export default function TodosContent({ todos }: TodoTabsProps) {
  const activeTodos = todos.filter((todo) => !todo.done);
  const completedTodos = todos.filter((todo) => todo.done);

  const renderList = (list: Todo[], type?: string) =>
    list.length !== 0 ? (
      list.map((todo) => <TodoItem key={todo?.id} todo={todo} />)
    ) : (
      <Typography variant="body1">You have no {type?.toLowerCase()} Todo...</Typography>
    );

  const stats = [
    {
      label: 'Total',
      count: todos.length,
      icon: ListTodo,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      label: 'Active',
      count: activeTodos.length,
      icon: Circle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
    },
    {
      label: 'Completed',
      count: completedTodos.length,
      icon: CheckCircle2,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`flex items-center gap-4 p-4 rounded-lg border ${stat.borderColor} ${stat.bgColor}`}
            >
              <div className={`${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <Typography variant="small" className="text-muted-foreground">
                  {stat.label}
                </Typography>
                <Typography variant="h3" className="font-bold">
                  {stat.count}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs Content */}
      <TabsContent value="all" className="flex flex-col gap-6">
        <Separator className="bg-border" />
        {renderList(todos)}
      </TabsContent>

      <TabsContent value="active" className="flex flex-col gap-6">
        <Separator className="bg-border" />
        {renderList(activeTodos, 'active')}
      </TabsContent>

      <TabsContent value="completed" className="flex flex-col gap-6">
        <Separator className="bg-border" />
        {renderList(completedTodos, 'completed')}
      </TabsContent>
    </div>
  );
}
