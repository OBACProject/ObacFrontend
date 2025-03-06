import api from "./apiCentralized";
import { compactVerify } from "jose";
import Cookies from "js-cookie";
const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY

export async function login(formData: FormData) {
  console.log("ENV SECRET KEY", secretKey);
  
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
    if (!token) {
      throw new Error("No token returned from server.");
    }
    const { payload } = await compactVerify(
      token,
      new TextEncoder().encode(secretKey)
    );
    const decodedPayload = JSON.parse(new TextDecoder().decode(payload));
    const role = decodedPayload.Role;
    const name = decodedPayload.Name;
    const userId = decodedPayload.UserID;

    // console.log(role);
    // console.log(name);
    // console.log(UserId);
    if (!role || !name) {
      throw new Error("Invalid token: Missing role or name.");
    }

    // localStorage.setItem("token", token);
    // localStorage.setItem("role", role);
    // localStorage.setItem("name", name);

    Cookies.set("role", role, { expires: 1 });
    Cookies.set("name", name, { expires: 1 });
    Cookies.set("userId", userId, { expires: 1 });
    Cookies.set("token", token, { expires: 1 });

    return { token, role };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login");
  }
}

export async function logout() {
  try {
    // Clear token and role from cookies
    Cookies.remove("role");
    Cookies.remove("name");
    Cookies.remove("userId");
    Cookies.remove("token");
    localStorage.removeItem("activeTab");
    localStorage.removeItem("classSubjectData");
    localStorage.removeItem("classInfoData");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to logout");
  }
}
