import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware running, checking auth...'); // Debug log
  console.log('Middleware running, checking auth...'); // Debug log
  console.log('Middleware running, checking auth...', request.headers.get('authorization')); // Debug log
  
  const token = request.cookies.get('token')?.value || request.headers.get('authorization');
  const isLoginPage = request.nextUrl.pathname === '/login';
  
  console.log('Token present:', !!token); // Debug log
  console.log('Current path:', request.nextUrl.pathname); // Debug log

  // If trying to access dashboard without token
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('No token, redirecting to login...'); // Debug log
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If trying to access login with token
  if (token && isLoginPage) {
    console.log('Token present, redirecting to dashboard...'); // Debug log
    console.log('Token present, redirecting to dashboard...'); // Debug log
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
}; 