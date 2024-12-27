import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware triggered for:", req.nextUrl.pathname);
  const role = req.cookies.get("role")?.value || "";

  console.log("Role:", role);
  const name = req.cookies.get("name")?.value || "";

  console.log(role);
  const url = req.url;

  if (!role) {
    return NextResponse.redirect(new URL("/pages/login", req.url));
  }

  // Type the allowedRoles object
  const allowedRoles: Record<string, string[]> = {
    "/student/*": ["student"],
    "/teacher/*": ["teacher"],
    "/academic/*": ["academic"],
    "/admin/*": ["admin"],
  };

  for (const path in allowedRoles) {
    if (url.includes(path) && !allowedRoles[path].includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
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
