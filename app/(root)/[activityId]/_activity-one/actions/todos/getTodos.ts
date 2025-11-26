"use server";

import { createClient } from "@/lib/supabase/server";

export async function getTodos() {
  try {
    const supabase = await createClient();
    const { data: { session }, error: authError } = await supabase.auth.getSession();

    if (authError) {
      throw new Error(`Auth error: ${authError.message}`);
    }

    if (!session) {
      throw new Error("User not authenticated");
    }

    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(body.error || `Failed to fetch todos: ${backendRes.statusText}`);
    }

    const todos = await backendRes.json();
    return todos;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Unknown error occurred while fetching todos");
    }
  }
}
