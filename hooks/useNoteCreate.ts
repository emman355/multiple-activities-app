import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { type JSONContent } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { noteSchema } from '@/lib/schema/note';
import { NoteFormValues } from '@/lib/types/note';
import { createNote } from '@/app/(root)/activity-5/_action/createNote';

const defaultFormValues: NoteFormValues = {
  editorContent: {
    type: 'doc',
    content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }],
  },
  title: '',
  category: 'work',
};

export const useNoteCreate = () => {
  const [isPending, startTransition] = useTransition();
  const [editorKey, setEditorKey] = useState(0);
  const router = useRouter();

  const form = useForm<NoteFormValues>({
    resolver: yupResolver(noteSchema),
    defaultValues: defaultFormValues,
  });

  const onSubmit = async (data: NoteFormValues) => {
    startTransition(async () => {
      try {
        await createNote({
          title: data.title,
          content: data.editorContent as JSONContent,
          category: data.category,
        });

        toast.success('Note created successfully!', {
          icon: '✅',
          duration: 3000,
        });

        form.reset(defaultFormValues);
        setEditorKey((prev) => prev + 1);
        router.push('/activity-5');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unexpected error occurred';
        toast.error(message, {
          icon: '❌',
          duration: 4000,
        });
      }
    });
  };

  return {
    form,
    isPending,
    editorKey,
    onSubmit,
  };
};
