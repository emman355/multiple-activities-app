import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { noteSchema } from '@/lib/schema/note';
import { Note, NoteFormValues } from '@/lib/types/note';
import { updateNote } from '@/app/(root)/activity-5/_action/updateNote';

export function useNoteEdit(note: Note) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editorKey, setEditorKey] = useState(0);
  const [hasRealChanges, setHasRealChanges] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const [baselineValues, setBaselineValues] = useState({
    title: note.title,
    content: note.content,
    category: note.category || 'ideas',
  });

  const form = useForm<NoteFormValues>({
    resolver: yupResolver(noteSchema),
    defaultValues: {
      title: note.title,
      editorContent: note.content,
      category: note.category || 'ideas',
    },
  });

  const { watch, reset } = form;
  const currentTitle = watch('title');
  const currentCategory = watch('category');
  const currentContent = watch('editorContent');

  // Check for actual changes
  useEffect(() => {
    const titleChanged = currentTitle !== baselineValues.title;
    const categoryChanged = currentCategory !== baselineValues.category;
    const contentChanged =
      JSON.stringify(currentContent) !== JSON.stringify(baselineValues.content);

    setHasRealChanges(titleChanged || categoryChanged || contentChanged);
  }, [currentTitle, currentCategory, currentContent, baselineValues]);

  // Update baseline when note changes
  useEffect(() => {
    setBaselineValues({
      title: note.title,
      content: note.content,
      category: note.category || 'ideas',
    });
    reset({
      title: note.title,
      editorContent: note.content,
      category: note.category || 'ideas',
    });
  }, [note.id, note.title, note.content, note.category, reset]);

  const onSubmit = async (data: NoteFormValues) => {
    startTransition(async () => {
      try {
        await updateNote(note.id, {
          title: data.title.trim(),
          content: data.editorContent,
          category: data.category,
        });

        const newBaseline = {
          title: data.title.trim(),
          content: data.editorContent,
          category: data.category,
        };

        setBaselineValues(newBaseline);
        setHasRealChanges(false);
        setEditorKey((prev) => prev + 1);
        toast.success('Note updated successfully');
        router.push(`/activity-5/${note.id}`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update note';
        toast.error(errorMessage);
      }
    });
  };

  const handleCancelClick = () => {
    if (hasRealChanges) {
      setShowCancelDialog(true);
    } else {
      router.push(`/activity-5/${note.id}`);
    }
  };

  const handleConfirmCancel = () => {
    reset({
      title: baselineValues.title,
      editorContent: baselineValues.content,
      category: baselineValues.category,
    });
    setShowCancelDialog(false);
    router.push(`/activity-5/${note.id}`);
  };

  return {
    form,
    isPending,
    editorKey,
    hasRealChanges,
    showCancelDialog,
    setShowCancelDialog,
    currentContent,
    onSubmit,
    handleCancelClick,
    handleConfirmCancel,
  };
}
