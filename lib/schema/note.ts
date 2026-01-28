import * as yup from "yup";
import {
  type JSONContent,
} from "@tiptap/react";

export const noteSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  category: yup
    .string()
    .required('Category is required')
    .oneOf(['work', 'personal', 'ideas', 'projects'], 'Invalid category selected'),
  editorContent: yup
    .object()
    .required('Note content is required')
    .test('has-content', 'Note content cannot be empty', (value) => {
      if (!value || typeof value !== 'object' || !('content' in value)) return false

      const content = (value as JSONContent).content
      if (!content || !Array.isArray(content)) return false

      const hasText = content.some((node: JSONContent) => {
        if (node.type === 'paragraph' && node.content && Array.isArray(node.content)) {
          return node.content.some((textNode: JSONContent) =>
            textNode.type === 'text' &&
            typeof textNode.text === 'string' &&
            textNode.text.trim().length > 0
          )
        }
        return false
      })

      return hasText
    }),
})