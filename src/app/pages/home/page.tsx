import { CarouselData } from "@/resource/home/carosuelData";
import Carousel1 from "@/app/components/carousel/carousel-1";
import { SidebarData } from "@/resource/home/sidebarData";
import CardHorizontal from "@/app/components/card/card-horizontal";
import { cardData } from "@/resource/fetchData/cardContent";
import CLShomepage from "@/app/components/cls-homepage";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <CLShomepage />
      <div className="flex w-ful bg-white ">
        {/* slide bar on homepage */}
        <div className="w-3/12 flex flex-col  ml-5 mt-2 gap-4">
          <div className=" bg-white w-full border-[1px] border-gray-200 sticky rounded-md py-3 px-2 gap-4 flex flex-col shadow-md shadow-gray-200">
            {SidebarData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-start px-2 py-3 gap-5 group hover:bg-[#e4f1f8] bg-white rounded-md "
              >
                <div className="w-8  h-10 text-slate-600">{item.menuIcon}</div>
                <div>
                  <div className="text-md  group-hover:text-black  text-gray-600 font-semibold leading-none">
                    {item.menuName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* news and activity */}
        <div className="w-4/5  mx-10 mt-2 flex flex-col border-[1px] shadow-md shadow-gray-200 px-16 py-10">
          <h1 className="text-2xl bg-blue-900 text-white px-5 py-1">
            ข่าวสาร และ กิจกรรม วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ
          </h1>
          <hr className="my-5 border-[1px]"/>
          <div className="">
            <CardHorizontal cardData={cardData} />
          </div>
        </div>
      </div>
    </div>
  );
}
