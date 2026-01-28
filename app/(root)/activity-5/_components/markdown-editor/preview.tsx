'use client'

import { EditorContent, useEditor, type JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

type MarkdownEditorPreviewProps = {
  content: JSONContent
}

export default function MarkdownEditorPreview({ content }: MarkdownEditorPreviewProps) {

  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    autofocus: true,
    editable: false,
    injectCSS: false,
    content,
  })

  return (
    <div className="p-6 bg-card">
      <EditorContent
        editor={editor}
        className="prose prose-neutral dark:prose-invert max-w-none focus:outline-none
            [&_.ProseMirror]:focus:outline-none
            [&_.ProseMirror]:min-h-[100px] 
            [&_.ProseMirror]:overflow-y-auto
            [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-4
            [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mb-3
            [&_.ProseMirror_p]:mb-4
            [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-border [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic
            [&_.ProseMirror_pre]:bg-muted [&_.ProseMirror_pre]:p-4 [&_.ProseMirror_pre]:rounded [&_.ProseMirror_pre]:overflow-x-auto
            [&_.ProseMirror_code]:bg-muted [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:rounded"
      />
    </div>
  )
}