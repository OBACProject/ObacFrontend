import React from "react";
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
            className="absolute size-72 lg:size-96 top-10 right-40 -translate-x-1/2 rounded-full
                 bg-gradient-to-br from-sky-400/50 via-cyan-300/40 to-emerald-300/30
                  mix-blend-multiply will-change-transform
                 [animation:blob_22s_ease-in-out_infinite,pulseOpacity_12s_ease-in-out_infinite]"
          />
          <div
            className="absolute size-64 lg:size-80 bottom-10 right-1/3 rounded-full
                 bg-gradient-to-br from-indigo-400/45 via-blue-300/35 to-cyan-200/30
                  mix-blend-multiply will-change-transform
                 animation-delay-2000
                 [animation:blob_26s_ease-in-out_infinite,pulseOpacity_15s_ease-in-out_infinite]"
          />
          <div
            className="absolute size-64 lg:size-72 top-1/3 left-10 rounded-full
                 bg-gradient-to-br from-fuchsia-400/40 via-pink-300/30 to-rose-200/25
                  mix-blend-multiply will-change-transform
                 animation-delay-4000
                 [animation:blob_30s_ease-in-out_infinite,pulseOpacity_18s_ease-in-out_infinite]"
          />
          <div
            className="absolute size-40 lg:size-52 bottom-1/4 left-1/2 -translate-x-1/2 rounded-full
                 bg-gradient-to-br from-teal-400/40 to-emerald-300/30
                  mix-blend-multiply will-change-transform
                 animation-delay-6000
                 [animation:blob_19s_ease-in-out_infinite,pulseOpacity_10s_ease-in-out_infinite]"
          />
        </div>
        <div className="relative lg:flex -translate-y-10 justify-center w-full grid gap-5">
          <ProfileForm />
        </div>

        <div className="py-5 px-10  backdrop-blur-sm bg-white/20 grid place-items-start  rounded-md absolute bottom-5 right-10">
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
