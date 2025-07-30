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
    <div className="rounded-lg bg-white px-10 h-full w-[400px] grid  py-5  shadow-lg">
      <div className="grid gap-2 h-fit">
        <h1 className="text-lg font-semibold py-1 w-full text-center px-5 shadow-md text-white bg-blue-500 rounded-3xl">
          {rolename}
        </h1>

        <div>{username}</div>
        <div>IP : {IP}</div>
      </div>
    </div>
  );
}
