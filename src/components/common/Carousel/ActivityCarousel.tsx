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
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden py-8 px-4 ">
      {/* ✅ กำหนดความสูงแบบตายตัว เพื่อให้เห็นภาพเต็ม */}
      <div className="relative h-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px]  overflow-hidden">
        <div
          className="flex h-full w-full transition-transform duration-1000 ease-in-out "
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: imageCount }).map((_, idx) => (
            <div
              key={idx}
              className="relative w-full h-full flex-shrink-0"
            >
              <Image
                src={`/images/activity_${idx + 1}.jpg`}
                alt={`กิจกรรมที่ ${idx + 1}`}
                fill
                className="object-contain rounded-3xl "
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {Array.from({ length: imageCount }).map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
