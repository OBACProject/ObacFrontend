import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const AUTH_COOKIE_NAMES = ["role", "name", "userId", "token"] as const;

function getSigningKey(): Uint8Array | null {
  const secret = process.env.SECRET_KEY;
  return secret ? new TextEncoder().encode(secret) : null;
}

async function getVerifiedRole(token: string | undefined): Promise<string | null> {
  const key = getSigningKey();
  if (!token || !key) return null;

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
      clockTolerance: 5,
    });
    const role = payload["Role"];
    return typeof role === "string" ? role : null;
  } catch {
    return null;
  }
}

function withClearedAuthCookies(response: NextResponse): NextResponse {
  for (const name of AUTH_COOKIE_NAMES) {
    response.cookies.delete(name);
  }
  return response;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const urlPath = req.nextUrl.pathname;
  const role = await getVerifiedRole(token);

  const hasStaleCookies =
    !role && AUTH_COOKIE_NAMES.some((name) => req.cookies.has(name));

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
      const response = NextResponse.redirect(new URL("/login", req.url));
      return hasStaleCookies ? withClearedAuthCookies(response) : response;
    }

    return hasStaleCookies
      ? withClearedAuthCookies(NextResponse.next())
      : NextResponse.next();
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
