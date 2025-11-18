import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function updateSession(request: NextRequest) {
  // Always start with a NextResponse (clone of request)
  const response = NextResponse.next();

  // Bind Supabase client to request/response
  const supabase = createMiddlewareClient({ req: request, res: response });

  // Refresh session if needed
  await supabase.auth.getSession();

  return response;
}

/**
 * Utility to check if a user is authenticated.
 * Returns the session object if logged in, otherwise null.
 */
export async function getUserSession(request: NextRequest, response: NextResponse) {
  const supabase = createMiddlewareClient({ req: request, res: response });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}
