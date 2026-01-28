'use client'

import { Button } from '@/components/ui/button'
import { Note } from '@/lib/types/note'
import NoteHeader from './notes/NoteHeader'
import NoteContent from './notes/NoteContent'
import ConfirmDialog from '@/components/ui/confirm-dialog'
import { TitleControl, CategoryControl, EditorControl } from './notes/edit/NoteFormControls'
import { useNoteEdit } from '@/hooks/useNoteEdit'

type NotesEditProps = {
  note: Note
}

export default function NotesEdit({ note }: NotesEditProps) {
  const {
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
  } = useNoteEdit(note)

  const { control, handleSubmit, formState: { errors, isSubmitting } } = form

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <NoteHeader
          note={note}
          mode="edit"
          titleControl={<TitleControl control={control} errors={errors} />}
          categoryControl={<CategoryControl control={control} errors={errors} />}
          onSave={handleSubmit(onSubmit)}
          onCancel={handleCancelClick}
          isSaving={isPending || isSubmitting}
          hasChanges={hasRealChanges}
        />

        <NoteContent
          content={currentContent}
          mode="edit"
          editorControl={<EditorControl control={control} errors={errors} editorKey={editorKey} />}
        />

        {/* Back Button */}
        <div className="flex justify-center pt-4">
          <Button
            type="button"
            variant="ghost"
            className="gap-2"
            onClick={handleCancelClick}
            disabled={isPending}
          >
            ← Back to Note
          </Button>
        </div>
      </form>

      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        title="Discard unsaved changes?"
        description="You have unsaved changes to your note. If you leave now, all changes will be lost. Are you sure you want to discard your changes?"
        confirmText="Discard Changes"
        cancelText="Continue Editing"
        onConfirm={handleConfirmCancel}
        variant="destructive"
      />
    </>
  )
}