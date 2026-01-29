// components/notes/NoteHeader.tsx
'use client';

import { Calendar, Clock, Edit, FileText, Save, Trash2, X } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Note } from '@/lib/types/note';
import { categoryColors } from './NoteList';
import { useState } from 'react';
import ConfirmDialog from '@/components/ui/confirm-dialog';

type NoteHeaderProps = {
  note: Note;
  mode: 'view' | 'edit';
  // Edit mode props
  titleControl?: React.ReactNode;
  categoryControl?: React.ReactNode;
  onSave?: () => void;
  onCancel?: () => void;
  isSaving?: boolean;
  hasChanges?: boolean;
  // View mode props
  onDelete?: () => void;
  isDeleting?: boolean;
};

export default function NoteHeader({
  note,
  mode,
  titleControl,
  categoryControl,
  onSave,
  onCancel,
  isSaving = false,
  hasChanges = false,
  onDelete,
  isDeleting = false,
}: NoteHeaderProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const wasUpdated = note.createdAt !== note.updatedAt;

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex flex-col gap-4">
          {/* Title and Actions */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1 space-y-4">
              {mode === 'view' ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-6 w-6 text-primary" />
                    <Typography variant="h2" className="text-3xl font-bold text-foreground">
                      {note.title}
                    </Typography>
                  </div>

                  {note.category && (
                    <Badge
                      className={`${categoryColors[note.category] || 'bg-muted'} text-foreground text-sm px-3 py-1`}
                    >
                      {note.category.charAt(0).toUpperCase() + note.category.slice(1)}
                    </Badge>
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <Edit className="h-6 w-6 text-primary" />
                    <Typography variant="h2" className="text-3xl font-bold text-foreground">
                      Edit Note
                    </Typography>
                  </div>

                  {titleControl}
                  {categoryControl}
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {mode === 'view' ? (
                <>
                  <Link href={`/activity-5/${note.id}/edit`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-destructive hover:text-destructive"
                    disabled={isDeleting}
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="h-4 w-4" />
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="submit"
                    disabled={isSaving || !hasChanges}
                    className="gap-2"
                    onClick={onSave}
                  >
                    <Save className="h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSaving}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <Typography variant="small">
                Created {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
              </Typography>
            </div>

            {wasUpdated && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <Typography variant="small">
                  {mode === 'view' ? 'Updated' : 'Last updated'}{' '}
                  {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                </Typography>
              </div>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <Typography variant="small" className="text-xs text-muted-foreground">
                {format(new Date(note.createdAt), 'MMM dd, yyyy • hh:mm a')}
              </Typography>
            </div>
          </div>

          {/* Unsaved changes indicator */}
          {mode === 'edit' && hasChanges && (
            <div className="flex items-center gap-2 text-sm text-accent bg-accent dark:bg-accent/20 p-3 rounded-md">
              <Clock className="h-4 w-4" />
              <Typography variant="small">You have unsaved changes</Typography>
            </div>
          )}
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Are you absolutely sure?"
        description={`This action cannot be undone. This will permanently delete the note "${note.title}" and remove it from our servers.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        isLoading={isDeleting}
        variant="destructive"
      />
    </>
  );
}
