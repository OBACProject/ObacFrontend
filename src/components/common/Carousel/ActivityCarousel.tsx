"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const imageCount = 10;

export default function ActivityCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageCount);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full xl:max-w-7xl xl:mx-auto overflow-hidden py-8">

  {/* ===== Full-bleed for phone/iPad (up to lg), no side gaps ===== */}
  <div className="xl:hidden relative w-screen max-w-none left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden px-0">
    {/* ความสูงเหมาะกับแต่ละอุปกรณ์ */}
    <div className="relative h-[220px] sm:h-[420px] md:h-[560px] lg:h-[640px]">
      <div
        className="flex h-full w-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {Array.from({ length: imageCount }).map((_, idx) => (
          <div key={idx} className="relative w-screen h-full flex-shrink-0">
            <Image
              src={`/cls/activity_${idx + 1}.jpg`}
              alt={`กิจกรรมที่ ${idx + 1}`}
              fill
              className="object-cover rounded-xl sm:rounded-2xl md:rounded-3xl"
              priority={idx === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {Array.from({ length: imageCount }).map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  </div>

  {/* ===== Desktop (xl+): centered container, classic look ===== */}
  <div className="hidden xl:block relative w-full overflow-hidden px-4">
    <div className="relative h-[600px] 2xl:h-[700px]">
      <div
        className="flex h-full w-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {Array.from({ length: imageCount }).map((_, idx) => (
          <div key={idx} className="relative w-full h-full flex-shrink-0">
            <Image
              src={`/cls/activity_${idx + 1}.jpg`}
              alt={`กิจกรรมที่ ${idx + 1}`}
              fill
              className="object-cover rounded-3xl"
              priority={idx === 0}
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {Array.from({ length: imageCount }).map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  </div>
</div>

  );
}
