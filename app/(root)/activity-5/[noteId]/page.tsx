import React from 'react';
import { getNoteById } from '../_action/getNotesById';
import NotesDetails from '../_components/NoteDetails';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type NotesDetailsProps = {
  noteId: string;
};

export default async function Note({ params }: { params: Promise<NotesDetailsProps> }) {
  const { noteId } = await params;
  const note = await getNoteById(noteId);
  return (
    <div className="w-full items-center flex flex-col gap-12 min-h-screen">
      <div className="max-w-7xl w-full flex flex-col gap-10">
        <div className="w-full flex justify-start">
          <Link href="/activity-5">
            <Button variant="ghost" className="gap-2">
              ← Back to Notes Lists
            </Button>
          </Link>
        </div>
        {/* Back Button */}
        <NotesDetails note={note} />
      </div>
    </div>
  );
}
