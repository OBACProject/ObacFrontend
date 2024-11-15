import { CarouselData } from "@/resource/home/carosuelData";
import Carousel1 from "@/app/components/carousel/carousel-1";
import { SidebarData } from "@/resource/home/sidebarData";
import CardHorizontal from "@/app/components/dropdown/card-horizontal";
import { cardData } from "@/resource/fetchData/cardContent";
import CLShomepage from "@/app/components/cls-homepage";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <CLShomepage />
      <div className="flex w-full bg-[#E0F6FF] ">
        {/* slide bar on homepage */}
        <div className="w-1/5 flex flex-col  mx-16 mt-10 gap-4">
          <div className=" bg-[#003571] sticky rounded-xl p-4 gap-4 flex flex-col">
            {SidebarData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 gap-5 bg-[#FFF9F4] rounded-xl"
              >
                <div className="w-10 h-10 text-slate-600">{item.menuIcon}</div>
                <div>
                  <div className="text-lg font-medium leading-none">
                    {item.menuName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* news and activity */}
        <div className="w-4/5  mx-16 mt-10 flex flex-col">
          <h1 className="text-2xl">
            ข่าวสาร และ กิจกรรม วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ
          </h1>
          <div className="">
            <CardHorizontal cardData={cardData} />
          </div>
        </div>
      </div>
    </div>
  );
}
