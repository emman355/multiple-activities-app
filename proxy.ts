import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function proxy(request: NextRequest) {
  // update user's auth session
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!api|auth/callback|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',

    // extra pages you want explicitly matched
    '/activity-1',
    '/activity-2',
    '/activity-3',
    '/activity-4',
    '/activity-5',
  ],
};
