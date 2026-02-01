'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

type TabsListElement = React.ElementRef<typeof TabsPrimitive.List>;
type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

const TabsList = React.forwardRef<TabsListElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'inline-flex flex-col sm:flex-row h-auto sm:h-9 items-center justify-center rounded-lg bg-muted p-1 text-background w-full sm:w-auto',
        className
      )}
      {...props}
    />
  )
);
TabsList.displayName = TabsPrimitive.List.displayName;

type TabsTriggerElement = React.ElementRef<typeof TabsPrimitive.Trigger>;
type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>;

const TabsTrigger = React.forwardRef<TabsTriggerElement, TabsTriggerProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex gap-2 items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow w-full sm:w-auto',
        className
      )}
      {...props}
    />
  )
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

type TabsContentElement = React.ElementRef<typeof TabsPrimitive.Content>;
type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

const TabsContent = React.forwardRef<TabsContentElement, TabsContentProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    />
  )
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
