import BarChart from "@/components/Academic/BarChart";
import DonutChart from "@/components/Academic/DonutChart";
import ProfileCard from "@/components/Academic/ProfileCard";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { ChartPie } from "lucide-react";
import React from "react";

export default function Academic() {
  const labels = ["ปวช.1", "ปวช.2", "ปวช.3", "ปวส.1", "ปวส.2"];
  const femaleData = [70, 52, 28, 39, 22, 78, 50, 48, 26];
  const maleData = [92, 41, 33, 45, 27, 66, 75, 38, 32];
  return (
    <div className="lg:px-10 py-5 px-5 ">
      <div className="w-full px-5">
        <HeaderLabel
          title="ภาพรวมโรงเรียน"
          Icon={<ChartPie className="h-7 w-7 text-white" />}
        />
      </div>
      <div className="lg:flex lg:justify-between ">
        <div className="lg:flex gap-4  lg:justify-start px-4 h-auto py-4  grid grid-cols-2">
          <DonutChart
            title="จำนวนนักเรียน ชาย-หญิง"
            value={[1200, 1500]}
            label={["ชาย", "หญิง"]}
          />
          <DonutChart
            title="สัดส่วน ปวช-ปวส"
            value={[1900, 500]}
            label={["ปวช", "ปวส"]}
            backgroundColor={["#3a01eb", "#5d5d5d"]}
          />
          <DonutChart
            title="นักเรียน ผ่านเกณ์-ไม่ผ่านเกณฑ์"
            value={[1900, 200]}
            label={["ผ่าน", "ไม่ผ่าน"]}
            backgroundColor={["#11e400", "#ff0000"]}
          />
        </div>
        <div className="px-4 py-4">
          <ProfileCard username="ภัทรจาริน นภากาญจน์" rolename="ฝ่ายทะเบียน" />
        </div>
      </div>

      <div className="my-5 mx-5 px-5 shadow-xl grid place-items-center rounded-lg ">
        <h1 className="text-xl font-prompt text-blue-600">
          แผนภูมิแสดงจำนวนนักเรียน ชาย-หญิง ปวช - ปวส
        </h1>
        <BarChart labels={labels} maleData={maleData} femaleData={femaleData} />
      </div>
    </div>
  );
}
