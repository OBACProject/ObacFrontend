"use client";
import Link from "next/link";
import React from "react";
import {Youtube } from "lucide-react";

export default function StickerYoutube() {
  return (
    <Link
      href={"https://www.youtube.com/obectvonline"}
      className="fixed group  shadow-md shadow-gray-700 rounded-full z-40 bottom-20 my-2 left-3 "
    >
      <div className="overflow-hidden flex items-center justify-center relative w-16 h-16 rounded-full bg-red-600 group-hover:opacity-70">
        <Youtube
          style={{ width: "2.5rem", height: "2.5rem" }}
          className="text-white "
        />
      </div>
    </Link>
  );
}
