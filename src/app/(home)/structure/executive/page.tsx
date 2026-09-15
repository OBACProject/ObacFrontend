"use client";
import React from "react";
import Head from "next/head";
import "@app/styles/globals.css";
import HeaderHomePageMenu from "@/components/common/Header/Header";
import SciFiBackgroundNormal from "@/app/styles/bg-normal";

export default function page() {
  return (
    <div className="pt-[70px] lg:pt-[140px] sm:pt-[70px] md:pt-[140px]">
      <Head>
        <title>คณะผู้บริหารวิทยาลัย | วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ (OBAC)</title>
        <meta
          name="description"
          content="รายชื่อและตำแหน่งคณะผู้บริหารวิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ (OBAC)"
        />
        <link rel="canonical" href="https://ekawit.ac.th/structure/executive" />
      </Head>
      <HeaderHomePageMenu title="คณะผู้บริหารวิทยาลัย" />
      <SciFiBackgroundNormal>
        <div className="grid place-items-center">
          <div className="">
            <img
              alt="obac-structure"
              src="/homepage/common/management.jpg"
              width={800}
              height="full"
            />
          </div>
        </div>
      </SciFiBackgroundNormal>
    </div>
  );
}
