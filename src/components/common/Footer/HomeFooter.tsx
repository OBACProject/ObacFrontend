import { School } from "lucide-react";

export default function HomeFooter() {
  return (
    <div className="w-full bg-[#0C243C] px-5 py-10 lg:px-10">
      <div className="grid place-items-center  gap-5 lg:gap-10 lg:justify-center md:justify-center lg:flex md:flex ">
        <div className="flex text-white">
          <div className="rounded-full hidden lg:block md:block sm:block w-fit h-fit bg-white px-0 py-1">
            <img src="/images/obac_navbar_logo.png" className="h-24" />
          </div>
          <div className="flex flex-col justify-start font-inter font-bold p-2 pl-6 ">
            <span className="sm:text-lg line-clamp-1">
              Ekawit Business Administration Vocational College
            </span>
            <span className="sm:text-sm ">
              วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ
            </span>
          </div>
        </div>
        <div className="text-white lg:text-start md:text-start text-center lg:w-[350px] md:w-[200px] sm:text-center sm:w-[350px]">
          <div>
            5 ซอย ลาดกระบัง 34/1 ถนน ลาดกระบัง แขวงลาดกระบัง เขตลาดกระบัง
            กรุงเทพมหานคร 10520
          </div>
          <div className="mt-2">ติดต่อ : 02 327 2992</div>
        </div>
      </div>
      <div className="text-center  py-4  text-white">
        <p>©2024 วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ | OBAC</p>
      </div>
    </div>
  );
}
