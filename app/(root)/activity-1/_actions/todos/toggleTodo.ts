"use server";

import { getAuthSession } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function toggleTodo({ id, done }: { id: number; done: boolean }) {
  try {
    const session = await getAuthSession();

    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done }),
    });

    if (!backendRes.ok) {
      const body = await backendRes.json().catch(() => ({}));
      throw new Error(body.error || `Failed to toggle todo: ${backendRes.statusText}`);
    }

    revalidatePath("/activity-1");
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Unknown error occurred while toggling todo");
    }
  }
}
