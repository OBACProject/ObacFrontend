import React from "react";
import Image from "next/image";
import ProfileForm from "./Form";
// import Notice from "./Notice";

export default function page() {
  return (
    <div
      className=" bg-blue-200"
      style={{
        backgroundImage: `
        /* เส้นตั้ง */
        repeating-linear-gradient(
          to right,
          rgba(255, 255, 255, 1) 0px,
          rgba(255, 255, 255, 1) 1px,
          transparent 1px,
          transparent 20px
        ),
        /* เส้นนอน */
        repeating-linear-gradient(
          to bottom,
          rgba(255, 255, 255, 1) 0px,
          rgba(255, 255, 255, 1) 1px,
          transparent 1px,
          transparent 20px
        )
      `,
        backgroundSize: "20px 20px",
      }}
    >
      <div className="relative w-full flex items-center justify-center min-h-[calc(80dvh-2rem)]  overflow-hidden">
        <div className="pointer-events-none absolute inset-0 ">
          <div
            className="absolute size-96 rounded-full
             bg-gradient-to-br from-sky-400/60 via-cyan-300/60 to-emerald-300/60
             mix-blend-multiply right-40
             animate-blob-22-pulse-12
             [animation-delay:0s,0s]"
          />
          <div
            className="absolute size-86 rounded-full
             bg-gradient-to-br from-sky-400/60 via-cyan-300/60 to-emerald-300/60
             mix-blend-multiply left-40
             animate-blob-22-pulse-12
             [animation-delay:0s,0s]"
          />

          <div
            className="absolute size-64 lg:size-80 bottom-10 right-1/3 rounded-full
             bg-gradient-to-br from-indigo-400/60 via-blue-300/60 to-cyan-200/60
             mix-blend-multiply
             animate-blob-26-pulse-15
             [animation-delay:2s,0s]"
          />

          <div
            className="absolute size-64 lg:size-72 top-1/3 left-10 rounded-full
             bg-gradient-to-br from-fuchsia-400/60 via-pink-300/60 to-rose-200/60
             mix-blend-multiply
             animate-blob-30-pulse-18
             [animation-delay:4s,0s]"
          />

          <div
            className="absolute size-40 lg:size-52 bottom-1/4 left-1/2 -translate-x-1/2 rounded-full
             bg-gradient-to-br from-teal-400/60 to-emerald-300/60
             mix-blend-multiply
             animate-blob-19-pulse-10
             [animation-delay:6s,0s]"
          />
        </div>
        <div className="relative lg:flex -translate-y-10 justify-center w-full grid gap-5">
          <ProfileForm />
        </div>

        <div className="py-5 px-10 shadow-md  backdrop-blur-sm bg-white/60 grid place-items-start  rounded-md absolute bottom-5 right-10">
          <h1 className="font-semibold ">หากระบบมีปัญหาสามารถติดต่อมาได้ที่</h1>
          <p className="text-gray-600">patara1919@gmail.com</p>
          <p className="text-gray-600">tel. 091-864-9154</p>
          <p className="font-semibold pt-2 ">ระยะเวลาทดสอบและแก้ไขระบบ </p>
          <p className="text-sm text-center text-gray-500">
            22/8/2025 - 22/9/2025
          </p>
        </div>
      </div>
    </div>
  );
}
