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
  console.log("Decoded JWT Payload:", decodedPayload);
  if (!decodedPayload) {
      throw new Error("Invalid token format.");
    }
  const { Role: role, Name: name, UserID: userId } = decodedPayload;
    console.log("Role:", role);
    console.log("Name:", name);
    console.log("User ID:", userId);
  const expires = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);

  Cookies.set("role", role, { expires });
  Cookies.set("name", name, { expires });
  Cookies.set("userId", userId, { expires });
  Cookies.set("token", token, { expires });
}
