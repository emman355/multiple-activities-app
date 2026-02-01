import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Typography from '@/components/ui/typography';
import { FileText } from 'lucide-react';
import { categoryOptions } from './constants';

type NoteTitlePreviewProps = {
  title: string;
  category: string;
};

export const NoteTitlePreview = ({ title, category }: NoteTitlePreviewProps) => {
  if (!title && !category) return null;

  const categoryInfo = categoryOptions.find((c) => c.value === category);

  return (
    <Card className="p-4 bg-secondary/10 border border-dashed">
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <div className="flex-1">
          <Typography variant="small" className="text-muted-foreground mb-1">
            Preview
          </Typography>
          <div className="flex items-center gap-2">
            <Typography variant="body1" className="font-semibold">
              {title || 'Untitled Note'}
            </Typography>
            {categoryInfo && (
              <Badge className={`${categoryInfo.color} text-white`}>{categoryInfo.label}</Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
