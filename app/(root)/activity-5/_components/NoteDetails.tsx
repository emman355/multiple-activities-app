// components/NotesDetails.tsx
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Note } from '@/lib/types/note';
import NoteHeader from './notes/NoteHeader';
import NoteContent from './notes/NoteContent';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import toast from 'react-hot-toast';
import { deleteNote } from '../_action/deleteNote';

type NotesDetailsProps = {
  note: Note;
};

export default function NotesDetails({ note }: NotesDetailsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteNote(note.id);
        toast.success('Note deleted successfully');
        router.push('/activity-5');
        router.refresh();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete note';
        toast.error(errorMessage);
      }
    });
  };

  return (
    <div className="space-y-6">
      <NoteHeader note={note} mode="view" onDelete={handleDelete} isDeleting={isPending} />
      <NoteContent content={note.content} mode="view" />

      {/* Back Button */}
      <div className="flex justify-center pt-4">
        <Link href="/activity-5">
          <Button variant="ghost" className="gap-2">
            ← Back to Notes Lists
          </Button>
        </Link>
      </div>
    </div>
  );
}
