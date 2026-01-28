import Typography from '@/components/ui/typography'
import React from 'react'
import NoteList from './notes/NoteList'
import { getNotes } from '../_action/getNotes';
import { getAuthSession } from '@/lib/auth/session';

export default async function NotesPage() {
  const session = await getAuthSession();
  const notes = await getNotes(session?.access_token);

  return (
    <div className='space-y-4'>
      <Typography variant="body2" className="text-gray-600">
        {notes.length} {notes.length === 1 ? 'note' : 'notes'} in total
      </Typography>
      <NoteList notes={notes} />
    </div>
  )
}
