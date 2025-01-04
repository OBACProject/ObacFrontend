import api from "./apiCentralized";
import { compactVerify } from "jose";
import Cookies from "js-cookie";

const secretKey =
  "0812113f5392b4d13d98837152805f7b232f60cacefa0a45081ff9f1ac97d5b6";

export async function login(formData: FormData) {
  try {
    const userName = formData.get("userName") as string;
    const password = formData.get("password") as string;
    const res = await api.post("/User/UserLogin", {
      userName,
      password,
    });

    if (res.status < 200 || res.status >= 300) {
      throw new Error("Login failed. Please check your credentials.");
    }
    const token = res.data.data.token;
    console.log(token);
    if (!token) {
      throw new Error("No token returned from server.");
    }
    const { payload } = await compactVerify(
      token,
      new TextEncoder().encode(secretKey)
    );
    console.log(payload);
    const decodedPayload = JSON.parse(new TextDecoder().decode(payload));
    console.log(decodedPayload);
    const role = decodedPayload.Role;
    const name = decodedPayload.Name;
    console.log(role);
    console.log(name);
    if (!role || !name) {
      throw new Error("Invalid token: Missing role or name.");
    }

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);

    Cookies.set("role", role, { expires: 7 });
    Cookies.set("name", name, { expires: 7 });

    return { token, role };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login");
  }
}

export async function logout() {
  try {
    // Clear token and role from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to logout");
  }
}
