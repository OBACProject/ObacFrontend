"use client";

import BarChart from "@/components/Academic/BarChart";
import DonutChart from "@/components/Academic/DonutChart";
import ProfileCard from "@/components/Academic/ProfileCard";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { useGetStudentClassCountDtosQuery } from "@/lib/api/hooks/queries/dashboard.queries";
import { ChartPie } from "lucide-react";
import React, { useMemo } from "react";

export default function AcademicDashboard() {
  const {
    data: studentClassData,
    isLoading,
    error,
  } = useGetStudentClassCountDtosQuery();
  const chartData = useMemo(() => {
    if (!studentClassData) return null;

    const validData = studentClassData.filter(
      (item) =>
        item.class &&
        item.genderCount?.gender &&
        (item.genderCount.gender === "ชาย" ||
          item.genderCount.gender === "หญิง") &&
        !item.class.includes("/") &&
        item.class.split(".").length <= 1 &&
        (item.class.startsWith("ปวช") || item.class.startsWith("ปวส"))
    );

    const genderTotals = validData.reduce((acc, item) => {
      const gender = item.genderCount.gender;
      acc[gender] = (acc[gender] || 0) + item.genderCount.count;
      return acc;
    }, {} as Record<string, number>);

    const classTotals = validData.reduce((acc, item) => {
      const classType = item.class.startsWith("ปวช") ? "ปวช" : "ปวส";
      acc[classType] = (acc[classType] || 0) + item.genderCount.count;
      return acc;
    }, {} as Record<string, number>);

    const barChartData = validData.reduce((acc, item) => {
      const key = `${item.class}.${item.level}`;
      if (!acc[key]) {
        acc[key] = { label: key, ชาย: 0, หญิง: 0 };
      }
      acc[key][item.genderCount.gender as "ชาย" | "หญิง"] =
        item.genderCount.count;
      return acc;
    }, {} as Record<string, { label: string; ชาย: number; หญิง: number }>);

    const labels = Object.keys(barChartData).sort();
    const maleData = labels.map((label) => barChartData[label].ชาย);
    const femaleData = labels.map((label) => barChartData[label].หญิง);

    return {
      gender: {
        values: [genderTotals["ชาย"] || 0, genderTotals["หญิง"] || 0],
        labels: ["ชาย", "หญิง"],
      },
      classType: {
        values: [classTotals["ปวช"] || 0, classTotals["ปวส"] || 0],
        labels: ["ปวช", "ปวส"],
      },
      barChart: {
        labels,
        maleData,
        femaleData,
      },
    };
  }, [studentClassData]);

  if (isLoading) {
    return (
      <div className="lg:px-10 py-5 px-5 bg-gray-100">
        <div className="w-full px-5">
          <HeaderLabel
            title="ภาพรวมโรงเรียน"
            Icon={<ChartPie className="h-7 w-7 text-white" />}
          />
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lg:px-10 py-5 px-5 bg-gray-100">
        <div className="w-full px-5">
          <HeaderLabel
            title="ภาพรวมโรงเรียน"
            Icon={<ChartPie className="h-7 w-7 text-white" />}
          />
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">Error loading data</div>
        </div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="lg:px-10 py-5 px-5 bg-gray-100">
        <div className="w-full px-5">
          <HeaderLabel
            title="ภาพรวมโรงเรียน"
            Icon={<ChartPie className="h-7 w-7 text-white" />}
          />
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">No data available</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="lg:px-10 py-5 px-5 bg-blue-100"
      style={{
        backgroundImage: `
      /* เส้นตั้ง */
      repeating-linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 0px,
        rgba(255, 255, 255, 1) 1px,
        transparent 1px,
        transparent 20px
      ),
      /* เส้นนอน */
      repeating-linear-gradient(
        to bottom,
        rgba(255, 255, 255, 1) 0px,
        rgba(255, 255, 255, 1) 1px,
        transparent 1px,
        transparent 20px
      )
    `,
        backgroundSize: "20px 20px",
      }}
    >
      <div className="w-full px-5">
        <HeaderLabel
          title="ภาพรวมโรงเรียน"
          Icon={<ChartPie className="h-7 w-7 text-white" />}
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6 px-4 py-6">
        {/* Chart Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <DonutChart
            title="จำนวนนักเรียน ชาย-หญิง"
            value={chartData.gender.values}
            label={chartData.gender.labels}
            backgroundColor={["#8AB6F9", "#FF8DC7"]}
          />
          <DonutChart
            title="สัดส่วน ปวช-ปวส"
            value={chartData.classType.values}
            label={chartData.classType.labels}
            backgroundColor={["#B388EB", "#7D7D7D"]}
          />
        </div>

        <ProfileCard username="---- -----" rolename="ฝ่ายทะเบียน" />
       
      </div>

      <div className="my-5 mx-5 px-5 bg-white shadow-xl grid place-items-center rounded-lg">
        <h1 className="text-xl font-prompt text-blue-600">
          แผนภูมิแสดงจำนวนนักเรียน ชาย-หญิง ปวช - ปวส
        </h1>
        <BarChart
          labels={chartData.barChart.labels}
          maleData={chartData.barChart.maleData}
          femaleData={chartData.barChart.femaleData}
        />
      </div>
    </div>
  );
}
