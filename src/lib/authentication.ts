import apiClient from "./apiClient";
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

export async function login(formData: FormData) {
  try {
    const userName = formData.get("userName") as string;
    const password = formData.get("password") as string;

    const res = await apiClient.post("api/Auth/Login", {
      userName,
      password,
    });

    if (res.status < 200 || res.status >= 300 || !res.data) {
      throw new Error("Login failed. Please check your credentials.");
    }

    const token = res.data?.data?.token;

    console.log("Raw token from response:", token);

    if (typeof token !== "string") {
      throw new Error(`Expected token to be a string but got ${typeof token}`);
    }

    const decodedPayload = parseJwt(token);
    if (!decodedPayload) {
      throw new Error("Invalid token format.");
    }

    const { Role: role, Name: name, UserID: userId } = decodedPayload;

    if (!role || !name || !userId) {
      throw new Error("Token missing required fields.");
    }

    const expires = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);

    Cookies.set("role", role, { expires });
    Cookies.set("name", name, { expires });
    Cookies.set("userId", userId, { expires });
    Cookies.set("token", token, { expires });

    return { token, role };
  } catch (err) {
    console.error("Login error:", err);
    throw new Error("Failed to login");
  }
}

export async function logout() {
  try {
    Cookies.remove("role");
    Cookies.remove("name");
    Cookies.remove("userId");
    Cookies.remove("token");

    localStorage.removeItem("activeTab");
    localStorage.removeItem("classSubjectData");
    localStorage.removeItem("classInfoData");
  } catch (err) {
    console.error("Logout error:", err);
    throw new Error("Failed to logout");
  }
}
