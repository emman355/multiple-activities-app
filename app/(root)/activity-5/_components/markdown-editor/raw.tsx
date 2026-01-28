'use client'

import { jsonToMarkdown } from '@/lib/utils'
import { type JSONContent } from '@tiptap/react'

type MarkdownEditorRawProps = {
  content: JSONContent
}

export default function MarkdownEditorRaw({ content }: MarkdownEditorRawProps) {
  // Convert JSONContent to Markdown string
  const markdown = jsonToMarkdown(content)

  return (
    <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
      {markdown}
    </pre>
  )
}