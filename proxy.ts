import { type NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { updateSession } from '@/lib/utils';

export async function proxy(request: NextRequest) {
  // First update the session (refresh tokens, etc.)
  const response = await updateSession(request);

  // Create a Supabase client bound to the request/response
  const supabase = createMiddlewareClient({ req: request, res: response });

  // Get the current user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If no session and user is trying to access a protected route, redirect to login
  const protectedPaths = ['/',];
  const isProtected = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isProtected && !session) {
    const loginUrl = new URL('/sign-in', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Otherwise continue
  return response;
}

export const config = {
  matcher: ['/'],
};
