import Cookies from "js-cookie";


function parseJwt(token: string) {
  try {
    if (typeof token !== "string") throw new Error("Token is not a string");

    const parts = token.split('.');
    if (parts.length !== 3) throw new Error("Invalid JWT format");

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to parse JWT:', e);
    return null;
  }
}

export function setAuthCookie(token: string) {

  const decodedPayload = parseJwt(token);
  if (!decodedPayload) {
      throw new Error("Invalid token format.");
    }
  const { Role: role, Name: name, UserID: userId, exp } = decodedPayload;

  const expires =
    typeof exp === "number"
      ? new Date(exp * 1000)
      : new Date(new Date().getTime() + 2 * 60 * 60 * 1000);

  const cookieOptions = {
    expires,
    sameSite: "lax" as const,
    secure: typeof window !== "undefined" && window.location.protocol === "https:",
  };

  Cookies.set("role", role, cookieOptions);
  Cookies.set("name", name, cookieOptions);
  Cookies.set("userId", userId, cookieOptions);
  Cookies.set("token", token, cookieOptions);
}
