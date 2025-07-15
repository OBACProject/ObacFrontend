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
            ประวัติของ OBAC
          </p>
        </div>

        {/* Section 1 */}
        <OpeningScroll>
          <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <MaybeParallax speed={-5}>
              <div>
                <img
                  src="/static/history_01.jpg"
                  alt="ประวัติ OBAC"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </MaybeParallax>
            <MaybeParallax speed={5}>
               <div className="flex flex-col justify-start space-y-4 text-sm sm:text-base md:text-lg leading-relaxed pt-0">
                <h3 className="text-xl text-center sm:text-2xl md:text-3xl font-bold mb-2">
                  ความเป็นมา
                </h3>
                <p className="indent-8">
                  วิสัยทัศน์ทางการศึกษาและความตั้งใจจริงของคุณวิภารัตน์และคุณศุภรัฐ
                  โยธินธรรมมณี ที่มองเห็นถึงความสำคัญของเยาวชนไทย จึงได้จัดตั้งโรงเรียนเอกวิทย์อาชีวบริหารธุรกิจ
                  ซึ่งเป็นโรงเรียนอาชีวศึกษาเอกชนขึ้นเมื่อวันที่ 23 มิถุนายน 2541
                </p>
                <p className="indent-8">
                  โดยมีเป้าหมายในการให้โอกาสทางการศึกษาแก่เยาวชนไทยในระดับอาชีวศึกษา
                  เพื่อให้สามารถศึกษาต่อในระดับอุดมศึกษา และพัฒนาทักษะอาชีพ
                  เพื่อประกอบอาชีพในอนาคตได้อย่างมั่นคงและมีคุณภาพชีวิตที่ดีขึ้น
                </p>
              </div>
            </MaybeParallax>
          </section>
        </OpeningScroll>

        {/* Section 2 */}
        <OpeningScroll>
          <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* รูปภาพ – แสดงก่อนในมือถือ, แสดงขวาใน desktop */}
            <MaybeParallax speed={-5}>
              <div className="order-1 md:order-2">
                <img
                  src="/static/history_02.jpg"
                  alt="OBAC ปวช. ปวส."
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </MaybeParallax>

            {/* ข้อความ – แสดงหลังในมือถือ, แสดงซ้ายใน desktop */}
            <MaybeParallax speed={5}>
              <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed order-2 md:order-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                  ระดับประกาศนียบัตรวิชาชีพ (ปวช.)
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>หลักสูตรของกระทรวงศึกษาธิการ</li>
                  <li>
                    ประเภทวิชาเทคโนโลยีสารสนเทศ สาขาวิชาเทคโนโลยีสารสนเทศ
                  </li>
                  <li>
                    ประเภทวิชาพาณิชยกรรม สาขาวิชาการบัญชี, การตลาด,
                    คอมพิวเตอร์ธุรกิจ, คอมพิวเตอร์กราฟิก, การท่องเที่ยว
                  </li>
                </ul>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mt-6 mb-2">
                  ระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    สาขาวิชาการบัญชี, การตลาด, คอมพิวเตอร์ธุรกิจ,
                    การจัดการสำนักงานใหม่
                  </li>
                </ul>
              </div>
            </MaybeParallax>
          </section>
        </OpeningScroll>


        {/* Section 3 */}
        <OpeningScroll>
          <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
            <MaybeParallax speed={5}>
              <img
                src="/static/history_03.jpg"
                alt="อาคาร OBAC"
                className="mx-auto w-full max-w-3xl rounded-lg shadow-xl"
              />
            </MaybeParallax>

            <p className="mt-6 text-sm sm:text-base md:text-lg text-gray-700">
              โดยได้รับใบอนุญาต เลขที่ กอ. 136/2541 ลงวันที่ 23 มิถุนายน 2541
              <br />
              โดยมีคุณศุภรัฐ โยธินธรรมมณี เป็นผู้รับใบอนุญาต
            </p>
          </section>
        </OpeningScroll>
      </div>
    </div>
  );
}
