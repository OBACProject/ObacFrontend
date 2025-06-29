"use client";

import { loginMutation } from "@/lib/hooks/queries/auth.queries";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Loader2, UserRound } from "lucide-react";

interface LoginFormProps {
  session?: { role?: string; name?: string };
}

export default function LoginForm({ session }: LoginFormProps) {
  const router = useRouter();
  const login = loginMutation.useMutation();

  const [role, setRole] = useState<string | null>(session?.role || null);
  const [name, setName] = useState<string | null>(session?.name || null);



  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const userName = formData.get("userName")?.toString().trim();
      const password = formData.get("password")?.toString().trim();

      if (!userName || !password) throw new Error("Missing fields");

      await login.mutateAsync({ userName, password });

      const newRole = Cookies.get("role");
      const newName = Cookies.get("name");

      if (!newRole || !newName) {
        throw new Error("Missing role or name in cookie");
      }

      setRole(newRole);
      setName(newName);

      console.log("Login successful:", { role: newRole, name: newName });

      toast.success("เข้าสู่ระบบสำเร็จ");

      switch (newRole) {
        case "Student":
          router.push("/student/schedule");
          break;
        case "Teacher":
          router.push("/teacher/profile");
          break;
        case "Academic":
          router.push("/academic/profile");
          break;
        case "Admin":
          router.push("/admin/profile");
          break;
        default:
          toast.error("Unknown role");
      }
    } catch (error) {
      console.error(error);
      toast.error("เข้าสู่ระบบไม่สำเร็จ โปรดลองอีกครั้ง");
    }
  };

  const handleLogout = async () => {
    // คุณอาจต้องลบ cookie ด้วย
    Cookies.remove("role");
    Cookies.remove("name");
    Cookies.remove("authToken");
    toast.info("ออกจากระบบสำเร็จ");
    setRole(null);
    setName(null);
    window.location.reload();
  };

  const handleLoginButton = () => {
    const newRole = Cookies.get("role");
    switch (newRole) {
      case "Student":
        router.push("/student/schedule");
        break;
      case "Teacher":
        router.push("/teacher/profile");
        break;
      case "Academic":
        router.push("/academic/profile");
        break;
      case "Admin":
        router.push("/admin/academic-management");
        break;
      default:
        toast.error("สิทธิการเข้าถึงผิดพลาด");
    }
  };

  return (
    <div className="relative w-full h-screen grid place-items-center pb-40 bg-repeat bg-cover bg-opacity-10 bg-bottom">
      <img src="/images/obac_view.jpg" className="absolute object-cover h-screen w-full" />
      <div className="relative bg-gradient-to-t from-gray-900/60 to-gray-900/45 w-full h-screen" />
      {role && name ? (
        <div className="absolute my-10 bg-white rounded-lg px-10 py-12">
          <div className="space-y-4 text-center">
            <UserRound className="mx-auto h-12 w-12" />
            <div className="text-2xl">{name}</div>
            <div className="mt-5 grid place-items-center">
              <button
                onClick={handleLoginButton}
                className="bg-blue-500 px-10 text-white my-3 rounded-md py-1 hover:bg-blue-700 hover:scale-105 duration-500"
              >
                กลับเข้าสู่ระบบ
              </button>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-tr from-red-500/70 to-pink-400 px-10 text-white my-3 rounded-md py-1 hover:from-red-500 hover:to-red-500 hover:scale-105 duration-500"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleLogin}
          className="z-10 absolute grid place-items-center bg-white border lg:w-3/12 md:w-6/12 sm:w-6/12 rounded-lg shadow-sm gap-8 pt-8 pb-10"
        >
          <img src="/images/obac_navbar_logo.png" className="h-28" />
          <div className="grid gap-3 w-full place-items-center">
            <input
              className="px-5 py-2 w-3/5 bg-gray-100 rounded-lg"
              type="text"
              name="userName"
              placeholder="Username / ชื่อผู้ใช้"
              required
            />
            <input
              className="px-5 py-2 w-3/5 bg-gray-100 rounded-lg"
              type="password"
              name="password"
              placeholder="Password / รหัสผ่าน"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#143d66] font-prompt px-20 text-white rounded-md py-2 flex items-center justify-center gap-2"
            disabled={login.isPending}
          >
            {login.isPending && <Loader2 className="w-5 h-5 animate-spin" />}
            {login.isPending ? "เข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>
      )}
    </div>
  );
}
