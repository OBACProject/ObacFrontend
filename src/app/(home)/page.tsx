"use client";
import React from "react";
import Head from "next/head";
import { cardData } from "@/resource/fetchData/cardContent";
import CardVertical from "@/components/common/Card/card-vertical";
import CardCourse from "@/components/common/Card/card-course";
import StickerFacebook from "@/components/Effect/StickerFacebook";
import StickerYoutube from "@/components/Effect/StickerYoutube";
import FadeInOnScroll from "@/components/Effect/FadInScroll";
import OpeningScroll from "@/components/Effect/OpeningScroll";
import ActivityCarousel from "@/components/common/Carousel/ActivityCarousel";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "OBAC",
    alternateName: "Ekawit Business Administration Vocational College",
    url: "https://ekawit.ac.th",
    logo: "https://ekawit.ac.th/favicon.ico",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ถนนลาดกระบัง",
      addressLocality: "กรุงเทพ",
      postalCode: "10520",
      addressCountry: "TH",
    },
    sameAs: ["https://www.facebook.com/obacfanpage/?locale=th_TH"],
  };

  return (
    <div className="bg-white">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="canonical" href="https://ekawit.ac.th" />
      </Head>

      <StickerFacebook />
      <StickerYoutube />


      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[21/7] overflow-hidden group">
        <img
          src="/images/obac_view.jpg"
          alt="OBAC Campus Banner"
          className="absolute w-full h-full object-cover duration-1000 group-hover:scale-[102%]"
        />
        <div className="relative w-full h-full bg-gradient-to-t from-white via-gray-800/0 to-gray-900/5" />
      </div>


      <div className="container mx-auto px-4 text-center py-10">
        <OpeningScroll>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-950">
            Ekawit Business Administration Vocational College (OBAC)
          </h1>
        </OpeningScroll>
      </div>

      <OpeningScroll>
        <div className="container mx-auto px-4">
          <hr className="border border-blue-950 w-full mb-10" />
        </div>
      </OpeningScroll>


      <div className="w-full grid place-items-center text-center px-4 py-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-950 font-extrabold mb-6">
          Welcome to OBAC
        </h1>

        <p className="max-w-4xl text-blue-950 text-base sm:text-lg text-left indent-8 leading-relaxed">
          "At the heart of our university lies a powerful vision — to shape the future
          by merging innovation with entrepreneurship. As a leading institution in technology
          and business, we equip students with cutting-edge skills, critical thinking, and
          real-world experience. Through dynamic programs, collaborative research, and
          industry-driven education, we empower the next generation of leaders to thrive in
          a rapidly changing world. Here, every idea matters, and every student is a catalyst
          for progress. Join us where technology meets opportunity — and futures are built."
        </p>

        {/* <h2 className="mt-10 text-blue-950 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
          ทำไมต้อง OBAC
        </h2>

        <div className="max-w-4xl mt-5 text-blue-950 text-base sm:text-lg text-left leading-loose">
          <p className="mb-4 indent-8">
            OBAC คือจุดเริ่มต้นของอนาคตที่คุณกำหนดได้เอง เราเชื่อว่าการศึกษาคือพลังในการเปลี่ยนแปลงชีวิตและสังคม
            ด้วยหลักสูตรที่ผสาน <strong>ธุรกิจ</strong> และ <strong>เทคโนโลยี</strong> เข้าด้วยกันอย่างลงตัว
            นักศึกษาจะได้เรียนรู้ผ่านการปฏิบัติจริง เสริมสร้างทักษะการคิดวิเคราะห์ และสร้างนวัตกรรมที่ตอบโจทย์โลกยุคใหม่
          </p>
          <p className="indent-8">
            ที่ OBAC คุณจะไม่ได้แค่เรียนเพื่อรู้ — แต่เรียนเพื่อ <strong>ลงมือทำ</strong> และ <strong>เติบโต</strong>
            ไปสู่ความสำเร็จในสายอาชีพอย่างมั่นคง เพราะ OBAC ไม่ใช่แค่สถาบันการศึกษา แต่คือเวทีที่คุณจะได้เป็นผู้นำแห่งอนาคต
          </p>
        </div> */}
      </div>


      <FadeInOnScroll>
        <div className="w-full mt-12">
          <div className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden group">
            <img
              src="/banner/banner.jpg"
              alt="OBAC Secondary Banner"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-gray-900/10" />
          </div>
        </div>
      </FadeInOnScroll>



      <OpeningScroll>
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl text-center font-prompt text-blue-950 mb-10">หลักสูตรที่เปิดสอน</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <CardCourse iconName="BookOpen" title="สาขาการบัญชี" />
            <CardCourse iconName="Laptop2" title="สาขาเทคโนโลยีธุรกิจดิจิทัล" />
            <CardCourse iconName="Users" title="สาขาธุรกิจค้าปลีก" />
            <CardCourse iconName="Briefcase" title="สาขาการตลาด" />
            <CardCourse iconName="Plane" title="สาขาการท่องเที่ยว" />
          </div>
        </section>
      </OpeningScroll>
      <OpeningScroll>
        <div>
          <ActivityCarousel />
        </div>
      </OpeningScroll>


      <OpeningScroll>
        <div className="w-full py-16 bg-[url('/images/bg_whitegray.jpg')] bg-cover bg-center bg-no-repeat text-center">
          <h2 className="text-2xl font-prompt sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 drop-shadow-md px-4">
            อบรมคนดี มีความรู้ สู่ตลาดแรงงาน
          </h2>
        </div>
      </OpeningScroll>




      <FadeInOnScroll>
        <section className="container mx-auto px-4 pt-20">
          <div className="flex flex-col items-center text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-prompt text-blue-950 mb-2">
              ข่าวสารและกิจกรรม
            </h2>
            <div className="w-full text-right pr-2">
              <a
                href="/news"
                className="text-sm md:text-base text-gray-500 hover:text-blue-700 underline"
              >
                ดูทั้งหมด
              </a>
            </div>
          </div>

          <div className="overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar">
            <div className="inline-flex gap-4">
              {cardData.slice(0, 10).map((data, index) => (
                <div key={index} className="min-w-[280px] max-w-[280px] snap-center">
                  <CardVertical cardData={[data]} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInOnScroll>
    </div>
  );
}
