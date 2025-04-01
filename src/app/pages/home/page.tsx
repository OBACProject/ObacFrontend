"use client";
import { cardData } from "@/resource/fetchData/cardContent";
import CLShomepage from "@/app/components/cls/cls-homepage";
import CardVertical from "@/app/components/card/card-vertical";
import CardHorizontal from "@/app/components/card/card-horizontal";

import StickerFacebook from "@/app/components/Effect/StickerFacebook";
import StickerYoutube from "@/app/components/Effect/StickerYoutube";
import FadeInOnScroll from "@/app/components/Effect/FadInScroll";
import OpeningScroll from "@/app/components/Effect/OpeningScroll";

export default function Home() {
  return (
    <div className="bg-white">
      <StickerFacebook />
      <StickerYoutube />
      {/* <CLShomepage /> */}

      <div className="w-full pt-4">
        {/* <FadeInOnScroll> */}
        <div className="relative  group flex items-center justify-center  lg:w-[100%] md:w-[100%] md:h-[400px] lg:h-[390px] w-full h-[220px] sm:w-[100%] sm:h-[300px] overflow-hidden">
          <img
            className="absolute lg:w-[100%] lg:h-[390px] sm:w-[100%] sm:h-[300px] md:w-[100%] md:h-[400px] w-full h-[220px] object-cover duration-1000 group-hover:scale-[102%]"
            src="/images/obac_view.jpg"
          />
          <div className="relative w-full h-full bg-gradient-to-t from-white via-gray-800/0 to-gray-900/5"></div>
        </div>
        {/* </FadeInOnScroll> */}
      </div>
      <div className="w-full  items-center text-center px-4 ">
        <OpeningScroll>
          <h1 className="lg:text-4xl  text-3xl text-blue-950   font-extrabold px-5 py-1">
            Ekawit Business Administration Vocational College (OBAC)
          </h1>
        </OpeningScroll>
      </div>
      <OpeningScroll>
        <div className="grid place-items-center mt-10 mb-5 w-full">
          <hr className=" w-11/12 border border-blue-950" />
        </div>
      </OpeningScroll>
      <FadeInOnScroll>
        <div className="w-full grid place-items-center">
          <h1 className="text-5xl text-blue-950 my-5  font-extrabold px-5 py-1">
            Welcome to OBAC
          </h1>
          <i className="w-[60%] text-blue-950 text-lg">
            "At the heart of our university lies a powerful vision — to shape
            the future by merging innovation with entrepreneurship. As a leading
            institution in technology and business, we equip students with
            cutting-edge skills, critical thinking, and real-world experience.
            Through dynamic programs, collaborative research, and
            industry-driven education, we empower the next generation of leaders
            to thrive in a rapidly changing world. Here, every idea matters, and
            every student is a catalyst for progress. Join us where technology
            meets opportunity — and futures are built."
          </i>
        </div>
      </FadeInOnScroll>
      <div className="w-full mt-10 py-2 bg-blue-950"></div>
      <FadeInOnScroll>
        <div className=" relative group flex items-center justify-center  lg:w-[100%] md:w-[100%] md:h-[400px] lg:h-[600px] w-full h-[220px] sm:w-[100%] sm:h-[300px] overflow-hidden">
          <img
            className="absolute lg:w-[100%] lg:h-[600px] sm:w-[100%] sm:h-[300px] md:w-[100%] md:h-[400px] w-full h-[220px] object-cover duration-1000 group-hover:scale-[102%]"
            src="/banner/banner.jpg"
          />
          <div className="relative w-full h-full bg-gradient-to-t from-gray-900/0 to-gray-900/0"></div>
        </div>
      </FadeInOnScroll>
      <div className="w-full mb-5 py-2 bg-blue-950"></div>
      <div className="flex w-full bg-white ">
        <div className="w-full items-center text-center px-4 ">
          <FadeInOnScroll>
            <h1 className="text-5xl text-blue-950 my-5  font-extrabold px-5 py-1">
              ข่าวสารและกิจกรรม
            </h1>
          </FadeInOnScroll>
        </div>
      </div>
      <FadeInOnScroll>
        <div className="grid lg:grid-cols-3 gap-x-20 lg:mx-10  mx-5 ">
          <CardVertical cardData={cardData} />
        </div>
      </FadeInOnScroll>

      <div className="lg:flex grid w-full gap-5 lg:px-10 px-5">
        <div className=" h-fit  w-fit">
          <CardHorizontal cardData={cardData} />
        </div>
        {/* <FadeInOnScroll>
          <div className="h-fit grid grid-cols-2 gap-3 overflow-hidden py-5 px-10 ">
            <div className="px-20 py-40 rounded-md  bg-gradient-to-tr from-emerald-200  to-blue-800">
              For Post
            </div>
            <div className="px-20 py-40 rounded-md  bg-gradient-to-tr from-emerald-200  to-blue-800">
              For Post
            </div>
            <div className="px-20 py-40 rounded-md  bg-gradient-to-tr from-emerald-200  to-blue-800">
              For Post
            </div>
            <div className="px-20 py-40 rounded-md  bg-gradient-to-tr from-emerald-200  to-blue-800">
              For Post
            </div>
            <div className="px-20 py-40 rounded-md  bg-gradient-to-tr from-emerald-200  to-blue-800">
              For Post
            </div>
            <div className="px-20 py-40 rounded-md  bg-gradient-to-tr from-emerald-200  to-blue-800">
              For Post
            </div>
            <div className="px-20 py-40 rounded-md  bg-gradient-to-tr from-emerald-200  to-blue-800">
              For Post
            </div>

            <div className="px-20 py-40 rounded-md  bg-gradient-to-tr from-emerald-200  to-blue-800">
              For Post
            </div>
          </div>
        </FadeInOnScroll> */}
      </div>
    </div>
  );
}
