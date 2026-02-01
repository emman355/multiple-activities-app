'use client';

import { Control, FieldErrors } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Typography from '@/components/ui/typography';
import { categoryColors } from '../NoteList';
import { type JSONContent } from '@tiptap/react';
import RichTextEditor from '@/components/ui/rich-text-editor';

type FormValues = {
  title: string;
  editorContent: JSONContent;
  category: string;
};

const categories = ['ideas', 'personal', 'work', 'projects'] as const;

type TitleControlProps = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
};

export function TitleControl({ control, errors }: TitleControlProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="title">
        Title{' '}
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
            placeholder="Enter note title..."
            className={`text-lg font-semibold ${
              errors.title ? 'border-destructive focus-visible:ring-destructive' : ''
            }`}
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
}

type CategoryControlProps = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
};

export function CategoryControl({ control, errors }: CategoryControlProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="category">
        Category{' '}
        <Typography variant="small" className="text-destructive">
          *
        </Typography>
      </Label>
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              id="category"
              className={`w-48 ${errors.category ? 'border-destructive' : ''}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${categoryColors[cat] || 'bg-muted'}`} />
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
}

type EditorControlProps = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  editorKey: number;
};

export function EditorControl({ control, errors, editorKey }: EditorControlProps) {
  return (
    <div className="space-y-2">
      <Typography variant="small">
        Content{' '}
        <Typography variant="small" className="text-destructive">
          *
        </Typography>
      </Typography>
      <Controller
        name="editorContent"
        control={control}
        render={({ field }) => (
          <div
            className={`rounded-lg overflow-hidden ${
              errors.editorContent ? 'ring-2 ring-destructive' : 'border'
            }`}
          >
            <RichTextEditor
              key={editorKey}
              onChange={field.onChange}
              content={field.value as JSONContent}
            />
          </div>
        )}
      />
      {errors.editorContent?.message && typeof errors.editorContent.message === 'string' && (
        <div className="flex items-center gap-2 text-destructive">
          <div className="h-1 w-1 rounded-full bg-destructive" />
          <Typography variant="small">{errors.editorContent.message}</Typography>
        </div>
      )}
    </div>
  );
}
