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
            เอกลักษณ์/อัตลักษณ์ของ OBAC
          </p>
        </div>

       
<OpeningScroll>
  <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
    {/* ด้านซ้าย: ข้อความ */}
    <MaybeParallax speed={5}>
      <div className="space-y-6 text-sm sm:text-base md:text-lg leading-relaxed">

        <div>
          <h4 className="text-lg font-semibold text-blue-900">บุคลิกภาพดี</h4>
          <p className="indent-8">
            วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจเน้นให้นักศึกษาเป็นผู้ที่รู้จักการแต่งกายที่ดีให้เหมาะสมกับกาลเทศะ แต่งกายสุภาพ เรียบร้อย
            ถูกต้องตามระเบียบของสถานศึกษา สะอาด และสวยงาม
            คือ นักศึกษาแต่งกายด้วยชุดเครื่องแบบนักศึกษา ชุดพละตามระเบียบที่สถานศึกษากำหนด
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-blue-900">มารยาทเด่น</h4>
          <p className="indent-8">
            วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจให้ความสำคัญกับการให้นักศึกษาเรียนรู้เกี่ยวกับมารยาทและการทำตนในสังคม
            เป็นผู้ที่มีมารยาทงาม เช่น การยิ้ม ไหว้สวย
          </p>
        </div>
      </div>
    </MaybeParallax>

    <MaybeParallax speed={-5}>
      <div className="w-full h-full flex justify-center items-center">
        <img
          src="/static/symbol_1.jpg" 
          alt="การแต่งกายของนักศึกษา OBAC"
          className="w-full max-w-xl rounded-lg shadow-xl"
        />
      </div>
    </MaybeParallax>
  </section>
</OpeningScroll>

      </div>
    </div>
  );
}

