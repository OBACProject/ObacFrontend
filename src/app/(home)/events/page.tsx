"use client";

import { useState } from "react";
import BigCarouselNews from "../../../components/common/Carousel/BigCarouselNews";
import CardNews from "../../../components/common/Card/card-news";

const newsItems = [
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
  {
    id: 6,
    title: "กิจกรรมทำบุญวิทยาลัยประจำปีการศึกษา 2565",
    image: "/cls/news/news_6.jpg",
  },
  {
    id: 7,
    title: "สัมมนาเชิงวิชาการ ปวส. ภาคเรียนที่ 1/2565",
    image: "/cls/news/news_7.jpg",
  },
  {
    id: 8,
    title: "พิธีถวายพระพรชัยมงคล สมเด็จพระนางเจ้าฯ พระบรมราชินี 2565 ( ปวช.1)",
    image: "/cls/news/news_8.jpg",
  },
  {
    id: 9,
    title: "กิจกรรมวันภาษาไทย ประจำปีการศึกษา ๒๕๖๕",
    image: "/cls/news/news_9.jpg",
  },
];

export default function NewsSection() {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, newsItems.length));
  };

  return (
    <div className="mt-16 sm:mt-[8px] md:pt-[80px] lg:mt-16">
      <div className="bg-white text-blue-950 font-prompt">
        {/* Header */}
        <div className="grid place-items-center py-10 text-white text-2xl bg-gradient-to-r from-blue-950 via-sky-500 to-slate-500">
          <p className="text-3xl sm:text-4xl md:text-5xl font-prompt text-center">
            กิจกรรม OBAC
          </p>
        </div>

        <section className="container mx-auto px-4 py-4">
          {/* ข่าวเด่น Carousel */}
          <BigCarouselNews />

          {/* ข่าวย่อย Grid – แสดงตามจำนวน visibleCount */}
          <CardNews news={newsItems.slice(0, visibleCount)} />

          {/* ปุ่มดูเพิ่มเติม */}
          {visibleCount < newsItems.length && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleShowMore}
                className="inline-block bg-blue-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition"
              >
                ดูข่าวเพิ่มเติม
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
