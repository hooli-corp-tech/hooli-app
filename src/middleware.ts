import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Handle api.hooli-corp.org subdomain
  if (hostname.startsWith('api.')) {
    const url = request.nextUrl.clone();
    const pathname = url.pathname;

    // If already on /api route, continue
    if (pathname.startsWith('/api')) {
      return NextResponse.next();
    }

    // Rewrite to /api
    url.pathname = pathname === '/' ? '/api' : `/api${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
