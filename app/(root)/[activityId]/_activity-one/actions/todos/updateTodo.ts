"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateTodo(id: number, newTitle: string) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("Not authenticated");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos/${id}`, {
      method: "PATCH", // or PATCH depending on your backend
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    });

    if (!res.ok) {
      // Try to parse error message from backend
      const errorBody = await res.json().catch(() => null);
      const message = errorBody?.error || res.statusText || "Unknown error";
      throw new Error(message);
    }

    // Revalidate the page where todos are listed
    revalidatePath("/activity-1");
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}
