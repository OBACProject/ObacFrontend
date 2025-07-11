import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SECRET_KEY
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30m")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
    clockTolerance: 5,
  });
  return payload;
}

export async function login(formData: FormData) {
  const user = { username: formData.get("username") };

  const session = await encrypt({ user });
  const eightHoursFromNow = new Date(new Date().getTime() + 8 * 60 * 60 * 1000)
  cookies().set("session", session, {
    expires: eightHoursFromNow,
    httpOnly: true,
  });
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession(): Promise<any | null> {
  const session = cookies().get("session")?.value;
  if (!session) return null;

  try {
    return await decrypt(session);
  } catch (err) {
    console.warn("Session is invalid or expired:", err);
    cookies().set("session", "", { expires: new Date(0) });

    return null;
  }
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
