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
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If trying to access login with token
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
// This middleware is used to check if the user is logged in and redirect to the login page if they are not
// It also checks if the user is trying to access the login page with a token and redirects to the dashboard if they are
// It is used to protect the dashboard and login page from being accessed without a token
export const config = {
  matcher: ['/dashboard/:path*', '/login']
}; 