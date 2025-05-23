import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

  const role = req.cookies.get("role")?.value || "";
  const urlPath = req.nextUrl.pathname;

  if (!role) {
    return NextResponse.redirect(new URL("/pages/login", req.url));
  }

  const allowedRoles: Record<string, string[]> = {
    "/pages/student": ["Student"],
    "/pages/teacher": ["Teacher"],
    "/pages/academic": ["Academic"],
    "/pages/admin": ["Admin"],
  };

  // Check if the requested path matches any restricted paths
  for (const path in allowedRoles) {
    if (urlPath.startsWith(path)) {
      if (!allowedRoles[path].includes(role)) {

        switch (role) {
          case "Student":
            return NextResponse.redirect(
              new URL("/pages/student/schedule", req.url)
            );
          case "Teacher":
            return NextResponse.redirect(
              new URL("/pages/teacher/profile", req.url)
            );
          case "Academic":
            return NextResponse.redirect(new URL("/pages/academic", req.url));
          case "Admin":
            return NextResponse.redirect(
              new URL("/pages/admin/profile", req.url)
            );
          default:
            return NextResponse.redirect(new URL("/pages/login", req.url));
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pages/student/:path*",
    "/pages/teacher/:path*",
    "/pages/academic/:path*",
    "/pages/admin/:path*",
  ],
};
