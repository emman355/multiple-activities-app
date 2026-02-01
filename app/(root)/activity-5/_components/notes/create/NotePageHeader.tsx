import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { Save, Sparkles } from 'lucide-react';

type NotePageHeaderProps = {
  isPending: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
};

export const NotePageHeader = ({ isPending, isDirty, isSubmitting }: NotePageHeaderProps) => {
  return (
    <Card className="p-6 shadow-sm border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <Typography variant="h2" className="text-3xl font-bold text-foreground">
              Create New Note
            </Typography>
            <Typography variant="small" className="text-muted-foreground mt-1">
              Capture your thoughts and ideas
            </Typography>
          </div>
        </div>

        <Button
          type="submit"
          form="addNoteForm"
          size="lg"
          disabled={isPending || !isDirty || isSubmitting}
          className="gap-2 shadow-md"
        >
          <Save className="h-5 w-5" />
          {isPending ? 'Saving...' : 'Save Note'}
        </Button>
      </div>
    </Card>
  );
};
