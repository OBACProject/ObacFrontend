import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

  const role = req.cookies.get("role")?.value || "";
  console.log("User role from cookie:", role);
  const urlPath = req.nextUrl.pathname;

  if (!role) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const allowedRoles: Record<string, string[]> = {
    "/student": ["Student"],
    "/teacher": ["Teacher"],
    "/academic": ["Academic"],
    "/admin": ["Admin"],
  };

  // Check if the requested path matches any restricted paths
  for (const [pathPrefix, roles] of Object.entries(allowedRoles)) {
    if (urlPath.startsWith(pathPrefix) && !roles.includes(role)) {
      switch (role) {
        case "Student":
          return NextResponse.redirect(new URL("/student/schedule", req.url));
        case "Teacher":
          return NextResponse.redirect(new URL("/teacher/profile", req.url));
        case "Academic":
          return NextResponse.redirect(new URL("/academic", req.url));
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
    "/student/:path*",
    "/teacher/:path*",
    "/academic/:path*",
    "/admin/:path*",
  ],
};