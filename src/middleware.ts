import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware triggered for:", req.nextUrl.pathname);

  const role = req.cookies.get("role")?.value || "";
  const urlPath = req.nextUrl.pathname;

  console.log("Role:", role);

  if (!role) {
    return NextResponse.redirect(new URL("/pages/login", req.url));
  }

  // const allowedRoles: Record<string, string[]> = {
  //   "/pages/student": ["student"],
  //   "/pages/teacher": ["teacher"],
  //   "/pages/academic": ["academic"],
  //   "/pages/admin": ["admin"],
  // };

  // // Check if the requested path matches any restricted paths
  // for (const path in allowedRoles) {
  //   if (urlPath.startsWith(path)) {
  //     if (!allowedRoles[path].includes(role)) {
  //       console.log(`Access denied for role: ${role} on path: ${urlPath}`);

  //       switch (role) {
  //         case "student":
  //           return NextResponse.redirect(
  //             new URL("/pages/student/schedule", req.url)
  //           );
  //         case "teacher":
  //           return NextResponse.redirect(
  //             new URL("/pages/teacher/profile", req.url)
  //           );
  //         case "academic":
  //           return NextResponse.redirect(new URL("/pages/academic", req.url));
  //         case "admin":
  //           return NextResponse.redirect(
  //             new URL("/pages/admin/academicManagement", req.url)
  //           );
  //         default:
  //           return NextResponse.redirect(new URL("/pages/login", req.url));
  //       }
  //     }
  //   }
  // }

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
