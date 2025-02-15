import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check both cookie and authorization header
  const cookieToken = request.cookies.get('token')?.value;
  const headerToken = request.headers.get('authorization')?.replace('Bearer ', '');
  const token = cookieToken || headerToken;
  
  const isLoginPage = request.nextUrl.pathname === '/login';
  
  // If trying to access dashboard without token
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('No token, redirecting to login...'); // Debug log
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If trying to access login with token
  if (token && isLoginPage) {
    console.log('Token present, redirecting to dashboard...'); // Debug log
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
}; 