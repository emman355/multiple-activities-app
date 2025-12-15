"use server";

import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";

export async function getAuthSession() {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error(`Auth error: ${error.message}`);
  }

  if (!session) {
    // Redirect to sign-in page with a flag
    redirect("/sign-in?expired=true");
  }

  return session;
}
