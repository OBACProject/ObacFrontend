"use client";
import Link from "next/link";
import React from "react";
import { Facebook } from "lucide-react";

export default function StickerFacebook() {
  return (
    <Link
      href={"https://web.facebook.com/OBAC41/?locale=th_TH&_rdc=1&_rdr#"}
      className="fixed group rounded-full
       z-40 lg:bottom-[100px] bottom-20 left-2 lg:left-10"
    >
      <div className="overflow-hidden flex items-center justify-center relative w-16 h-16 rounded-full bg-[#0066ff] group-hover:opacity-70 group-hover:scale-[105%]">
        <Facebook
          style={{ width: "2.5rem", height: "2.5rem" }}
          className="text-white group-hover:scale-[105%]"
        />
      </div>
    </Link>
  );
}
