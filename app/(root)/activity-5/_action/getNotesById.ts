"use server";

import { getAuthSession } from "@/lib/auth/session";
import { type JSONContent } from "@tiptap/react";

export type Note = {
  id: string;
  userId: string;
  title: string;
  content: JSONContent;
  category?: string;
  createdAt: string;
  updatedAt: string;
};

export async function getNoteById(id: string) {
  //!for future use
  //? Set cache lifetime to 5 minutes
  // "use cache";
  // cacheLife({
  //   stale: 300,      // Stale after 5 minutes
  //   revalidate: 600, // Revalidate after 10 minutes
  //   expire: 3600,    // Expire after 1 hour
  // });
  // cacheTag("notes");
  // cacheTag(`note-${id}`);

  try {
    const session = await getAuthSession()
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["notes", `note-${id}`],
        },
      }
    );

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));

      // Handle 404 specifically
      if (backendRes.status === 404) {
        throw new Error("Note not found");
      }

      throw new Error(body.error || `Failed to fetch note: ${backendRes.statusText}`);
    }

    const note: Note = await backendRes.json();

    return note;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Unknown error occurred while fetching note");
    }
  }
}