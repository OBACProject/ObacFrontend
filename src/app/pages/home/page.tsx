import { cardData } from "@/resource/fetchData/cardContent";
import CLShomepage from "@/app/components/cls-homepage";
import CardVertical from "@/app/components/card/card-vertical";
import CardHorizontal from "@/app/components/card/card-horizontal";

import StickerFacebook from "@/app/components/Effect/StickerFacebook";
import StickerYoutube from "@/app/components/Effect/StickerYoutube";


export default function Home() {
  return (
    <div>
      <CLShomepage />
      <div className="flex w-full bg-white ">
        <div className="w-full items-center  flex flex-col  px-4 py-4">
          <StickerFacebook />
          <StickerYoutube />
          <h1 className="text-5xl animate-fadeIn text-blue-950 my-5  font-bold px-5 py-1">
            News And Events
          </h1>
          <div className="animate-fadeIn grid lg:grid-cols-3 gap-x-20 lg:mx-10  mx-5 ">

            <CardVertical cardData={cardData} />
          </div>
          <div className="w-full my-5 flex justify-center ">
            <img
              className="h-40 w-full lg:w-[90%] lg:h-auto"
              src="https://www.obac.ac.th/mainsite/images/header/harder2018.jpg"
            />
          </div>
          <div className="animate-fadeIn grid place-items-start mx-10 lg:px-20 md:px-10 sm:px-10 overflow-hidden lg:w-[95%]">
            <CardHorizontal cardData={cardData} />
            <CardHorizontal cardData={cardData} />
          </div>
        </div>
      </div>
    </div>
  );
}
