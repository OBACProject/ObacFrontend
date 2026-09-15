"use client";

import { useState } from "react";
import Head from "next/head";
import BigCarouselNews from "../../../components/common/Carousel/BigCarouselNews";
import CardNews from "../../../components/common/Card/card-news";
import HeaderHomePageMenu from "@/components/common/Header/Header";
import SciFiBackgroundNormal from "@/app/styles/bg-normal";
import { newsItems } from "@/resource/fetchData/newsItems";

export default function EventsSection() {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, newsItems.length));
  };

  return (
    <div className="mt-16 sm:mt-[8px] md:pt-[80px] lg:mt-16">
      <Head>
        <title>กิจกรรม OBAC | วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ</title>
        <meta
          name="description"
          content="ภาพกิจกรรมของวิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ (OBAC)"
        />
        <link rel="canonical" href="https://ekawit.ac.th/events" />
      </Head>
      <div className="bg-white text-blue-950 font-prompt">
        <HeaderHomePageMenu title="กิจกรรม OBAC" />
        <SciFiBackgroundNormal>
          <section className="container mx-auto px-4 py-4">
            <BigCarouselNews />
            {/* Events and news currently share the same activity-photo pool,
                so both link into the same /news/[id] detail pages instead of
                duplicating a second, identical detail-page system. */}
            <CardNews news={newsItems.slice(0, visibleCount)} basePath="/news" />

            {visibleCount < newsItems.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleShowMore}
                  className="inline-block bg-blue-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition"
                >
                  ดูกิจกรรมเพิ่มเติม
                </button>
              </div>
            )}
          </section>
        </SciFiBackgroundNormal>
      </div>
    </div>
  );
}
