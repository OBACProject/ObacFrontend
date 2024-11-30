// import { NextResponse } from 'next/server';

// export function middleware(request: { nextUrl: { pathname: any; }; cookies: { get: (arg0: string) => any; }; url: string | URL | undefined; }) {
//   const { pathname } = request.nextUrl;


//   const isAuthenticated = request.cookies.get('auth-token');
  
//   if (!isAuthenticated && pathname.startsWith('/dashboard')) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }


//   const response = NextResponse.next();
//   response.headers.set('X-Custom-Header', 'my-custom-header');
//   return response;
// }

// export const config = {
//   matcher: [
//     '/dashboard/:path*', 
//   ],
// };