// app/activity-5/[id]/edit/page.tsx
import { Suspense } from 'react';
import { getNoteById } from '../../_action/getNotesById';
import NoteEditSkeleton from '../../_components/NoteEditSkeleton';
import NotesEdit from '../../_components/NoteEdit';

type EditNotePageProps = {
  noteId: string;
};

export default async function EditNotePage({ params }: { params: Promise<EditNotePageProps> }) {
  const { noteId } = await params;

  return (
    <div className="w-full flex flex-col items-center gap-12 min-h-screen">
      <div className="max-w-7xl w-full flex flex-col gap-10 shadow-md rounded-lg">
        <Suspense fallback={<NoteEditSkeleton />}>
          <NoteEditContent noteId={noteId} />
        </Suspense>
      </div>
    </div>
  );
}

async function NoteEditContent({ noteId }: { noteId: string }) {
  const note = await getNoteById(noteId);

  return <NotesEdit note={note} />;
}
