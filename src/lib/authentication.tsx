
import api from "./apiCentralized";
import { compactVerify } from "jose";
import Cookies from "js-cookie";
import axios from "axios";
export async function login(formData: FormData) {
  try {
    const secretKey =await axios.get("/api/secret").then((res) => res.data.secretKey);
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

    if (!role || !name) {
      throw new Error("Invalid token: Missing role or name.");
    }
    const eightHoursFromNow = new Date(new Date().getTime() + 8 * 60 * 60 * 1000)
    Cookies.set("role", role, { expires: eightHoursFromNow });
    Cookies.set("name", name, { expires: eightHoursFromNow });
    Cookies.set("userId", userId, { expires: eightHoursFromNow });
    Cookies.set("token", token, { expires: eightHoursFromNow });

    return { token, role };
  } catch (err) {
    console.log(err);
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
    console.log(err);
    throw new Error("Failed to logout");
  }
}
