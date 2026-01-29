import Typography from '@/components/ui/typography'
import React from 'react'
import NoteList from './notes/NoteList'
import { getNotes } from '../_action/getNotes';

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className='space-y-4'>
      <Typography variant="body2" className="text-muted-foreground">
        {notes.length} {notes.length === 1 ? 'note' : 'notes'} in total
      </Typography>
      <NoteList notes={notes} />
    </div>
  )
}
