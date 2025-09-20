"use client";
import { useEffect, useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Loader2, LoaderCircle, UserRound } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/lib/api/hooks/queries/auth.queries";

interface LoginFormProps {
  session?: { role?: string; name?: string };
}

export default function LoginForm({ session }: LoginFormProps) {
  const router = useRouter();
  const login = useLoginMutation();
  const [role, setRole] = useState<string | null>(session?.role || null);
  const [name, setName] = useState<string | null>(session?.name || null);

  useEffect(() => {
    const cookieRole = Cookies.get("role");
    const cookieName = Cookies.get("name");

    if (cookieRole && cookieName) {
      setRole(cookieRole);
      setName(cookieName);
    }
  }, []);

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
      toast.success("เข้าสู่ระบบสำเร็จ");
      handleLoginButton();
    } catch (error) {
      console.error(error);
      toast.error("เข้าสู่ระบบไม่สำเร็จ โปรดลองอีกครั้ง");
    }
  };

  const handleLogout = () => {
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
        router.push("/student/profile");
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
        toast.error("สิทธิการเข้าถึงผิดพลาด");
    }
  };

  return (
    <div className="relative w-full h-screen grid place-items-center pb-40 bg-repeat bg-cover bg-opacity-10 bg-bottom">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/obac_view.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative bg-gradient-to-t from-gray-900/60 to-gray-900/45 w-full h-screen" />
      {role && name ? (
        <div className="absolute my-10 bg-white lg:w-[500px] w-fit rounded-lg px-10 py-12">
          <div className="space-y-4 text-center grid place-items-center">
            <p className="p-2 rounded-full bg-blue-500 w-fit">
              <UserRound className="text-white h-12 w-12" />
            </p>
            <div className="text-lg animate-pulse text-blue-800 py-1">ตรวจสอบความปลอดภัย</div>
            <div className="grid w-full place-items-center py-4 gap-3">
              <LoaderCircle className="text-blue-500 w-20 h-20 animate-spin " />
              <h1 className="text-blue-500 text-xl font-prompt ">
                กำลังเข้าสู่ระบบ...
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleLogin}
          method="post"
          className="z-10 absolute grid place-items-center bg-white border lg:w-3/12 md:w-[70%] sm:w-[80%] w-[80%] rounded-lg shadow-sm gap-8 pt-8 pb-10"
        >
          <Image
            src="/images/obac_navbar_logo.png"
            alt="OBAC Logo"
            width={112}
            height={112}
            className="h-28"
          />
          <div className="grid gap-3 w-full place-items-center">
            <Input
              type="text"
              name="userName"
              placeholder="username"
              required
              className="w-[70%]"
            />
            <Input
              type="password"
              name="password"
              placeholder="password"
              required
              className="w-[70%]"
            />
          </div>
          <Button
            type="submit"
            className="bg-[#143d66] font-prompt w-[70%] px-20 text-white rounded-md py-2 flex items-center justify-center gap-2"
            disabled={login.isPending}
          >
            {login.isPending && <Loader2 className="w-5 h-5 animate-spin" />}
            {login.isPending ? "เข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </Button>
        </form>
      )}
    </div>
  );
}
