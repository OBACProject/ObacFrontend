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
      <div className="w-full">
        <FadeInOnScroll>
          <img
            className="h-auto w-full"
            src="https://www.obac.ac.th/mainsite/images/header/harder2018.jpg"
          />
        </FadeInOnScroll>
      </div>
      <div className="lg:flex grid w-full gap-5 lg:px-10 px-5">
        <div className=" h-fit  w-fit">
          <CardHorizontal cardData={cardData} />
        </div>
        <div className="h-fit overflow-hidden py-5 ">
          <div className="px-10 py-10 rounded-md  bg-blue-500">Image</div>
        </div>
      </div>
    </div>
  );
}
