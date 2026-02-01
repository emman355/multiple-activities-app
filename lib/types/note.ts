import { type JSONContent } from '@tiptap/react';

export type Note = {
  id: string;
  userId: string;
  title: string;
  content: JSONContent;
  category?: 'ideas' | 'personal' | 'work' | 'projects' | string;
  createdAt: string;
  updatedAt: string;
};

export type NoteFormValues = {
  title: string;
  editorContent: JSONContent;
  category: string;
};
