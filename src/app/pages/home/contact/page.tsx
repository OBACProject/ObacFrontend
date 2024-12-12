'use client';
import { Facebook, Instagram } from "lucide-react";


export default function Page() {
  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className=" pt-16 pb-4 text-6xl font-bold px-20 text-blue-900">
        Contact Us
      </div>

      {/* Contact Information Section */}
      <div className="grid grid-cols-2  mt-8">
        <div className="w-full py-5 px-10 bg-white gap-8">
          {/* Academic Department */}
          <div className="mb-2 mx-10">
            <div className="text-xl py-2  font-semibold text-blue-800 underline">ฝ่ายวิชาการ</div>
            <div className="text-md">
              <span className="text-black text-md">Tel.&nbsp;&nbsp;</span>091-864-9154
            </div>
          </div>

          {/* Administrative Department */}
          <div className="mb-2 mx-10">
            <div className="text-xl py-2 font-semibold text-blue-800 underline">ฝ่ายปกครอง</div>
            <div className="text-md">
              <span className="text-black text-md">Tel.&nbsp;&nbsp;</span>091-864-9154
            </div>
          </div>

          {/* Management Department */}
          <div className="mb-2 mx-10">
            <div className="text-xl py-2 font-semibold text-blue-800 underline">ฝ่ายบริหาร</div>
            <div className="text-md">
              <span className="text-black text-md">Tel.&nbsp;&nbsp;</span>091-864-9154
            </div>
          </div>

          {/* Counseling Department */}
          <div className="mb-2 mx-10">
            <div className="text-xl py-2 font-semibold text-blue-800 underline">ฝ่ายแนะแนว</div>
            <div className="text-md">
              <span className="text-black text-md">Tel.&nbsp;&nbsp;</span>091-864-9154
            </div>
          </div>

          {/* Social Media Links Section */}
          <div className=" place-items-center mt-16">
            <div className="py-5 px-10 gap-8 flex">
              {/* Facebook */}
              <div className="flex gap-2">
                <Facebook style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-blue-600 "/>
                <div className="text-xl pt-2 text-gray-600">เอกวิทย์ยชาการวิทยาลัย</div>
              </div>

              {/* Instagram */}
              <div className="flex gap-2">
                <Instagram style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-pink-500" />
                <div className="text-xl pt-2 text-gray-600">akkawitwittayalai.og</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mapswrapper">
          <iframe width="600" height="450" loading="lazy" allowFullScreen src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%AD%E0%B8%B2%E0%B8%8A%E0%B8%B5%E0%B8%A7%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B9%8C%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%20(%E0%B9%82%E0%B8%AD%E0%B9%81%E0%B8%9A%E0%B8%84)&zoom=10&maptype=roadmap">
          </iframe>
        </div>
      </div>
    </div>
  );
}