// app/activity-5/[id]/edit/page.tsx
import { Suspense } from 'react'
import { getNoteById } from '../../_action/getNotesById'
import NoteEditSkeleton from '../../_components/NoteEditSkeleton'
import NotesEdit from '../../_components/NoteEdit'
import { getAuthSession } from '@/lib/auth/session'

type EditNotePageProps = {
  noteId: string
}

export default async function EditNotePage({ params }: { params: Promise<EditNotePageProps> }) {
  const { noteId } = await params;

  return (
    <div className="w-full flex flex-col items-center gap-12 p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl w-full flex flex-col gap-10 bg-white shadow-md rounded-lg p-8">
        <Suspense fallback={<NoteEditSkeleton />}>
          <NoteEditContent noteId={noteId} />
        </Suspense>
      </div>
    </div>
  )
}

async function NoteEditContent({ noteId }: { noteId: string }) {
  const session = getAuthSession()
  const note = await getNoteById(noteId, (await session).access_token)

  return <NotesEdit note={note} />
}