import { NextRequest, NextResponse } from 'next/server';
import { checkLogin } from './lib/api/auth.api';
import { cookies } from 'next/headers';
import { APP_ROUTES } from './lib/app-routes';

const protectedOnlyRoutePrefixes = ['/urd'];
const publicOnlyRoutePrefixes = ['/auth'];

function checkRoutePrefix(args: { path: string; prefixes: string[] }) {
  return args.prefixes.some((prefix) => args.path.startsWith(prefix));
}

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const currentPathName = request.nextUrl.pathname;

  const isProtectedOnlyRoute = checkRoutePrefix({
    path: currentPathName,
    prefixes: protectedOnlyRoutePrefixes,
  });
  const isPublicOnlyRoute = checkRoutePrefix({
    path: currentPathName,
    prefixes: publicOnlyRoutePrefixes,
  });

  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore.get('upkraft_reddit_access_token');

    if (!cookieHeader) throw new Error('Unauthorized');

    await checkLogin({ accessToken: cookieHeader.value });

    if (isPublicOnlyRoute) return NextResponse.redirect(new URL(APP_ROUTES.DASHBOARD, request.url));

    // if we are on public only route path, we might want to redirect logged-in users away from it
    if (isProtectedOnlyRoute) return NextResponse.next();

    throw new Error('Cannot access');
  } catch {
    if (isPublicOnlyRoute) return NextResponse.next();

    return NextResponse.redirect(new URL(APP_ROUTES.AUTH.LOGIN, request.url));
  }
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};
