
import { cardData } from "@/resource/fetchData/cardContent";
import CLShomepage from "@/app/components/cls-homepage";
import CardVertical from "@/app/components/card/card-vertical";
import CardHorizontal from "@/app/components/card/card-horizontal";

export default function Home() {
  return (
    <div>
      <CLShomepage />
      <div className="flex w-full bg-white ">
        {/* slide bar on homepage */}
        {/* <div className="w-3/12 flex flex-col  ml-5 mt-2 gap-4">
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
        </div> */}
        {/* news and activity */}
        <div className="w-full items-center  flex flex-col  px-4 py-4">
          <h1 className="text-5xl text-blue-950 my-5 font-bold px-5 py-1">
            News And Events
          </h1>
          {/* <hr className="my-5 border-[1px] "/> */}
          <div className="grid grid-cols-3 gap-x-20 mx-40 ">
            <CardVertical cardData={cardData} />
          </div>
          <div className="my-5 py-32 border-2 border-dashed border-gray-700 w-4/5 rounded-lg grid place-items-center text-2xl bg-gray-100">
            พื้นที่แปะภาพ
          </div>
          <div className="grid place-items-start pl-36 w-full">
            <CardHorizontal cardData={cardData} />
            <CardHorizontal cardData={cardData} />
          </div>
        </div>
      </div>
    </div>
  );
}
