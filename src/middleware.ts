import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value || "";
  const urlPath = req.nextUrl.pathname;

  if (role && (urlPath === "/" || urlPath === "/login")) {
    switch (role) {
      case "Student":
        return NextResponse.redirect(new URL("/student/profile", req.url));
      case "Teacher":
        return NextResponse.redirect(new URL("/teacher/profile", req.url));
      case "Academic":
        return NextResponse.redirect(new URL("/academic/profile", req.url));
      case "Admin":
        return NextResponse.redirect(new URL("/admin/academic-management", req.url));
      default:
        return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (!role) {
    if (
      urlPath.startsWith("/student") ||
      urlPath.startsWith("/teacher") ||
      urlPath.startsWith("/academic") ||
      urlPath.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  const allowedRoles: Record<string, string[]> = {
    "/student": ["Student"],
    "/teacher": ["Teacher"],
    "/academic": ["Academic"],
    "/admin": ["Admin"],
  };

  for (const [pathPrefix, roles] of Object.entries(allowedRoles)) {
    if (urlPath.startsWith(pathPrefix) && !roles.includes(role)) {
      switch (role) {
        case "Student":
          return NextResponse.redirect(new URL("/student/schedule", req.url));
        case "Teacher":
          return NextResponse.redirect(new URL("/teacher/profile", req.url));
        case "Academic":
          return NextResponse.redirect(new URL("/academic/profile", req.url));
        case "Admin":
          return NextResponse.redirect(new URL("/admin/profile", req.url));
        default:
          return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/student/:path*",
    "/teacher/:path*",
    "/academic/:path*",
    "/admin/:path*",
  ],
};
