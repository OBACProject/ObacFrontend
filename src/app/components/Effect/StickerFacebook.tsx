"use client";
import Link from "next/link";
import React from "react";
import { Facebook } from "lucide-react";

export default function StickerFacebook() {
  return (
    <Link
      href={"https://web.facebook.com/OBAC41/?locale=th_TH&_rdc=1&_rdr#"}
      className="fixed group   s rounded-full z-40 bottom-3 left-3"
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
