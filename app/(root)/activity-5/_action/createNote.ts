"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/auth/session";
import {
  type JSONContent,
} from "@tiptap/react";

// Define the form values type
export type NoteFormValues = {
  title: string;
  content: JSONContent;
  category: string;
};

export async function createNote(values: NoteFormValues) {
  try {
    const session = await getAuthSession();

    // Validate required fields
    if (!values.title) {
      throw new Error("Title is required");
    }
    if (!values.content) {
      throw new Error("Content is required");
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          content: values.content,
          category: values.category,
        }),
      }
    );

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(body.error || `Failed to create note: ${backendRes.statusText}`);
    }

    const createdNote = await backendRes.json();

    // ✅ Revalidate cache
    revalidateTag("notes", "max"); // revalidate any fetches tagged with "notes"
    revalidatePath("/activity-5"); // revalidate the notes page/list

    return createdNote;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Unknown error occurred while creating note");
    }
  }
}