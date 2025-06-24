import DonutChart from "@/components/Academic/DonutChart";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { ChartPie } from "lucide-react";
import React from "react";

export default function Academic() {
  return (
    <div className="lg:px-10 py-5 px-5 ">
      <div className="w-full ">
        <HeaderLabel
          title="ภาพรวมโรงเรียน"
          Icon={<ChartPie className="w-8 h-8 " />}
        />
      </div>
      <div className="flex gap-4  justify-start px-4  py-4 ">
        <DonutChart
          title="จำนวนนักเรียน ชาย-หญิง"
          value={[1200, 1500]}
          label={["ชาย", "หญิง"]}
        />
        <DonutChart
          title="สัดส่วน ปวช-ปวส"
          value={[1900, 500]}
          label={["ปวช", "ปวส"]}
          backgroundColor = {['#3a01eb' , '#5d5d5d']}
        />
      </div>
    </div>
  );
}
