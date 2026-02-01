import Typography from '@/components/ui/typography';

type TodoItemContentProps = {
  title: string;
  updatedAt: string;
};

export default function TodoItemContent({ title, updatedAt }: TodoItemContentProps) {
  return (
    <div className="flex flex-col">
      <Typography variant="body1" className="leading-none font-medium">
        {title}
      </Typography>
      <Typography variant="small" className="text-muted-foreground">
        {new Date(updatedAt).toLocaleString()}
      </Typography>
    </div>
  );
}
