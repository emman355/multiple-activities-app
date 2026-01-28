import React from 'react'
import { getNoteById } from '../_action/getNotesById';
import NotesDetails from '../_components/NoteDetails';
import { getAuthSession } from '@/lib/auth/session';

type NotesDetailsProps = {
  noteId: string
}

export default async function Note({ params }: { params: Promise<NotesDetailsProps> }) {
  const { noteId } = await params;
  const session = await getAuthSession();
  const note = await getNoteById(noteId, session.access_token);
  return (
    <div className="w-full flex flex-col items-center gap-12 p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl w-full flex flex-col gap-10 bg-white shadow-md rounded-lg p-8">
        <NotesDetails note={note} />
      </div>
    </div>
  )
}
