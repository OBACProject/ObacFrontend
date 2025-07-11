"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  image: string;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "ประกาศรับสมัคร/เสนอชื่อบุคคลเพื่อดำรงตำแหน่งผู้อำนวยการ...",
    image: "/cls/news/news_1.jpg",
  },
  {
    id: 2,
    title: "กิจกรรมอบรมการตลาดดิจิทัลให้นักเรียน...",
    image: "/cls/news/news_2.jpg",
  },
  {
    id: 3,
    title: "กิจกรรมสัมมนาเชิงปฏิบัติการ (ปวส.)ภาคเรียนที่ 1/2566",
    image: "/cls/news/news_3.jpg",
  },
  {
    id: 4,
    title: "พิธีไหว้ครู ปวช. ปีการศึกษา 2565",
    image: "/cls/news/news_4.jpg",
  },
  {
    id: 5,
    title: "ตักบาตรข้าวสารอาหารแห้ง และถวายเทียนจำนำพรรษา ปีการศึกษา 2565",
    image: "/cls/news/news_5.jpg",
  },
];

export default function BigCarouselNews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % mockNews.length);
  const prev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? mockNews.length - 1 : prev - 1
    );

  return (
    <div className="relative w-full max-w-4xl mx-auto pb-6 overflow-hidden">
      <div className="relative h-[360px] sm:h-[400px] md:h-[440px] rounded-xl overflow-hidden">
        {/* Slide wrapper */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {mockNews.map((item, idx) => (
            <div
              key={item.id}
              className="relative w-full flex-shrink-0 h-full"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-xl"
                priority={idx === 0}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-xl" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-lg md:text-xl font-semibold drop-shadow-md">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
        >
          <ChevronLeft size={28} className="text-blue-900" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
        >
          <ChevronRight size={28} className="text-blue-900" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {mockNews.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
