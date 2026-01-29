import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, FileText, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Note } from '../../_action/getNotes';

export const categoryColors: Record<string, string> = {
  work: 'bg-primary hover:bg-primary/90',
  personal: 'bg-secondary hover:bg-secondary/90',
  ideas: 'bg-accent hover:bg-accent/90',
  projects: 'bg-[#ea580c] hover:bg-[#dc4a05]',
};

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
  return (
    <>
      {/* Notes Grid */}
      {notes.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <FileText className="h-16 w-16 text-muted-foreground" />
            <div>
              <Typography variant="h3" className="text-xl font-semibold text-foreground">
                No notes yet
              </Typography>
              <Typography variant="body2" className="text-muted-foreground mt-2">
                Get started by creating your first note
              </Typography>
            </div>
            <Link href="/activity-5/create-note">
              <Button className="gap-2 mt-4">
                <Plus className="h-4 w-4" />
                Create Your First Note
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <Card
              key={note.id}
              className="hover:shadow-lg transition-shadow duration-200 flex flex-col"
            >
              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">{note.title}</CardTitle>
                <CardDescription className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <Calendar className="h-3 w-3" />
                    {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                  </div>

                  {note.category && (
                    <Typography
                      variant="small"
                      className={`${categoryColors[note.category] || 'bg-muted'} text-foreground shrink-0 py-1 px-3 rounded-2xl w-fit`}
                    >
                      {note.category}
                    </Typography>
                  )}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Link href={`/activity-5/${note.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
