'use client';

import { type JSONContent } from '@tiptap/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Eye, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import MarkdownEditorPreview from '../markdown-editor/preview';
import MarkdownEditorRaw from '../markdown-editor/raw';
import { cn } from '@/lib/utils';

type NoteContentProps = {
  content: JSONContent;
  mode: 'view' | 'edit';
  editorControl?: React.ReactNode;
};

export default function NoteContent({ content, mode, editorControl }: NoteContentProps) {
  return (
    <Card className="overflow-hidden">
      <Tabs defaultValue={mode === 'view' ? 'preview' : 'editor'}>
        <div className="bg-accent border-b px-6 py-3">
          <TabsList
            className={cn(
              'grid bg-accent-foreground/80 w-auto',
              mode !== 'view' ? 'sm:w-md grid-cols-3' : 'sm:w-xs grid-cols-2'
            )}
          >
            <TabsTrigger value={mode === 'view' ? 'preview' : 'editor'}>
              {mode === 'view' ? (
                <Eye className="h-4 w-4" />
              ) : (
                <Edit className="h-4 w-4 -translate-y-1/8" />
              )}
              {mode === 'view' ? 'Preview' : 'Editor'}
            </TabsTrigger>
            <TabsTrigger value={mode === 'view' ? 'raw' : 'preview'}>
              {mode === 'view' ? (
                <FileText className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4 -translate-y-1/8" />
              )}
              {mode === 'view' ? 'Raw' : 'Preview'}
            </TabsTrigger>
            {mode !== 'view' ? (
              <TabsTrigger value="raw">
                <FileText className="h-4 w-4" />
                Raw
              </TabsTrigger>
            ) : null}
          </TabsList>
        </div>

        {mode === 'view' ? (
          <>
            <TabsContent value="preview" className="m-0">
              <div className="prose prose-slate prose-headings:font-bold prose-a:text-primary max-w-none">
                <MarkdownEditorPreview content={content} />
              </div>
            </TabsContent>

            <TabsContent value="raw" className="m-0">
              <MarkdownEditorRaw content={content} />
            </TabsContent>
          </>
        ) : (
          <>
            <TabsContent value="editor" className="p-6 m-0">
              {editorControl}
            </TabsContent>

            <TabsContent value="preview" className="p-6 m-0">
              <div className="prose prose-slate prose-headings:font-bold prose-a:text-primary max-w-none">
                <MarkdownEditorPreview content={content} />
              </div>
            </TabsContent>

            <TabsContent value="raw" className="m-0">
              <MarkdownEditorRaw content={content} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </Card>
  );
}
