'use client';

import { Button } from '@/components/ui/button';
import RichTextEditor from '@/components/ui/rich-text-editor'
import Typography from '@/components/ui/typography';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  type JSONContent,
} from "@tiptap/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createNote } from '../_action/createNote';
import { useState, useTransition } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, FileText, Save, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type FormValues = {
  title: string;
  editorContent: JSONContent;
  category: string;
};

// Yup validation schema
const noteSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  category: yup
    .string()
    .required('Category is required')
    .oneOf(['work', 'personal', 'ideas', 'projects'], 'Invalid category selected'),
  editorContent: yup
    .object()
    .required('Note content is required')
    .test('has-content', 'Note content cannot be empty', (value) => {
      if (!value || typeof value !== 'object' || !('content' in value)) return false;

      const content = (value as JSONContent).content;
      if (!content || !Array.isArray(content)) return false;

      const hasText = content.some((node: JSONContent) => {
        if (node.type === 'paragraph' && node.content && Array.isArray(node.content)) {
          return node.content.some((textNode: JSONContent) =>
            textNode.type === 'text' &&
            typeof textNode.text === 'string' &&
            textNode.text.trim().length > 0
          );
        }
        return false;
      });

      return hasText;
    }),
});

const categoryOptions = [
  { value: 'work', label: 'Work', color: 'bg-blue-500' },
  { value: 'personal', label: 'Personal', color: 'bg-green-500' },
  { value: 'ideas', label: 'Ideas', color: 'bg-purple-500' },
  { value: 'projects', label: 'Projects', color: 'bg-orange-500' },
];

export default function CreateNotePage() {
  const [isPending, startTransition] = useTransition()
  const [editorKey, setEditorKey] = useState(0);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, isSubmitting }
  } = useForm<FormValues>({
    resolver: yupResolver(noteSchema),
    defaultValues: {
      editorContent: {
        type: "doc",
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: '' }] }
        ]
      },
      title: '',
      category: 'work',
    },
  });

  const selectedCategory = watch('category');
  const currentTitle = watch('title');

  const onSubmit = async (data: FormValues) => {
    startTransition(async () => {
      try {
        await createNote({
          title: data?.title,
          content: data?.editorContent as JSONContent,
          category: data?.category,
        });

        toast.success("Note created successfully!", {
          icon: '✅',
          duration: 3000,
        });

        reset({
          editorContent: {
            type: "doc",
            content: [
              { type: 'paragraph', content: [{ type: 'text', text: '' }] }
            ]
          },
          title: '',
          category: 'work',
        });

        setEditorKey(prev => prev + 1);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected error occurred";
        toast.error(message, {
          icon: '❌',
          duration: 4000,
        });
      }
    });
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <Link href="/activity-5">
          <Button variant="ghost" className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Notes Lists
          </Button>
        </Link>

        {/* Header Card */}
        <Card className="p-6 shadow-sm border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <Typography variant="h2" className="text-3xl font-bold text-gray-900">
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
              {isPending ? "Saving..." : "Save Note"}
            </Button>
          </div>
        </Card>

        {/* Preview Card (shows title and category) */}
        {(currentTitle || selectedCategory) && (
          <Card className="p-4 bg-linear-to-r from-blue-50 to-purple-50 border border-dashed">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <Typography variant="small" className="text-muted-foreground mb-1">
                  Preview
                </Typography>
                <div className="flex items-center gap-2">
                  <Typography variant="body1" className="font-semibold">
                    {currentTitle || 'Untitled Note'}
                  </Typography>
                  <Badge className={`${categoryOptions.find(c => c.value === selectedCategory)?.color} text-white`}>
                    {categoryOptions.find(c => c.value === selectedCategory)?.label}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Main Form Card */}
        <Card className="p-8">
          <form
            id="addNoteForm"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Title Field */}
            <div className="space-y-3">
              <Label htmlFor="title" className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Note Title <Typography variant='small' className="text-red-500">*</Typography>
              </Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="title"
                    placeholder="e.g. Meeting Notes, Project Ideas, Weekly Goals..."
                    className={`h-12 text-lg ${errors.title ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  />
                )}
              />
              {errors.title?.message && (
                <div className="flex items-center gap-2 text-red-600">
                  <div className="h-1 w-1 rounded-full bg-red-600" />
                  <Typography variant="small">
                    {errors.title.message}
                  </Typography>
                </div>
              )}
            </div>

            <Separator />

            {/* Category Field */}
            <div className="space-y-3">
              <Label htmlFor="category" className="text-base font-semibold text-gray-900">
                Category <Typography variant='small' className="text-red-500">*</Typography>
              </Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={`h-12 ${errors.category ? 'border-red-500' : ''}`}>
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
                <div className="flex items-center gap-2 text-red-600">
                  <div className="h-1 w-1 rounded-full bg-red-600" />
                  <Typography variant="small">
                    {errors.category.message}
                  </Typography>
                </div>
              )}
            </div>

            <Separator />

            {/* Content Field */}
            <div className="space-y-3">
              <Label htmlFor="editorContent" className="text-base font-semibold text-gray-900">
                Note Content <Typography variant='small' className="text-red-500">*</Typography>
              </Label>
              <Controller
                name="editorContent"
                control={control}
                render={({ field }) => (
                  <div className={`rounded-lg overflow-hidden ${errors.editorContent ? 'ring-2 ring-red-500' : 'border'}`}>
                    <RichTextEditor
                      key={editorKey}
                      onChange={field.onChange}
                      content={field.value as JSONContent}
                    />
                  </div>
                )}
              />
              {errors.editorContent?.message && typeof errors.editorContent.message === 'string' ? (
                <div className="flex items-center gap-2 text-red-600">
                  <div className="h-1 w-1 rounded-full bg-red-600" />
                  <Typography variant="small">
                    {errors.editorContent.message}
                  </Typography>
                </div>
              ) : (
                <Typography variant='small' className="text-muted-foreground flex items-center gap-2">
                  <Sparkles className="h-3 w-3" />
                  Write down your thoughts, ideas, or plans here. Format with rich text tools above.
                </Typography>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-6">
              <Link href="/activity-5">
                <Button type="button" variant="outline" size="lg">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                size="lg"
                disabled={isPending || !isDirty || isSubmitting}
                className="gap-2 min-w-[140px]"
              >
                <Save className="h-5 w-5" />
                {isPending ? "Saving..." : "Save Note"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}