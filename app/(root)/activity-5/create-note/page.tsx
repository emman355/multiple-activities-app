'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import NoteContent from '../_components/notes/NoteContent';
import { EditorControl } from '../_components/notes/edit/NoteFormControls';
import { useNoteCreate } from '@/hooks/useNoteCreate';
import { NotePageHeader } from '../_components/notes/create/NotePageHeader';
import { NoteCategoryField, NoteTitleField } from '../_components/notes/create/NoteFormFields';
import { NoteTitlePreview } from '../_components/notes/create/NoteTitlePreview';

export default function CreateNotePage() {
  const { form, isPending, editorKey, onSubmit } = useNoteCreate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = form;

  const selectedCategory = watch('category');
  const currentTitle = watch('title');
  const currentContent = watch('editorContent');

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-7xl space-y-6 mx-auto">
        {/* Back Button */}
        <Link href="/activity-5">
          <Button variant="ghost" className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Notes Lists
          </Button>
        </Link>

        {/* Header Card */}
        <NotePageHeader isPending={isPending} isDirty={isDirty} isSubmitting={isSubmitting} />

        {/* Preview Card */}
        <NoteTitlePreview title={currentTitle} category={selectedCategory} />

        {/* Main Form Card */}
        <Card className="p-8">
          <form id="addNoteForm" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Title Field */}
            <NoteTitleField control={control} errors={errors} />

            <Separator />

            {/* Category Field */}
            <NoteCategoryField control={control} errors={errors} />

            <Separator />

            {/* Content Field */}
            <NoteContent
              content={currentContent}
              mode="edit"
              editorControl={
                <EditorControl control={control} errors={errors} editorKey={editorKey} />
              }
            />

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
                {isPending ? 'Saving...' : 'Save Note'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
