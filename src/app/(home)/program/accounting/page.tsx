"use client"

import StickerFacebook from "@/components/Effect/StickerFacebook";
import StickerYoutube from "@/components/Effect/StickerYoutube";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
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

  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const iconPositions = [
    { src: "/cls/accounting/accounting_light.png", alt: "Light Bulb", position: { top: "20%", left: "20%" }, parallaxStrength: 0.3, size: "w-10 h-10 sm:w-16 sm:h-16" },
    { src: "/cls/accounting/accounting_chart.png", alt: "Chart", position: { top: "20%", right: "15%" }, parallaxStrength: 0.4, size: "w-12 h-12 sm:w-20 sm:h-20" },
    { src: "/cls/accounting/accounting_cal.png", alt: "Target Arrow", position: { bottom: "25%", right: "10%" }, parallaxStrength: 0.5, size: "w-14 h-14 sm:w-14 sm:h-18" },
    { src: "/cls/accounting/accounting_money_bag.png", alt: "Coin", position: { bottom: "35%", left: "40%" }, parallaxStrength: 0.3, size: "w-10 h-10 sm:w-16 sm:h-16" },
    { src: "/cls/accounting/accounting_money.png", alt: "Shopping Cart", position: { bottom: "15%", left: "35%" }, parallaxStrength: 0.4, size: "w-12 h-12 sm:w-18 sm:h-18" },
    { src: "/cls/accounting/accounting_paper.png", alt: "Global", position: { bottom: "10%", left: "50%" }, parallaxStrength: 0.2, size: "w-10 h-10 sm:w-16 sm:h-16" }
  ];

  if (!mounted) return null;

  return (
    <div className="bg-white h-full min-h-screen text-blue-950 font-prompt mt-16 md:mt-36">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="canonical" href="https://ekawit.ac.th" />
      </Head>

      <StickerFacebook />
      <StickerYoutube />

      {/* Header Section */}
      <div className="h-auto min-h-[260px] sm:h-[300px] bg-blue-900 relative overflow-hidden">
        {/* Floating Icons */}
        {iconPositions.map((icon, index) => (
          <div
            key={index}
            className="absolute animate-float opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-110"
            style={{
              ...icon.position,
              transform: `translate(${(mousePosition.x - 50) * icon.parallaxStrength * 0.1}px, ${(mousePosition.y - 50) * icon.parallaxStrength * 0.1}px)`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${6 + index * 0.5}s`,
            }}
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              width={64}
              height={64}
              className={`${icon.size} drop-shadow-lg`}
            />
          </div>
        ))}

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-10 z-20">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-10 w-full max-w-6xl">
            {/* Avatar */}
            <div className="w-full sm:w-1/2 flex justify-center">
              <Image
                src="/cls/accounting/avatar.png"
                alt="Marketing Professional"
                width={800}
                height={800}
                className="h-[160px] sm:h-[200px] md:h-[300px] w-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Text */}
            <div className="text-white text-center sm:text-left w-full sm:w-1/2">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide drop-shadow-2xl"
                style={{
                  transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`,
                }}
              >
                สาขาวิชาการบัญชี
              </h1>

            </div>
          </div>
        </div>

        {/* Decorations */}
        <div className="absolute top-10 left-10 w-1 h-20 bg-gradient-to-b from-orange-400 to-transparent opacity-60 animate-pulse" />
        <div className="absolute top-20 right-20 w-20 h-1 bg-gradient-to-r from-yellow-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-20 w-1 h-16 bg-gradient-to-t from-orange-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-10 right-10 w-16 h-1 bg-gradient-to-l from-yellow-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: "1.5s" }} />

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-float opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="space-y-6 pt-20 px-6 max-w-5xl mx-auto">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-blue-900">
          สาขาวิชาการบัญชี (Accounting)
        </h3>

        <p className="text-base sm:text-lg leading-relaxed indent-8">
          สาขาวิชาการบัญชีมุ่งเน้นการเรียนรู้เกี่ยวกับกระบวนการจัดทำบัญชีเบื้องต้น
          ตั้งแต่การเขียนบันทึกรายการค้า การจัดทำงบการเงิน การวิเคราะห์ข้อมูลทางบัญชี
          ไปจนถึงการอ่านและแปลความหมายของงบการเงินอย่างถูกต้อง
        </p>

        <p className="text-base sm:text-lg leading-relaxed indent-8">
          นักเรียนจะได้ฝึกฝนทั้งภาคทฤษฎีและภาคปฏิบัติ เพื่อเตรียมพร้อมในการทำงานจริง
          ทั้งในภาคธุรกิจและภาครัฐ มีความรู้ความเข้าใจในมาตรฐานการบัญชีและจรรยาบรรณวิชาชีพ
          เพื่อเป็นนักบัญชีที่มีคุณภาพในอนาคต
        </p>
      </div>


    </div>
  );
}
