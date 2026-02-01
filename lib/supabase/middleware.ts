import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const SESSION_MAX_AGE = 1000 * 60 * 60 * 8; // 8 hours;
const ACTIVITY_UPDATE_INTERVAL = 60_000; // 1 minute

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;
  const pathname = request.nextUrl.pathname;
  const publicRoutes = [
    '/',
    '/sign-in',
    '/sign-up',
    '/auth/callback',
    '/logout',
    '/delete-account',
  ];

  // Skip checks for public routes
  if (publicRoutes.includes(pathname)) {
    // Redirect authenticated users away from login/signup
    if (user && ['/sign-in', '/sign-up'].includes(pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return supabaseResponse;
  }

  // Protected routes - check authentication
  if (!session || !user) {
    const hasExpiredParam = request.cookies.get('session-expired');
    const redirectUrl = hasExpiredParam ? '/sign-in?expired=true' : '/sign-in';

    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Session timeout logic
  const now = Date.now();
  const lastActivityAt = user.last_sign_in_at ? new Date(user.last_sign_in_at).getTime() : now;

  const sessionAge = now - lastActivityAt;
  const sessionExpiresAt = sessionAge > SESSION_MAX_AGE;

  if (sessionExpiresAt) {
    await supabase.auth.signOut();

    // Set a cookie to indicate session expired
    const response = NextResponse.redirect(new URL('/sign-in?expired=true', request.url));
    response.cookies.set('session-expired', 'true', { maxAge: 10 });
    return response;
  }

  // Update activity timestamp
  if (sessionAge > ACTIVITY_UPDATE_INTERVAL) {
    await supabase.auth.updateUser({
      data: {
        last_activity_at: new Date().toISOString(),
      },
    });
  }

  return supabaseResponse;
}
