"use server";

import { type JSONContent } from "@tiptap/react";
import { cacheTag } from "next/cache"; 

export type Note = {
  id: number;
  userId: number;
  title: string;
  content: JSONContent;
  category?: string;
  createdAt: string;
  updatedAt: string;
};

export async function getNotes(accessToken: string) {
  "use cache";
  
  //!for future use
  //? Set cache lifetime to 5 minutes
  // cacheLife({
  //   stale: 300,      // Stale after 5 minutes
  //   revalidate: 600, // Revalidate after 10 minutes
  //   expire: 3600,    // Expire after 1 hour
  // });
  
  // Add cache tags for targeted revalidation
  cacheTag("notes");

  try {
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(body.error || `Failed to fetch notes: ${backendRes.statusText}`);
    }

    const notes: Note[] = await backendRes.json();

    return notes;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Unknown error occurred while fetching notes");
    }
  }
}