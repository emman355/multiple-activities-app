'use server';

import { createClient } from '../supabase/server';

export async function getAuthSession() {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error(`Auth error: ${error.message}`);
  }

  return session;
}
