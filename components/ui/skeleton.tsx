import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-foreground/30 dark:bg-muted/50', className)}
      {...props}
    />
  );
}

export { Skeleton };
