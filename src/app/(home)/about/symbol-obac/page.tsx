"use client";
import React, { useEffect, useState } from "react";
import OpeningScroll from "@/components/Effect/OpeningScroll";
import FadeInOnScroll from "@/components/Effect/FadInScroll";
import { Parallax } from "react-scroll-parallax";

export default function page() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper: ใช้ Parallax ถ้าไม่ใช่มือถือ
  const MaybeParallax = ({ children, speed = 5 }: { children: React.ReactNode; speed?: number }) =>
    isMobile ? <>{children}</> : <Parallax speed={speed}>{children}</Parallax>;

  return (
    <div className="pt-[7px] sm:pt-[8px] md:pt-[80px]">
      <div className="bg-white text-blue-950 font-prompt">
        {/* Header */}
        <div className="grid place-items-center py-10 text-white text-2xl bg-gradient-to-r from-blue-950 via-sky-500 to-slate-500">
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            วิสัยทัศน์และพันธกิจของ OBAC
          </p>
        </div>

        <OpeningScroll>
          <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10 text-sm sm:text-base md:text-lg leading-relaxed">
            <div className="text-center space-y-4">
              <img
                src="/static/vision_02.jpg"
                alt="ตราสัญลักษณ์ประจำวิทยาลัย OBAC"
                className="mx-auto w-4/12 max-w-3xl rounded-lg shadow-xl"
              />
              <p className="text-center text-base text-gray-600">ตราสัญลักษณ์ประจำวิทยาลัย</p>

              {/* กล่องสี เท่ากับความสูงของภาพ */}
              <div className="mx-auto w-6/12 max-w-3xl flex justify-center gap-4 text-white font-bold text-lg pt-20">
                <div className="flex-1 aspect-square bg-blue-900 flex items-center font-prompt text-3xl justify-center rounded">น้ำเงิน</div>
                <div className="flex-1 aspect-square bg-gray-400 flex items-center font-prompt text-3xl justify-center rounded text-gray-900">เทา</div>
              </div>

              <p className="text-center text-base text-gray-600">สีประจำวิทยาลัย</p>
            </div>

            {/* วิสัยทัศน์ */}
            <div className="space-y-3 pt-20">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
                วิสัยทัศน์ (Vision)
              </h3>
              <p className="text-center text-5xl font-prompt bg-[url('/images/bg_whitegray.jpg')] bg-cover bg-center text-blue-90 py-10">
                “สร้างคนดี มีความรู้ สู่มาตรฐานสากล”
              </p>
              <p className="indent-8">
                วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ มุ่งหวังพัฒนาการเรียนการสอนสู่ความเป็นเลิศทางวิชาการ
                และให้ผู้เรียนมีคุณธรรม มีทักษะที่สามารถนำความรู้ที่ได้ไปประยุกต์ใช้ในการดำรงตนในสังคมได้
                และเป็นพลเมืองที่ดีของประเทศชาติต่อไป
              </p>
            </div>

            {/* พันธกิจ */}
            <div className="space-y-6 pt-20 text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">พันธกิจ (Mission)</h3>

              {/* กล่องรายการจัดกลางและเรียงสวย */}
              <div className="inline-block text-left">
                <ol className="list-decimal list-inside space-y-2 text-lg text-blue-950 font-semibold">
                  <li>พัฒนาระบบบริหารงานและระบบประกันคุณภาพภายในให้มีคุณภาพ</li>
                  <li>พัฒนาบุคลากรให้มีคุณภาพตามเกณฑ์มาตรฐานวิชาชีพ</li>
                  <li>พัฒนาหลักสูตรและกระบวนการจัดการเรียนรู้ของครู</li>
                  <li>พัฒนาผู้เรียนให้มีคุณภาพตามมาตรฐานการศึกษาของศักยภาพ</li>
                  <li>
                    พัฒนาผู้เรียนให้มีคุณธรรม จริยธรรม รักความเป็นไทย
                    และมีคุณลักษณะอันพึงประสงค์
                  </li>
                  <li>
                    พัฒนาการศึกษาให้เชื่อมโยงเข้าสู่ชุมชน
                    เป็นแหล่งเรียนรู้ทั้งวิชาการและวิชาชีพ
                  </li>
                </ol>
              </div>
            </div>


            {/* ปรัชญาวิทยาลัย */}
            <div className="space-y-3 pt-20">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
                ปรัชญาวิทยาลัย (Philosophy)
              </h3>
              <p className="text-center font-prompt text-5xl bg-[url('/images/bg_whitegray.jpg')] bg-cover bg-center text-blue-900 py-10">
                “ความรู้ คู่คุณธรรม”
              </p>
              <div className="space-y-2 ">
                <p className="indent-8">
                  จากจุดมุ่งหมายของการศึกษาขั้นพื้นฐานของประเทศ คือ
                  “การจัดให้สถานบันศึกษาขั้นพื้นฐานเพื่อพัฒนาเยาวชนคนไทย
                  ทุกคนให้มีคุณลักษณะที่พึงประสงค์ ทั้งในฐานะที่เป็นพลเมืองไทย
                  และพลเมืองของโลก เพื่อเป็นรากฐานที่พอเพียงสำหรับการใช้ชีวิต
                  ได้เรียนตลอดชีวิตทั้งเพื่อพัฒนาด้านวิชาการ และพัฒนาที่ยั่งยืน”
                </p>
                <p className="indent-8">
                  ผู้เรียนต้องเป็นผู้ที่มีจิตสำนึก มีความรับผิดชอบต่อตนเอง ครอบครัว และสังคม
                  ประพฤติดี อยู่ในกรอบของศีลธรรม จริยธรรม มีวินัย และสามารถดำรงชีวิตในสังคมอย่างมีความสุข
                </p>
              </div>
            </div>
          </section>
        </OpeningScroll>
      </div>
    </div>

  );
}

