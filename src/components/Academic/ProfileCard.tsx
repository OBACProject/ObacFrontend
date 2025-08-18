"use client";
import { getPublicIP } from "@/lib/get-ip";
import React, { useEffect, useState } from "react";

interface ProfileCardProps {
  username: string;
  rolename: string;
}

export default function ProfileCard({ username, rolename }: ProfileCardProps) {
  //   const IP = getPublicIP();
  const [IP, setIP] = useState<string | null>(null);
  useEffect(() => {
    getPublicIP().then((ip: string | null) => {
      setIP(ip);
    });
  }, []);
  return (
    <div className="grid gap-4">
      <div className="rounded-lg bg-white px-10 h-full w-[400px] grid  py-5  shadow-lg">
        <div className="grid gap-2 h-fit">
          <h1 className="text-lg font-semibold py-1 w-full text-center px-5 shadow-md text-white bg-blue-500 rounded-3xl">
            {rolename}
          </h1>

          <div>{username}</div>
          <div>IP : {IP}</div>
        </div>
      </div>
      <div
        className="py-5 z-10 px-10  backdrop-blur-sm bg-white/20 grid place-items-start  
        rounded-md "
      >
        <h1 className="font-semibold ">หากระบบมีปัญหาสามารถติดต่อมาได้ที่</h1>
        <p className="text-gray-600">patara1919@gmail.com</p>
        <p className="text-gray-600">tel. 091-864-9154</p>
        <p className="font-semibold pt-2 ">ระยะเวลาทดสอบและแก้ไขระบบ </p>
        <p className="text-sm text-center text-gray-500">
          22/8/2025 - 22/9/2025
        </p>
      </div>
    </div>
  );
}
