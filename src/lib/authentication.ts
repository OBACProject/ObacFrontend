import Cookies from "js-cookie";

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
