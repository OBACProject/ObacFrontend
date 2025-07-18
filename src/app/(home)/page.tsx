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
import { Parallax } from "react-scroll-parallax";
import { GetAllStudentGroupByTermYearQuery } from "@/lib/api/hooks/queries/studentGroup.queries";

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
  const {data} = GetAllStudentGroupByTermYearQuery({
    term: "1",
    year: 2568,
  })
  console.log(data);
  return (
    <div className="bg-white h-full text-blue-950 font-prompt">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="canonical" href="https://ekawit.ac.th" />
      </Head>

      <StickerFacebook />
      <StickerYoutube />

      {/* Hero Section */}
      <div className="relative w-full h-[250px] sm:h-[500px] md:h-[700px] sm:pt-16 lg:h-full overflow-hidden">
        {/* Background image */}
        <Parallax speed={-10}>
          <div className="inset-0">
            <img
              src="/images/obac_view.jpg"
              alt="OBAC Campus Banner"
              className="w-full h-full object-cover object-center blur-sm brightness-50"
            />
          </div>
        </Parallax>

        {/* Text content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-44 sm:pt-0">
          <Parallax speed={20}>
            <div className="text-white space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-[0_3px_6px_rgba(0,0,0,0.7)]">
                Welcome to OBAC
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-prompt_lite">
                Ekawit Business Administration Vocational College
              </p>
            </div>
          </Parallax>
        </div>

      </div>


      {/* Intro Text */}
      <div className="container mx-auto px-4 text-center py-8 sm:py-14">
        <OpeningScroll>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Ekawit Business Administration Vocational College (OBAC)
          </h2>
        </OpeningScroll>

        <OpeningScroll>
          <Parallax speed={5}>
            <p className="max-w-4xl mx-auto text-base sm:text-lg leading-relaxed indent-8 text-left">
              "At the heart of our university lies a powerful vision — to shape the future
              by merging innovation with entrepreneurship. As a leading institution in technology
              and business, we equip students with cutting-edge skills, critical thinking, and
              real-world experience. Through dynamic programs, collaborative research, and
              industry-driven education, we empower the next generation of leaders to thrive in
              a rapidly changing world. Here, every idea matters, and every student is a catalyst
              for progress. Join us where technology meets opportunity — and futures are built."
            </p>
          </Parallax>
        </OpeningScroll>

        <OpeningScroll>
          <section className="container mx-auto px-4 py-6 sm:py-8 space-y-10 sm:space-y-20">
            {/* Section 1 */}
            <div className="grid grid-cols-1 py-6 sm:py-10 md:grid-cols-2 gap-10 items-center">
              <Parallax speed={5}>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-blue-950">
                    OBAC คือจุดเริ่มต้นของอนาคตที่คุณกำหนดได้เอง
                  </h3>
                  <p className="indent-8 text-base sm:text-lg leading-relaxed text-blue-950">
                    เราเชื่อว่าการศึกษาคือพลังในการเปลี่ยนแปลงชีวิตและสังคม ด้วยหลักสูตรที่ผสาน
                    <strong> ธุรกิจ </strong> และ <strong> เทคโนโลยี </strong> เข้าด้วยกันอย่างลงตัว
                    นักศึกษาจะได้เรียนรู้ผ่านการเสริมสร้างทักษะการคิดวิเคราะห์ และสร้างนวัตกรรมที่ตอบโจทย์โลกยุคใหม่
                  </p>
                </div>
              </Parallax>
              <Parallax speed={5}>
                <div>
                  <img
                    src="/images/sub_main_1.jpg"
                    alt="OBAC Innovation"
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                </div>
              </Parallax>
            </div>

            {/* Section 2 */}
            <div className="grid grid-cols-1 py-6 sm:py-10 md:grid-cols-2 gap-5 items-center">
              <Parallax speed={5}>
                <div>
                  <img
                    src="/images/sub_main_2.jpg"
                    alt="OBAC Future Leader"
                    className="w-full h-auto rounded-xl shadow-md"
                  />
                </div>
              </Parallax>
              <Parallax speed={5}>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-blue-950">
                    ที่ OBAC คุณจะไม่ได้แค่เรียนเพื่อรู้
                  </h3>
                  <p className="indent-8 text-base text-left sm:text-lg leading-relaxed text-blue-950">
                    แต่เรียนเพื่อ <strong>ลงมือทำ</strong> และ <strong>เติบโต</strong>
                    ไปสู่ความสำเร็จในสายอาชีพอย่างมั่นคงเพราะ OBAC ไม่ใช่แค่สถาบันการศึกษาแต่คือเวทีที่คุณจะได้เป็นผู้นำแห่งอนาคต
                  </p>
                </div>
              </Parallax>
            </div>
          </section>
        </OpeningScroll>
      </div>

      {/* Secondary Banner */}
      <FadeInOnScroll>
        <div className="relative w-full h-[180px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden">
          <img
            src="/banner/banner.jpg"
            alt="OBAC Secondary Banner"
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t  pointer-events-none" />
        </div>
      </FadeInOnScroll>

      {/* Courses Section */}
      <OpeningScroll>
        <section className="container mx-auto px-4 py-10 sm:py-16">
          <h2 className="text-3xl md:text-4xl text-center font-bold mb-10">หลักสูตรที่เปิดสอน</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <CardCourse iconName="BookOpen" title="สาขาการบัญชี" />
            <CardCourse iconName="Laptop2" title="สาขาเทคโนโลยีธุรกิจดิจิทัล" />
            <CardCourse iconName="Users" title="สาขาธุรกิจค้าปลีก" />
            <CardCourse iconName="Briefcase" title="สาขาการตลาด" />
            <CardCourse iconName="Plane" title="สาขาการท่องเที่ยว" />
          </div>
        </section>
      </OpeningScroll>

      {/* Activity Carousel */}
      <OpeningScroll>
        <div className="py-4 sm:py-10">
          <ActivityCarousel />
        </div>
      </OpeningScroll>

      {/* Motto Section */}
      <OpeningScroll>
        <div className="w-full py-10 sm:py-16 bg-[url('/images/bg_whitegray.jpg')] bg-cover bg-center text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 drop-shadow-md px-4">
            สร้างคนดี มีความรู้ สู่มาตรฐานสากล
          </h2>
        </div>
      </OpeningScroll>

      {/* News Section */}
      <FadeInOnScroll>
        <section className="container mx-auto px-4 pt-10 sm:pt-20">
          <div className="flex flex-col items-center text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">ข่าวสารและกิจกรรม</h2>
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

      {/* Call to Action */}
      <FadeInOnScroll>
        <section className="bg-blue-900 text-white py-10 sm:py-16 text-center mt-5 mb-0 sm:mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            พร้อมจะเริ่มต้นอนาคตของคุณแล้วหรือยัง?
          </h2>
          <a
            href="/register"
            className="inline-block mt-4 bg-white text-blue-900 font-semibold px-6 py-3 rounded-full hover:bg-gray-100"
          >
            สมัครเรียนกับ OBAC
          </a>
        </section>
      </FadeInOnScroll>
    </div>
  );
}