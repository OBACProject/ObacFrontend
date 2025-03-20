"use client";
import { cardData } from "@/resource/fetchData/cardContent";
import CLShomepage from "@/app/components/cls/cls-homepage";
import CardVertical from "@/app/components/card/card-vertical";
import CardHorizontal from "@/app/components/card/card-horizontal";

import StickerFacebook from "@/app/components/Effect/StickerFacebook";
import StickerYoutube from "@/app/components/Effect/StickerYoutube";
import FadeInOnScroll from "@/app/components/Effect/FadInScroll";

export default function Home() {
  return (
    <div className="bg-white">
      <StickerFacebook />
      <StickerYoutube />
      <CLShomepage />
      <div className="w-full items-center text-center px-4 py-4">
        <FadeInOnScroll>
          <h1 className="lg:text-5xl text-3xl text-blue-950 my-5  font-extrabold px-5 py-1">
            Ekawit Business Administration Vocational College (OBAC)
          </h1>
        </FadeInOnScroll>
      </div>
      <div className="w-full">
        <FadeInOnScroll>
          <div className="relative group flex items-center justify-center  lg:w-[100%] md:w-[100%] md:h-[400px] lg:h-[400px] w-full h-[220px] sm:w-[100%] sm:h-[300px] overflow-hidden">
            <img
              className="absolute lg:w-[100%] lg:h-[400px] sm:w-[100%] sm:h-[300px] md:w-[100%] md:h-[400px] w-full h-[220px] object-cover duration-1000 group-hover:scale-[102%]"
              src="/images/poster1.jpg"
            />
            <div className="relative w-full h-full bg-gradient-to-t from-gray-900/40 to-gray-900/5"></div>
          </div>
        </FadeInOnScroll>
      </div>

      <div className="flex w-full bg-white ">
        <div className="w-full items-center text-center px-4 py-4">
          <FadeInOnScroll>
            <h1 className="text-5xl text-blue-950 my-5  font-extrabold px-5 py-1">
              News And Events
            </h1>
          </FadeInOnScroll>
        </div>
      </div>
      <FadeInOnScroll>
        <div className="grid lg:grid-cols-3 gap-x-20 lg:mx-10  mx-5 ">
          <CardVertical cardData={cardData} />
        </div>
      </FadeInOnScroll>
      <FadeInOnScroll>
        <div className="relative group flex items-center justify-center  lg:w-[100%] md:w-[100%] md:h-[400px] lg:h-[400px] w-full h-[220px] sm:w-[100%] sm:h-[300px] overflow-hidden">
          <img
            className="absolute lg:w-[100%] lg:h-[400px] sm:w-[100%] sm:h-[300px] md:w-[100%] md:h-[400px] w-full h-[220px] object-cover duration-1000 group-hover:scale-[102%]"
            src="/images/obac_view.jpg"
          />
          <div className="relative w-full h-full bg-gradient-to-t from-gray-900/40 to-gray-900/5"></div>
        </div>
      </FadeInOnScroll>
      <div className="lg:flex grid w-full gap-5 lg:px-10 px-5">
        <div className=" h-fit  w-fit">
          <CardHorizontal cardData={cardData} />
        </div>
        <FadeInOnScroll>
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
        </FadeInOnScroll>
      </div>
    </div>
  );
}
