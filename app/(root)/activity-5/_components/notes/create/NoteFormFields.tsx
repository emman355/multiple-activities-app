import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Typography from '@/components/ui/typography';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText } from 'lucide-react';
import { type JSONContent } from '@tiptap/react';
import { categoryOptions } from './constants';

type FormValues = {
  title: string;
  editorContent: JSONContent;
  category: string;
};

type NoteTitleFieldProps = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
};

export const NoteTitleField = ({ control, errors }: NoteTitleFieldProps) => {
  return (
    <div className="space-y-3">
      <Label
        htmlFor="title"
        className="text-base font-semibold text-foreground flex items-center gap-2"
      >
        <FileText className="h-4 w-4" />
        Note Title{' '}
        <Typography variant="small" className="text-destructive">
          *
        </Typography>
      </Label>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id="title"
            placeholder="e.g. Meeting Notes, Project Ideas, Weekly Goals..."
            className={`h-12 text-lg ${errors.title ? 'border-destructive focus-visible:ring-destructive' : ''}`}
          />
        )}
      />
      {errors.title?.message && (
        <div className="flex items-center gap-2 text-destructive">
          <div className="h-1 w-1 rounded-full bg-destructive" />
          <Typography variant="small">{errors.title.message}</Typography>
        </div>
      )}
    </div>
  );
};

type NoteCategoryFieldProps = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
};

export const NoteCategoryField = ({ control, errors }: NoteCategoryFieldProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="category" className="text-base font-semibold text-foreground">
        Category{' '}
        <Typography variant="small" className="text-destructive">
          *
        </Typography>
      </Label>
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className={`h-12 ${errors.category ? 'border-destructive' : ''}`}>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${option.color}`} />
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.category?.message && (
        <div className="flex items-center gap-2 text-destructive">
          <div className="h-1 w-1 rounded-full bg-destructive" />
          <Typography variant="small">{errors.category.message}</Typography>
        </div>
      )}
    </div>
  );
};
